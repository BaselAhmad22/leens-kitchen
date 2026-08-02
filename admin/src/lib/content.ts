import fs from "fs";
import path from "path";
import type { SiteData } from "./types";

export function getContentDir() {
  if (process.env.CONTENT_DIR) {
    return path.resolve(process.env.CONTENT_DIR);
  }
  return path.resolve(process.cwd(), "..", "leens-content");
}

export function getDataPath() {
  return path.join(getContentDir(), "site-data.json");
}

export function getImagesDir() {
  return path.join(getContentDir(), "images");
}

export function readSiteData(): SiteData {
  return JSON.parse(fs.readFileSync(getDataPath(), "utf8")) as SiteData;
}

export function writeSiteData(data: SiteData) {
  fs.writeFileSync(getDataPath(), JSON.stringify(data, null, 2) + "\n", "utf8");
}

export function listImages(): string[] {
  const dir = getImagesDir();
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|jpe?g|webp|gif|svg)$/i.test(f))
    .sort();
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
