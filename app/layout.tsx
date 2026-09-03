import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { company, designer, specialties } from "@/lib/site-content";
import { DEFAULT_DESCRIPTION, SITE_URL } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Precision Stretch Forming | Metal Bending Corporation",
    template: `%s | ${company.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: company.name,
  authors: [
    { name: company.name, url: SITE_URL },
    { name: designer.name, url: designer.url },
  ],
  creator: designer.name,
  publisher: company.name,
  category: "Manufacturing",
  keywords: [
    "metal bending",
    "stretch forming",
    "custom metal bending",
    "curved metal framing",
    "curved aluminum extrusion",
    "architectural metal forming",
    "curved glass framing",
    "curved ceiling components",
    "curved copper gutters",
    "aerospace stretch forming",
    "Anaheim metal bending",
    "Hufford stretch forming",
  ],
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: "Precision Stretch Forming | Metal Bending Corporation",
    description: DEFAULT_DESCRIPTION,
    type: "website",
    locale: "en_US",
    siteName: company.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Stretch Forming | Metal Bending Corporation",
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#080a09",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: company.name,
      alternateName: company.shortName,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      image: `${SITE_URL}/opengraph-image.jpg`,
      foundingDate: String(company.established),
      telephone: company.phone,
      email: company.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "1563 W. Embassy St.",
        addressLocality: "Anaheim",
        addressRegion: "CA",
        postalCode: "92802",
        addressCountry: "US",
      },
      areaServed: "Worldwide",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: company.phone,
        email: company.email,
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: "English",
      },
      knowsAbout: [
        "Stretch forming",
        "Metal bending",
        "Architectural metal forming",
        "Aerospace metal forming",
        "Curved metal framing",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Metal forming services",
        itemListElement: specialties.map((specialty) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: specialty.title,
            url: `${SITE_URL}/${specialty.slug}`,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: company.name,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-US",
      publisher: { "@id": `${SITE_URL}/#organization` },
      creator: {
        "@type": "Organization",
        name: designer.name,
        url: designer.url,
      },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
