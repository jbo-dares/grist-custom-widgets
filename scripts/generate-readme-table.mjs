#!/usr/bin/env node
// Régénère le tableau des widgets dans README.md à partir des fichiers
// widgets/<nom>/widget.json présents dans le dépôt.
//
// Usage : node scripts/generate-readme-table.mjs
//
// Le script cherche les marqueurs suivants dans README.md et remplace
// tout ce qui se trouve entre eux :
//   <!-- WIDGETS_TABLE:START -->
//   ...
//   <!-- WIDGETS_TABLE:END -->

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const REPO_OWNER = "jbo-dares";
const REPO_NAME = "grist-custom-widgets";
const PAGES_BASE = `https://${REPO_OWNER}.github.io/${REPO_NAME}`;

const WIDGETS_DIR = "widgets";
const README_PATH = "README.md";
const START_MARKER = "<!-- WIDGETS_TABLE:START -->";
const END_MARKER = "<!-- WIDGETS_TABLE:END -->";

function listWidgetFolders() {
  return readdirSync(WIDGETS_DIR).filter((name) => {
    const full = join(WIDGETS_DIR, name);
    if (name === "common") return false; // dossier d'assets partagés, pas un widget
    if (!statSync(full).isDirectory()) return false;
    return existsSync(join(full, "index.html"));
  });
}

function loadMeta(folderName) {
  const metaPath = join(WIDGETS_DIR, folderName, "widget.json");
  if (existsSync(metaPath)) {
    try {
      const meta = JSON.parse(readFileSync(metaPath, "utf8"));
      return {
        title: meta.title || folderName,
        description: meta.description || "",
      };
    } catch (err) {
      console.warn(`⚠️  widget.json invalide pour ${folderName}: ${err.message}`);
    }
  }
  return { title: folderName, description: "" };
}

function buildTable() {
  const folders = listWidgetFolders().sort();
  const header = "| Nom du Widget | Description | URL directe |\n|---------------|-------------|--------------|";
  const rows = folders.map((folder) => {
    const { title, description } = loadMeta(folder);
    const url = `${PAGES_BASE}/${WIDGETS_DIR}/${folder}/index.html`;
    return `| \`${title}\` | ${description} | [\`${url}\`](${url}) |`;
  });
  return [header, ...rows].join("\n");
}

function updateReadme() {
  const readme = readFileSync(README_PATH, "utf8");
  const startIdx = readme.indexOf(START_MARKER);
  const endIdx = readme.indexOf(END_MARKER);

  if (startIdx === -1 || endIdx === -1) {
    console.error(`Marqueurs ${START_MARKER} / ${END_MARKER} introuvables dans ${README_PATH}.`);
    process.exit(1);
  }

  const before = readme.slice(0, startIdx + START_MARKER.length);
  const after = readme.slice(endIdx);
  const table = buildTable();

  const updated = `${before}\n${table}\n${after}`;

  if (updated === readme) {
    console.log("README déjà à jour, aucune modification.");
    return;
  }

  writeFileSync(README_PATH, updated);
  console.log("README.md mis à jour avec la liste des widgets.");
}

updateReadme();
