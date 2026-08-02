"use client";

import { FormEvent, useEffect, useState } from "react";
import { PageHeader } from "@/components/save-bar";
import { UploadSimple, Trash } from "@phosphor-icons/react";
import { motion } from "motion/react";

type MediaFile = { name: string; path: string };

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/media");
    const data = await res.json();
    setFiles(data.files || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function onUpload(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setUploading(true);
    setMessage("");
    const res = await fetch("/api/media", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      setMessage("Upload failed");
      return;
    }
    form.reset();
    setMessage("Uploaded to shared content folder");
    await load();
  }

  async function remove(name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    await fetch("/api/media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    await load();
  }

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Media"
        description="Images live in leens-content/images and power both the public site and this studio."
      />

      <form onSubmit={onUpload} className="surface flex flex-wrap items-end gap-4 p-5 md:p-6">
        <div className="min-w-[220px] flex-1">
          <label className="label" htmlFor="file">
            Upload image
          </label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            required
            className="block w-full text-sm text-muted file:mr-3 file:rounded-[10px] file:border-0 file:bg-sage-soft file:px-3 file:py-2 file:text-sm file:font-medium file:text-fg"
          />
        </div>
        <button type="submit" className="btn btn-accent" disabled={uploading}>
          <UploadSimple size={16} weight="bold" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {message ? <p className="w-full text-sm text-ok">{message}</p> : null}
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((f, i) => (
          <motion.article
            key={f.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="surface overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/media-file/${f.name}`}
              alt={f.name}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="space-y-2 p-4">
              <p className="truncate text-sm font-medium">{f.name}</p>
              <p className="truncate text-xs text-soft">{f.path}</p>
              <button
                type="button"
                className="btn btn-danger w-full text-sm"
                onClick={() => remove(f.name)}
              >
                <Trash size={14} />
                Delete
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
