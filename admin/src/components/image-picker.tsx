"use client";

import { useEffect, useState } from "react";
import { withBasePath } from "@/lib/base-path";
import { Image as ImageIcon } from "@phosphor-icons/react";

type MediaFile = { name: string; path: string };

export function ImagePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange: (path: string) => void;
}) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch(withBasePath("/api/media")
      .then((r) => r.json())
      .then((d) => setFiles(d.files || []));
  }, [open]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(`/api/media-file/${value.replace("/images/", "")}`)}
            alt=""
            className="h-18 w-28 rounded-[12px] border border-border object-cover"
          />
        ) : (
          <div className="flex h-[72px] w-28 flex-col items-center justify-center gap-1 rounded-[12px] border border-dashed border-border bg-panel-2 text-soft">
            <ImageIcon size={18} />
            <span className="text-[10px]">No image</span>
          </div>
        )}
        <button type="button" className="btn btn-ghost text-sm" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Choose image"}
        </button>
        {value ? (
          <button type="button" className="btn btn-danger text-sm" onClick={() => onChange("")}>
            Clear
          </button>
        ) : null}
      </div>
      {open ? (
        <div className="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto rounded-[14px] border border-border bg-panel-2 p-2 sm:grid-cols-4">
          {files.map((f) => (
            <button
              key={f.name}
              type="button"
              className={`overflow-hidden rounded-[10px] border-2 transition-transform hover:scale-[1.02] ${
                value === f.path ? "border-accent" : "border-transparent"
              }`}
              onClick={() => {
                onChange(f.path);
                setOpen(false);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBasePath(`/api/media-file/${f.name}`)}
                alt={f.name}
                className="aspect-[4/3] w-full object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
