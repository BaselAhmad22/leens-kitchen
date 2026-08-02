import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

const tiles = [
  {
    name: "Mariah Pide",
    price: 45,
    image: "/images/dish-pide.png",
    className: "md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[520px]",
  },
  {
    name: "Halloumi Fattoush",
    price: 35,
    image: "/images/dish-fattoush.png",
    className: "md:col-span-5 min-h-[240px]",
  },
  {
    name: "Kunafa Ice Cream",
    price: 28,
    image: "/images/dish-kunafa.png",
    className: "md:col-span-5 min-h-[240px]",
  },
];

export function MenuBento() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8 md:py-28">
      <Reveal>
        <h2 className="max-w-[18ch] text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          More to share across the table
        </h2>
        <p className="mt-4 max-w-[48ch] text-base text-fg-muted">
          Pide from the brick oven, bright salads, and a crackly kunafa finish.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-12 md:grid-rows-2 md:gap-5">
        {tiles.map((tile, i) => (
          <Reveal
            key={tile.name}
            delay={i * 0.06}
            className={`surface group relative overflow-hidden ${tile.className}`}
          >
            <Image
              src={tile.image}
              alt={tile.name}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,#2c3330_68%,transparent)] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
              <p className="text-lg font-medium text-white md:text-xl">{tile.name}</p>
              <p className="mt-1 text-sm text-white/80">RM {tile.price}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-8">
        <Link href="/menu" className="btn-primary">
          View menu
        </Link>
      </Reveal>
    </section>
  );
}
