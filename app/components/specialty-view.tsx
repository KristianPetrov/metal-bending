import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WorkGallery from "./work-gallery";
import {
  imagesForSpecialty,
  leadImageForSpecialty,
  specialtyBySlug,
  workImages,
  type SpecialtySlug,
} from "@/lib/site-content";

export default function SpecialtyView({ slug }: { slug: SpecialtySlug }) {
  const specialty = specialtyBySlug(slug)!;
  const images = imagesForSpecialty(slug);
  const lead = leadImageForSpecialty(slug);
  const heroPhoto = workImages.find((image) => image.src === specialty.image);
  const catalogSrcs = new Set(specialty.catalog?.flatMap((group) => group.items.map((item) => item.src)) ?? []);
  const galleryImages = images.filter((image) => !catalogSrcs.has(image.src));
  const leadIsStudio = Boolean(lead?.studio);

  return (
    <main className="specialty-page">
      <section className="page-hero">
        <div className="shell page-hero-grid">
          <div>
            <p className="signal-label signal-dark">
              <span>{specialty.number}</span> Specialty
            </p>
            <h1>{specialty.title}</h1>
            <p>{specialty.summary}</p>
            <p className="specialty-kicker">{specialty.detail}</p>
            <Link className="button button-dark specialty-hero-cta" href="/#quote">
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="page-hero-image">
            <Image
              src={specialty.image}
              alt={heroPhoto?.alt ?? specialty.title}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 48vw"
              quality={85}
            />
          </div>
        </div>
      </section>

      <section className="section specialty-body">
        <div className="shell specialty-layout">
          <div className="specialty-copy">
            {specialty.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="button button-dark" href="/#quote">
              Request a quote <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {lead && (
            <figure className="specialty-lead">
              <div className={`specialty-lead-image${leadIsStudio ? " is-studio" : ""}`}>
                <Image src={lead.src} alt={lead.alt} fill sizes="(max-width: 900px) 100vw, 42vw" quality={85} />
              </div>
              <figcaption>{lead.alt}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {specialty.catalog && (
        <section className="section catalog-section" aria-labelledby={`${slug}-catalog-title`}>
          <div className="shell">
            <header className="section-heading">
              <p className="signal-label signal-dark">
                <span>02</span> Profiles
              </p>
              <div>
                <h2 id={`${slug}-catalog-title`}>{specialty.catalogHeading ?? "Profiles"}</h2>
                <p>{specialty.detail}.</p>
              </div>
            </header>
            <div className="catalog-groups">
              {specialty.catalog.map((group) => (
                <article key={group.heading}>
                  <h3>{group.heading}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.src}>
                        <figure className="catalog-card">
                          <div className="catalog-card-image">
                            <Image src={item.src} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 33vw" quality={85} />
                          </div>
                          <figcaption>{item.label}</figcaption>
                        </figure>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section work-section">
        <div className="shell">
          <header className="section-heading">
            <p className="signal-label signal-dark">
              <span>{specialty.catalog ? "03" : "02"}</span> Gallery
            </p>
            <div>
              <h2>{specialty.navLabel} from the shop.</h2>
            </div>
          </header>
          <WorkGallery initialCategory={slug} images={galleryImages} showFilters={false} />
        </div>
      </section>
    </main>
  );
}
