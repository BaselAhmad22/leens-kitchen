import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { getSiteData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Starters, pide, sharing mains, and sweets from Leen's Middle East Kitchen in TTDI.",
};

export default async function MenuPage() {
  const { menuCategories } = await getSiteData();

  return (
    <div className="studio-glow pt-[72px]">
      <section className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
            Menu
          </p>
          <h1 className="mt-3 max-w-[12ch] text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Menu for sharing
          </h1>
          <p className="mt-5 max-w-[52ch] text-base text-fg-muted md:text-lg">
            Prices in RM. Portions are generous. Staff often advise against
            over-ordering, so start with a few plates and go from there.
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {menuCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="focus-ring rounded-[10px] border border-border bg-bg-elevated px-4 py-2 text-sm text-fg-muted shadow-[var(--shadow-sm)] transition-colors hover:bg-sage-soft hover:text-fg"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {menuCategories.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`scroll-mt-28 border-t border-border ${
            index % 2 === 1 ? "bg-bg-muted/35" : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8 md:py-20">
            <Reveal>
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                {category.title}
              </h2>
              <p className="mt-3 max-w-[48ch] text-fg-muted">{category.intro}</p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              {category.items.map((item, i) => (
                <Reveal
                  key={item.id}
                  delay={i * 0.04}
                  className={`surface-soft overflow-hidden ${
                    item.image ? "md:col-span-2 md:grid md:grid-cols-2" : ""
                  }`}
                >
                  {item.image ? (
                    <div className="relative aspect-[16/11] md:aspect-auto md:min-h-[260px]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-col justify-center p-5 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-medium tracking-tight">
                        {item.name}
                        {item.highlight ? (
                          <span className="ml-2 text-sm font-normal text-accent">
                            Favourite
                          </span>
                        ) : null}
                      </h3>
                      <p className="shrink-0 font-medium text-accent">RM {item.price}</p>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t border-border bg-bg-muted/40">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-4 py-14 md:flex-row md:items-center md:px-8">
          <p className="max-w-[40ch] text-lg text-fg-muted">
            Ready when you are. We hold tables for dinner service and weekend lunch.
          </p>
          <Link href="/reserve" className="btn-primary">
            Reserve a table
          </Link>
        </div>
      </section>
    </div>
  );
}
