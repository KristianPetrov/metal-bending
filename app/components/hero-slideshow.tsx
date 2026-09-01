"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/work/hero-2.jpg", alt: "Curved metal sections staged for inspection" },
  { src: "/work/hero-1.jpg", alt: "Stretch-formed metal profiles in the shop" },
  { src: "/work/hero-4.jpg", alt: "Stacked curved extrusions" },
  { src: "/work/hero-3.jpg", alt: "Precision-formed architectural metal" },
  { src: "/work/hero-5.jpg", alt: "Finished stretch-formed parts" },
];

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="hero-visual">
      <div className="hero-image">
        {slides.map((slide, slideIndex) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            priority={slideIndex === 0}
            sizes="(max-width: 900px) 100vw, 48vw"
            className={slideIndex === index ? "is-active" : ""}
          />
        ))}
        <div className="hero-grid-overlay" aria-hidden="true" />
      </div>
      <div className="visual-index" aria-hidden="true">
        <span>FORM / 0{index + 1}</span>
        <span>33.8366° N</span>
      </div>
    </div>
  );
}
