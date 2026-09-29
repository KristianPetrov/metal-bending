import type { ProfileId } from "./profile-geometry";

export type SpecialtySlug =
  | "curved-metal-framing"
  | "glass-and-glazing"
  | "curved-ceiling-components"
  | "copper-gutters"
  | "aerospace";

export type WorkCategory = SpecialtySlug | "shop";

export type WorkImage = {
  src: string;
  alt: string;
  category: WorkCategory;
  featured?: boolean;
  studio?: boolean;
};

export type CatalogItem = {
  profile: ProfileId;
  alt: string;
  label: string;
  description: string;
};

export type CatalogGroup = {
  heading: string;
  intro?: string;
  items: CatalogItem[];
};

export const company = {
  name: "Metal Bending Corporation",
  shortName: "MBC",
  established: 2006,
  phone: "(714) 238-1200",
  phoneHref: "tel:+17142381200",
  fax: "(714) 238-1206",
  email: "metalbending1@gmail.com",
  emailHref: "mailto:metalbending1@gmail.com",
  address: "1563 W. Embassy St., Anaheim, CA 92802",
  mapHref: "https://maps.google.com/?q=1563+W+Embassy+St+Anaheim+CA+92802",
  orderForm: "/docs/order-form.pdf",
};

export const designer = {
  name: "Set Free Digital Disciples",
  url: "https://www.setfreedigitaldisciples.com",
};

export const about = {
  paragraphs: [
    "Metal Bending Corporation stretch-forms customer-supplied metal to a precise radius. The shop produces repeatable curves for metal framing, storefronts, ceiling systems, and aircraft components.",
    "Since 2006, the Anaheim shop has formed parts for projects around the world. That work includes custom brake shapes for the new World Trade Center and aerospace components for the United States military.",
    "One piece or a thousand, each job gets the same hands-on attention. Someone here stays reachable through the whole project.",
  ],
  stretch:
    "The metal is stretched and bent at the same time over a die, so the curve stays smooth and the shape holds. Dies are made in-house, often before the material arrives, which keeps the lead time short.",
};

// Service copy verified against metalbending.com on September 29, 2026.
// Page-level sources and qualifications: output/imagegen/README.md.
export const specialties: {
  number: string;
  slug: SpecialtySlug;
  title: string;
  navLabel: string;
  detail: string;
  summary: string;
  image: string;
  leadImage?: string;
  paragraphs?: string[];
  catalogHeading?: string;
  catalog?: CatalogGroup[];
}[] = [
  {
    number: "01",
    slug: "curved-metal-framing",
    title: "Curved metal framing",
    navLabel: "Curved Metal Framing",
    detail: "Track, stud, angle, hat channel",
    summary: "Track, stud, angle, hat channel, sloped track, and sloped angle.",
    image: "/work/framing-3.jpg",
    leadImage: "/work/framing-6.jpg",
    paragraphs: [
      "Customer-supplied metal framing is stretch formed to the specified radius while preserving its cross section. Hydraulic pressure produces a smooth, continuous curve with close tolerances.",
      "Track, angle, hat channel, expansion joints, and plaster molds can be formed for soffits, arches, curved walls, and domes. Custom sections, including sloped track and sloped angle, can be reviewed for forming.",
      "Track can be curved up to 12 inches wide and as heavy as 12 gauge. Forming is performed without notching or crimping the material.",
    ],
    catalogHeading: "Framing profiles",
    catalog: [
      {
        heading: "",
        intro: "Smooth stretch forming without notching or crimping. Track up to 12 inches wide and 12 gauge, plus custom sections for soffits, arches, curved walls, and domes.",
        items: [
          { profile: "track", label: "Track", description: "Plain U section", alt: "Rendering of radius-curved galvanized steel U track with equal plain flanges" },
          { profile: "stud", label: "Stud", description: "C section · inward lips", alt: "Rendering of radius-curved galvanized C stud with two inward return lips" },
          { profile: "angle", label: "Angle", description: "Equal-leg L section", alt: "Rendering of a radius-curved galvanized equal-leg L angle" },
          { profile: "hat-channel", label: "Hat channel", description: "Raised crown · outward feet", alt: "Rendering of radius-curved galvanized hat channel with a flat crown and outward flanges" },
          { profile: "sloped-track", label: "Sloped track", description: "Custom unequal-leg U section", alt: "Rendering of a custom radius-curved galvanized track with unequal flange heights" },
          { profile: "sloped-angle", label: "Sloped angle", description: "Custom unequal-leg L section", alt: "Rendering of a custom radius-curved galvanized angle with a tall leg and short foot" },
        ],
      },
    ],
  },
  {
    number: "02",
    slug: "glass-and-glazing",
    title: "Glass and glazing",
    navLabel: "Glass and Glazing",
    detail: "Storefront, skylights, handrails",
    summary: "Windows, skylights, storefronts, pressure plates, handrails.",
    image: "/work/glass-2.jpg",
    paragraphs: [
      "Metal Bending Corporation forms metal components for windows, skylights, sunrooms, and storefronts. Aluminum angles, channels, round and rectangular tubes, pressure plates, caps, and thermal-break extrusions can be curved for glazing systems.",
      "Profiles can be formed into semicircles, curved segments, and ovals, with straight tangents where the section and forming method allow. Brass, steel, bronze, and other metals can also be considered.",
      "The shop also curves metal components for handrails, store fixtures, and shower-door systems. Send the section drawing and required radius so the forming approach can be reviewed.",
    ],
  },
  {
    number: "03",
    slug: "curved-ceiling-components",
    title: "Curved ceiling components",
    navLabel: "Curved Ceiling Components",
    detail: "Rings, waves, vaults, corbels",
    summary: "Angles, channels, T-bars, tubes, custom brake shapes.",
    image: "/work/ceiling-1.jpg",
    paragraphs: [
      "Ceiling components can be formed into rings, waves, cones, arches, vaults, and corbels. The shop curves standard angles, channels, T-bars, and tubes, as well as custom brake shapes and extrusions.",
      "Compound radii and custom ceiling sections can be reviewed for stretch forming. Project experience includes airport ceiling components from LAX to Doha International Airport in Qatar.",
    ],
  },
  {
    number: "04",
    slug: "copper-gutters",
    title: "Copper gutters",
    navLabel: "Copper Gutters",
    detail: "K-style, half-round, box, brownstone",
    summary: "K-style, half-round, brownstone, box, and double-bead gutters.",
    image: "/work/copper-7.jpg",
    leadImage: "/work/copper-9.jpg",
    paragraphs: [
      "Custom copper gutters are curved to follow the building’s fascia while keeping the supplied profile intact.",
      "Thickness is selected for the gutter’s section, size, and radius. For half-round and K-style, typical recommendations are copper at 20 ounces or heavier, or aluminum at 0.050 inches or thicker.",
      "Zinc, lead-coated copper, galvanized, and paint-lock gutters can also be formed. Double-bead, quarter-round, box, fascia, and other custom styles are considered. Call before purchasing material for coping, scuppers, or gate caps.",
    ],
    catalogHeading: "Radius gutter profiles",
    catalog: [
      {
        heading: "",
        intro: "Formed to follow curved fascia. Material thickness depends on the profile, size, and radius; send your gutter section drawing for review.",
        items: [
          { profile: "k-style", label: "K-style", description: "Ogee face · squared hem", alt: "Rendering of a radius-curved copper K-style gutter with an ogee face, flat bottom, and squared top hem" },
          { profile: "half-round", label: "Half-round", description: "Round bowl · single bead", alt: "Rendering of a radius-curved copper half-round gutter with one rolled front bead" },
          { profile: "double-bead", label: "Double bead", description: "Round bowl · two beads", alt: "Rendering of a radius-curved copper half-round gutter with a rolled bead along each rim" },
          { profile: "brownstone", label: "Brownstone", description: "Straight back · swept face", alt: "Rendering of a radius-curved copper brownstone gutter with a straight back and sweeping front face" },
          { profile: "box", label: "Box", description: "Flat base · straight faces", alt: "Rendering of a radius-curved copper box gutter with a flat bottom, straight walls, and inward front lip" },
        ],
      },
    ],
  },
  {
    number: "05",
    slug: "aerospace",
    title: "Aerospace",
    navLabel: "Aerospace",
    detail: "Extrusions, brake shapes, QC",
    summary: "Extrusions, brake shapes, rolled profiles.",
    image: "/work/aerospace-1.jpg",
  },
];

export const workImages: WorkImage[] = [
  { src: "/work/hero-1.jpg", alt: "Stretch-formed metal profiles in the shop", category: "shop" },
  { src: "/work/hero-2.jpg", alt: "Curved metal sections staged for inspection", category: "shop" },
  { src: "/work/hero-3.jpg", alt: "Precision-formed architectural metal", category: "shop" },
  { src: "/work/hero-4.jpg", alt: "Stacked curved extrusions", category: "shop" },
  { src: "/work/hero-5.jpg", alt: "Finished stretch-formed parts", category: "shop" },
  { src: "/work/framing-1.jpg", alt: "Curved metal framing track", category: "curved-metal-framing" },
  { src: "/work/framing-2.jpg", alt: "Formed framing for an arch", category: "curved-metal-framing" },
  { src: "/work/framing-3.jpg", alt: "Wide curved track without notching", category: "curved-metal-framing" },
  { src: "/work/framing-4.jpg", alt: "Hat channel and angle curves", category: "curved-metal-framing" },
  { src: "/work/framing-5.jpg", alt: "Framing prepared for a curved wall", category: "curved-metal-framing" },
  { src: "/work/framing-6.jpg", alt: "Multiple framing radii", category: "curved-metal-framing" },
  { src: "/work/framing-7.jpg", alt: "Custom sloped framing profile", category: "curved-metal-framing" },
  { src: "/work/glass-1.jpg", alt: "Curved storefront extrusion", category: "glass-and-glazing" },
  { src: "/work/glass-2.jpg", alt: "Glazing system formed to radius", category: "glass-and-glazing" },
  { src: "/work/glass-3.jpg", alt: "Pressure plate and cap curves", category: "glass-and-glazing" },
  { src: "/work/glass-4.jpg", alt: "Curved window and skylight metal", category: "glass-and-glazing" },
  { src: "/work/glass-5.jpg", alt: "Thermal-break extrusion after forming", category: "glass-and-glazing" },
  { src: "/work/ceiling-1.jpg", alt: "Curved ceiling components", category: "curved-ceiling-components" },
  { src: "/work/ceiling-2.jpg", alt: "Ceiling rings and waves", category: "curved-ceiling-components" },
  { src: "/work/ceiling-3.jpg", alt: "Architectural ceiling extrusions", category: "curved-ceiling-components" },
  { src: "/work/ceiling-4.jpg", alt: "Vault and arch ceiling members", category: "curved-ceiling-components" },
  { src: "/work/ceiling-5.jpg", alt: "Custom brake-shape ceiling profiles", category: "curved-ceiling-components" },
  { src: "/work/copper-1.jpg", alt: "Curved copper gutter section", category: "copper-gutters" },
  { src: "/work/copper-2.jpg", alt: "Half-round copper gutter", category: "copper-gutters" },
  { src: "/work/copper-3.jpg", alt: "K-style copper gutter curve", category: "copper-gutters" },
  { src: "/work/copper-4.jpg", alt: "Custom copper fascia gutter", category: "copper-gutters" },
  { src: "/work/copper-5.jpg", alt: "Seamless copper gutter radius", category: "copper-gutters" },
  { src: "/work/copper-6.jpg", alt: "Formed copper architectural gutter", category: "copper-gutters" },
  { src: "/work/copper-7.jpg", alt: "Installed curved copper gutter", category: "copper-gutters" },
  { src: "/work/copper-8.jpg", alt: "Copper gutter following fascia", category: "copper-gutters" },
  { src: "/work/copper-9.jpg", alt: "Residential curved copper gutters", category: "copper-gutters" },
  { src: "/work/copper-10.jpg", alt: "Copper gutter detail at a radius", category: "copper-gutters" },
  { src: "/work/copper-11.jpg", alt: "Custom copper gutter run", category: "copper-gutters" },
  { src: "/work/copper-12.jpg", alt: "Finished copper gutter profile", category: "copper-gutters" },
  { src: "/work/aerospace-1.jpg", alt: "Aerospace extrusion after stretch forming", category: "aerospace" },
  { src: "/work/aerospace-2.jpg", alt: "Aerospace brake shape formed to spec", category: "aerospace" },
  { src: "/work/aerospace-3.jpg", alt: "Repeatable aerospace profile curves", category: "aerospace" },
  { src: "/work/aerospace-4.jpg", alt: "Aerospace stretch-formed component", category: "aerospace" },
];

export const featuredWork = workImages.filter((image) =>
  [
    "/work/framing-3.jpg",
    "/work/glass-2.jpg",
    "/work/ceiling-1.jpg",
    "/work/copper-7.jpg",
    "/work/aerospace-1.jpg",
    "/work/hero-4.jpg",
    "/work/copper-9.jpg",
    "/work/ceiling-5.jpg",
  ].includes(image.src),
);

export const equipment = {
  major: [
    "(2) A-10 Hufford 17.5-ton stretch presses with 24′ arms",
    "(1) A-5 Hufford 15-ton stretch press with 14′ arms",
    "(1) Cyril Bath V20 20-ton stretch wrap forming machine",
  ],
  support: [
    "Band saw — 16″ to 40″ capacity",
    "(2) Cut-off saws — 10″ to 16″ capacity",
    "(2) Drill presses",
    "Forklift — 8,500 lbs capacity",
    "Forklift — 5,000 lbs capacity",
    "Forklift — 3,500 lbs capacity",
    "Mazak Power Center V-20",
  ],
  quality: [
    "36″ × 48″ granite surface plate",
    "48″ × 72″ granite surface plate",
    "Dial calipers",
    "Micrometers",
    "Precision scales",
    "Gage blocks",
    "24″ digital height gage",
    "Protractors",
  ],
};

export function specialtyBySlug(slug: string) {
  return specialties.find((item) => item.slug === slug);
}

export function imagesForSpecialty(slug: SpecialtySlug) {
  return workImages.filter((image) => image.category === slug);
}

export function leadImageForSpecialty(slug: SpecialtySlug) {
  const specialty = specialtyBySlug(slug);
  const images = imagesForSpecialty(slug);
  if (!specialty) return undefined;
  if (specialty.leadImage) {
    return images.find((image) => image.src === specialty.leadImage);
  }
  return images.find((image) => image.src !== specialty.image);
}
