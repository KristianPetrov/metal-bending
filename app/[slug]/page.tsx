import { ArrowRight, FileDown, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "../components/json-ld";
import PageShell from "../components/page-shell";
import QuoteWorkspace from "../components/quote-workspace";
import WorkGallery from "../components/work-gallery";
import {
  company,
  equipment,
  featuredWork,
  imagesForSpecialty,
  specialties,
  specialtyBySlug,
  story,
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
    const specialty = specialtyBySlug(slug)!;
    const images = imagesForSpecialty(slug);
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <main>
          <section className="page-hero">
            <div className="shell page-hero-grid">
              <div>
                <p className="signal-label signal-dark">
                  <span>{specialty.number}</span> Specialty
                </p>
                <h1>{specialty.title}</h1>
                <p>{specialty.summary}</p>
              </div>
              <div className="page-hero-image">
                <Image src={specialty.image} alt={specialty.title} fill sizes="(max-width: 900px) 100vw, 48vw" priority />
              </div>
            </div>
          </section>
          <section className="section specialty-body">
            <div className="shell specialty-copy">
              {specialty.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <Link className="button button-dark" href="/#quote">
                Request a quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </section>
          <section className="section work-section">
            <div className="shell">
              <header className="section-heading">
                <p className="signal-label signal-dark">
                  <span>02</span> Gallery
                </p>
                <div>
                  <h2>{specialty.navLabel} from the archive.</h2>
                </div>
              </header>
              <WorkGallery initialCategory={slug} images={images} />
            </div>
          </section>
        </main>
      </PageShell>
    );
  }

  if (slug === "gallery") {
    const cat = specialties.some((item) => item.slug === query.cat) ? (query.cat as SpecialtySlug) : "all";
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <main>
          <section className="page-hero page-hero-plain">
            <div className="shell">
              <p className="signal-label signal-dark">
                <span>01</span> Gallery
              </p>
              <h1>Work from the shop floor.</h1>
              <p>Original photographs from metalbending.com, grouped by specialty.</p>
            </div>
          </section>
          <section className="section work-section">
            <div className="shell">
              <WorkGallery initialCategory={cat} />
            </div>
          </section>
        </main>
      </PageShell>
    );
  }

  if (slug === "manufacturing-equipment") {
    return (
      <PageShell>
        <JsonLd data={pageJsonLd} />
        <main>
          <section className="page-hero page-hero-plain">
            <div className="shell">
              <p className="signal-label signal-dark">
                <span>01</span> Shop
              </p>
              <h1>Manufacturing equipment.</h1>
              <p>Major stretch presses, support equipment, and the quality-assurance bench in Anaheim.</p>
            </div>
          </section>
          <section className="section equipment-page">
            <div className="shell equipment-lists">
              <article>
                <h2>Major equipment</h2>
                <ul>
                  {equipment.major.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h2>Support equipment</h2>
                <ul>
                  {equipment.support.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h2>Quality assurance</h2>
                <ul>
                  {equipment.quality.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </section>
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <JsonLd data={pageJsonLd} />
      <main>
        <section id="quote" className="section quote-section">
          <div className="shell quote-grid">
            <div className="quote-intro">
              <p className="signal-label signal-dark">
                <span>01</span> Contact
              </p>
              <h1>
                {company.name}
                <br />
                <span>Anaheim, California</span>
              </h1>
              <p>{story.approach}</p>
              <address className="direct-contact">
                <a href={company.phoneHref}>
                  <Phone size={16} aria-hidden="true" /> {company.phone}
                </a>
                <a href={company.emailHref}>
                  <Mail size={16} aria-hidden="true" /> {company.email}
                </a>
                <a href={company.orderForm} download>
                  <FileDown size={16} aria-hidden="true" /> Download order form PDF
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
