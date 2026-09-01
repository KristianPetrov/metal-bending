"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { specialties, workImages, type SpecialtySlug } from "@/lib/site-content";

const filters: { id: "all" | SpecialtySlug; label: string }[] = [
  { id: "all", label: "All work" },
  ...specialties.map((specialty) => ({ id: specialty.slug, label: specialty.navLabel })),
];

export default function WorkGallery({
  initialCategory = "all",
  images = workImages,
}: {
  initialCategory?: "all" | SpecialtySlug;
  images?: typeof workImages;
}) {
  const [filter, setFilter] = useState<"all" | SpecialtySlug>(initialCategory);
  const [active, setActive] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? images : images.filter((image) => image.category === filter)),
    [filter, images],
  );

  const activeImage = visible.find((image) => image.src === active) ?? null;

  return (
    <>
      {filters.some((item) => images.some((image) => item.id === "all" || image.category === item.id)) && (
        <div className="gallery-filters" role="tablist" aria-label="Filter work by specialty">
          {filters
            .filter((item) => item.id === "all" || images.some((image) => image.category === item.id))
            .map((item) => (
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
        {visible.map((image) => (
          <li key={image.src}>
            <button type="button" onClick={() => setActive(image.src)} aria-label={`View ${image.alt}`}>
              <Image src={image.src} alt={image.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" />
            </button>
          </li>
        ))}
      </ul>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.alt}>
          <button type="button" className="lightbox-backdrop" aria-label="Close image" onClick={() => setActive(null)} />
          <figure>
            <Image src={activeImage.src} alt={activeImage.alt} width={1200} height={720} />
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
