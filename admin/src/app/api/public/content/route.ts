import { NextResponse } from "next/server";
import { readSiteData } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(readSiteData(), {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json({ error: "Content unavailable" }, { status: 500 });
  }
}
