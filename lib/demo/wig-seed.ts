/**
 * Eliz Luxury Hair demo catalogue — the wig & mannequin data that powers DEMO mode.
 *
 * This is a custom function-seed for the in-process Cimplify mock
 * (`createMockApp({ seed: wigSeedSource })`, see ./mock.ts). It defines the
 * business, categories, collections and products a shopper sees when no real
 * Cimplify key is set. Everything here is wig-related by construction, so the
 * storefront never surfaces a non-wig product or category.
 *
 * Images are stock placeholders (loremflickr, keyword-matched + locked so they
 * stay stable). Swap the `img()` URLs — or flip to a real Cimplify key — when
 * the client's own product photography is ready.
 */

// The mock ships no type declarations; this is the subset of the seed-context
// API we use (see @cimplify/sdk/dist/mock/library.mjs → makeSeedContext).
type SeedCtx = {
  business: (input: { name: string; default_currency?: string; country_code?: string; [k: string]: unknown }) => unknown;
  category: (input: { name: string; slug?: string; description?: string; image?: string; displayOrder?: number }) => { id: string };
  collection: (input: { name: string; slug?: string; description?: string }) => { id: string };
  product: (input: {
    name: string;
    slug?: string;
    description?: string;
    price: string;
    currency?: string;
    image?: string;
    images?: string[];
    category?: string;
    collection?: string;
    tags?: string[];
    isNew?: boolean;
    isSignature?: boolean;
  }) => { id: string };
};

export const WIG_BUSINESS_ID = "bus_eliz-luxury-hair";
export const WIG_CURRENCY = "GHS";

/** Stable, keyword-matched stock placeholder. Swap for real product photos. */
function img(keyword: string, lock: number, w = 900, h = 1100): string {
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(keyword)}?lock=${lock}`;
}

export const HERO_IMAGE = img("hairstyle,woman", 901, 1920, 1100);

// Real product photography (Cloudinary) — natural-black weft/bundle shots on a
// white background, one per texture. Mapped to products by texture below; swap
// or extend as more shots (and other colours/frontals) arrive.
const SHOT = {
  waterWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648223/icyatp1eb2uzfldty26u.png",
  kinkyCurlyA: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648223/q9dzg70bqwg4jgxa2uiv.png",
  kinkyCurlyB: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648223/mv7zbmxka8par18huvcx.png",
  deepWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648223/s6aec7wrulfinpwtds2q.png",
  looseWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648222/jqnypdwffenn1ahrwm7n.png",
  bodyWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648222/lzrvqe0ytit9hs3hdbjp.png",
  straight: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781648222/ry4pnwzumknb7mmfnemb.png",
} as const;

// Model / lifestyle shots (Cloudinary) — a woman wearing each texture on a
// neutral studio backdrop. Paired with the weft shot above so each demo product
// shows "product → on-model". Same texture keys as SHOT.
const MODEL = {
  waterWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675001/rkrjrudjuiyoiw0vrphe.png",
  kinkyCurlyA: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675002/eelntvlgta2sogqm1coy.png",
  kinkyCurlyB: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675002/jutsbmslzv2mtphufvwj.png",
  straight: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675005/qag0w4swcydpoliutuvz.png",
  bodyWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675004/si9ucxf5cyatshgza3n1.png",
  deepWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675005/xtkrc20tlrd2zs9bkety.png",
  looseWave: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781675003/f7gqoihxxlp8hdok3t7i.png",
} as const;

/** Three demo frames for a product: weft-on-white, then the model shot twice. */
const trio = (weft: string, model: string): string[] => [weft, model, model];

interface SeedProduct {
  name: string;
  description: string;
  price: string;
  category: string;
  collection?: string;
  images?: string[];
  keyword: string;
  lock: number;
  isNew?: boolean;
  isSignature?: boolean;
  tags?: string[];
}

const CATEGORIES: { name: string; slug: string; description: string; keyword: string; lock: number; image?: string }[] = [
  { name: "Lace Front Wigs", slug: "lace-front-wigs", description: "Pre-plucked HD lace fronts with a natural, melt-ready hairline.", keyword: "hairstyle", lock: 40, image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781678898/jschensw1zvs4opuhzco.png" },
  { name: "Closure Wigs", slug: "closure-wigs", description: "Beginner-friendly closure units — secure, full and quick to install.", keyword: "wig", lock: 41, image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781678897/slaarh1ccj3xs2nf7chb.png" },
  { name: "Curly", slug: "curly", description: "Bouncy curls and coils, from kinky to loose, in 100% raw human hair.", keyword: "curly", lock: 42, image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781678895/mcqtotukdwbgdiva0mjz.png" },
  { name: "Body Wave", slug: "body-wave", description: "Soft, glamorous waves with effortless movement and shine.", keyword: "hair", lock: 44, image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781678897/slaarh1ccj3xs2nf7chb.png" },
  { name: "Straight", slug: "straight", description: "Sleek bone-straight and silky-straight units that hold their finish.", keyword: "straight,hair", lock: 43 },
  { name: "Bundles & Bulk", slug: "bundles", description: "Raw, double-drawn weft bundles for custom installs and sew-ins.", keyword: "hair,salon", lock: 45 },
  { name: "Frontals & Closures", slug: "frontals-closures", description: "13x4 frontals and HD closures to finish any install flawlessly.", keyword: "ponytail", lock: 46 },
  { name: "Hair Care", slug: "hair-care", description: "Wig care, edge control and lace-melt essentials to keep units fresh.", keyword: "haircare", lock: 47 },
  { name: "Mannequins", slug: "mannequins", description: "Professional styling mannequins, canvas block heads and stands for washing, installing and storing your unit.", keyword: "mannequin", lock: 48 },
];

const COLLECTIONS: { name: string; slug: string; description: string }[] = [
  { name: "Best Sellers", slug: "best-sellers", description: "The units our Kumasi clients keep coming back for." },
  { name: "New Arrivals", slug: "new-arrivals", description: "Freshly landed textures and lengths, restocked weekly." },
  { name: "The Signature Collection", slug: "signature-collection", description: "Our premium raw, hand-tied units — made to last for years." },
];

const PRODUCTS: SeedProduct[] = [
  { name: "Raw Cambodian Wavy Lace Wig", description: "Raw Cambodian hair on a transparent HD lace front. Natural wave that air-dries flawlessly and lasts for years with care.", price: "4800.00", category: "lace-front-wigs", collection: "signature-collection", keyword: "hairstyle", lock: 11, isSignature: true, images: trio(SHOT.waterWave, MODEL.waterWave) },
  { name: "Burmese Curly HD Lace Front", description: "Tight, bouncy Burmese curls on a glueless HD lace front. Full density, pre-plucked hairline, ready to slay out of the box.", price: "5200.00", category: "lace-front-wigs", collection: "best-sellers", keyword: "wig", lock: 12, images: trio(SHOT.kinkyCurlyA, MODEL.kinkyCurlyA) },
  { name: "Vietnamese Bone Straight Wig", description: "Sleek, glassy bone-straight Vietnamese hair. Holds a pin-straight finish and takes heat beautifully.", price: "4500.00", category: "straight", collection: "best-sellers", keyword: "hairstyle", lock: 13, images: trio(SHOT.straight, MODEL.straight) },
  { name: "Malaysian Body Wave Wig", description: "Soft, glamorous body-wave with effortless movement. A versatile everyday unit that styles in seconds.", price: "4700.00", category: "body-wave", collection: "new-arrivals", keyword: "hair", lock: 14, isNew: true, images: trio(SHOT.bodyWave, MODEL.bodyWave) },
  { name: "Brazilian Deep Wave Closure Wig", description: "Deep, defined waves on a secure 4x4 closure. Beginner-friendly and full from crown to ends.", price: "3900.00", category: "closure-wigs", collection: "best-sellers", keyword: "curly", lock: 15, images: trio(SHOT.deepWave, MODEL.deepWave) },
  { name: "Kinky Curly Glueless Wig", description: "Natural 4C-inspired kinky curls on a glueless cap. The most realistic blend with relaxed and natural hair.", price: "4300.00", category: "curly", collection: "new-arrivals", keyword: "afro", lock: 16, isNew: true, images: trio(SHOT.kinkyCurlyB, MODEL.kinkyCurlyB) },
  { name: "613 Blonde Bombshell Lace Wig", description: "Hand-bleached 613 blonde on an HD lace front, ready to tone to any shade. Our boldest signature unit.", price: "5600.00", category: "lace-front-wigs", collection: "signature-collection", keyword: "blonde", lock: 17, isSignature: true, images: trio(SHOT.looseWave, MODEL.looseWave) },
  { name: "Pixie Curl Bob Wig", description: "A playful, low-maintenance curly bob. Lightweight, breathable and perfect for the Kumasi heat.", price: "2800.00", category: "curly", collection: "best-sellers", keyword: "hairstyle", lock: 18, images: trio(SHOT.kinkyCurlyA, MODEL.kinkyCurlyA) },
  { name: "Bone Straight Bob Wig", description: "A sharp, blunt bone-straight bob with a sleek hairline. Office-ready elegance in minutes.", price: "2600.00", category: "straight", collection: "new-arrivals", keyword: "hairstyle", lock: 19, isNew: true, images: trio(SHOT.straight, MODEL.straight) },
  { name: "13x4 HD Transparent Frontal", description: "Ear-to-ear 13x4 HD frontal that melts into every complexion. Pre-plucked with baby hairs.", price: "1800.00", category: "frontals-closures", collection: "signature-collection", keyword: "hair", lock: 20, images: trio(SHOT.waterWave, MODEL.kinkyCurlyA) },
  { name: "5x5 HD Lace Closure", description: "A versatile 5x5 HD closure for a fuller parting space. Bleach-ready knots and a natural scalp look.", price: "1200.00", category: "frontals-closures", collection: "best-sellers", keyword: "hair", lock: 21, images: trio(SHOT.bodyWave, MODEL.bodyWave) },
  { name: "Raw Curly Bundle", description: "Double-drawn raw curly weft, sold per bundle. Thick from top to tip for a flawless sew-in.", price: "1100.00", category: "bundles", collection: "new-arrivals", keyword: "curly", lock: 22, isNew: true, images: trio(SHOT.kinkyCurlyB, MODEL.kinkyCurlyB) },
  { name: "Body Wave Bundle Deal (3 pcs)", description: "Three matched body-wave bundles at a saving — enough for a full, voluminous install.", price: "2900.00", category: "bundles", collection: "best-sellers", keyword: "hair", lock: 23, images: trio(SHOT.bodyWave, MODEL.bodyWave) },
  { name: "Loose Wave Bundle", description: "Soft loose-wave weft with natural luster. Mixes seamlessly for length and body.", price: "1150.00", category: "bundles", collection: "new-arrivals", keyword: "hairstyle", lock: 24, isNew: true, images: trio(SHOT.looseWave, MODEL.looseWave) },
  { name: "Eliz Luxury Wig Care Kit", description: "Everything to keep a unit fresh: sulphate-free wash, leave-in conditioner, silk wrap and a wide-tooth comb.", price: "350.00", category: "hair-care", keyword: "haircare", lock: 25 },
  { name: "Edge Control & Lace Melt Set", description: "Flake-free edge control plus a lace-tint and melt spray for an invisible, all-day hold.", price: "180.00", category: "hair-care", keyword: "cosmetics", lock: 26 },

  // Mannequins & styling tools — Eliz Luxury Hair also sells the kit a stylist
  // uses to wash, install, customise and store a unit. Placeholder loremflickr
  // imagery (keyword-locked); swap for real product shots.
  { name: "Canvas Block Head & Clamp", description: "Cork-filled canvas block head with a sturdy table clamp — the studio standard for ventilating, customising, washing and storing a wig.", price: "650.00", category: "mannequins", collection: "best-sellers", keyword: "mannequin,head", lock: 30, images: [img("mannequin,head", 30), img("mannequin", 130), img("salon,mannequin", 230)] },
  { name: "Cosmetology Mannequin Head — Human Hair", description: "Training head set with 100% human hair for braiding, styling practice and ventilating. Mounts on any tripod or table clamp.", price: "850.00", category: "mannequins", collection: "new-arrivals", isNew: true, keyword: "mannequin", lock: 31, images: [img("mannequin", 31), img("mannequin,head", 131), img("hairstyle,salon", 231)] },
  { name: "Adjustable Tripod Wig Stand", description: "Height-adjustable aluminium tripod for styling and displaying your unit hands-free. Folds flat for travel and pop-up shop days.", price: "480.00", category: "mannequins", keyword: "tripod,stand", lock: 32, images: [img("tripod,stand", 32), img("mannequin,stand", 132), img("salon", 232)] },
  { name: "Mini Wig Display Mannequin (3-Pack)", description: "A trio of compact foam display heads — perfect for storing wigs in shape or showing your collection at home or in store.", price: "520.00", category: "mannequins", collection: "best-sellers", keyword: "mannequin,display", lock: 33, images: [img("mannequin,display", 33), img("mannequin", 133), img("wig,display", 233)] },
];

/** Function-seed builder consumed by createMockApp / createTestClient. */
export function buildWigCatalogue(ctx: SeedCtx) {
  const business = ctx.business({
    name: "Eliz Luxury Hair",
    default_currency: WIG_CURRENCY,
    country_code: "GH",
    email: "hello@elizluxuryhair.com",
  }) as { id: string };

  for (const [i, c] of CATEGORIES.entries()) {
    ctx.category({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image ?? img(c.keyword, c.lock, 800, 800),
      displayOrder: i,
    });
  }
  for (const c of COLLECTIONS) {
    ctx.collection({ name: c.name, slug: c.slug, description: c.description });
  }
  for (const p of PRODUCTS) {
    // Real photography when set (weft-on-white → model, three demo frames);
    // otherwise fall back to keyword-locked loremflickr frames.
    const frames = p.images?.length
      ? p.images
      : [
          img(p.keyword, p.lock),
          img(p.keyword, p.lock + 100),
          img("hairstyle,woman", p.lock + 200),
        ];
    ctx.product({
      name: p.name,
      description: p.description,
      price: p.price,
      currency: WIG_CURRENCY,
      image: frames[0],
      images: frames,
      category: p.category,
      collection: p.collection,
      tags: p.tags,
      isNew: p.isNew,
      isSignature: p.isSignature,
    });
  }

  // Seed sources must return the resolved business id (see resolveSeed/createDeps).
  return { businessId: business.id };
}

/** Seed source for createMockApp({ seed }) / createTestClient({ seed }). */
export const wigSeedSource = { kind: "fn" as const, seed: buildWigCatalogue };
