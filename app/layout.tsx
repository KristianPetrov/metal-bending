import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "www.metalbending.com";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title: "Precision Stretch Forming | Metal Bending Corporation",
    description:
      "Custom stretch forming for curved metal framing, glass and glazing systems, ceiling components, copper gutters, aerospace parts, and specialty profiles.",
    keywords: [
      "metal bending",
      "stretch forming",
      "curved metal framing",
      "curved aluminum extrusion",
      "custom metal forming",
      "Anaheim metal bending",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      title: "Precision Curves. Zero Compromise.",
      description: "Custom stretch forming for architectural, commercial, and specialty metal projects.",
      type: "website",
      locale: "en_US",
      siteName: "Metal Bending Corporation",
      url: baseUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Metal Bending Corporation precision stretch forming" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Precision Curves. Zero Compromise.",
      description: "Custom stretch forming for architectural, commercial, and specialty metal projects.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
