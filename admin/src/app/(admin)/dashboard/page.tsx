import { readSiteData, listImages } from "@/lib/content";
import { DashboardClient } from "./dashboard-client";

export default function DashboardPage() {
  const data = readSiteData();
  const images = listImages();
  const itemCount = data.menuCategories.reduce((n, c) => n + c.items.length, 0);

  const cards = [
    { label: "Menu items", value: String(itemCount), href: "/menu" },
    { label: "Categories", value: String(data.menuCategories.length), href: "/menu" },
    { label: "Signatures", value: String(data.signatures.length), href: "/signatures" },
    { label: "Quotes", value: String(data.testimonials.length), href: "/testimonials" },
    { label: "Images", value: String(images.length), href: "/media" },
  ];

  return <DashboardClient cards={cards} restaurant={data.restaurant} />;
}
