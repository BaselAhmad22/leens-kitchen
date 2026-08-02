import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { readSiteData, writeSiteData } from "@/lib/content";
import type { SiteData } from "@/lib/types";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(readSiteData());
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = (await req.json()) as SiteData;
    if (!data?.restaurant || !Array.isArray(data.menuCategories)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    writeSiteData(data);
    return NextResponse.json({ ok: true, data: readSiteData() });
  } catch {
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}
