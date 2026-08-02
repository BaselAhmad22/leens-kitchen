import { readSiteData } from "@/lib/content";
import { PageHeader } from "@/components/save-bar";
import { SignaturesEditor } from "./editor";

export default function SignaturesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Homepage"
        title="Signature plates"
        description="The three featured dishes guests meet first on the homepage."
      />
      <SignaturesEditor initial={readSiteData()} />
    </div>
  );
}
