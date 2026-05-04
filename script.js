const DEFAULT_VIEW = {
  center: [50.8, 10.3],
  zoom: 6
};

const GERMANY_FALLBACK_VIEW = {
  center: [51.1657, 10.4515],
  zoom: 6
};

const DACH_COORD_BOUNDS = {
  minLat: 45,
  maxLat: 56.5,
  minLng: 5,
  maxLng: 18.5
};

const RESULT_BATCH_SIZE = 36;
const RESULT_SCROLL_THRESHOLD = 320;

const LAYERS = {
  top: {
    key: "top",
    label: "Top Targets",
    tooltip:
      "Finale A-Priorität: Hersteller plus wenige Ofenbauer mit hohem Business Impact und hohem Fit.",
    url: "data/dach_ofen_top_map_data_final.json",
    expectedCount: 65
  },
  filtered: {
    key: "filtered",
    label: "Relevante Betriebe",
    tooltip:
      "Alle Firmen mit finaler Priorität A oder B für die laufende Vertriebsbearbeitung.",
    url: "data/dach_ofen_filtered_map_data_final.json",
    expectedCount: 315
  },
  full: {
    key: "full",
    label: "Full Market",
    tooltip:
      "Vollständige finale DACH-Marktabdeckung mit 857 Firmen für Markt- und Regionsanalysen.",
    url: "data/dach_ofen_full_map_data_final.json",
    expectedCount: 857
  }
};

const state = {
  map: null,
  clusterGroup: null,
  datasets: new Map(),
  activeLayer: "top",
  companies: [],
  filteredCompanies: [],
  markerIndex: new Map(),
  pendingFitFrame: null,
  pendingResultBatch: null,
  activeTooltipLayer: null,
  isLegendModalOpen: false,
  resultCompanies: [],
  renderedResultCount: 0
};

const elements = {
  searchInput: document.getElementById("searchInput"),
  companyTypeFilter: document.getElementById("companyTypeFilter"),
  countryFilter: document.getElementById("countryFilter"),
  salesPriorityFilter: document.getElementById("salesPriorityFilter"),
  topTargetFilter: document.getElementById("topTargetFilter"),
  resetFiltersButton: document.getElementById("resetFiltersButton"),
  fitBoundsButton: document.getElementById("fitBoundsButton"),
  layerButtons: Array.from(document.querySelectorAll("[data-layer]")),
  layerSwitchWrap: document.getElementById("layerSwitchWrap"),
  layerTooltip: document.getElementById("layerTooltip"),
  infoButton: document.getElementById("infoButton"),
  legendModal: document.getElementById("legendModal"),
  legendCloseButton: document.getElementById("legendCloseButton"),
  legendCloseTriggers: Array.from(document.querySelectorAll("[data-legend-close]")),
  resultsList: document.getElementById("resultsList"),
  resultCount: document.getElementById("resultCount"),
  resultMeta: document.getElementById("resultMeta"),
  statFiltered: document.getElementById("statFiltered"),
  statManufacturers: document.getElementById("statManufacturers"),
  statOfenbauer: document.getElementById("statOfenbauer"),
  badgeLayerName: document.getElementById("badgeLayerName")
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  initMap();
  bindEvents();
  await loadLayer("top", { fitToBounds: true });
}

function initMap() {
  state.map = L.map("map", {
    zoomControl: false,
    minZoom: 4,
    maxZoom: 18,
    preferCanvas: true
  }).setView(DEFAULT_VIEW.center, DEFAULT_VIEW.zoom);

  L.control.zoom({ position: "bottomright" }).addTo(state.map);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(state.map);

  state.clusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true,
    zoomToBoundsOnClick: true,
    chunkedLoading: true,
    iconCreateFunction(cluster) {
      return L.divIcon({
        html: `<div class="cluster-badge">${cluster.getChildCount()}</div>`,
        className: "cluster-icon",
        iconSize: [46, 46]
      });
    }
  });

  state.map.addLayer(state.clusterGroup);
}

function bindEvents() {
  const controls = [
    elements.searchInput,
    elements.companyTypeFilter,
    elements.countryFilter,
    elements.salesPriorityFilter,
    elements.topTargetFilter
  ];

  controls.forEach((control) => {
    const eventName = control.tagName === "INPUT" ? "input" : "change";
    control.addEventListener(eventName, () => applyFilters());
  });

  elements.resetFiltersButton.addEventListener("click", () => resetFilters({ keepLayer: true }));
  elements.fitBoundsButton.addEventListener("click", () => fitToCurrentMarkers());
  elements.resultsList?.addEventListener("click", handleResultsListClick);
  elements.resultsList?.addEventListener("scroll", handleResultsListScroll);

  elements.infoButton?.addEventListener("click", () => {
    if (state.isLegendModalOpen) {
      closeLegendModal();
      return;
    }
    openLegendModal();
  });

  elements.legendCloseButton?.addEventListener("click", () => closeLegendModal());
  elements.legendCloseTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => closeLegendModal());
  });

  elements.layerButtons.forEach((button) => {
    button.setAttribute("aria-describedby", "layerTooltip");

    button.addEventListener("pointerenter", () => {
      if (!usesTapTooltipMode()) {
        showLayerTooltip(button);
      }
    });

    button.addEventListener("focus", () => showLayerTooltip(button));

    button.addEventListener("click", async () => {
      if (usesTapTooltipMode()) {
        showLayerTooltip(button);
      }

      const nextLayer = button.dataset.layer;
      if (nextLayer && nextLayer !== state.activeLayer) {
        await loadLayer(nextLayer, { fitToBounds: true });
      }
    });
  });

  elements.layerSwitchWrap?.addEventListener("pointerleave", () => {
    if (!usesTapTooltipMode()) {
      hideLayerTooltip();
    }
  });

  elements.layerSwitchWrap?.addEventListener("focusout", () => {
    if (usesTapTooltipMode()) {
      return;
    }

    requestAnimationFrame(() => {
      if (!elements.layerSwitchWrap?.contains(document.activeElement)) {
        hideLayerTooltip();
      }
    });
  });

  document.addEventListener("click", handleDocumentClickForTooltip);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideLayerTooltip();
      closeLegendModal();
    }
  });

  window.addEventListener("resize", () => {
    if (!state.activeTooltipLayer) {
      return;
    }

    const activeButton = elements.layerButtons.find(
      (button) => button.dataset.layer === state.activeTooltipLayer
    );

    if (!activeButton) {
      hideLayerTooltip();
      return;
    }

    if (usesTapTooltipMode()) {
      showLayerTooltip(activeButton);
      return;
    }

    hideLayerTooltip();
  });
}

async function loadLayer(layerKey, { fitToBounds = false } = {}) {
  const layer = LAYERS[layerKey];
  if (!layer) {
    return;
  }

  updateLayerUi(layerKey, true);
  elements.resultMeta.textContent = "Layer wird geladen ...";

  try {
    if (!state.datasets.has(layerKey)) {
      const response = await fetch(layer.url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const rawData = await response.json();
      state.datasets.set(
        layerKey,
        rawData.map((item, index) => enrichCompany(item, index, layerKey))
      );
    }

    state.activeLayer = layerKey;
    state.companies = state.datasets.get(layerKey) || [];
    resetFilters({ keepLayer: true, apply: false });
    populateCountryFilter(state.companies);
    updateLayerUi(layerKey, false);
    applyFilters({ fitToBounds, debugSource: `layer:${layerKey}` });
  } catch (error) {
    console.error("Fehler beim Laden des Layers:", error);
    updateLayerUi(layerKey, false);
    elements.resultCount.textContent = "Datenfehler";
    elements.resultMeta.textContent = "Die Layer-Datei konnte nicht geladen werden.";
    elements.resultsList.innerHTML = renderEmptyState(
      "Bitte prüfe, ob die JSON-Datei für den gewählten Layer im data-Ordner vorhanden ist."
    );
  }
}

function updateLayerUi(layerKey, isLoading) {
  const layer = LAYERS[layerKey];
  if (!layer) {
    return;
  }

  elements.layerButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layer === layerKey);
    button.disabled = isLoading;
  });

  elements.badgeLayerName.textContent = layer.label;
}

function openLegendModal() {
  if (!elements.legendModal) {
    return;
  }

  hideLayerTooltip();
  state.isLegendModalOpen = true;
  elements.legendModal.hidden = false;
  document.body.classList.add("has-modal-open");
  elements.infoButton?.setAttribute("aria-expanded", "true");
}

function closeLegendModal() {
  if (!elements.legendModal || !state.isLegendModalOpen) {
    return;
  }

  state.isLegendModalOpen = false;
  elements.legendModal.hidden = true;
  document.body.classList.remove("has-modal-open");
  elements.infoButton?.setAttribute("aria-expanded", "false");
}


function resetFilters({ keepLayer = true, apply = true } = {}) {
  elements.searchInput.value = "";
  elements.companyTypeFilter.value = "";
  elements.countryFilter.value = "";
  elements.salesPriorityFilter.value = "";
  elements.topTargetFilter.value = "";

  if (keepLayer) {
    populateCountryFilter(state.companies);
  }

  if (apply) {
    applyFilters({ fitToBounds: true, debugSource: "reset" });
  }
}

function populateCountryFilter(companies) {
  const selected = elements.countryFilter.value;
  const countries = [...new Set(companies.map((company) => company.country).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "de"));

  elements.countryFilter.innerHTML = '<option value="">Alle Länder</option>';
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    elements.countryFilter.appendChild(option);
  });

  if (countries.includes(selected)) {
    elements.countryFilter.value = selected;
  }
}

function repairText(value) {
  if (typeof value !== "string") {
    return value;
  }

  let text = value.trim();
  if (!text) {
    return text;
  }

  if (/[ÃƒÆ’Ãƒâ€šÃƒÂ¢Ã¢â€šÂ¬Ã¯Â¿Â½Ã¢â€šÂ¬Ã¢â€žÂ¢Ã…â€œÃ¯Â¿Â½]/.test(text)) {
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const fixed = decodeURIComponent(escape(text));
        if (fixed && fixed !== text) {
          text = fixed;
          continue;
        }
      } catch {}
      break;
    }
  }

  return text;
}

function enrichCompany(item, index, layerKey) {
  const normalizedItem = Object.fromEntries(
    Object.entries(item).map(([key, value]) => [
      key,
      typeof value === "string" ? repairText(value) : value
    ])
  );

  const lat = parseCoordinate(normalizedItem.lat);
  const lng = parseCoordinate(normalizedItem.lng);
  const hasCoordinates = hasValidMapCoordinates(lat, lng);

  const salesPriority = normalizedItem.sales_priority_final || "";
  const relevance = normalizedItem.ofenbauer_relevance || "";
  const type = normalizedItem.company_type || "";

  const priorityRank = { A: 0, B: 1, C: 2 };
  const relevanceRank = { high: 0, medium: 1, low: 2 };

  const searchBlob = [
    normalizedItem.name,
    normalizedItem.city,
    normalizedItem.country,
    normalizedItem.product_categories,
    normalizedItem.description,
    normalizedItem.priority_reason
  ].filter(Boolean).join(" ");

  return {
    ...normalizedItem,
    lat: hasCoordinates ? lat : null,
    lng: hasCoordinates ? lng : null,
    is_top_target: Boolean(normalizedItem.is_top_target),
    _id: `${layerKey}-${index + 1}`,
    _hasCoordinates: hasCoordinates,
    _typeRank: type === "manufacturer" ? 0 : 1,
    _priorityRank: priorityRank[salesPriority] ?? 9,
    _relevanceRank: relevanceRank[relevance] ?? 9,
    _searchBlob: normalizeText(searchBlob)
  };
}

function applyFilters({ fitToBounds = false } = {}) {
  const searchTerm = normalizeText(elements.searchInput.value.trim());
  const selectedType = elements.companyTypeFilter.value;
  const selectedCountry = elements.countryFilter.value;
  const selectedSalesPriority = elements.salesPriorityFilter.value;
  const selectedTopTarget = elements.topTargetFilter.value;

  state.filteredCompanies = state.companies
    .filter((company) => {
      if (selectedType && company.company_type !== selectedType) {
        return false;
      }
      if (selectedCountry && company.country !== selectedCountry) {
        return false;
      }
      if (selectedSalesPriority && company.sales_priority_final !== selectedSalesPriority) {
        return false;
      }
      if (selectedTopTarget && String(company.is_top_target) !== selectedTopTarget) {
        return false;
      }
      if (searchTerm && !company._searchBlob.includes(searchTerm)) {
        return false;
      }
      return true;
    })
    .sort((left, right) => {
      if (left._typeRank !== right._typeRank) {
        return left._typeRank - right._typeRank;
      }
      if (left._typeRank === 0 && left._priorityRank !== right._priorityRank) {
        return left._priorityRank - right._priorityRank;
      }
      if (left._typeRank === 1 && left._relevanceRank !== right._relevanceRank) {
        return left._relevanceRank - right._relevanceRank;
      }
      return left.name.localeCompare(right.name, "de");
    });

  const companiesOnMap = state.filteredCompanies.filter(
    (company) => hasValidMapCoordinates(company.lat, company.lng)
  );
  renderMarkers(companiesOnMap);
  renderResults(companiesOnMap);
  renderStats(companiesOnMap);

  if (fitToBounds) {
    queueFitToMarkers(companiesOnMap);
  }

  console.debug(`[${state.activeLayer}] valide Marker: ${companiesOnMap.length}`);
}

function renderMarkers(companies) {
  state.markerIndex.clear();
  state.clusterGroup.clearLayers();

  companies.forEach((company) => {
    const marker = L.marker([company.lat, company.lng], {
      icon: createMarkerIcon(company)
    });

    marker.bindPopup(createPopupMarkup(company), {
      maxWidth: 360
    });

    state.markerIndex.set(company._id, marker);
    state.clusterGroup.addLayer(marker);
  });
}

function renderResults(companies) {
  elements.resultCount.textContent = `${state.filteredCompanies.length} Treffer`;
  elements.resultMeta.textContent = `${companies.length} Firmen in der Kartenansicht. Klick auf eine Firma fokussiert direkt den Marker.`;

  if (state.pendingResultBatch !== null) {
    cancelAnimationFrame(state.pendingResultBatch);
    state.pendingResultBatch = null;
  }

  if (companies.length === 0) {
    state.resultCompanies = [];
    state.renderedResultCount = 0;
    elements.resultsList.innerHTML = renderEmptyState(
      "Keine Karten-Treffer für die aktuelle Kombination aus Layer, Filtern und Suche."
    );
    return;
  }

  state.resultCompanies = companies;
  state.renderedResultCount = 0;
  elements.resultsList.innerHTML = "";
  elements.resultsList.scrollTop = 0;
  appendNextResultBatch();
}

function renderResultCard(company) {
    const mapsLink = buildGoogleMapsLink(company);
    const websiteLabel = company.website ? "Website" : "Website fehlt";
    const websiteMarkup = company.website
      ? `<a class="company-card__link" href="${escapeAttribute(company.website)}" target="_blank" rel="noreferrer">${websiteLabel}</a>`
      : `<span class="company-card__link company-card__link--muted">${websiteLabel}</span>`;

  return `
    <article class="company-card ${getCompanyCardClass(company)}">
      <button class="company-card__button" type="button" data-company-id="${company._id}">
        <div class="company-card__header">
          <div class="company-card__identity">
            <p class="company-card__name">${escapeHtml(company.name)}</p>
            <div class="company-card__meta">${escapeHtml(formatLocation(company))}</div>
            ${getAddressLabel(company) ? `<div class="company-card__address">${escapeHtml(getAddressLabel(company))}</div>` : ""}
          </div>
        </div>
        <div class="detail-list detail-list--card">
          ${buildCompanyDetailBlocks(company)}
        </div>
      </button>
      <div class="company-card__footer">
        ${websiteMarkup}
        ${company.email ? `<a class="company-card__link" href="mailto:${escapeAttribute(company.email)}">${escapeHtml(company.email)}</a>` : ""}
        ${company.phone ? `<a class="company-card__link" href="tel:${escapeAttribute(company.phone)}">${escapeHtml(company.phone)}</a>` : ""}
        ${mapsLink ? `<a class="company-card__link" href="${escapeAttribute(mapsLink)}" target="_blank" rel="noreferrer">Google Maps</a>` : ""}
      </div>
    </article>
  `;
}

function appendNextResultBatch() {
  if (!elements.resultsList || state.renderedResultCount >= state.resultCompanies.length) {
    return;
  }

  const start = state.renderedResultCount;
  const end = Math.min(start + RESULT_BATCH_SIZE, state.resultCompanies.length);
  const markup = state.resultCompanies.slice(start, end).map(renderResultCard).join("");
  const template = document.createElement("template");
  template.innerHTML = markup;
  elements.resultsList.appendChild(template.content);
  state.renderedResultCount = end;

  if (
    state.renderedResultCount < state.resultCompanies.length &&
    elements.resultsList.scrollHeight <= elements.resultsList.clientHeight + 80
  ) {
    queueNextResultBatch();
  }
}

function queueNextResultBatch() {
  if (state.pendingResultBatch !== null || state.renderedResultCount >= state.resultCompanies.length) {
    return;
  }

  state.pendingResultBatch = requestAnimationFrame(() => {
    state.pendingResultBatch = null;
    appendNextResultBatch();
  });
}

function handleResultsListScroll(event) {
  const list = event.currentTarget;
  if (!(list instanceof HTMLElement)) {
    return;
  }

  if (list.scrollTop + list.clientHeight >= list.scrollHeight - RESULT_SCROLL_THRESHOLD) {
    queueNextResultBatch();
  }
}

function handleResultsListClick(event) {
  const trigger = event.target?.closest?.("[data-company-id]");
  if (!trigger) {
    return;
  }

  focusCompany(trigger.dataset.companyId);
}

function renderStats(companiesOnMap) {
  const manufacturers = state.filteredCompanies.filter((company) => company.company_type === "manufacturer").length;
  const ofenbauer = state.filteredCompanies.filter((company) => company.company_type === "ofenbauer").length;
  const layer = LAYERS[state.activeLayer];

  elements.statFiltered.textContent = String(state.filteredCompanies.length);
  elements.statManufacturers.textContent = String(manufacturers);
  elements.statOfenbauer.textContent = String(ofenbauer);
  elements.badgeLayerName.textContent = layer.label;
}

function usesTapTooltipMode() {
  return window.matchMedia("(hover: none), (pointer: coarse)").matches;
}

function showLayerTooltip(button) {
  const layerKey = button?.dataset?.layer;
  const layer = LAYERS[layerKey];
  const tooltip = elements.layerTooltip;
  const wrapper = elements.layerSwitchWrap;

  if (!layer || !tooltip || !wrapper) {
    return;
  }

  tooltip.textContent = layer.tooltip;
  tooltip.classList.add("is-visible");
  tooltip.setAttribute("aria-hidden", "false");
  state.activeTooltipLayer = layerKey;

  elements.layerButtons.forEach((layerButton) => {
    layerButton.toggleAttribute("data-tooltip-active", layerButton === button);
  });

  positionLayerTooltip(button, tooltip, wrapper);
}

function positionLayerTooltip(button, tooltip, wrapper) {
  const buttonLeft = button.offsetLeft;
  const buttonTop = button.offsetTop;
  const buttonWidth = button.offsetWidth;
  const tooltipWidth = tooltip.offsetWidth;
  const wrapperWidth = wrapper.clientWidth;
  const horizontalPadding = 8;

  let left = buttonLeft + buttonWidth / 2 - tooltipWidth / 2;
  left = Math.max(horizontalPadding, left);
  left = Math.min(left, Math.max(horizontalPadding, wrapperWidth - tooltipWidth - horizontalPadding));

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${buttonTop + button.offsetHeight + 10}px`;
}

function hideLayerTooltip() {
  const tooltip = elements.layerTooltip;
  if (!tooltip) {
    return;
  }

  tooltip.classList.remove("is-visible");
  tooltip.setAttribute("aria-hidden", "true");
  tooltip.style.left = "";
  tooltip.style.top = "";
  state.activeTooltipLayer = null;

  elements.layerButtons.forEach((button) => {
    button.removeAttribute("data-tooltip-active");
  });
}

function handleDocumentClickForTooltip(event) {
  if (!usesTapTooltipMode()) {
    return;
  }

  if (elements.layerSwitchWrap?.contains(event.target)) {
    return;
  }

  hideLayerTooltip();
}


function fitToCurrentMarkers() {
  const companies = state.filteredCompanies.filter((company) => hasValidMapCoordinates(company.lat, company.lng));
  fitMapToCompanies(companies);
}

function queueFitToMarkers(companies) {
  if (state.pendingFitFrame !== null) {
    cancelAnimationFrame(state.pendingFitFrame);
  }

  const markerSnapshot = companies
    .filter((company) => hasValidMapCoordinates(company.lat, company.lng))
    .map((company) => ({ lat: company.lat, lng: company.lng }));

  state.pendingFitFrame = requestAnimationFrame(() => {
    state.pendingFitFrame = null;
    state.map.invalidateSize();
    fitMapToCompanies(markerSnapshot);
  });
}

function fitMapToCompanies(companies) {
  const validPoints = companies
    .filter((company) => hasValidMapCoordinates(company.lat, company.lng))
    .map((company) => [company.lat, company.lng]);

  if (validPoints.length === 0) {
    state.map.setView(GERMANY_FALLBACK_VIEW.center, GERMANY_FALLBACK_VIEW.zoom);
    return;
  }

  if (validPoints.length === 1) {
    state.map.setView(validPoints[0], 10);
    return;
  }

  const bounds = L.latLngBounds(validPoints);
  state.map.fitBounds(bounds, { padding: [50, 50] });
}

function focusCompany(companyId) {
  const marker = state.markerIndex.get(companyId);
  if (!marker) {
    return;
  }

  state.map.setView(marker.getLatLng(), Math.max(state.map.getZoom(), 10), {
    animate: true
  });

  setTimeout(() => marker.openPopup(), 180);
}

function createMarkerIcon(company) {
  const markerPresentation = resolveMarkerPresentation(company);
  const sizeKey = normalizeText(markerPresentation.size).replace(/ß/g, "ss");
  const sizeMap = {
    gross: { css: "gross", pixels: 28 },
    mittel: { css: "mittel", pixels: 22 },
    klein: { css: "klein", pixels: 16 }
  };

  const markerSize = sizeMap[sizeKey] ?? sizeMap.mittel;
  const opacity = Number(markerPresentation.opacity) || 1;

  return L.divIcon({
    className: "sales-marker-wrapper",
    html: `<span class="sales-marker sales-marker--${escapeAttribute(markerPresentation.color)} sales-marker--${markerSize.css}" style="opacity:${opacity}"></span>`,
    iconSize: [markerSize.pixels, markerSize.pixels],
    iconAnchor: [markerSize.pixels / 2, markerSize.pixels / 2],
    popupAnchor: [0, -markerSize.pixels / 2]
  });
}

function resolveMarkerPresentation(company) {
  const color = normalizeText(company.marker_color);
  const size = normalizeText(company.marker_size).replace(/ß/g, "ss");
  const opacity = company.marker_opacity;

  const hasExplicitMarker =
    Boolean(color) &&
    Boolean(size) &&
    opacity !== undefined &&
    opacity !== null &&
    opacity !== "";

  if (hasExplicitMarker) {
    return {
      color: company.marker_color,
      size: company.marker_size,
      opacity: company.marker_opacity
    };
  }

  if (company.company_type === "ofenbauer") {
    const relevance = normalizeText(company.ofenbauer_relevance);
    if (relevance === "high") {
      return { color: "blau", size: "mittel", opacity: 0.88 };
    }
    if (relevance === "medium") {
      return { color: "hellblau", size: "klein", opacity: 0.72 };
    }
    if (relevance === "low") {
      return { color: "hellgrau", size: "klein", opacity: 0.42 };
    }
  }

  if (company.company_type === "manufacturer") {
    const priority = normalizeText(company.sales_priority_final);
    if (priority === "a") {
      return { color: "rot", size: "gross", opacity: 1 };
    }
    if (priority === "b") {
      return { color: "orange", size: "mittel", opacity: 0.85 };
    }
    return { color: "grau", size: "klein", opacity: 0.55 };
  }

  return {
    color: company.marker_color || "grau",
    size: company.marker_size || "klein",
    opacity: company.marker_opacity || 0.55
  };
}

function createPopupMarkup(company) {
  const websiteLink = company.website
    ? `<a class="popup-card__link" href="${escapeAttribute(company.website)}" target="_blank" rel="noreferrer">Website öffnen</a>`
    : `<span class="popup-card__meta">Website nicht hinterlegt</span>`;
  const emailLink = company.email
    ? `<a class="popup-card__link" href="mailto:${escapeAttribute(company.email)}">${escapeHtml(company.email)}</a>`
    : `<span class="popup-card__meta">Keine E-Mail hinterlegt</span>`;
  const phoneLink = company.phone
    ? `<a class="popup-card__link" href="tel:${escapeAttribute(company.phone)}">${escapeHtml(company.phone)}</a>`
    : `<span class="popup-card__meta">Keine Telefonnummer hinterlegt</span>`;
  const mapsLink = buildGoogleMapsLink(company);
  const mapsAction = mapsLink
    ? `<a class="popup-card__link" href="${escapeAttribute(mapsLink)}" target="_blank" rel="noreferrer">Adresse in Google Maps</a>`
    : "";

  return `
    <article class="popup-card">
      <p class="popup-card__eyebrow">${escapeHtml(formatTypeLabel(company.company_type))}</p>
      <h3>${escapeHtml(company.name)}</h3>
      <p class="popup-card__meta">${escapeHtml(formatLocation(company))}</p>

      <div class="popup-card__section detail-list">
        ${buildPopupDetailBlocks(company)}
      </div>

      <div class="popup-card__contacts">
        ${websiteLink}
        ${emailLink}
        ${phoneLink}
        ${mapsAction}
      </div>
    </article>
  `;
}

function renderPopupRow(label, value) {
  return `
    <div class="detail-item">
      <span class="detail-item__label">${escapeHtml(label)}</span>
      <strong class="detail-item__value">${escapeHtml(value)}</strong>
    </div>
  `;
}

function buildCompanyDetailBlocks(company) {
  const rows = [];

  rows.push(renderDetailIfValue("Typ", formatTypeLabel(company.company_type)));
  rows.push(renderDetailIfValue("Produktkategorien", company.product_categories));
  rows.push(renderDetailIfValue("Prioritätsgrund", company.priority_reason));
  rows.push(renderDetailIfValue("Vertriebsansatz", company.strategy));

  return rows.filter(Boolean).join("");
}

function buildPopupDetailBlocks(company) {
  const rows = [];

  rows.push(renderDetailIfValue("Adresse", getAddressLabel(company)));
  rows.push(renderDetailIfValue("Produktkategorien", company.product_categories));
  rows.push(renderDetailIfValue("Prioritätsgrund", company.priority_reason));
  rows.push(renderDetailIfValue("Vertriebsansatz", company.strategy));

  return rows.filter(Boolean).join("");
}

function renderDetailIfValue(label, value) {
  if (!value) {
    return "";
  }
  return renderPopupRow(label, value);
}

function getCompanyCardClass(company) {
  const classes = [];

  if (company.is_top_target) {
    classes.push("company-card--top");
  }

  const isLowerPriorityManufacturer =
    company.company_type === "manufacturer" && company.sales_priority_final === "C";
  const isLowerPriorityOfenbauer =
    company.company_type === "ofenbauer" && company.ofenbauer_relevance === "low";

  if (!company.is_top_target && (isLowerPriorityManufacturer || isLowerPriorityOfenbauer)) {
    classes.push("company-card--muted");
  }

  return classes.join(" ");
}

function formatTypeLabel(type) {
  return type === "manufacturer" ? "Hersteller" : type === "ofenbauer" ? "Ofenbauer" : "Unklar";
}

function formatLocation(company) {
  const city = company.city || "Ort offen";
  const country = formatCountryShort(company.country);
  return country ? `${city}, ${country}` : city;
}

function getAddressLabel(company) {
  if (company.address) {
    return company.address;
  }
  const fallback = [company.city, company.country].filter(Boolean).join(", ");
  return fallback || "";
}

function buildGoogleMapsLink(company) {
  const query = getAddressLabel(company);
  if (!query) {
    return "";
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function formatCountryShort(country) {
  const normalized = normalizeText(country);
  if (normalized === "deutschland") {
    return "DE";
  }
  if (normalized === "osterreich") {
    return "AT";
  }
  if (normalized === "schweiz") {
    return "CH";
  }
  return country || "";
}

function parseCoordinate(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "string") {
    const normalized = value.trim().replace(",", ".");
    if (!normalized || normalized.toLowerCase() === "null") {
      return null;
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return Number.isFinite(value) ? value : null;
}

function hasValidMapCoordinates(lat, lng) {
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return false;
  }

  if (lat === 0 || lng === 0) {
    return false;
  }

  return (
    lat >= DACH_COORD_BOUNDS.minLat &&
    lat <= DACH_COORD_BOUNDS.maxLat &&
    lng >= DACH_COORD_BOUNDS.minLng &&
    lng <= DACH_COORD_BOUNDS.maxLng
  );
}

function renderEmptyState(message) {
  return `<div class="empty-state">${escapeHtml(message)}</div>`;
}

function normalizeText(value) {
  return (value || "")
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/ÃŸ/g, "ss")
    .toLowerCase()
    .trim();
}

function escapeHtml(value) {
  return (value || "")
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "");
}
