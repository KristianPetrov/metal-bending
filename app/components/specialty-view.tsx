import { ArrowRight, ArrowUpRight, ChevronRight, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileCatalog from "./profile-catalog";
import WorkGallery from "./work-gallery";
import {
  company,
  imagesForSpecialty,
  leadImageForSpecialty,
  specialties,
  specialtyBySlug,
  workImages,
  type SpecialtySlug,
} from "@/lib/site-content";

export default function SpecialtyView({ slug }: { slug: SpecialtySlug }) {
  const specialty = specialtyBySlug(slug)!;
  const images = imagesForSpecialty(slug);
  const lead = leadImageForSpecialty(slug);
  const heroPhoto = workImages.find((image) => image.src === specialty.image);
  const leadIsStudio = Boolean(lead?.studio);
  const paragraphs = specialty.paragraphs?.length ? specialty.paragraphs : [specialty.summary];
  const others = specialties.filter((item) => item.slug !== slug);
  let sectionNumber = 1;
  const nextNumber = () => String(++sectionNumber).padStart(2, "0");

  return (
    <main className="specialty-page">
      <section className="page-hero tone-dark">
        <div className="shell page-hero-grid">
          <div className="page-hero-copy">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link href="/#capabilities">Capabilities</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <span aria-current="page">{specialty.navLabel}</span>
            </nav>
            <p className="eyebrow">{specialty.number} · Specialty</p>
            <h1>{specialty.title}</h1>
            <p className="page-hero-lede">{specialty.summary}</p>
            <ul className="tag-list" aria-label="Typical parts">
              {specialty.detail.split(",").map((tag) => (
                <li key={tag}>{tag.trim()}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link className="button button-primary" href="/#quote">
                Request a quote <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a className="button button-outline" href={company.phoneHref}>
                <Phone size={16} aria-hidden="true" /> {company.phone}
              </a>
            </div>
          </div>
          <div className="page-hero-image">
            <Image
              src={specialty.image}
              alt={heroPhoto?.alt ?? specialty.title}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 900px) 100vw, 48vw"
            />
          </div>
        </div>
      </section>

      <section className="section tone-light specialty-body">
        <div className="shell specialty-layout">
          <div className="specialty-copy">
            <p className="eyebrow">01 · Overview</p>
            <h2>What the shop forms</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="button button-primary" href="/#quote">
              Send a drawing <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {lead && (
            <figure className="specialty-lead">
              <div className={`specialty-lead-image${leadIsStudio ? " is-studio" : ""}`}>
                <Image src={lead.src} alt={lead.alt} fill sizes="(max-width: 900px) 100vw, 42vw" />
              </div>
              <figcaption>{lead.alt}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {specialty.catalog && (
        <section id="profiles" className="section tone-mist" aria-labelledby={`${slug}-catalog-title`}>
          <div className="shell">
            <header className="section-head">
              <div>
                <p className="eyebrow">{nextNumber()} · Profiles</p>
                <h2 id={`${slug}-catalog-title`}>{specialty.catalogHeading ?? "Profiles"}</h2>
              </div>
              <p>{specialty.summary}</p>
            </header>
            <ProfileCatalog groups={specialty.catalog} />
          </div>
        </section>
      )}

      <section className="section tone-light work-section">
        <div className="shell">
          <header className="section-head section-head-row">
            <div>
              <p className="eyebrow">{nextNumber()} · Gallery</p>
              <h2>{specialty.navLabel} from the shop</h2>
            </div>
            <Link className="button button-outline" href={`/gallery?cat=${slug}`}>
              Full gallery <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </header>
          <WorkGallery initialCategory={slug} images={images} showFilters={false} />
        </div>
      </section>

      <section className="section section-tight tone-graphite" aria-labelledby="other-capabilities">
        <div className="shell">
          <header className="section-head section-head-row">
            <div>
              <p className="eyebrow">More capabilities</p>
              <h2 id="other-capabilities">Other work the shop forms</h2>
            </div>
          </header>
          <ul className="related-list">
            {others.map((item) => (
              <li key={item.slug}>
                <Link href={`/${item.slug}`}>
                  <span className="related-image">
                    <Image src={item.image} alt="" fill sizes="(max-width: 700px) 50vw, 25vw" />
                  </span>
                  <span className="related-copy">
                    <small>{item.number}</small>
                    <strong>{item.title}</strong>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
