# DACH Ofen Sales Map

## Projektzweck
Diese GitHub-Pages-Anwendung visualisiert den finalen DACH-Ofenmarkt für Skamol.
Sie kombiniert Hersteller und Ofenbauer für Gebietsplanung, Markttransparenz und
vertriebliche Priorisierung.

## Die drei Layer
- `Top Targets`
  Finale A-Priorität mit `65` Firmen.
- `Relevante Betriebe`
  Finale A/B-Priorität mit `315` Firmen.
- `Full Market`
  Vollständige finale Datenbasis mit `857` Firmen.

## Datenquelle
- `data/dach_ofen_top_map_data_final.json`
- `data/dach_ofen_filtered_map_data_final.json`
- `data/dach_ofen_full_map_data_final.json`

Die Layer werden aus dem finalen Datenstand abgeleitet:
- `output/dach_ofen_combined_master_final.csv`
- `output/dach_ofen_final_master_final.xlsx`

## Wichtige Dateien
- `index.html`
  Einstiegspunkt der GitHub-Pages-Seite
- `style.css`
  Layout, Responsive-Design und UI-Styling
- `script.js`
  Layer-Laden, Filterlogik, Suche, Karte, Cluster, Popups und Firmenliste
- `data/*.json`
  Die veröffentlichten finalen Karten-Layer

## GitHub Pages Deployment
1. Repository nach GitHub pushen.
2. In GitHub `Settings` öffnen.
3. Zu `Pages` wechseln.
4. Unter `Build and deployment` die Quelle `Deploy from a branch` wählen.
5. Branch `main` wählen.
6. Ordner `/ (root)` wählen.
7. Speichern.

## Update-Prozess
1. Finalen Datenstand in `output/` aktualisieren.
2. Finale Layer-Dateien in `skamowall-sales-maps/data/` synchronisieren.
3. Seite lokal per statischem Server prüfen.
4. Änderungen committen und auf `main` pushen.
5. GitHub Pages deployed die Seite automatisch neu.

## Technischer Stack
- HTML
- CSS
- Vanilla JavaScript
- [Leaflet](https://leafletjs.com/)
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)

## Hinweise
- Keine Backend-Abhängigkeit
- Keine API Keys
- Für lokale Tests die Seite über einen statischen Server öffnen, nicht per `file://`,
  da die Layer per `fetch()` geladen werden
