import Image from "next/image";
import { brand } from "@/lib/brand";

/**
 * "About Eliz Luxury Hair" — a series of full-height blocks that alternate a large
 * portrait against a heavy uppercase heading + underline dash + copy
 * (dhair-boutique's "About / High quality / …" flow). The intro block leads
 * with `about.eyebrow` as its heading and closes on `about.title` as a bold
 * line; each `about.sections` entry becomes its own flipped block.
 */
export function AboutHome() {
  const a = brand.about;
  // Homepage shows just the intro + first section (two blocks). The full
  // `/about` page still renders every `about.sections` entry.
  const blocks: { heading: string; image: string; video?: string; body: string[]; tagline?: string }[] = [
    { heading: a.eyebrow, image: a.image, video: a.video, body: a.paragraphs, tagline: a.title },
    ...a.sections.map((s) => ({ heading: s.heading, image: s.image, body: [s.body] })),
  ].slice(0, 2);

  return (
    <>
      {blocks.map((b, i) => (
        <AboutBlock key={b.heading} {...b} reverse={i % 2 === 1} />
      ))}
    </>
  );
}

function AboutBlock({
  heading,
  image,
  video,
  body,
  tagline,
  reverse,
}: {
  heading: string;
  image: string;
  video?: string;
  body: string[];
  tagline?: string;
  reverse: boolean;
}) {
  return (
    <section className="grid items-stretch lg:min-h-[100svh] lg:grid-cols-2">
      <div className={`relative min-h-[55vh] lg:min-h-0 ${reverse ? "lg:order-2" : "lg:order-1"}`}>
        {video ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={heading}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Image
            src={image}
            alt={heading}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div
        className={`flex flex-col justify-center px-7 py-14 sm:px-12 lg:px-16 ${reverse ? "lg:order-1" : "lg:order-2"}`}
      >
        <h2 className="m-0 font-display text-[clamp(2.25rem,5vw,4rem)] font-black uppercase leading-[1.02] tracking-tight">
          {heading}
        </h2>
        <span className="my-7 block h-0.5 w-12 bg-foreground" />
        <div className="max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {tagline && <p className="font-semibold text-foreground">{tagline}</p>}
        </div>
      </div>
    </section>
  );
}
