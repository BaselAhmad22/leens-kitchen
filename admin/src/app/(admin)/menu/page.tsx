import { readSiteData } from "@/lib/content";
import { MenuEditor } from "./editor";

export default function MenuAdminPage() {
  const data = readSiteData();
  return <MenuEditor initial={data} />;
}
