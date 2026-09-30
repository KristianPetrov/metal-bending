import { ChevronRight, FileDown, Mail, MapPin, Phone, Printer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import PageShell from "../components/page-shell";
import QuoteWorkspace from "../components/quote-workspace";
import SpecialtyView from "../components/specialty-view";
import WorkGallery from "../components/work-gallery";
import {
  company,
  equipment,
  featuredWork,
  specialties,
  specialtyBySlug,
  type SpecialtySlug,
} from "@/lib/site-content";
import {
  SITE_URL,
  breadcrumbJsonLd,
  pageMetadata,
  seoForSlug,
} from "@/lib/seo";

const staticPages = ["gallery", "manufacturing-equipment", "contact"] as const;

type PageSlug = SpecialtySlug | (typeof staticPages)[number];

function isSpecialty(slug: string): slug is SpecialtySlug {
  return specialties.some((item) => item.slug === slug);
}

function isPageSlug(slug: string): slug is PageSlug {
  return isSpecialty(slug) || (staticPages as readonly string[]).includes(slug);
}

export function generateStaticParams() {
  return [...specialties.map((item) => ({ slug: item.slug })), ...staticPages.map((slug) => ({ slug }))];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const seo = seoForSlug(slug);
  return seo ? pageMetadata(slug, seo) : {};
}

export default async function ContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cat?: string; payment?: string }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  if (!isPageSlug(slug)) notFound();
  const seo = seoForSlug(slug)!;
  const pageUrl = `${SITE_URL}/${slug}`;
  const pageType = slug === "gallery" ? "CollectionPage" : slug === "contact" ? "ContactPage" : "WebPage";
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": pageType,
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        ...(isSpecialty(slug)
          ? { mainEntity: { "@id": `${pageUrl}#service` } }
          : slug === "gallery"
            ? { mainEntity: { "@id": `${pageUrl}#gallery` } }
            : slug === "manufacturing-equipment"
              ? { mainEntity: { "@id": `${pageUrl}#equipment` } }
              : {}),
      },
      breadcrumbJsonLd(slug, seo.title),
      ...(isSpecialty(slug)
        ? [
            {
              "@type": "Service",
              "@id": `${pageUrl}#service`,
              name: specialtyBySlug(slug)!.title,
              serviceType: `${specialtyBySlug(slug)!.title} stretch forming`,
              description: specialtyBySlug(slug)!.summary,
              url: pageUrl,
              image: `${SITE_URL}${specialtyBySlug(slug)!.image}`,
              areaServed: "Worldwide",
              provider: { "@id": `${SITE_URL}/#organization` },
            },
          ]
        : []),
      ...(slug === "gallery"
        ? [
            {
              "@type": "ImageGallery",
              "@id": `${pageUrl}#gallery`,
              name: "Metal Bending Corporation project gallery",
              url: pageUrl,
              hasPart: featuredWork.map((image) => ({
                "@type": "ImageObject",
                contentUrl: `${SITE_URL}${image.src}`,
                caption: image.alt,
              })),
            },
          ]
        : []),
      ...(slug === "manufacturing-equipment"
        ? [
            {
              "@type": "ItemList",
              "@id": `${pageUrl}#equipment`,
              name: "Metal forming and quality-assurance equipment",
              numberOfItems: equipment.major.length + equipment.support.length + equipment.quality.length,
              itemListElement: [...equipment.major, ...equipment.support, ...equipment.quality].map(
                (name, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name,
                }),
              ),
            },
          ]
        : []),
    ],
  };

  if (isSpecialty(slug)) {
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <SpecialtyView slug={slug} />
      </PageShell>
    );
  }

  if (slug === "gallery") {
    const cat = specialties.some((item) => item.slug === query.cat) ? (query.cat as SpecialtySlug) : "all";
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <main>
          <PlainHero
            eyebrow="Project gallery"
            title="Work from the shop"
            lede="Framing, glazing, ceilings, copper gutters, and aerospace parts, stretch formed in Anaheim and installed on projects around the world."
            crumb="Gallery"
          />
          <section className="section tone-light work-section">
            <div className="shell">
              <WorkGallery initialCategory={cat} />
            </div>
          </section>
        </main>
      </PageShell>
    );
  }

  if (slug === "manufacturing-equipment") {
    const groups = [
      { title: "Forming", note: "Stretch presses and wrap forming", items: equipment.major },
      { title: "Support", note: "Cutting, drilling, machining, handling", items: equipment.support },
      { title: "Quality assurance", note: "Inspection and measurement", items: equipment.quality },
    ];
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <main>
          <PlainHero
            eyebrow="Manufacturing equipment"
            title="The press line and the tools behind it"
            lede="Hufford and Cyril Bath stretch presses, backed by in-house die making, machining, and granite-plate inspection."
            crumb="Equipment"
          />
          <section className="section tone-light equipment-page">
            <div className="shell equipment-lists">
              {groups.map((group, index) => (
                <article key={group.title}>
                  <header>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h2>{group.title}</h2>
                      <p>{group.note}</p>
                    </div>
                  </header>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell showFooterCta={false}>
      <JsonLd data={pageJsonLd} />
      <main>
        <PlainHero
          eyebrow="Contact"
          title="Talk to the shop"
          lede="Send a drawing for a quote, pay an invoice, or call to talk through a curve. Someone here stays reachable through the whole project."
          crumb="Contact"
        />
        <section id="quote" className="section tone-mist quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <h2>Request a quote</h2>
              <p>Tell us the section, material, quantity, and radius. Drawings help.</p>
              <address className="direct-contact">
                <a href={company.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> {company.phone}
                </a>
                <span>
                  <Printer size={16} aria-hidden="true" /> Fax {company.fax}
                </span>
                <a href={company.emailHref}>
                  <Mail size={16} aria-hidden="true" /> {company.email}
                </a>
                <a href={company.mapHref} target="_blank" rel="noreferrer">
                  <MapPin size={16} aria-hidden="true" /> {company.address}
                </a>
                <a href={company.orderForm} download>
                  <FileDown size={16} aria-hidden="true" /> Download the order form
                </a>
              </address>
            </div>
            <QuoteWorkspace initialPaymentComplete={query.payment === "success"} />
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function PlainHero({ eyebrow, title, lede, crumb }: { eyebrow: string; title: string; lede: string; crumb: string }) {
  return (
    <section className="page-hero page-hero-plain tone-dark">
      <div className="shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page">{crumb}</span>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero-lede">{lede}</p>
      </div>
    </section>
  );
}
