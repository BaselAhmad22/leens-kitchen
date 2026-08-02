"use client";

import { useState } from "react";
import { ImagePicker } from "@/components/image-picker";
import { SaveBar, useSiteEditor } from "@/components/save-bar";
import type { MenuCategory, MenuItem, SiteData } from "@/lib/types";
import {
  ArrowLeft,
  CaretRight,
  ForkKnife,
  Plus,
  Trash,
} from "@phosphor-icons/react";

function newId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

type View =
  | { level: "categories" }
  | { level: "category"; catId: string }
  | { level: "dish"; catId: string; itemId: string };

export function MenuEditor({ initial }: { initial: SiteData }) {
  const { data, setData, save, saving, message, error } = useSiteEditor(initial);
  const [view, setView] = useState<View>({ level: "categories" });

  function setCategories(menuCategories: MenuCategory[]) {
    setData({ ...data, menuCategories });
  }

  const catIndex = view.level !== "categories"
    ? data.menuCategories.findIndex((c) => c.id === view.catId)
    : -1;
  const category = catIndex >= 0 ? data.menuCategories[catIndex] : null;

  const itemIndex =
    view.level === "dish" && category
      ? category.items.findIndex((item) => item.id === view.itemId)
      : -1;
  const dish =
    view.level === "dish" && category && itemIndex >= 0
      ? category.items[itemIndex]
      : null;

  function updateCategory(partial: Partial<MenuCategory>) {
    if (catIndex < 0) return;
    setCategories(
      data.menuCategories.map((c, i) => (i === catIndex ? { ...c, ...partial } : c))
    );
  }

  function updateItem(partial: Partial<MenuItem>) {
    if (catIndex < 0 || itemIndex < 0) return;
    setCategories(
      data.menuCategories.map((c, i) => {
        if (i !== catIndex) return c;
        return {
          ...c,
          items: c.items.map((item, j) =>
            j === itemIndex ? { ...item, ...partial } : item
          ),
        };
      })
    );
  }

  function addCategory() {
    const id = newId("cat");
    setCategories([
      ...data.menuCategories,
      { id, title: "New category", intro: "", items: [] },
    ]);
    setView({ level: "category", catId: id });
  }

  function removeCategory() {
    if (catIndex < 0) return;
    if (!confirm("Delete this category and all its dishes?")) return;
    setCategories(data.menuCategories.filter((_, i) => i !== catIndex));
    setView({ level: "categories" });
  }

  function addItem() {
    if (catIndex < 0 || !category) return;
    const id = newId("item");
    setCategories(
      data.menuCategories.map((c, i) => {
        if (i !== catIndex) return c;
        return {
          ...c,
          items: [
            ...c.items,
            {
              id,
              name: "New dish",
              description: "",
              price: 0,
              highlight: false,
              image: "",
            },
          ],
        };
      })
    );
    setView({ level: "dish", catId: category.id, itemId: id });
  }

  function removeItem() {
    if (catIndex < 0 || itemIndex < 0 || !category) return;
    if (!confirm("Delete this dish?")) return;
    setCategories(
      data.menuCategories.map((c, i) => {
        if (i !== catIndex) return c;
        return { ...c, items: c.items.filter((_, j) => j !== itemIndex) };
      })
    );
    setView({ level: "category", catId: category.id });
  }

  return (
    <div className="space-y-6">
      <header className="mb-2 max-w-2xl">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
          Menu
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          {view.level === "categories"
            ? "Categories"
            : view.level === "category"
              ? category?.title || "Category"
              : dish?.name || "Dish"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
          {view.level === "categories"
            ? "Pick a category to edit its details and browse dishes."
            : view.level === "category"
              ? "Edit this category, then open a dish row for the full plate editor."
              : "Full dish details — name, price, description, highlight, and image."}
        </p>
      </header>

      {view.level === "categories" ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted">
              {data.menuCategories.length} categor
              {data.menuCategories.length === 1 ? "y" : "ies"}
            </p>
            <button type="button" className="btn btn-accent text-sm" onClick={addCategory}>
              <Plus size={16} weight="bold" />
              Add category
            </button>
          </div>

          <div className="grid gap-3">
            {data.menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setView({ level: "category", catId: cat.id })}
                className="surface surface-interactive group flex w-full items-center gap-4 px-5 py-4 text-left md:px-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-sage-soft text-sage">
                  <ForkKnife size={20} weight="duotone" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-semibold tracking-tight text-fg">
                    {cat.title || "Untitled category"}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-muted">
                    {cat.items.length} dish{cat.items.length === 1 ? "" : "es"}
                    {cat.intro ? ` · ${cat.intro}` : ""}
                  </p>
                </div>
                <CaretRight
                  size={18}
                  className="shrink-0 text-soft transition-transform group-hover:translate-x-0.5"
                />
              </button>
            ))}

            {data.menuCategories.length === 0 ? (
              <div className="surface px-6 py-12 text-center text-sm text-muted">
                No categories yet. Add one to start building the menu.
              </div>
            ) : null}
          </div>
        </>
      ) : null}

      {view.level === "category" && category ? (
        <>
          <Breadcrumb
            items={[
              { label: "Categories", onClick: () => setView({ level: "categories" }) },
              { label: category.title || "Category" },
            ]}
          />

          <section className="surface overflow-hidden">
            <div className="border-b border-border px-5 py-4 md:px-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold tracking-tight text-fg">
                  Category details
                </h2>
                <button type="button" className="btn btn-danger text-sm" onClick={removeCategory}>
                  <Trash size={16} />
                  Delete category
                </button>
              </div>
            </div>
            <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
              <div>
                <label className="label">Title</label>
                <input
                  className="field"
                  value={category.title}
                  onChange={(e) => updateCategory({ title: e.target.value })}
                />
              </div>
              <div>
                <label className="label">URL id</label>
                <input
                  className="field"
                  value={category.id}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    updateCategory({ id: nextId });
                    setView({ level: "category", catId: nextId });
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Intro</label>
                <textarea
                  className="field min-h-[80px]"
                  value={category.intro}
                  onChange={(e) => updateCategory({ intro: e.target.value })}
                />
              </div>
            </div>
          </section>

          <section className="surface overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-fg">Dishes</h2>
                <p className="mt-0.5 text-sm text-muted">
                  {category.items.length} item{category.items.length === 1 ? "" : "s"} · click a
                  row for full details
                </p>
              </div>
              <button type="button" className="btn btn-ghost text-sm" onClick={addItem}>
                <Plus size={16} weight="bold" />
                Add dish
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border bg-panel-2/60 text-[0.72rem] uppercase tracking-[0.08em] text-muted">
                  <tr>
                    <th className="px-5 py-3 font-medium md:px-6">Dish</th>
                    <th className="px-3 py-3 font-medium">Price</th>
                    <th className="px-3 py-3 font-medium">Highlight</th>
                    <th className="px-3 py-3 font-medium">Image</th>
                    <th className="px-5 py-3 font-medium md:px-6" />
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
                    <tr
                      key={item.id}
                      className="cursor-pointer border-b border-border last:border-b-0 transition-colors hover:bg-panel-2/50"
                      onClick={() =>
                        setView({
                          level: "dish",
                          catId: category.id,
                          itemId: item.id,
                        })
                      }
                    >
                      <td className="px-5 py-3.5 md:px-6">
                        <p className="font-medium text-fg">{item.name || "Untitled"}</p>
                        <p className="mt-0.5 line-clamp-1 max-w-[28ch] text-xs text-muted">
                          {item.description || "No description"}
                        </p>
                      </td>
                      <td className="px-3 py-3.5 tabular-nums text-fg">RM {item.price}</td>
                      <td className="px-3 py-3.5">
                        {item.highlight ? (
                          <span className="rounded-full bg-sage-soft px-2 py-0.5 text-xs text-sage">
                            Yes
                          </span>
                        ) : (
                          <span className="text-soft">—</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5">
                        {item.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`/api/media-file/${item.image.replace("/images/", "")}`}
                            alt=""
                            className="h-9 w-12 rounded-md border border-border object-cover"
                          />
                        ) : (
                          <span className="text-soft">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right md:px-6">
                        <CaretRight size={16} className="inline text-soft" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {category.items.length === 0 ? (
                <p className="px-6 py-10 text-center text-sm text-muted">
                  No dishes in this category yet.
                </p>
              ) : null}
            </div>
          </section>
        </>
      ) : null}

      {view.level === "dish" && category && dish ? (
        <>
          <Breadcrumb
            items={[
              { label: "Categories", onClick: () => setView({ level: "categories" }) },
              {
                label: category.title || "Category",
                onClick: () => setView({ level: "category", catId: category.id }),
              },
              { label: dish.name || "Dish" },
            ]}
          />

          <section className="surface overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
              <h2 className="text-lg font-semibold tracking-tight text-fg">Dish details</h2>
              <button type="button" className="btn btn-danger text-sm" onClick={removeItem}>
                <Trash size={16} />
                Delete dish
              </button>
            </div>

            <div className="grid gap-4 p-5 md:grid-cols-2 md:p-6">
              <div>
                <label className="label">Dish name</label>
                <input
                  className="field"
                  value={dish.name}
                  onChange={(e) => updateItem({ name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Price (RM)</label>
                <input
                  className="field"
                  type="number"
                  value={dish.price}
                  onChange={(e) => updateItem({ price: Number(e.target.value) || 0 })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Description</label>
                <textarea
                  className="field min-h-[110px]"
                  value={dish.description}
                  onChange={(e) => updateItem({ description: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={Boolean(dish.highlight)}
                    onChange={(e) => updateItem({ highlight: e.target.checked })}
                  />
                  Favourite highlight on the public site
                </label>
              </div>
              <div className="md:col-span-2">
                <label className="label">Image</label>
                <ImagePicker
                  value={dish.image}
                  onChange={(image) => updateItem({ image })}
                />
              </div>
            </div>
          </section>

          <button
            type="button"
            className="btn btn-ghost text-sm"
            onClick={() => setView({ level: "category", catId: category.id })}
          >
            <ArrowLeft size={16} />
            Back to {category.title || "category"}
          </button>
        </>
      ) : null}

      {view.level !== "categories" && !category ? (
        <div className="surface px-6 py-10 text-center">
          <p className="text-sm text-muted">This category no longer exists.</p>
          <button
            type="button"
            className="btn btn-ghost mt-4 text-sm"
            onClick={() => setView({ level: "categories" })}
          >
            <ArrowLeft size={16} />
            Back to categories
          </button>
        </div>
      ) : null}

      <SaveBar saving={saving} message={message} error={error} onSave={() => save()} />
    </div>
  );
}

function Breadcrumb({
  items,
}: {
  items: { label: string; onClick?: () => void }[];
}) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
            {index > 0 ? <CaretRight size={12} className="text-soft" /> : null}
            {item.onClick && !last ? (
              <button
                type="button"
                onClick={item.onClick}
                className="rounded-md px-1 py-0.5 transition-colors hover:bg-panel-2 hover:text-fg"
              >
                {item.label}
              </button>
            ) : (
              <span className={last ? "font-medium text-fg" : undefined}>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
