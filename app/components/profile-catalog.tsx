import Image from "next/image";
import type { CatalogGroup } from "@/lib/site-content";

export default function ProfileCatalog({
  groups,
  href,
}: {
  groups: CatalogGroup[];
  href?: string;
}) {
  return (
    <div className="catalog-groups">
      {groups.map((group) => (
        <article key={group.heading || "profiles"}>
          {group.heading ? <h3>{group.heading}</h3> : null}
          {group.intro ? <p className="catalog-intro">{group.intro}</p> : null}
          <ul>
            {group.items.map((item) => {
              const card = (
                <figure className="catalog-card">
                  <div className="catalog-card-image">
                    <Image
                      src={`/profiles/v2/${item.profile}.webp`}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                    />
                  </div>
                  <figcaption>
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </figcaption>
                </figure>
              );
              return (
                <li key={item.profile ?? item.label}>
                  {href ? <a href={href}>{card}</a> : card}
                </li>
              );
            })}
          </ul>
          <p className="catalog-note">Illustrative profile renderings. Final dimensions and radii are confirmed for each job.</p>
        </article>
      ))}
    </div>
  );
}
