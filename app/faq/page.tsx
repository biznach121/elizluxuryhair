import type { Metadata } from "next";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `FAQ — ${brand.name}`,
  description: "Choosing a wig, wig care, shipping, returns — answers to the questions we hear most often.",
};

export default function FaqPage() {
  const f = brand.faq;
  return (
    <article className="max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-16">
      <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-primary mb-2">
        {f.eyebrow}
      </p>
      <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold mb-10 -tracking-[0.025em]">
        {f.title}
      </h1>
      <div className="space-y-12">
        {f.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl font-semibold mb-5 -tracking-[0.02em]">{section.title}</h2>
            <dl className="space-y-6">
              {section.items.map((item) => (
                <div key={item.q}>
                  <dt className="font-semibold text-foreground mb-1.5">{item.q}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{item.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className="mt-12 pt-8 border-t border-border text-sm text-muted-foreground break-words">
        {f.contactPrompt}{" "}
        <a
          href={`mailto:${f.contactEmail}`}
          className="text-primary font-semibold hover:underline"
        >
          {f.contactEmail}
        </a>{" "}
        and a real human will reply within 24 hours.
      </p>
    </article>
  );
}
