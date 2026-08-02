"use client";

import { SaveBar, useSiteEditor } from "@/components/save-bar";
import type { SiteData } from "@/lib/types";

export function RestaurantEditor({ initial }: { initial: SiteData }) {
  const { data, setData, save, saving, message, error } = useSiteEditor(initial);
  const r = data.restaurant;

  function patch(partial: Partial<typeof r>) {
    setData({ ...data, restaurant: { ...r, ...partial } });
  }

  function patchHour(index: number, key: "label" | "value", value: string) {
    const hours = r.hours.map((h, i) => (i === index ? { ...h, [key]: value } : h));
    patch({ hours });
  }

  return (
    <div className="space-y-6">
      <div className="surface grid gap-4 p-5 md:grid-cols-2 md:p-6">
        {(
          [
            ["name", "Short name"],
            ["fullName", "Full name"],
            ["tagline", "Tagline"],
            ["chef", "Chef"],
            ["award", "Award"],
            ["phone", "Phone"],
            ["phoneHref", "Phone link"],
            ["email", "Email"],
            ["address", "Address"],
            ["neighbourhood", "Neighbourhood"],
            ["city", "City"],
            ["postcode", "Postcode"],
            ["country", "Country"],
            ["mapsUrl", "Maps URL"],
            ["michelinUrl", "Michelin URL"],
          ] as const
        ).map(([key, label]) => (
          <div key={key} className={key.includes("Url") || key === "tagline" ? "md:col-span-2" : ""}>
            <label className="label">{label}</label>
            <input
              className="field"
              value={r[key]}
              onChange={(e) => patch({ [key]: e.target.value })}
            />
          </div>
        ))}
      </div>

      <div className="surface p-5 md:p-6">
        <p className="text-sm font-medium text-fg">Opening hours</p>
        <div className="mt-4 space-y-3">
          {r.hours.map((h, i) => (
            <div key={i} className="grid gap-3 md:grid-cols-2">
              <input
                className="field"
                value={h.label}
                onChange={(e) => patchHour(i, "label", e.target.value)}
                placeholder="Label"
              />
              <input
                className="field"
                value={h.value}
                onChange={(e) => patchHour(i, "value", e.target.value)}
                placeholder="Hours"
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-ghost text-sm"
            onClick={() =>
              patch({ hours: [...r.hours, { label: "New day", value: "6:00 pm - 12:00 am" }] })
            }
          >
            Add hours row
          </button>
        </div>
      </div>

      <SaveBar saving={saving} message={message} error={error} onSave={() => save()} />
    </div>
  );
}
