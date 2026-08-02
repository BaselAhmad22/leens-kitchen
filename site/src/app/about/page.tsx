import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Story",
  description:
    "How chef Ameer Alzalek brought modern Syrian cooking to TTDI and earned a MICHELIN Bib Gourmand.",
};

export default async function AboutPage() {
  const { restaurant } = await getSiteData();
  return (
    <div className="studio-glow pt-[72px]">
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-24">
        <Reveal>
          <h1 className="max-w-[14ch] text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl lg:leading-[1.05]">
            Damascus roots, TTDI evenings
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-fg-muted">
            Chef {restaurant.chef} left Syria a decade ago. At {restaurant.name},
            he cooks the sharp, bright food of home with the curiosity of a
            cross-cultural kitchen in Kuala Lumpur.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 md:px-8">
        <div className="surface relative min-h-[50dvh] overflow-hidden md:min-h-[65dvh]">
          <Image
            src="/images/atmosphere-interior.png"
            alt="Evening dining room with brick oven light"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-12 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-5">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            From delivery bags to Bib Gourmand
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="space-y-5 text-base leading-relaxed text-fg-muted md:col-span-7">
          <p>
            During the pandemic, Ameer cooked Syrian meals for neighbours who
            missed home flavours. Demand grew until a brick-and-mortar upstairs
            room on Jalan Burhanuddin Helmi made sense.
          </p>
          <p>
            The room fills with the smell of fresh Arabic bread. Guests lean
            into smoked hummus, pide from the oven, and mains built for sharing.
            In 2025, the MICHELIN Guide recognised the kitchen with a Bib
            Gourmand for good quality cooking at a fair price.
          </p>
          <p>
            The cooking stays personal: charcoal-smoked olive oil on hummus,
            muhammara under lamb, local herbs on kampung chicken. Familiar Middle
            Eastern plates, tuned with Syrian tang and a modern hand.
          </p>
        </Reveal>
      </section>

      <section className="bg-bg-muted/35">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-20 md:grid-cols-12 md:px-8 md:py-28">
          <Reveal className="surface relative aspect-[3/4] overflow-hidden md:col-span-5">
            <Image
              src="/images/story-oven.png"
              alt="Dough prepared beside the brick oven"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </Reveal>
          <div className="md:col-span-7 md:pl-6">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                The oven is the heartbeat
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-fg-muted">
                Take a seat at the chef&apos;s counter if you can. Watch bread
                puff, meat sear, and spice hit the pan. Or claim a window table
                as the neighbourhood lights come on.
              </p>
              <Link href="/reserve" className="btn-primary mt-8">
                Reserve a table
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
