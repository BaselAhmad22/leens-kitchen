import Link from "next/link";
import { MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/reveal";
import { getSiteData } from "@/lib/content";

export async function VisitCta() {
  const { restaurant } = await getSiteData();
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <div className="surface relative grid gap-10 overflow-hidden p-8 md:grid-cols-12 md:gap-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--sage)_12%,transparent),transparent_50%)]" />
        <Reveal className="relative md:col-span-7">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.16em] text-sage">
            Plan your visit
          </p>
          <h2 className="mt-4 max-w-[16ch] text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Come hungry. Tables fill early.
          </h2>
          <p className="mt-5 max-w-[46ch] text-base text-fg-muted">
            Evening service runs late. Weekend lunch is shorter. Call ahead or
            reserve online so we can hold a spot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/reserve" className="btn-primary">
              Reserve a table
            </Link>
            <a href={restaurant.phoneHref} className="btn-secondary">
              Call the kitchen
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative md:col-span-5">
          <ul className="space-y-5 rounded-[14px] bg-sage-soft/60 p-5 text-sm text-fg-muted md:mt-6 md:p-6">
            <li className="flex gap-3">
              <MapPin size={20} className="shrink-0 text-accent" weight="duotone" />
              <span>
                {restaurant.address}
                <br />
                {restaurant.neighbourhood}, {restaurant.city}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="shrink-0 text-accent" weight="duotone" />
              <a className="hover:text-fg" href={restaurant.phoneHref}>
                {restaurant.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={20} className="shrink-0 text-accent" weight="duotone" />
              <div className="space-y-1">
                {restaurant.hours.map((h) => (
                  <p key={h.label}>
                    <span className="text-fg">{h.label}:</span> {h.value}
                  </p>
                ))}
              </div>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
