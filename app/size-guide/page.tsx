import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Wig Size Guide — ${brand.name}`,
  description: `Cap sizes, lengths, and how to measure your head for the perfect ${brand.name} fit.`,
};

const CAP_SIZES: { size: string; circumference: string; fits: string }[] = [
  { size: "Petite", circumference: "52–54 cm / 20.5–21.5 in", fits: "Smaller head — a snug, secure fit." },
  { size: "Average", circumference: "54.5–57 cm / 21.5–22.5 in", fits: "Fits most clients — our default size." },
  { size: "Large", circumference: "57–59.5 cm / 22.5–23.5 in", fits: "Fuller head — a roomy, comfortable fit." },
];

const LENGTHS: { length: string; falls: string; bestFor: string }[] = [
  { length: "8–10 in · Bob", falls: "Chin to jaw", bestFor: "Sharp, low-maintenance everyday looks." },
  { length: "12–14 in", falls: "Shoulder", bestFor: "Soft, versatile and office-ready." },
  { length: "16–18 in", falls: "Below shoulder", bestFor: "Glam, full-bodied volume." },
  { length: "20–22 in", falls: "Mid-back", bestFor: "Dramatic, flowing length." },
  { length: "24–30 in", falls: "Waist", bestFor: "Maximum drama for a statement look." },
];

export default function SizeGuidePage() {
  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary mb-2">
        Wig size guide
      </p>
      <h1 className="font-display text-[clamp(2.5rem,7vw,5rem)] mb-4 -tracking-[0.04em] leading-[1.0]">
        Find your fit.
      </h1>
      <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-12">
        Almost every {brand.name} unit comes in an Average cap with adjustable
        straps and combs, so it fits a range of head sizes. Use the charts below
        to pick your cap size and length — and message us if you're between sizes.
      </p>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2 -tracking-[0.025em]">Cap sizes</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Measure the circumference of your head around the hairline. Adjustable
          straps give roughly ±1 in of room on either side.
        </p>
        <SizeTable
          headings={["Cap size", "Head circumference", "Fit"]}
          rows={CAP_SIZES.map((r) => [r.size, r.circumference, r.fits])}
        />
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-bold mb-2 -tracking-[0.025em]">Lengths</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Lengths are measured straight from the top of the cap. Curly and wavy
          textures will appear shorter than their stretched length.
        </p>
        <SizeTable
          headings={["Length", "Falls around", "Best for"]}
          rows={LENGTHS.map((r) => [r.length, r.falls, r.bestFor])}
        />
      </section>

      <section className="rounded-2xl bg-foreground text-background p-6 sm:p-8">
        <h2 className="text-xl font-bold mb-3 -tracking-[0.025em]">How to measure your head</h2>
        <ul className="space-y-3 text-background/85 leading-relaxed">
          <li>
            <strong className="text-background">Circumference</strong> — Wrap a soft
            tape around your hairline: across the forehead, above the ears, and
            around the nape, back to the start.
          </li>
          <li>
            <strong className="text-background">Front to nape</strong> — From your
            front hairline straight over the top of your head to the nape.
          </li>
          <li>
            <strong className="text-background">Ear to ear</strong> — Over the top of
            your head, from the top of one ear to the other.
          </li>
        </ul>
      </section>

      <p className="mt-12 text-sm text-muted-foreground">
        Not sure which size or length suits you?{" "}
        <a
          href={`mailto:${brand.faq.contactEmail}`}
          className="text-primary font-semibold hover:underline"
        >
          Email us your measurements
        </a>{" "}
        and our stylists will recommend a unit.
      </p>
    </article>
  );
}

function SizeTable({
  headings,
  rows,
}: {
  headings: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr>
            {headings.map((h) => (
              <th
                key={h}
                className="text-left font-semibold uppercase tracking-wider text-[11px] text-muted-foreground px-4 py-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={r[0]}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/30"}
            >
              {r.map((cell, j) => (
                <td
                  key={j}
                  className={[
                    "px-4 py-3",
                    j === 0 ? "font-semibold text-foreground" : "text-foreground/80",
                  ].join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
