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

export const story = {
  intro:
    "Metal Bending Corporation is a worldwide leader and innovator in the metal curving industry. We use the stretch forming technique to take just about any customer-supplied metal and achieve a precise radius. Complexity is not a problem. By mastering this technique, there are virtually no limits to what can be curved — metal framing, storefront, ceiling systems, and even aircraft components, with great repeatability.",
  honor:
    "Since 2006, Metal Bending Corporation has curved parts for projects all over the world. The project that brought the highest honor came in the form of custom curved brake shapes for the new World Trade Center. We take great pride in that work, and in providing aerospace components for the United States Military.",
  approach:
    "We take a hands-on approach to each job and stay accessible at every stage. Every project, whether it is one piece or one thousand, is given the same attention and quality assurance.",
  stretchForming:
    "Stretch forming is a precise method of forming metal shapes. Material is stretched and bent simultaneously over a die to form simple or complex, smooth, even contoured parts. All forming dies are made in-house, keeping costs down and lead times short. Dies are usually made even before customers have dropped off the material that is getting curved.",
};

export const specialties: {
  number: string;
  slug: SpecialtySlug;
  title: string;
  navLabel: string;
  detail: string;
  summary: string;
  image: string;
  paragraphs: string[];
}[] = [
  {
    number: "01",
    slug: "curved-metal-framing",
    title: "Curved metal framing",
    navLabel: "Curved Metal Framing",
    detail: "Track, angle, hat channel",
    summary: "Track, angle, hat channel, expansion joints, and plaster molds for soffits, arches, curved walls, and domes.",
    image: "/work/framing-3.jpg",
    paragraphs: [
      "Stretch forming metal framing correctly requires engineering, imagination, and attention to detail. Our process keeps extremely tight tolerances while maintaining the overall profile shape.",
      "Along with track and angle, Metal Bending Corporation can curve hat channels, expansion joints, and plaster molds. These shapes can be curved for soffits, arches, curved walls, and domes with great repeatability.",
      "Because material is never notched or crimped, we can smoothly curve track as wide as 12 inches and as thick as 12 gauge. Hydraulic pressure lets us form custom profiles such as sloped track and sloped angle without distortion.",
    ],
  },
  {
    number: "02",
    slug: "glass-and-glazing",
    title: "Glass and glazing",
    navLabel: "Glass and Glazing",
    detail: "Storefront, skylights, handrails",
    summary: "Windows, skylights, sunrooms, storefronts, pressure plates, thermal-break extrusions, and handrails.",
    image: "/work/glass-2.jpg",
    paragraphs: [
      "Since 2006, Metal Bending Corporation has provided curved metal shapes for windows, skylights, sunrooms, and storefronts. With various methods of curving, we can form virtually all metals to an unlimited variety of shapes and sizes.",
      "We regularly curve aluminum angles, channels, rectangular and round tubes, pressure plates and caps, thermal-break extrusions, and brake metal shapes. These profiles can be formed into semi-circles, segments, and ovals, and can usually have tangents when required.",
      "In addition to aluminum, we curve brass, steel, bronze, and other metals. We have also done extensive curving of handrails, store fixtures, and shower doors.",
    ],
  },
  {
    number: "03",
    slug: "curved-ceiling-components",
    title: "Curved ceiling components",
    navLabel: "Curved Ceiling Components",
    detail: "Rings, waves, vaults, corbels",
    summary: "Angles, channels, T-bars, tubes, and custom brake shapes for airports and architectural ceilings worldwide.",
    image: "/work/ceiling-1.jpg",
    paragraphs: [
      "Ceiling components curved by Metal Bending Corporation have been installed in international airports from LAX to Doha International Airport in Qatar.",
      "With our newest operating system and the shop’s production team, it is now possible to form ceiling components into rings, waves, cones, arches, vaults, and corbels.",
      "Standard components such as angles, channels, T-bars, and tubes can all be curved with virtually no limits. Our greatest area of expertise is custom brake shapes and extrusions, including compound radii.",
    ],
  },
  {
    number: "04",
    slug: "copper-gutters",
    title: "Copper gutters",
    navLabel: "Copper Gutters",
    detail: "Half-round, K-style, custom",
    summary: "Seamless custom-curved copper, aluminum, zinc, and galvanized gutters that follow the fascia.",
    image: "/work/copper-7.jpg",
    paragraphs: [
      "Copper is a popular gutter material for upscale homes. It is elegant, corrosion-resistant, and strong enough to follow complex architectural fascia as a seamless custom curve.",
      "Material thickness depends on the gutter profile, size, and radius. Typically, copper half-round and K-style gutter should be 20 ounce or thicker, while aluminum half-round and K-style should be .050 or thicker. Rhine zinc, lead-coated copper, galvanized, and paint-lock can be curved as well.",
      "Double bead, quarter round, modern, box, fascia, and just about any custom gutter can be curved with no distortion to the profile. For coping, scuppers, and gate caps, call before ordering material.",
    ],
  },
  {
    number: "05",
    slug: "aerospace",
    title: "Aerospace",
    navLabel: "Aerospace",
    detail: "Extrusions, brake shapes, QC",
    summary: "Specialized stretch forming for aerospace extrusions, brake shapes, and rolled profiles, with tooling made in-house.",
    image: "/work/aerospace-1.jpg",
    paragraphs: [
      "Metal Bending Corporation has developed specialized stretch forming methods that improve bend quality in parts for the aerospace industry.",
      "These methods allow extrusions, brake shapes, and rolled profiles to be curved with greater precision and repeatability. Production of tooling for forming aerospace parts is done in-house to provide more accurate job tracking and quality control.",
    ],
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

export const processSteps = [
  ["01", "Share the geometry", "Send a drawing, CAD file, or rough dimensions. Dies are usually made in-house before material arrives."],
  ["02", "We form the curve", "Metal is stretched and bent over a die to a smooth, controlled radius — without notching or crimping."],
  ["03", "Inspect and ship", "Every part is checked, protected, and shipped ready for install, one piece or one thousand."],
] as const;

export function specialtyBySlug(slug: string) {
  return specialties.find((item) => item.slug === slug);
}

export function imagesForSpecialty(slug: SpecialtySlug) {
  return workImages.filter((image) => image.category === slug);
}
