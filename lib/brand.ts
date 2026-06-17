/**
 * Brand & content configuration — single source of truth for every visible
 * string. Edit this file to rebrand. See ../AGENTS.md.
 *
 * Best Hairline — a Kumasi, Ghana wig boutique. Black-and-white, luxury-minimal
 * styling lives in app/globals.css; product data in demo mode comes from
 * lib/demo/wig-seed.ts.
 */

import type { SeedName } from "@cimplify/sdk/testing/suite";

export interface BrandSocial {
  label: string;
  href: string;
  icon?: "instagram" | "x" | "tiktok" | "facebook" | "youtube" | "linkedin" | "whatsapp";
}

export interface BrandFaqEntry { q: string; a: string }
export interface BrandFaqSection { title: string; items: BrandFaqEntry[] }
export interface BrandPolicySection {
  heading: string;
  body: string | { intro: string; bullets: string[] };
}
export interface BrandSitemapSection { title: string; links: { label: string; href: string }[] }

export interface Brand {
  name: string;
  shortName: string;
  microTag: string;
  description: string;
  schemaType:
    | "Store" | "Bakery" | "Restaurant" | "BeautySalon"
    | "GroceryStore" | "LocalBusiness" | "Organization";
  currency: string;
  locale: string;
  contact: {
    address: string; streetAddress: string; city: string; countryCode: string;
    phone: string; phoneTel: string; email: string; privacyEmail: string;
    supportEmail?: string; businessEmail?: string; hours: string;
  };
  socials: BrandSocial[];
  header: { nav: { label: string; href: string }[] };
  hero: {
    badge: string; title: string; subtitle: string;
    primaryCtaLabel: string;
    secondaryCtaLabel?: string; secondaryCtaHref?: string;
    image?: string;
    video?: string;
  };
  shop: { eyebrow: string; title: string; description: string };
  home: {
    collections: { eyebrow: string; title: string };
    braiding: {
      title: string; body: string; bulletsTitle: string; bullets: string[];
      ctaLabel: string; ctaHref: string; image: string;
    };
    bestSellers: { eyebrow: string; title: string };
    getTheLook: { eyebrow: string; title: string; body: string; productSlug: string; ctaLabel: string };
    video: { src: string; poster?: string };
    shopByLook: { ctaLabel: string; items: { label: string; image: string; href: string }[] };
    instagram: { eyebrow: string; title: string; handle: string; href: string };
    featuredIn: { title: string; logos: string[] };
    testimonials: {
      eyebrow: string; title: string;
      items: { quote: string; name: string; location: string; rating: number }[];
    };
  };
  trustItems?: { label: string; value: string; description: string; iconKey: string }[];
  brandStrip?: { headline: string; brands: string[] };
  promo?: { badge: string; title: string; body: string; ctaLabel: string; ctaHref: string };
  tradeIn?: {
    eyebrow: string; title: string; body: string;
    primaryCtaLabel: string; primaryCtaHref: string;
    secondaryCtaLabel: string; secondaryCtaHref: string;
    steps: { step: string; title: string; body: string }[];
  };
  newsletter: {
    eyebrow: string; title: string; body: string; placeholder: string;
    submitLabel: string; successLabel: string;
  };
  about: {
    eyebrow: string; title: string; paragraphs: string[]; image: string;
    video?: string;
    sections: { heading: string; body: string; image: string }[];
  };
  // Product detail page. In REAL mode the spec sheet + variant options come
  // from the fetched product; these values are the DEMO fallback shown when the
  // embedded catalogue has no variants/attributes (see components ProductDetail).
  product: {
    descriptionLabel: string;
    lengthLabel: string;
    lengths: string[];
    addToCartLabel: string;
    addedLabel: string;
    soldOutLabel: string;
    specs: { label: string; value: string }[];
  };
  faq: {
    eyebrow: string; title: string; sections: BrandFaqSection[];
    contactPrompt: string; contactEmail: string;
  };
  terms: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  privacy: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  shipping: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  returns: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  accessibility: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  account: {
    loginEyebrow: string; loginTitle: string; loginSubtitle: string;
    signupEyebrow: string; signupTitle: string; signupSubtitle: string;
    accountEyebrow: string; accountTitle: string;
  };
  contactPage: {
    eyebrow: string; title: string; body: string;
    reasons: string[];
    directLines: { label: string; value: string; href: string }[];
  };
  trackOrder: { eyebrow: string; title: string; body: string };
  footer: {
    blurb: string; sitemap: BrandSitemapSection[];
    poweredBy?: { label: string; href: string };
  };
  llms: { summary: string };
  mock: { seed: SeedName; businessId: string };
}

export const brand: Brand = {
  name: "Best Hairline",
  shortName: "Best Hairline",
  microTag: "Premium Human Hair · Kumasi",
  description:
    "Best Hairline is a Kumasi-based wig boutique specialising in premium raw human hair wigs, lace fronts, closures and bundles — hand-tied, ethically sourced, and made to last.",
  schemaType: "Store",

  currency: "GHS",
  locale: "en_GH",

  contact: {
    address: "Adum, Kumasi, Ghana",
    streetAddress: "12 Prempeh II Street, Adum",
    city: "Kumasi",
    countryCode: "GH",
    phone: "+233 55 123 4567",
    phoneTel: "+233551234567",
    email: "hello@besthairline.shop",
    privacyEmail: "privacy@besthairline.shop",
    supportEmail: "care@besthairline.shop",
    hours: "Mon–Sat · 9am–7pm",
  },

  socials: [
    { label: "Instagram", href: "https://instagram.com/besthairline", icon: "instagram" },
    { label: "TikTok", href: "https://www.tiktok.com/tag/besthairline", icon: "tiktok" },
    { label: "Facebook", href: "https://facebook.com/besthairline", icon: "facebook" },
    { label: "WhatsApp", href: "https://wa.me/233551234567", icon: "whatsapp" },
  ],

  header: {
    nav: [
      { label: "Lace Fronts", href: "/categories/lace-front-wigs" },
      { label: "Curly", href: "/categories/curly" },
      { label: "Straight", href: "/categories/straight" },
      { label: "Body Wave", href: "/categories/body-wave" },
      { label: "Bundles", href: "/categories/bundles" },
      { label: "Find Your Style", href: "/lookbook" },
    ],
  },

  hero: {
    badge: "100% raw human hair",
    title: "Hair like yours, only better.",
    subtitle:
      "Premium raw human hair lace fronts, closures and bundles — hand-tied, pre-plucked and ready to wear. Delivered across Kumasi, nationwide and worldwide.",
    primaryCtaLabel: "Shop now",
    secondaryCtaLabel: "Find your style",
    secondaryCtaHref: "/lookbook",
    image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781677537/givcu2lwngwnndfwl5g4.png",
    video: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781689914/raa7d3k4noajyajzmu88.mp4",
  },

  shop: {
    eyebrow: "The collection",
    title: "Every unit we stock.",
    description:
      "Browse our full range of premium human hair wigs, closures and bundles. Filter by texture, length and price — same-day Kumasi delivery on every order.",
  },

  home: {
    collections: { eyebrow: "Shop by texture", title: "Shop our collections" },
    braiding: {
      title: "Human Braiding Hair",
      body: "Introducing Best Hairline's raw bulk hair — soft, flowing textures that elevate any braided style with movement, dimension and an effortlessly luxurious finish.",
      bulletsTitle: "Perfect for:",
      bullets: [
        "Boho Knotless Braids",
        "Mermaid Braids",
        "Pick & Drop Braids",
        "Faux Locs",
        "Goddess Braids",
        "Any human-hair braid style you desire",
      ],
      ctaLabel: "Shop now",
      ctaHref: "/categories/bundles",
      image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781682016/osywpwka06luoprln9dq.png",
    },
    bestSellers: { eyebrow: "Loved by our clients", title: "Best sellers" },
    getTheLook: {
      eyebrow: "Get the look",
      title: "The signature lace front",
      body: "Raw Cambodian hair on a transparent HD lace front — pre-plucked, with a hairline so natural no one will know. Our most-loved unit, made to last for years with the right care.",
      productSlug: "raw-cambodian-wavy-lace-wig",
      ctaLabel: "Shop this look",
    },
    // Full-bleed promo reel shown after "Get the look". Autoplays muted +
    // looped; visitors can unmute. Placeholder stock clip — swap `src` for the
    // merchant's real video (and `poster` for its first frame).
    video: {
      src: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781676999/freblt6oj3hhapy5crcv.mp4",
      poster: "https://loremflickr.com/1920/1080/hairstyle,woman?lock=915",
    },
    // Two-up "shop by texture" tiles (dhair-boutique): big square portraits with
    // a texture label + a "Shop this" button that reveals on hover. Each links to
    // a real demo product. Placeholder portraits — swap for the merchant's shots.
    shopByLook: {
      ctaLabel: "Shop this",
      items: [
        {
          label: "Raw Cambodian Wavy",
          image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781677535/fckvbndias8l0wathcbx.jpg",
          href: "/products/raw-cambodian-wavy-lace-wig",
        },
        {
          label: "Burmese Curly",
          image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781677534/w5lhmnyalm5fuovigf6s.jpg",
          href: "/products/burmese-curly-hd-lace-front",
        },
      ],
    },
    instagram: {
      eyebrow: "@besthairline",
      title: "Follow us on Instagram",
      handle: "@besthairline",
      href: "https://instagram.com/besthairline",
    },
    // Press wordmarks (typography-led, no logo licensing). Placeholders —
    // swap for the merchant's real features.
    featuredIn: {
      title: "As featured in",
      logos: ["GLITZ AFRICA", "BELLANAIJA", "OKAYAFRICA", "GENEVIEVE"],
    },
    testimonials: {
      eyebrow: "Loved by 5,000+ clients",
      title: "Don't just take our word for it.",
      items: [
        {
          quote: "So many compliments on my lace front — the hairline is unreal. Felt like a queen all week.",
          name: "Ama D.",
          location: "Kumasi",
          rating: 5,
        },
        {
          quote: "Soft, full, and no shedding after weeks of wear. Best Hairline is my go-to now.",
          name: "Akosua B.",
          location: "Accra",
          rating: 5,
        },
        {
          quote: "Fast delivery to Kumasi and the curls held beautifully. Worth every cedi.",
          name: "Efua M.",
          location: "Takoradi",
          rating: 5,
        },
      ],
    },
  },

  trustItems: [
    {
      label: "Quality",
      value: "100% raw human hair",
      description: "Ethically sourced and hand-tied. Never synthetic.",
      iconKey: "verified",
    },
    {
      label: "Delivery",
      value: "Kumasi same-day",
      description: "Nationwide in 1–3 days, worldwide via DHL.",
      iconKey: "delivery",
    },
    {
      label: "Exchanges",
      value: "7-day exchange",
      description: "Unworn units, lace and packaging intact.",
      iconKey: "warranty",
    },
    {
      label: "Support",
      value: "Free styling advice",
      description: "Chat with our stylists before you buy.",
      iconKey: "support",
    },
  ],

  brandStrip: {
    headline: "Why women choose Best Hairline",
    brands: [
      "100% RAW HUMAN HAIR",
      "HD TRANSPARENT LACE",
      "HAND-TIED WEFTS",
      "PRE-PLUCKED HAIRLINE",
      "HEAT-FRIENDLY",
      "KUMASI · GHANA",
    ],
  },

  promo: {
    badge: "The Signature Collection",
    title: "Raw, hand-tied, made to last.",
    body: "Our signature units are built from raw, double-drawn human hair on HD lace — the wigs our clients keep for years, not seasons.",
    ctaLabel: "Shop the collection",
    ctaHref: "/collections/signature-collection",
  },

  tradeIn: {
    eyebrow: "Best Hairline Club",
    title: "Slay more. Earn more.",
    body: "Join the club and earn points on every order, unlock member-only restock alerts, and get priority booking for installs at our Kumasi studio.",
    primaryCtaLabel: "Join the club",
    primaryCtaHref: "/signup",
    secondaryCtaLabel: "How it works",
    secondaryCtaHref: "/faq",
    steps: [
      { step: "01", title: "Create an account", body: "Sign up free in under a minute." },
      { step: "02", title: "Shop & earn", body: "Collect points on every cedi you spend." },
      { step: "03", title: "Redeem & glow", body: "Turn points into discounts and free installs." },
    ],
  },

  newsletter: {
    eyebrow: "The list",
    title: "Be first to the next restock.",
    body: "Join the Best Hairline list for early access to new units, member pricing, and styling tips. One-click unsubscribe, always.",
    placeholder: "you@email.com",
    submitLabel: "Join the list",
    successLabel: "You're on the list ✓",
  },

  about: {
    eyebrow: "About Best Hairline",
    title: "Every woman deserves to feel like a queen.",
    paragraphs: [
      "Best Hairline began in Kumasi with a simple belief: a great wig should look and feel like your own hair, only better. We hand-pick premium raw human hair and turn it into lace fronts, closures and bundles that move, shine and last.",
      "Every unit is hand-tied by skilled artisans, pre-plucked with a natural hairline, and quality-checked before it reaches you. No synthetic shortcuts and no tangling after a week — just hair you can wear with confidence.",
      "Based in Adum, Kumasi, we deliver across Ghana and ship worldwide. Visit the studio for a fitting, or shop online and let us bring the salon to you.",
    ],
    image: "https://loremflickr.com/1000/1300/hairstyle,woman?lock=980",
    video: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1781689820/syov78gtvuecbqrxlt4k.mp4",
    sections: [
      {
        heading: "High quality",
        body: "We source raw, ethically obtained human hair from trusted suppliers in Southeast Asia, then hand-tie and inspect every unit. Double-drawn wefts mean full ends, not thin tips.",
        image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1781680877/skyr6qszqjqcduzqzofy.png",
      },
      {
        heading: "Made for you",
        body: "From kinky curly to bone straight, in lengths from a sharp bob to waist-grazing inches, we carry textures and densities for every look — and can colour or customise on request.",
        image: "https://loremflickr.com/1000/1300/hairstyle,woman?lock=982",
      },
      {
        heading: "Visit us",
        body: "Adum, Kumasi · Mon–Sat, 9am–7pm. Book a fitting or installation and walk out runway-ready.",
        image: "https://loremflickr.com/1000/1300/salon,hair?lock=983",
      },
    ],
  },

  product: {
    descriptionLabel: "Description",
    lengthLabel: "Length",
    lengths: ['14"', '16"', '18"', '20"', '22"', '24"', '26"', '28"'],
    addToCartLabel: "Add to bag",
    addedLabel: "Added to bag ✓",
    soldOutLabel: "Sold out",
    // Representative spec sheet for DEMO mode (the embedded wig catalogue has no
    // per-product attributes). In REAL mode the product's own attributes are
    // shown instead. Edit freely — these mirror the reference layout.
    specs: [
      { label: "Origin", value: "South East Asia" },
      { label: "Hair Curl Type", value: "3B – 3C" },
      { label: "Texture Type", value: "Soft curly (corkscrew curls)" },
      { label: "Maintenance", value: "Medium" },
      { label: "Volume", value: "Dense" },
      { label: "Color", value: "Natural 1B (colour may vary)" },
      { label: "Closure", value: "Pairs well with a Raw Curly Closure or HD Frontal" },
    ],
  },

  faq: {
    eyebrow: "Q&A",
    title: "Things our clients ask.",
    sections: [
      {
        title: "Choosing your wig",
        items: [
          {
            q: "What's the difference between a lace front and a closure wig?",
            a: "A lace front has an ear-to-ear lace panel for a natural hairline and versatile parting. A closure wig uses a smaller 4x4 or 5x5 closure — more affordable and beginner-friendly, with a fixed parting area.",
          },
          {
            q: "Is the hair real human hair?",
            a: "Yes. Every Best Hairline unit is 100% raw human hair — never synthetic. You can wash, style, curl and flat-iron it just like your own hair.",
          },
          {
            q: "How do I choose the right length and density?",
            a: "Lengths are in inches — a bob is around 10–12\", shoulder-length 14–16\", and long is 20\"+. For density, 150% suits everyday wear while 180%+ gives fuller, glam volume. Message us and we'll recommend a unit.",
          },
        ],
      },
      {
        title: "Wig care",
        items: [
          {
            q: "How do I keep my wig looking new?",
            a: "Wash gently with a sulphate-free shampoo every 1–2 weeks, condition the lengths (not the roots), air-dry on a stand, and wrap it in silk at night. Our Wig Care Kit has everything you need.",
          },
          {
            q: "Can I dye or bleach my unit?",
            a: "Raw hair takes colour well. We recommend a professional for bleaching knots or going lighter. Our 613 blonde units arrive ready to tone to your shade.",
          },
        ],
      },
      {
        title: "Shipping & delivery",
        items: [
          {
            q: "Where do you deliver?",
            a: "Same-day within Kumasi, 1–3 business days across Ghana, and worldwide via DHL. You'll get a tracking link by SMS and email once your order ships.",
          },
          {
            q: "Do you offer installation?",
            a: "Yes — book a fitting or install at our Adum, Kumasi studio. Add it at checkout or message us to arrange a time.",
          },
        ],
      },
      {
        title: "Returns & exchanges",
        items: [
          {
            q: "What's your return policy?",
            a: "For hygiene reasons, wigs and bundles can be exchanged within 7 days only if unworn, with the lace and packaging intact. Hair care items are final sale. See our Returns page for details.",
          },
          {
            q: "My unit arrived faulty — what now?",
            a: "Email care@besthairline.shop with your order number and a photo within 48 hours of delivery and we'll make it right with a replacement or refund.",
          },
        ],
      },
    ],
    contactPrompt: "Still have a question? Email",
    contactEmail: "care@besthairline.shop",
  },

  terms: {
    eyebrow: "Terms of service",
    title: "Terms of Service",
    lastUpdated: "16 June 2026",
    sections: [
      {
        heading: "1. Who we are",
        body: "Best Hairline (\"we\", \"us\") is a wig boutique based in Adum, Kumasi, Ghana. By placing an order on this site, you (\"you\", \"customer\") agree to these terms.",
      },
      {
        heading: "2. Our products",
        body: "All hair is 100% raw human hair. Natural variation in texture, colour and wave is normal and not a defect. Product photos are a guide; lengths are measured straight.",
      },
      {
        heading: "3. Pricing and payment",
        body: "Prices are shown in Ghana Cedis (GHS). Payment is taken at the time of order via Mobile Money or card.",
      },
      {
        heading: "4. Delivery",
        body: "Same-day within Kumasi, 1–3 business days nationwide, and worldwide via DHL. Delivery times are estimates, not guarantees. Customs and duties on international orders are the customer's responsibility.",
      },
      {
        heading: "5. Exchanges",
        body: "Unworn units may be exchanged within 7 days with the lace and packaging intact. Hair care products are final sale.",
      },
      {
        heading: "6. Intellectual property",
        body: "All photography, branding and content on this site belong to Best Hairline and may not be reused without written permission.",
      },
      {
        heading: "7. Liability",
        body: "Our maximum liability for any order is the value of that order. We are not liable for indirect or consequential losses.",
      },
      {
        heading: "8. Governing law",
        body: "These terms are governed by the laws of Ghana. Disputes are resolved in the courts of the Ashanti Region.",
      },
      {
        heading: "9. Contact",
        body: "Questions? Email hello@besthairline.shop.",
      },
    ],
  },

  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    lastUpdated: "16 June 2026",
    sections: [
      {
        heading: "What we collect",
        body: "Order details (name, address, phone, email) and payment data handled by our processors (Paystack and card networks). We do not store card numbers on our servers.",
      },
      {
        heading: "How we use it",
        body: {
          intro: "We use your data to:",
          bullets: [
            "Fulfil and deliver your order.",
            "Send order and delivery updates by SMS and email.",
            "Send restock and offer alerts (only if you opt in).",
            "Improve our products and service.",
          ],
        },
      },
      {
        heading: "Who we share it with",
        body: "DHL and local couriers (delivery), Paystack and card processors (payments), and our SMS/email providers. We never sell or rent your personal data.",
      },
      {
        heading: "Cookies",
        body: "Strictly-necessary cookies for cart and session, plus optional analytics you can decline in our cookie banner.",
      },
      {
        heading: "Your rights",
        body: "Under the Ghana Data Protection Act, 2012 (Act 843), you have the right to access, correct or delete your data. Email privacy@besthairline.shop.",
      },
      {
        heading: "Retention",
        body: "Order records are kept as required by Ghana tax law. Our marketing list is kept until you unsubscribe.",
      },
    ],
  },

  shipping: {
    eyebrow: "Shipping",
    title: "Shipping & Delivery",
    lastUpdated: "16 June 2026",
    sections: [
      { heading: "Kumasi same-day", body: "Order before 2pm for same-day dispatch within Kumasi. A small delivery fee applies and is shown at checkout." },
      { heading: "Nationwide", body: "1–3 business days across Ghana via trusted couriers. Tracking is sent by SMS and email." },
      { heading: "Worldwide", body: "DHL Express to 80+ countries, 3–7 business days. Duties and customs are the customer's responsibility." },
      { heading: "Studio pickup", body: "Collect free from our Adum, Kumasi studio, Mon–Sat 9am–7pm." },
    ],
  },

  returns: {
    eyebrow: "Returns",
    title: "Returns & Exchanges",
    lastUpdated: "16 June 2026",
    sections: [
      { heading: "7-day exchange", body: "Unworn units can be exchanged within 7 days, with the lace untouched and original packaging intact." },
      { heading: "Hygiene policy", body: "For health reasons we cannot accept worn wigs or opened hair care products. These are final sale." },
      { heading: "Faulty items", body: "Email care@besthairline.shop with a photo within 48 hours of delivery and we'll replace or refund." },
      { heading: "How to start", body: "Message us on WhatsApp or email care@besthairline.shop with your order number and we'll guide you through it." },
    ],
  },

  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    lastUpdated: "16 June 2026",
    sections: [
      { heading: "Our commitment", body: "We aim for WCAG 2.1 AA across this site and test on each release." },
      { heading: "What we've done", body: { intro: "Specifically, we've:", bullets: [
        "Maintained at least 4.5:1 contrast on body text.",
        "Made every interactive element keyboard-reachable.",
        "Added alt text to product and editorial images.",
        "Respected `prefers-reduced-motion` for homepage transitions.",
      ] } },
      { heading: "Reporting issues", body: "Email care@besthairline.shop and we'll respond within 5 business days." },
    ],
  },

  account: {
    loginEyebrow: "Welcome back",
    loginTitle: "Sign in to Best Hairline",
    loginSubtitle: "Track orders, manage your club points, and check out faster.",
    signupEyebrow: "Join us",
    signupTitle: "Create your account",
    signupSubtitle: "Earn club points, save your details, and get first access to restocks.",
    accountEyebrow: "Your account",
    accountTitle: "Welcome back",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Talk to Best Hairline.",
    body: "Questions about a unit, sizing, delivery or an install? Message us and we'll reply within a business day.",
    reasons: ["Choosing a wig", "An order or delivery", "Installation & fittings", "Exchanges", "Wholesale & salons", "Something else"],
    directLines: [
      { label: "WhatsApp", value: "+233 55 123 4567", href: "https://wa.me/233551234567" },
      { label: "Email", value: "care@besthairline.shop", href: "mailto:care@besthairline.shop" },
      { label: "Phone", value: "+233 55 123 4567", href: "tel:+233551234567" },
    ],
  },

  trackOrder: {
    eyebrow: "Track an order",
    title: "Where's my order?",
    body: "Enter your order number and the email used at checkout to see the latest delivery status and ETA.",
  },

  footer: {
    blurb:
      "Premium raw human hair wigs, lace fronts, closures and bundles — hand-tied and made to last. Based in Adum, Kumasi, shipping across Ghana and worldwide.",
    sitemap: [
      {
        title: "Shop",
        links: [
          { label: "All wigs", href: "/shop" },
          { label: "Lace fronts", href: "/categories/lace-front-wigs" },
          { label: "Closure wigs", href: "/categories/closure-wigs" },
          { label: "Curly", href: "/categories/curly" },
          { label: "Straight", href: "/categories/straight" },
          { label: "Bundles", href: "/categories/bundles" },
        ],
      },
      {
        title: "Collections",
        links: [
          { label: "Best sellers", href: "/collections/best-sellers" },
          { label: "New arrivals", href: "/collections/new-arrivals" },
          { label: "Signature collection", href: "/collections/signature-collection" },
          { label: "Find your style", href: "/lookbook" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Contact", href: "/contact" },
          { label: "Track an order", href: "/track-order" },
          { label: "Wig size guide", href: "/size-guide" },
          { label: "Shipping", href: "/shipping" },
          { label: "Returns & exchanges", href: "/returns" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Sign in", href: "/login" },
          { label: "Create account", href: "/signup" },
          { label: "Your orders", href: "/account/orders" },
          { label: "Best Hairline Club", href: "/account" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Accessibility", href: "/accessibility" },
          { label: "Sitemap", href: "/sitemap-page" },
        ],
      },
    ],
    poweredBy: { label: "Cimplify", href: "https://app.cimplify.io" },
  },

  llms: {
    summary:
      "Best Hairline — a Kumasi, Ghana wig boutique selling premium raw human hair lace fronts, closure wigs, curly and straight units, and bundles. Hand-tied, pre-plucked and ethically sourced. Same-day Kumasi delivery, nationwide and worldwide shipping, 7-day exchanges.",
  },

  // brand.mock is used only by the vitest brand contract (it must name a known
  // builtin SeedName). The actual demo catalogue is the custom wig seed in
  // lib/demo/wig-seed.ts; the cart/contract suites point straight at that.
  mock: {
    seed: "retail",
    businessId: "bus_best-hairline",
  },
};
