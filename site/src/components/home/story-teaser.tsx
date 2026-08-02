import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getSiteData } from "@/lib/content";

export async function StoryTeaser() {
  const { restaurant } = await getSiteData();
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="surface relative aspect-[3/4] overflow-hidden md:col-span-5">
          <Image
            src="/images/story-oven.png"
            alt="Hands shaping dough beside the brick oven"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </Reveal>

        <div className="md:col-span-7 md:pl-4 lg:pl-10">
          <Reveal>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
              The kitchen
            </p>
            <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold tracking-tight text-fg md:text-4xl lg:text-5xl lg:leading-[1.08]">
              Built from home cooking, now a neighbourhood favourite
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-fg-muted">
              After delivering Syrian meals through the pandemic,{" "}
              {restaurant.chef} opened this brick-and-mortar upstairs space. The
              oven stays busy. The hummus stays smoky. Guests come back for
              sharp, bright plates that feel unmistakably Syrian.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <Link href="/about" className="btn-secondary mt-8">
              Read the story
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
