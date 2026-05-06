const DATA_URL = "../data/skamowall_de_north_reviewed.json";

const state = {
  allLeads: [],
  filteredLeads: [],
  markers: [],
  map: null
};

const els = {
  statTotal: document.getElementById("statTotal"),
  statInteresting: document.getElementById("statInteresting"),
  statInstallers: document.getElementById("statInstallers"),
  statFitA: document.getElementById("statFitA"),
  resultHeadline: document.getElementById("resultHeadline"),
  resultMeta: document.getElementById("resultMeta"),
  resultsList: document.getElementById("resultsList"),
  searchInput: document.getElementById("searchInput"),
  reviewFilter: document.getElementById("reviewFilter"),
  fitFilter: document.getElementById("fitFilter"),
  groupFilter: document.getElementById("groupFilter"),
  areaFilter: document.getElementById("areaFilter"),
  interestingOnly: document.getElementById("interestingOnly"),
  resetFiltersButton: document.getElementById("resetFiltersButton"),
  showAllButton: document.getElementById("showAllButton"),
  fitBoundsButton: document.getElementById("fitBoundsButton")
};

function iconSizeFor(lead) {
  if (lead.skamolFit === "A" && lead.reviewKey === "interesting") {
    return 22;
  }
  if (lead.skamolFit === "A") {
    return 19;
  }
  return 17;
}

function baseColorFor(group) {
  if (group === "installer") {
    return "#d06c3f";
  }
  if (group === "housing") {
    return "#2e8f6d";
  }
  return "#3e6eb4";
}

function markerHtml(lead) {
  const size = iconSizeFor(lead);
  const color = baseColorFor(lead.group);
  const ring = lead.reviewKey === "interesting" ? "#0d9b78" : "#e6d3bd";

  return `
    <div
      style="
        width:${size}px;
        height:${size}px;
        border-radius:999px;
        background:${color};
        border:3px solid ${ring};
        box-shadow:0 10px 22px rgba(24, 34, 46, 0.18);
      "
    ></div>
  `;
}

function popupHtml(lead) {
  const phoneLine = lead.phone ? `<strong>Telefon:</strong> ${lead.phone}<br>` : "";
  const emailLine = lead.email ? `<strong>E-Mail:</strong> <a href="mailto:${lead.email}">${lead.email}</a><br>` : "";
  const address = [lead.street, lead.postcode, lead.city].filter(Boolean).join(", ");

  return `
    <article class="popup">
      <h3>#${lead.priorityRank} ${lead.organization}</h3>
      <div class="popup__subline">${lead.category}</div>
      <div class="badge-row">
        <span class="badge badge--${lead.reviewKey}">${lead.reviewLabel}</span>
        <span class="badge badge--fit">Skamol fit ${lead.skamolFit}</span>
      </div>
      <div class="popup__copy"><strong>Review:</strong> ${lead.reviewReason}</div>
      <div class="popup__copy"><strong>Warum aufgenommen:</strong> ${lead.whyIncluded}</div>
      <div class="popup__copy"><strong>Leistung:</strong> ${lead.whatTheyDo}</div>
      <div class="popup__meta">
        <strong>Region:</strong> ${lead.region}<br>
        <strong>Adresse:</strong> ${address || lead.city}<br>
        ${emailLine}
        ${phoneLine}
        <strong>Website:</strong> <a href="${lead.website}" target="_blank" rel="noreferrer">Website oeffnen</a><br>
        <strong>Maps:</strong> <a href="${lead.googleMapsUrl}" target="_blank" rel="noreferrer">Google Maps</a>
      </div>
    </article>
  `;
}

function sortLeads(leads) {
  return [...leads].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return a.priorityRank - b.priorityRank;
  });
}

function collectSearchText(lead) {
  return [
    lead.organization,
    lead.region,
    lead.city,
    lead.areaGroup,
    lead.category,
    lead.reviewReason,
    lead.whatTheyDo,
    lead.whyIncluded
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function populateAreaFilter(leads) {
  const areas = [...new Set(leads.map((lead) => lead.areaGroup).filter(Boolean))].sort();
  els.areaFilter.innerHTML = '<option value="">Alle</option>';
  for (const area of areas) {
    const option = document.createElement("option");
    option.value = area;
    option.textContent = area;
    els.areaFilter.appendChild(option);
  }
}

function getFilteredLeads() {
  const search = els.searchInput.value.trim().toLowerCase();
  const review = els.reviewFilter.value;
  const fit = els.fitFilter.value;
  const group = els.groupFilter.value;
  const area = els.areaFilter.value;
  const interestingOnly = els.interestingOnly.checked;

  return sortLeads(
    state.allLeads.filter((lead) => {
      if (review && lead.reviewKey !== review) {
        return false;
      }
      if (fit && lead.skamolFit !== fit) {
        return false;
      }
      if (group && lead.group !== group) {
        return false;
      }
      if (area && lead.areaGroup !== area) {
        return false;
      }
      if (interestingOnly && lead.reviewKey !== "interesting") {
        return false;
      }
      if (search && !collectSearchText(lead).includes(search)) {
        return false;
      }
      return true;
    })
  );
}

function renderStats(leads) {
  els.statTotal.textContent = String(leads.length);
  els.statInteresting.textContent = String(leads.filter((lead) => lead.reviewKey === "interesting").length);
  els.statInstallers.textContent = String(leads.filter((lead) => lead.group === "installer").length);
  els.statFitA.textContent = String(leads.filter((lead) => lead.skamolFit === "A").length);
}

function renderResults(leads) {
  els.resultsList.innerHTML = "";

  if (!leads.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Keine Leads fuer diese Filterkombination gefunden.";
    els.resultsList.appendChild(empty);
    return;
  }

  for (const lead of leads) {
    const card = document.createElement("article");
    card.className = "result-card";
    card.innerHTML = `
      <h3>#${lead.priorityRank} ${lead.organization}</h3>
      <div class="badge-row">
        <span class="badge badge--${lead.reviewKey}">${lead.reviewLabel}</span>
        <span class="badge badge--fit">Fit ${lead.skamolFit}</span>
        <span class="badge badge--group">${lead.city || lead.region}</span>
      </div>
      <p>${lead.reviewReason}</p>
      <div class="result-card__meta">
        <strong>Typ:</strong> ${lead.category}<br>
        <strong>Cluster:</strong> ${lead.areaGroup || lead.region}<br>
        <strong>Website:</strong> <a href="${lead.website}" target="_blank" rel="noreferrer">oeffnen</a>
      </div>
    `;
    card.addEventListener("click", () => focusLead(lead.organization));
    els.resultsList.appendChild(card);
  }
}

function refreshMarkers(leads) {
  const visible = new Set(leads.map((lead) => lead.organization));

  for (const entry of state.markers) {
    if (visible.has(entry.lead.organization)) {
      if (!state.map.hasLayer(entry.marker)) {
        entry.marker.addTo(state.map);
      }
    } else if (state.map.hasLayer(entry.marker)) {
      state.map.removeLayer(entry.marker);
    }
  }
}

function fitToLeads(leads) {
  if (!leads.length) {
    return;
  }
  const bounds = L.latLngBounds(leads.map((lead) => [lead.lat, lead.lng]));
  state.map.fitBounds(bounds.pad(0.18));
}

function updateView() {
  const filtered = getFilteredLeads();
  state.filteredLeads = filtered;

  renderStats(filtered);
  renderResults(filtered);
  refreshMarkers(filtered);

  const interesting = filtered.filter((lead) => lead.reviewKey === "interesting").length;
  els.resultHeadline.textContent = `${filtered.length} Leads`;
  els.resultMeta.textContent = `${interesting} interessant / ${filtered.length - interesting} eher uninteressant`;
}

function focusLead(organization) {
  const target = state.markers.find((entry) => entry.lead.organization === organization);
  if (!target) {
    return;
  }
  state.map.setView([target.lead.lat, target.lead.lng], 10);
  target.marker.openPopup();
}

function resetFilters() {
  els.searchInput.value = "";
  els.reviewFilter.value = "";
  els.fitFilter.value = "";
  els.groupFilter.value = "";
  els.areaFilter.value = "";
  els.interestingOnly.checked = false;
  updateView();
  fitToLeads(state.allLeads);
}

function showAllLeads() {
  els.interestingOnly.checked = false;
  els.reviewFilter.value = "";
  updateView();
  fitToLeads(state.allLeads);
}

function bindEvents() {
  [
    els.searchInput,
    els.reviewFilter,
    els.fitFilter,
    els.groupFilter,
    els.areaFilter,
    els.interestingOnly
  ].forEach((element) => {
    element.addEventListener("input", updateView);
    element.addEventListener("change", updateView);
  });

  els.resetFiltersButton.addEventListener("click", resetFilters);
  els.showAllButton.addEventListener("click", showAllLeads);
  els.fitBoundsButton.addEventListener("click", () => fitToLeads(state.filteredLeads));
}

function createMap(leads) {
  state.map = L.map("map", { zoomControl: true, scrollWheelZoom: true }).setView([53.4, 10.2], 6.3);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(state.map);

  state.markers = leads.map((lead) => {
    const marker = L.marker([lead.lat, lead.lng], {
      icon: L.divIcon({
        className: "",
        html: markerHtml(lead),
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    });
    marker.bindPopup(popupHtml(lead));
    marker.addTo(state.map);
    return { lead, marker };
  });
}

async function init() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = await response.json();
    state.allLeads = sortLeads(payload.leads);

    populateAreaFilter(state.allLeads);
    createMap(state.allLeads);
    bindEvents();
    updateView();
    fitToLeads(state.allLeads);
  } catch (error) {
    els.resultHeadline.textContent = "Daten konnten nicht geladen werden";
    els.resultMeta.textContent = String(error.message || error);
    els.resultsList.innerHTML = '<div class="empty-state">Die JSON-Daten fuer die Nord-Map konnten nicht geladen werden.</div>';
  }
}

init();
