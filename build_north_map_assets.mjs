import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceCsv = path.resolve(__dirname, "..", "de north", "skamowall_de_north_priority_leads_v4.csv");
const sourceMapHtml = path.resolve(__dirname, "..", "de north", "skamowall_de_north_priority_map_v4.html");
const sourceWorkbook = path.resolve(__dirname, "..", "de north", "Skamowall DACH nord reviewed.xlsx");

const outputJson = path.resolve(__dirname, "data", "skamowall_de_north_reviewed.json");
const outputWorkbook = path.resolve(__dirname, "Skamowall_DACH_nord_reviewed.xlsx");

function parseCsv(text) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === "\"" && next === "\"") {
        current += "\"";
        i += 1;
      } else if (char === "\"") {
        inQuotes = false;
      } else {
        current += char;
      }
      continue;
    }

    if (char === "\"") {
      inQuotes = true;
      continue;
    }

    if (char === ",") {
      row.push(current);
      current = "";
      continue;
    }

    if (char === "\n") {
      row.push(current.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      current = "";
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.replace(/\r$/, ""));
    rows.push(row);
  }

  const [headerRow, ...valueRows] = rows.filter((entry) => entry.length && entry.some((cell) => cell !== ""));
  return valueRows.map((valueRow) =>
    Object.fromEntries(headerRow.map((header, index) => [header, valueRow[index] ?? ""]))
  );
}

function extractMapLeads(html) {
  const match = html.match(/const leads = (\[[\s\S]*?\]);\s+const palette =/);
  if (!match) {
    throw new Error("Could not extract lead JSON from north map HTML.");
  }
  return JSON.parse(match[1]);
}

function groupFor(category) {
  if (category.startsWith("Installer")) {
    return "installer";
  }
  if (category === "Housing association") {
    return "housing";
  }
  return "distributor";
}

function normalizeReview(value) {
  if (value === "Interessant") {
    return "interesting";
  }
  return "less-interesting";
}

function scoreFor(row) {
  let score = 0;
  if (row.skamol_interest_review === "Interessant") {
    score += 3;
  }
  if (row.skamol_fit === "A") {
    score += 2;
  }
  if (row.priority_tier.startsWith("A1")) {
    score += 2;
  } else if (row.priority_tier.startsWith("A2")) {
    score += 1;
  }
  return score;
}

async function main() {
  const [csvText, htmlText] = await Promise.all([
    fs.readFile(sourceCsv, "utf8"),
    fs.readFile(sourceMapHtml, "utf8")
  ]);

  const csvRows = parseCsv(csvText);
  const mapLeads = extractMapLeads(htmlText);
  const mapByName = new Map(mapLeads.map((lead) => [lead.name, lead]));

  const rows = csvRows
    .map((row) => {
      const mapLead = mapByName.get(row.organization);
      if (!mapLead) {
        throw new Error(`Missing map coordinates for ${row.organization}`);
      }

      return {
        priorityRank: Number(row.priority_rank),
        priorityTier: row.priority_tier,
        skamolFit: row.skamol_fit,
        reviewLabel: row.skamol_interest_review,
        reviewKey: normalizeReview(row.skamol_interest_review),
        reviewReason: row.skamol_interest_reason,
        category: row.category,
        group: groupFor(row.category),
        country: row.country,
        organization: row.organization,
        region: row.region,
        city: row.ort,
        street: row.strasse_und_hausnummer,
        postcode: row.plz,
        email: row.email,
        phone: row.phone,
        website: row.website,
        googleMapsUrl: row.google_maps_url,
        whatTheyDo: row.was_sie_genau_machen,
        whyIncluded: row.warum_aufgenommen,
        contactSource: row.quelle_kontakt,
        profileSource: row.quelle_profil,
        relevanceSource: row.quelle_warum_aufgenommen,
        researchNote: row.recherchehinweis,
        areaGroup: mapLead.areaGroup,
        lat: Number(mapLead.lat),
        lng: Number(mapLead.lng),
        score: scoreFor(row)
      };
    })
    .sort((a, b) => a.priorityRank - b.priorityRank);

  const payload = {
    generatedAt: new Date().toISOString(),
    sourceDate: "2026-05-06",
    title: "SkamoWall DACH Nord",
    summary: {
      total: rows.length,
      interesting: rows.filter((row) => row.reviewKey === "interesting").length,
      lessInteresting: rows.filter((row) => row.reviewKey === "less-interesting").length,
      installers: rows.filter((row) => row.group === "installer").length,
      housing: rows.filter((row) => row.group === "housing").length,
      distributors: rows.filter((row) => row.group === "distributor").length,
      fitA: rows.filter((row) => row.skamolFit === "A").length,
      fitB: rows.filter((row) => row.skamolFit === "B").length
    },
    leads: rows
  };

  await fs.mkdir(path.dirname(outputJson), { recursive: true });
  await fs.writeFile(outputJson, JSON.stringify(payload, null, 2), "utf8");
  await fs.copyFile(sourceWorkbook, outputWorkbook);

  console.log(`Wrote ${path.relative(__dirname, outputJson)}`);
  console.log(`Copied ${path.relative(__dirname, outputWorkbook)}`);
}

await main();
