const items = [
  "Smoked Hummus",
  "Mariah Pide",
  "Kebab Khashkhash",
  "Lamb Rack",
  "Halloumi Fattoush",
  "Kunafa Ice Cream",
  "Wagyu Beef",
  "Arabic Bread",
];

export function DishMarquee() {
  const doubled = [...items, ...items];

  return (
    <section
      className="overflow-hidden border-y border-border bg-sage-soft/50 py-4"
      aria-label="Signature dishes"
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-4">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-sm font-medium tracking-wide text-sage"
          >
            {item}
            <span className="ml-10 text-sage/50" aria-hidden>
              *
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
