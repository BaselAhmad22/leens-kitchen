import { readSiteData } from "@/lib/content";
import { PageHeader } from "@/components/save-bar";
import { RestaurantEditor } from "./editor";

export default function RestaurantPage() {
  const data = readSiteData();
  return (
    <div>
      <PageHeader
        eyebrow="Restaurant"
        title="Venue details"
        description="Name, chef, hours, and contact info used across the homepage, footer, story, and reserve pages."
      />
      <RestaurantEditor initial={data} />
    </div>
  );
}
