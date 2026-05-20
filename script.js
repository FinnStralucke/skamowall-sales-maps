// ── Translations ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  de: {
    "page.title":              "DACH Ofenmarkt Sales Map",
    "topbar.layer":            "Layer:",
    "topbar.companies":        "Firmen",
    "topbar.manufacturers":    "Hersteller",
    "topbar.ofenbauer":        "Ofenbauer",
    "topbar.info.aria":        "Info öffnen",
    "filter.title":            "Filter",
    "filter.layer":            "Layer",
    "filter.type":             "Typ",
    "filter.country":          "Land",
    "filter.priority":         "Priorität",
    "filter.toptarget":        "Top Target",
    "filter.search":           "Suche",
    "filter.search.placeholder":"z. B. Spartherm, Hamburg, Kamineinsätze",
    "filter.all":              "Alle",
    "filter.allcountries":     "Alle Länder",
    "filter.yes":              "Ja",
    "filter.no":               "Nein",
    "btn.fitbounds":           "Treffer auf Karte",
    "btn.reset":               "Filter zurücksetzen",
    "results.kicker":          "Treffer",
    "results.title":           "Trefferliste",
    "results.loading":         "Lade Daten …",
    "results.layerloading":    "Layer wird geladen ...",
    "results.error.count":     "Datenfehler",
    "results.error.msg":       "Die Layer-Datei konnte nicht geladen werden.",
    "results.error.hint":      "Bitte prüfe, ob die JSON-Datei für den gewählten Layer im data-Ordner vorhanden ist.",
    "results.empty":           "Keine Karten-Treffer für die aktuelle Kombination aus Layer, Filtern und Suche.",
    "results.none":            "Keine Firmen in der Trefferliste.",
    "layer.top":               "Top Targets",
    "layer.top.tooltip":       "Finale A-Priorität: Hersteller plus wenige Ofenbauer mit hohem Business Impact und hohem Fit.",
    "layer.filtered":          "Relevante Betriebe",
    "layer.filtered.tooltip":  "Alle Firmen mit finaler Priorität A oder B für die laufende Vertriebsbearbeitung.",
    "layer.full":              "Full Market",
    "layer.full.tooltip":      "Vollständige finale DACH-Marktabdeckung mit 857 Firmen für Markt- und Regionsanalysen.",
    "type.manufacturer":       "Hersteller",
    "type.ofenbauer":          "Ofenbauer",
    "type.unknown":            "Unklar",
    "card.website":            "Website",
    "card.website.missing":    "Website fehlt",
    "detail.type":             "Typ",
    "detail.products":         "Produktkategorien",
    "detail.priority_reason":  "Prioritätsgrund",
    "detail.strategy":         "Vertriebsansatz",
    "detail.address":          "Adresse",
    "popup.website":           "Website öffnen",
    "popup.no_website":        "Website nicht hinterlegt",
    "popup.no_email":          "Keine E-Mail hinterlegt",
    "popup.no_phone":          "Keine Telefonnummer hinterlegt",
    "popup.maps":              "Adresse in Google Maps",
    "popup.linkedin_contacts": "LinkedIn-Kontakte",
    "location.unknown":        "Ort offen",
    "legend.title":            "Legende & Prioritäten",
    "legend.close":            "Legende schließen",
    "legend.rot":              " Rot: Hersteller A / High Fit",
    "legend.gelb":             " Gelb: Hersteller B",
    "legend.grau":             " Grau: Hersteller C",
    "legend.blau":             " Blau: Ofenbauer high",
    "legend.hellblau":         " Hellblau: Ofenbauer medium",
    "legend.hellgrau":         " Hellgrau: Ofenbauer low",
    "legend.size":             " Markergröße: Priorität / Relevanz",
    "legend.priority":         " A = strategisch, B = relevant, C = Beobachtung",
    "legend.compact.rot":      " Hersteller A / High Fit",
    "legend.compact.gelb":     " Hersteller B",
    "legend.compact.grau":     " Hersteller C",
    "legend.compact.blau":     " Ofenbauer high",
    "legend.compact.hellblau": " Ofenbauer medium",
    "legend.compact.hellgrau": " Ofenbauer low",
    "map.kicker":              "Karte",
    "map.title":               "DACH Sales Map",
    "map.aria":                "Interaktive Karte für DACH-Hersteller und Ofenbauer",
    "card.focus.aria":         "auf der Karte fokussieren",
    "results.meta.all":        "{count} Firmen in der Trefferliste. Klick auf eine Firma fokussiert direkt den Marker.",
    "results.meta.partial":    "{count} Firmen in der Trefferliste, {mapCount} davon in der Kartenansicht. Klick auf eine Firma mit Marker fokussiert direkt den Karteneintrag."
  },
  en: {
    "page.title":              "DACH Oven Market Sales Map",
    "topbar.layer":            "Layer:",
    "topbar.companies":        "Companies",
    "topbar.manufacturers":    "Manufacturers",
    "topbar.ofenbauer":        "Stove Builders",
    "topbar.info.aria":        "Open info",
    "filter.title":            "Filters",
    "filter.layer":            "Layer",
    "filter.type":             "Type",
    "filter.country":          "Country",
    "filter.priority":         "Priority",
    "filter.toptarget":        "Top Target",
    "filter.search":           "Search",
    "filter.search.placeholder":"e.g. Spartherm, Hamburg, fireplace inserts",
    "filter.all":              "All",
    "filter.allcountries":     "All Countries",
    "filter.yes":              "Yes",
    "filter.no":               "No",
    "btn.fitbounds":           "Show on Map",
    "btn.reset":               "Reset Filters",
    "results.kicker":          "Results",
    "results.title":           "Results List",
    "results.loading":         "Loading data…",
    "results.layerloading":    "Loading layer...",
    "results.error.count":     "Data error",
    "results.error.msg":       "The layer file could not be loaded.",
    "results.error.hint":      "Please check that the JSON file for the selected layer exists in the data folder.",
    "results.empty":           "No results for the current combination of layer, filters and search.",
    "results.none":            "No companies in the results list.",
    "layer.top":               "Top Targets",
    "layer.top.tooltip":       "Final A-Priority: Manufacturers and select stove builders with high business impact and fit.",
    "layer.filtered":          "Relevant Companies",
    "layer.filtered.tooltip":  "All companies with final priority A or B for ongoing sales engagement.",
    "layer.full":              "Full Market",
    "layer.full.tooltip":      "Complete DACH market coverage with 857 companies for market and regional analysis.",
    "type.manufacturer":       "Manufacturer",
    "type.ofenbauer":          "Stove Builder",
    "type.unknown":            "Unknown",
    "card.website":            "Website",
    "card.website.missing":    "No website",
    "detail.type":             "Type",
    "detail.products":         "Product Categories",
    "detail.priority_reason":  "Priority Reason",
    "detail.strategy":         "Sales Approach",
    "detail.address":          "Address",
    "popup.website":           "Open Website",
    "popup.no_website":        "No website available",
    "popup.no_email":          "No email available",
    "popup.no_phone":          "No phone number available",
    "popup.maps":              "Address in Google Maps",
    "popup.linkedin_contacts": "LinkedIn Contacts",
    "location.unknown":        "Location unknown",
    "legend.title":            "Legend & Priorities",
    "legend.close":            "Close legend",
    "legend.rot":              " Red: Manufacturer A / High Fit",
    "legend.gelb":             " Yellow: Manufacturer B",
    "legend.grau":             " Grey: Manufacturer C",
    "legend.blau":             " Blue: Stove Builder high",
    "legend.hellblau":         " Light Blue: Stove Builder medium",
    "legend.hellgrau":         " Light Grey: Stove Builder low",
    "legend.size":             " Marker size: Priority / Relevance",
    "legend.priority":         " A = strategic, B = relevant, C = monitoring",
    "legend.compact.rot":      " Manufacturer A / High Fit",
    "legend.compact.gelb":     " Manufacturer B",
    "legend.compact.grau":     " Manufacturer C",
    "legend.compact.blau":     " Stove Builder high",
    "legend.compact.hellblau": " Stove Builder medium",
    "legend.compact.hellgrau": " Stove Builder low",
    "map.kicker":              "Map",
    "map.title":               "DACH Sales Map",
    "map.aria":                "Interactive map for DACH manufacturers and stove builders",
    "card.focus.aria":         "focus on map",
    "results.meta.all":        "{count} companies in the results list. Click a company to focus its marker on the map.",
    "results.meta.partial":    "{count} companies in the results list, {mapCount} shown on the map. Click a company with a marker to focus it on the map."
  }
};

// ── LinkedIn Contacts ─────────────────────────────────────────────────────────
const LINKEDIN_CONTACTS = [
  { company: "AUSTROFLAMM GmbH", contacts: [
    { name: "Alexander Niedersüß",     role: "Einkäufer",                                url: "https://www.linkedin.com/in/alexander-nieders%C3%BC%C3%9F-61b519205/" },
    { name: "Ezequiel Prügger",        role: "Purchasing",                               url: "https://www.linkedin.com/in/ezequiel-pr%C3%BCgger-5b33a32a9/" },
    { name: "Matej Bučinel",           role: "Product Manager",                          url: "https://www.linkedin.com/in/matej-bu%C4%8Dinel-7514559a/" }
  ]},
  { company: "HARK GmbH & Co. KG", contacts: [
    { name: "Waldemar Leib",           role: "Head of Purchasing",                       url: "https://www.linkedin.com/in/waldemar-leib-a4922b9a/" }
  ]},
  { company: "LEDA Werk GmbH & Co. KG", contacts: [
    { name: "Onno Cramer",             role: "Head of Product Development",              url: "https://www.linkedin.com/in/onno-cramer-8bba1410a/" },
    { name: "Hans-Joachim Blüthmann", role: "Technical Director",                       url: "https://www.linkedin.com/in/hans-joachim-bl%C3%BCthmann-684390348/" },
    { name: "Marcel Wolter",           role: "R&D",                                      url: "https://www.linkedin.com/in/marcel-wolter-269105186/" }
  ]},
  { company: "Lohberger GmbH", contacts: [
    { name: "Peter Schaller",          role: "Manager Purchasing",                       url: "https://www.linkedin.com/in/peter-schaller-048984142/" },
    { name: "Nadine Rieger",           role: "Purchasing",                               url: "https://www.linkedin.com/in/nadine-rieger-403851221/" }
  ]},
  { company: "Ulrich Brunner GmbH", contacts: [
    { name: "Renate Stirner",          role: "Technical Purchasing / Asst. Management",  url: "https://www.linkedin.com/in/renate-stirner-b666b118/" },
    { name: "Richard Pointner",        role: "Development Engineer",                     url: "https://www.linkedin.com/in/richard-pointner-a7517a285/" }
  ]},
  { company: "Camina & Schmid", contacts: [
    { name: "Sven Borgstedt",          role: "Operations (Logistics / Purchase / Prod.)", url: "https://www.linkedin.com/in/sven-borgstedt-7998021a2/" },
    { name: "Julian Strakerjahn",      role: "Purchasing",                               url: "https://www.linkedin.com/in/julian-strakerjahn-a617373b3/" }
  ]},
  { company: "HASE Kaminofenbau GmbH", contacts: [
    { name: "Florian Fischer",         role: "Head of Production Development",           url: "https://www.linkedin.com/in/florian-fischer-7a7541285/" }
  ]},
  { company: "Ortner GmbH", contacts: [
    { name: "Christian Walter",        role: "Product Manager",                          url: "https://www.linkedin.com/in/christian-walter-37b8a995/" }
  ]},
  { company: "Rika Innovative Ofentechnik GmbH", contacts: [
    { name: "Tomislav Dramac",         role: "Head of Production",                       url: "https://www.linkedin.com/in/tomislav-dramac-594b2929b/" }
  ]},
  { company: "Spartherm Feuerungstechnik GmbH", contacts: [
    { name: "Marc Diekmann",           role: "Contact (existing customer)",              url: "https://www.linkedin.com/in/marc-diekmann-185603395/" }
  ]},
  { company: "Tiba AG", contacts: [
    { name: "Cedric Waldmeier",        role: "Project Manager Heat Systems",             url: "https://www.linkedin.com/in/cedric-waldmeier-046301167/" }
  ]},
  { company: "WAMSLER", contacts: [
    { name: "Zoltán Péter Németh",     role: "CEO",                                      url: "https://www.linkedin.com/in/zolt%C3%A1n-p%C3%A9ter-n%C3%A9meth-40959b84/" }
  ]},
  { company: "rondo Ringkachelofen GmbH", contacts: [
    { name: "Hanspeter Lüdin",         role: "Former Head of Design & Development",      url: "https://www.linkedin.com/in/hanspeter-l%C3%BCdin-4b0a96130/" }
  ]},
  { company: "Drooff Kaminöfen GmbH & Co. KG", contacts: [
    { name: "Till Klask",              role: "Managing Director",                        url: "https://www.linkedin.com/in/till-klask-043b8915b/" }
  ]},
  { company: "Wotan Heizeinsätze GmbH", contacts: [
    { name: "Regina (Gina) Pütz",      role: "Managing Director",                        url: "https://www.linkedin.com/in/regina-gina-p%C3%BCtz-81882a79/" }
  ]},
  { company: "AMBIO Speicherofen & Kamin GmbH", contacts: [
    { name: "Armin Zipka",             role: "CEO",                                      url: "https://www.linkedin.com/in/armin-zipka-47749b33a/" }
  ]},
  { company: "Bernhard Kaschütz GmbH", contacts: [
    { name: "Harald Laber",            role: "Operations Manager",                       url: "https://www.linkedin.com/in/harald-laber-68a97aba/" }
  ]},
  { company: "Bullerjan GmbH", contacts: [
    { name: "Julius Ratjen",           role: "Managing Director",                        url: "https://www.linkedin.com/in/julius-ratjen-82a204/" }
  ]},
  { company: "CERA DESIGN by Britta von Tasch GmbH", contacts: [
    { name: "Britta von Tasch",        role: "CEO",                                      url: "https://www.linkedin.com/in/britta-von-tasch-84187b158/" }
  ]},
  { company: "Erwin KOPPE", contacts: [
    { name: "Veronika Prösl",          role: "Purchasing",                               url: "https://www.linkedin.com/in/veronika-pr%C3%B6sl-4632b4286/" }
  ]},
  { company: "HAFNERTEC", contacts: [
    { name: "Leopold Bicker",          role: "CEO",                                      url: "https://www.linkedin.com/in/leopold-bicker-17a4b7bb/" }
  ]},
  { company: "Max Blank GmbH", contacts: [
    { name: "Thomas Blank",            role: "CEO",                                      url: "https://www.linkedin.com/in/thomas-blank-03784b150/" }
  ]},
  { company: "Ofenfabrik Schenk AG", contacts: [
    { name: "David Broger",            role: "Head of Production & Technics",            url: "https://www.linkedin.com/in/david-broger-23b0ba2/" }
  ]},
  { company: "PROMETHEUS Öfen GmbH", contacts: [
    { name: "Anton Brandauer",         role: "CEO",                                      url: "https://www.linkedin.com/in/anton-brandauer-600a61113/" }
  ]},
  { company: "wodtke GmbH", contacts: [
    { name: "Kristijan Dolibasic",     role: "Purchasing",                               url: "https://www.linkedin.com/in/kristijan-dolibasic-0180b7207/" }
  ]},
  { company: "Kloss Wohnherde GmbH", contacts: [
    { name: "Hans-Peter Hubmann",      role: "Production Manager",                       url: "https://ch.linkedin.com/in/hans-peter-hubmann-a615ba51" }
  ]},
  { company: "Hans Greub AG", contacts: [
    { name: "Oliver Rosin",            role: "Design & Engineering",                     url: "https://ch.linkedin.com/in/oliver-rosin-8202a12a2" }
  ]}
];

function normalizeName(s) {
  return s.toLowerCase()
    .replace(/\b(gmbh|co\.|co|kg|kgaa|ag|se|gmbh & co\. kg|und|the|haus-|haus)\b/g, "")
    .replace(/[^a-z0-9äöüß]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getLinkedInContacts(companyName) {
  const norm = normalizeName(companyName);
  for (const entry of LINKEDIN_CONTACTS) {
    const entryNorm = normalizeName(entry.company);
    if (norm === entryNorm || norm.includes(entryNorm) || entryNorm.includes(norm)) {
      return entry.contacts;
    }
  }
  return [];
}

function t(key) {
  return (TRANSLATIONS[_lang] || TRANSLATIONS.de)[key] || key;
}

let _lang = "de";

function applyLanguage(lang) {
  _lang = lang;
  document.getElementById("htmlRoot").lang = lang;
  document.title = t("page.title");

  // Update lang button — shows the OTHER language as the click target
  const btn = document.getElementById("langButton");
  if (btn) btn.textContent = lang === "de" ? "EN" : "DE";

  // Static elements with data-i18n (textContent)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  // Aria-label attributes
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    el.setAttribute("aria-label", t(el.dataset.i18nAria));
  });

  // Placeholder attributes
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // Select option text
  document.querySelectorAll("[data-i18n-option]").forEach((el) => {
    el.textContent = t(el.dataset.i18nOption);
  });

  // Re-render live content if data is loaded
  if (state && state.companies && state.companies.length > 0) {
    populateCountryFilter(state.companies);
    updateLayerUi(state.activeLayer, false);
    const mapCount = state.filteredCompanies.filter((c) => c._hasCoordinates).length;
    renderResults(state.filteredCompanies, mapCount);
    renderStats(state.filteredCompanies.filter((c) => c._hasCoordinates));
    // Re-render open popups
    state.clusterGroup?.eachLayer((marker) => {
      if (marker.isPopupOpen && marker.isPopupOpen()) {
        const company = [...state.markerIndex.entries()]
          .find(([, m]) => m === marker)?.[1];
        if (company) marker.setPopupContent(createPopupMarkup(company));
      }
    });
  }
}

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
  activeTooltipLayer: null,
  isLegendModalOpen: false
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
  langButton: document.getElementById("langButton"),
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
  elements.langButton?.addEventListener("click", () => applyLanguage(_lang === "de" ? "en" : "de"));
  elements.resultsList?.addEventListener("click", handleResultsListClick);
  elements.resultsList?.addEventListener("keydown", handleResultsListKeydown);

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
  elements.resultMeta.textContent = t("results.layerloading");

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
    elements.resultCount.textContent = t("results.error.count");
    elements.resultMeta.textContent = t("results.error.msg");
    elements.resultsList.innerHTML = renderEmptyState(t("results.error.hint"));
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

  elements.badgeLayerName.textContent = t("layer." + layerKey);
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

  elements.countryFilter.innerHTML = `<option value="">${t("filter.allcountries")}</option>`;
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
  renderResults(state.filteredCompanies, companiesOnMap.length);
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

    const mLiContacts = getLinkedInContacts(company.name);
    if (mLiContacts.length > 0 && !usesTapTooltipMode()) {
      const names = mLiContacts.map(c => `<span class="mtt-name">${escapeHtml(c.name)}</span>`).join("");
      marker.bindTooltip(`<div class="mtt"><strong>${escapeHtml(company.name)}</strong><div class="mtt__contacts"><svg viewBox="0 0 16 16" fill="#0a66c2" width="11" height="11"><path d="M0 1.146C0 .514.514 0 1.146 0h13.708C15.486 0 16 .514 16 1.146v13.708c0 .632-.514 1.146-1.146 1.146H1.146C.514 16 0 15.486 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg> ${names}</div></div>`, { direction: "top", className: "li-map-tooltip", sticky: false });
    }

    state.markerIndex.set(company._id, marker);
    state.clusterGroup.addLayer(marker);
  });
}

function renderResults(companies, mapCompanyCount = companies.length) {
  elements.resultCount.textContent = `${state.filteredCompanies.length} ${t("results.kicker")}`;
  elements.resultMeta.textContent = buildResultMetaText(companies.length, mapCompanyCount);

  if (companies.length === 0) {
    elements.resultsList.innerHTML = renderEmptyState(t("results.empty"));
    return;
  }

  elements.resultsList.scrollTop = 0;
  elements.resultsList.innerHTML = companies.map(renderResultCard).join("");
}

function renderResultCard(company) {
  const mapsLink = buildGoogleMapsLink(company);
  const websiteMarkup = company.website
    ? `<a class="company-card__link" href="${escapeAttribute(company.website)}" target="_blank" rel="noreferrer">${t("card.website")}</a>`
    : `<span class="company-card__link company-card__link--muted">${t("card.website.missing")}</span>`;
  const companyName = company.name || company.company_name || "Unbekannte Firma";
  const canFocusMarker = hasValidMapCoordinates(company.lat, company.lng);
  const interactiveAttributes = canFocusMarker
    ? `data-company-id="${company._id}" tabindex="0" role="button" aria-label="${escapeAttribute(`${companyName} ${t("card.focus.aria")}`)}"`
    : `tabindex="-1" aria-disabled="true"`;

  const cardLiContacts = getLinkedInContacts(company.name);
  const liBadge = cardLiContacts.length > 0
    ? `<button class="company-card__li-btn" title="${cardLiContacts.length} LinkedIn contact${cardLiContacts.length > 1 ? "s" : ""}: ${escapeAttribute(cardLiContacts.map(c => c.name).join(", "))}" aria-label="LinkedIn contacts">
        <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 1.146C0 .514.514 0 1.146 0h13.708C15.486 0 16 .514 16 1.146v13.708c0 .632-.514 1.146-1.146 1.146H1.146C.514 16 0 15.486 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
        <span>${cardLiContacts.length}</span>
      </button>`
    : "";

  return `
    <article class="company-card ${getCompanyCardClass(company)} ${canFocusMarker ? "" : "company-card--no-marker"}" ${interactiveAttributes}>
      <div class="company-card__surface">
        <div class="company-card__header">
          <div class="company-card__identity">
            <p class="company-card__name">${escapeHtml(companyName)}</p>
            <div class="company-card__meta">${escapeHtml(formatLocation(company))}</div>
            ${getAddressLabel(company) ? `<div class="company-card__address">${escapeHtml(getAddressLabel(company))}</div>` : ""}
          </div>
          ${liBadge}
        </div>
        <div class="detail-list detail-list--card">
          ${buildCompanyDetailBlocks(company)}
        </div>
      </div>
      <div class="company-card__footer">
        ${websiteMarkup}
        ${company.email ? `<a class="company-card__link" href="mailto:${escapeAttribute(company.email)}">${escapeHtml(company.email)}</a>` : ""}
        ${company.phone ? `<a class="company-card__link" href="tel:${escapeAttribute(company.phone)}">${escapeHtml(company.phone)}</a>` : ""}
        ${mapsLink ? `<a class="company-card__link" href="${escapeAttribute(mapsLink)}" target="_blank" rel="noreferrer">Google Maps</a>` : ""}
      </div>
    </article>
  `;
}

function handleResultsListClick(event) {
  if (event.target?.closest?.("a")) {
    return;
  }

  const trigger = event.target?.closest?.("[data-company-id]");
  if (!trigger) {
    return;
  }

  focusCompany(trigger.dataset.companyId);
}

function handleResultsListKeydown(event) {
  const trigger = event.target?.closest?.("[data-company-id]");
  if (!trigger) {
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  focusCompany(trigger.dataset.companyId);
}

function renderStats(companiesOnMap) {
  const manufacturers = state.filteredCompanies.filter((company) => company.company_type === "manufacturer").length;
  const ofenbauer = state.filteredCompanies.filter((company) => company.company_type === "ofenbauer").length;
  const layer = LAYERS[state.activeLayer];

  elements.statFiltered.textContent = String(state.filteredCompanies.length);
  elements.statManufacturers.textContent = String(manufacturers);
  elements.statOfenbauer.textContent = String(ofenbauer);
  elements.badgeLayerName.textContent = t("layer." + state.activeLayer);
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

  tooltip.textContent = t("layer." + layerKey + ".tooltip");
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
  const hasDot = getLinkedInContacts(company.name).length > 0;

  return L.divIcon({
    className: "sales-marker-wrapper",
    html: `<span class="sales-marker sales-marker--${escapeAttribute(markerPresentation.color)} sales-marker--${markerSize.css}" style="opacity:${opacity}"></span>${hasDot ? '<span class="li-dot"></span>' : ""}` ,
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
    ? `<a class="popup-card__link" href="${escapeAttribute(company.website)}" target="_blank" rel="noreferrer">${t("popup.website")}</a>`
    : `<span class="popup-card__meta">${t("popup.no_website")}</span>`;
  const emailLink = company.email
    ? `<a class="popup-card__link" href="mailto:${escapeAttribute(company.email)}">${escapeHtml(company.email)}</a>`
    : `<span class="popup-card__meta">${t("popup.no_email")}</span>`;
  const phoneLink = company.phone
    ? `<a class="popup-card__link" href="tel:${escapeAttribute(company.phone)}">${escapeHtml(company.phone)}</a>`
    : `<span class="popup-card__meta">${t("popup.no_phone")}</span>`;
  const mapsLink = buildGoogleMapsLink(company);
  const mapsAction = mapsLink
    ? `<a class="popup-card__link" href="${escapeAttribute(mapsLink)}" target="_blank" rel="noreferrer">${t("popup.maps")}</a>`
    : "";

  const liContacts = getLinkedInContacts(company.name);
  const linkedInBlock = liContacts.length > 0
    ? `<div class="popup-card__linkedin">
        <span class="popup-card__linkedin-label">${t("popup.linkedin_contacts")}</span>
        ${liContacts.map(c => `
          <a class="popup-card__link popup-card__link--li" href="${escapeAttribute(c.url.trim())}" target="_blank" rel="noreferrer">
            <svg class="li-icon" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 1.146C0 .514.514 0 1.146 0h13.708C15.486 0 16 .514 16 1.146v13.708c0 .632-.514 1.146-1.146 1.146H1.146C.514 16 0 15.486 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
            <span class="li-name">${escapeHtml(c.name)}</span><span class="li-role"> · ${escapeHtml(c.role)}</span>
          </a>`).join("")}
      </div>`
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
      ${linkedInBlock}
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

  rows.push(renderDetailIfValue(t("detail.type"), formatTypeLabel(company.company_type)));
  rows.push(renderDetailIfValue(t("detail.products"), company.product_categories));
  rows.push(renderDetailIfValue(t("detail.priority_reason"), company.priority_reason));
  rows.push(renderDetailIfValue(t("detail.strategy"), company.strategy));

  return rows.filter(Boolean).join("");
}

function buildPopupDetailBlocks(company) {
  const rows = [];

  rows.push(renderDetailIfValue(t("detail.address"), getAddressLabel(company)));
  rows.push(renderDetailIfValue(t("detail.products"), company.product_categories));
  rows.push(renderDetailIfValue(t("detail.priority_reason"), company.priority_reason));
  rows.push(renderDetailIfValue(t("detail.strategy"), company.strategy));

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

function buildResultMetaText(listCount, mapCount) {
  if (listCount === 0) {
    return t("results.none");
  }

  if (listCount === mapCount) {
    return t("results.meta.all").replace("{count}", listCount);
  }

  return t("results.meta.partial")
    .replace("{count}", listCount)
    .replace("{mapCount}", mapCount);
}

function formatTypeLabel(type) {
  return type === "manufacturer" ? t("type.manufacturer") : type === "ofenbauer" ? t("type.ofenbauer") : t("type.unknown");
}

function formatLocation(company) {
  const city = company.city || t("location.unknown");
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
