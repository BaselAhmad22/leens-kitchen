"use client";

import { SaveBar, useSiteEditor } from "@/components/save-bar";
import type { SiteData } from "@/lib/types";
import { Plus, Trash } from "@phosphor-icons/react";

export function TestimonialsEditor({ initial }: { initial: SiteData }) {
  const { data, setData, save, saving, message, error } = useSiteEditor(initial);

  return (
    <div className="space-y-4">
      {data.testimonials.map((t, index) => (
        <div key={t.id} className="surface p-5 md:p-6">
          <div>
            <label className="label">Quote</label>
            <textarea
              className="field min-h-[90px]"
              value={t.quote}
              onChange={(e) => {
                const testimonials = data.testimonials.map((row, i) =>
                  i === index ? { ...row, quote: e.target.value } : row
                );
                setData({ ...data, testimonials });
              }}
            />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div>
              <label className="label">Name</label>
              <input
                className="field"
                value={t.name}
                onChange={(e) => {
                  const testimonials = data.testimonials.map((row, i) =>
                    i === index ? { ...row, name: e.target.value } : row
                  );
                  setData({ ...data, testimonials });
                }}
              />
            </div>
            <div>
              <label className="label">Role</label>
              <input
                className="field"
                value={t.role}
                onChange={(e) => {
                  const testimonials = data.testimonials.map((row, i) =>
                    i === index ? { ...row, role: e.target.value } : row
                  );
                  setData({ ...data, testimonials });
                }}
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger mt-4 text-sm"
            onClick={() =>
              setData({
                ...data,
                testimonials: data.testimonials.filter((_, i) => i !== index),
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
            testimonials: [
              ...data.testimonials,
              { id: `t-${Date.now()}`, quote: "", name: "", role: "" },
            ],
          })
        }
      >
        <Plus size={16} weight="bold" />
        Add testimonial
      </button>

      <SaveBar saving={saving} message={message} error={error} onSave={() => save()} />
    </div>
  );
}
