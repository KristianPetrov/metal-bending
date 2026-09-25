"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { specialties, workImages, type SpecialtySlug, type WorkImage } from "@/lib/site-content";

const filters: { id: "all" | SpecialtySlug; label: string }[] = [
  { id: "all", label: "All" },
  ...specialties.map((specialty) => ({ id: specialty.slug, label: specialty.navLabel })),
];

export default function WorkGallery({
  initialCategory = "all",
  images = workImages,
  showFilters = true,
}: {
  initialCategory?: "all" | SpecialtySlug;
  images?: WorkImage[];
  showFilters?: boolean;
}) {
  const [filter, setFilter] = useState<"all" | SpecialtySlug>(initialCategory);
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? images : images.filter((image) => image.category === filter)),
    [filter, images],
  );

  const featuredLayout = visible.length > 0 && visible.every((image) => image.category === visible[0].category);
  const activeImage = visible.find((image) => image.src === active) ?? null;
  const visibleFilters = filters.filter((item) => item.id === "all" || images.some((image) => image.category === item.id));

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      {showFilters && visibleFilters.length > 1 && (
        <div className="gallery-filters" role="tablist" aria-label="Filter work by specialty">
          {visibleFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              className={filter === item.id ? "is-active" : ""}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <ul className="work-grid">
        {visible.map((image) => {
          const featured = Boolean(featuredLayout && image.featured);
          const studio = Boolean(image.studio);
          return (
            <li key={image.src} className={[featured ? "is-featured" : "", studio ? "is-studio" : ""].filter(Boolean).join(" ") || undefined}>
              <button type="button" onClick={() => setActive(image.src)} aria-label={`View ${image.alt}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={
                    featured
                      ? "(max-width: 900px) 100vw, (max-width: 1100px) 100vw, 66vw"
                      : "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  }
                />
                <span className="work-card-caption">{image.alt}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button type="button" className="lightbox-backdrop" aria-label="Close image" onClick={() => setActive(null)} />
          <figure>
            <Image src={activeImage.src} alt={activeImage.alt} width={1280} height={720} />
            <figcaption>{activeImage.alt}</figcaption>
            <button type="button" className="lightbox-close" onClick={() => setActive(null)}>
              Close
            </button>
          </figure>
        </div>
      )}
    </>
  );
}
