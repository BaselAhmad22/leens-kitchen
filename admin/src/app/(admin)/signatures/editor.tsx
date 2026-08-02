"use client";

import { ImagePicker } from "@/components/image-picker";
import { SaveBar, useSiteEditor } from "@/components/save-bar";
import type { SiteData } from "@/lib/types";
import { Plus, Trash } from "@phosphor-icons/react";

export function SignaturesEditor({ initial }: { initial: SiteData }) {
  const { data, setData, save, saving, message, error } = useSiteEditor(initial);

  return (
    <div className="space-y-4">
      {data.signatures.map((sig, index) => (
        <div key={sig.id} className="surface p-5 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input
                className="field"
                value={sig.name}
                onChange={(e) => {
                  const signatures = data.signatures.map((s, i) =>
                    i === index ? { ...s, name: e.target.value } : s
                  );
                  setData({ ...data, signatures });
                }}
              />
            </div>
            <div>
              <label className="label">Price</label>
              <input
                className="field"
                type="number"
                value={sig.price}
                onChange={(e) => {
                  const signatures = data.signatures.map((s, i) =>
                    i === index ? { ...s, price: Number(e.target.value) || 0 } : s
                  );
                  setData({ ...data, signatures });
                }}
              />
            </div>
          </div>
          <div className="mt-3">
            <label className="label">Note</label>
            <textarea
              className="field min-h-[80px]"
              value={sig.note}
              onChange={(e) => {
                const signatures = data.signatures.map((s, i) =>
                  i === index ? { ...s, note: e.target.value } : s
                );
                setData({ ...data, signatures });
              }}
            />
          </div>
          <div className="mt-4">
            <label className="label">Image</label>
            <ImagePicker
              value={sig.image}
              onChange={(image) => {
                const signatures = data.signatures.map((s, i) =>
                  i === index ? { ...s, image } : s
                );
                setData({ ...data, signatures });
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-danger mt-4 text-sm"
            onClick={() =>
              setData({
                ...data,
                signatures: data.signatures.filter((_, i) => i !== index),
              })
            }
          >
            <Trash size={14} />
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-sage"
        onClick={() =>
          setData({
            ...data,
            signatures: [
              ...data.signatures,
              {
                id: `sig-${Date.now()}`,
                name: "New signature",
                price: 0,
                note: "",
                image: "",
              },
            ],
          })
        }
      >
        <Plus size={16} weight="bold" />
        Add signature
      </button>

      <SaveBar saving={saving} message={message} error={error} onSave={() => save()} />
    </div>
  );
}
