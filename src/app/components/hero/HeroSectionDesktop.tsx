"use client";

import Image from "next/image";
import {
  HERO_BADGE,
  HERO_DESKTOP_TITLE_GOLD,
  HERO_DESKTOP_TITLE_LINE,
  HERO_IMAGES,
  TRUST_ITEMS,
} from "./heroContent";
import type { useHeroCarousel } from "./useHeroCarousel";

type CarouselApi = ReturnType<typeof useHeroCarousel>;

export default function HeroSectionDesktop({
  carousel,
}: {
  carousel: CarouselApi;
}) {
  const { activeIndex, goTo, goNext, goPrev } = carousel;

  return (
    <section
      className="relative hidden min-h-screen overflow-hidden bg-navy md:block"
      aria-label="Giới thiệu"
    >
      {/* Carousel — full row, trượt ngang */}
      <div className="absolute inset-0" aria-hidden>
        <div
          className="flex h-full transition-transform duration-700 ease-[var(--ease-premium)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className="relative h-full min-h-screen w-full min-w-full flex-shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/85 via-navy/55 to-navy/25" />
            </div>
          ))}
        </div>
      </div>

      {/* Chữ pin cố định trên carousel */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-24 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2.5 border border-gold/60 bg-navy/30 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
              {HERO_BADGE}
            </span>
          </div>

          <h1 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl lg:text-5xl">
            {HERO_DESKTOP_TITLE_LINE}
            <br />
            <span className="text-gold">{HERO_DESKTOP_TITLE_GOLD}</span>
          </h1>

          <div className="mb-5 h-px w-12 bg-gold" />

          {TRUST_ITEMS.length > 0 ? (
            <div className="flex flex-col gap-2.5 border-t border-white/15 pt-6">
              {TRUST_ITEMS.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg
                    className="h-3.5 w-3.5 flex-shrink-0 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-xs tracking-wide text-cream-bright">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Điều hướng slide */}
      <div className="absolute bottom-8 left-6 right-6 z-20 flex items-center justify-between gap-4 sm:left-10 sm:right-10 lg:left-16 lg:right-16">
        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Ảnh hero"
        >
          {HERO_IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Ảnh ${index + 1}: ${image.alt}`}
              onClick={() => goTo(index)}
              className={`h-1 transition-all duration-300 ease-[var(--ease-premium)] ${
                index === activeIndex
                  ? "w-10 bg-gold"
                  : "w-6 bg-white/35 hover:bg-white/55"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Ảnh trước"
            className="flex h-10 w-10 items-center justify-center border border-white/25 bg-navy/40 text-white backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Ảnh tiếp theo"
            className="flex h-10 w-10 items-center justify-center border border-white/25 bg-navy/40 text-white backdrop-blur-sm transition-colors hover:border-gold/60 hover:text-gold"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {HERO_IMAGES[activeIndex].alt}
      </p>
    </section>
  );
}
