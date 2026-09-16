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

  return (
    <main className="specialty-page">
      <section className="page-hero specialty-hero">
        <div className="specialty-hero-media">
          <Image
            src={specialty.image}
            alt={heroPhoto?.alt ?? specialty.title}
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            quality={85}
          />
        </div>
        <div className="shell specialty-hero-content">
          <p className="signal-label">
            <span>{specialty.number}</span> Specialty
          </p>
          <h1>{specialty.title}</h1>
          <p className="specialty-hero-lede">{specialty.summary}</p>
          <p className="specialty-hero-detail">{specialty.detail}</p>
          <Link className="button button-primary" href="/#quote">
            Request a quote <ArrowRight size={16} aria-hidden="true" />
          </Link>
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
              <div className="specialty-lead-image">
                <Image src={lead.src} alt={lead.alt} fill sizes="(max-width: 900px) 100vw, 42vw" quality={85} />
              </div>
              <figcaption>{lead.alt}</figcaption>
            </figure>
          )}
        </div>
      </section>

      {specialty.showcase && (
        <section className="section profile-showcase" aria-labelledby={`${slug}-profiles-title`}>
          <div className="shell">
            <header className="section-heading">
              <p className="signal-label">
                <span>02</span> Profiles
              </p>
              <div>
                <h2 id={`${slug}-profiles-title`}>{specialty.showcase.heading}</h2>
                <p>{specialty.detail}.</p>
              </div>
            </header>
            <div className="profile-showcase-layout">
              <figure className="profile-board">
                <Image
                  src={specialty.showcase.boardSrc}
                  alt={specialty.showcase.boardAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 62vw"
                  quality={85}
                />
              </figure>
              <ul className="profile-cards">
                {specialty.showcase.profiles.map((profile) => (
                  <li key={profile.label}>
                    <strong>{profile.label}</strong>
                    <p>{profile.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="section work-section">
        <div className="shell">
          <header className="section-heading">
            <p className="signal-label signal-dark">
              <span>{specialty.showcase ? "03" : "02"}</span> Gallery
            </p>
            <div>
              <h2>{specialty.navLabel} from the shop.</h2>
            </div>
          </header>
          <WorkGallery initialCategory={slug} images={images} showFilters={false} />
        </div>
      </section>
    </main>
  );
}
