import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getImagesDir } from "@/lib/content";

type Params = { params: Promise<{ name: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const { name } = await params;
  if (!name || name.includes("..") || name.includes("/") || name.includes("\\")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = path.join(getImagesDir(), name);
  if (!fs.existsSync(file)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const buf = fs.readFileSync(file);
  const ext = path.extname(name).toLowerCase();
  const type =
    ext === ".png"
      ? "image/png"
      : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : "application/octet-stream";

  return new NextResponse(buf, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
