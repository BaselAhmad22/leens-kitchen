import fs from "fs";
import path from "path";
import type { SiteData } from "./types";

export function getContentDir() {
  if (process.env.CONTENT_DIR) {
    return path.resolve(process.env.CONTENT_DIR);
  }
  return path.resolve(process.cwd(), "..", "leens-content");
}

export function getImagesDir() {
  return path.join(getContentDir(), "images");
}

export async function getSiteData(): Promise<SiteData> {
  const api = process.env.CONTENT_API_URL?.replace(/\/$/, "");
  if (api) {
    const res = await fetch(`${api}/api/public/content`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to load content from ${api}`);
    }
    return (await res.json()) as SiteData;
  }

  const file = path.join(getContentDir(), "site-data.json");
  const raw = fs.readFileSync(file, "utf8");
  return JSON.parse(raw) as SiteData;
}
