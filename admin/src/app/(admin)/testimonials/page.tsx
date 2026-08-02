import { readSiteData } from "@/lib/content";
import { PageHeader } from "@/components/save-bar";
import { TestimonialsEditor } from "./editor";

export default function TestimonialsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Social proof"
        title="Guest quotes"
        description="Short reviews shown on the homepage. Keep each quote under three lines."
      />
      <TestimonialsEditor initial={readSiteData()} />
    </div>
  );
}
