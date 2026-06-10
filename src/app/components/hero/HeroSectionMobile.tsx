"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, type TouchEvent } from "react";
import {
  HERO_BADGE,
  HERO_IMAGES,
  HERO_MOBILE_TITLE_GOLD,
  HERO_MOBILE_TITLE_LINE,
} from "./heroContent";
import type { useHeroCarousel } from "./useHeroCarousel";

const SWIPE_THRESHOLD_PX = 40;
const RESUME_AUTOPLAY_MS = 3000;

type CarouselApi = ReturnType<typeof useHeroCarousel>;

export default function HeroSectionMobile({
  carousel,
}: {
  carousel: CarouselApi;
}) {
  const { activeIndex, goTo, goNext, goPrev, pauseAutoplay, resumeAutoplay } =
    carousel;

  const touchStartX = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResumeAutoplay = useCallback(() => {
    clearResumeTimer();
    resumeTimerRef.current = window.setTimeout(() => {
      resumeAutoplay();
      resumeTimerRef.current = null;
    }, RESUME_AUTOPLAY_MS);
  }, [clearResumeTimer, resumeAutoplay]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const onTouchStart = useCallback(
    (e: TouchEvent) => {
      clearResumeTimer();
      pauseAutoplay();
      touchStartX.current = e.touches[0].clientX;
    },
    [clearResumeTimer, pauseAutoplay],
  );

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      touchStartX.current = null;
      if (dx < -SWIPE_THRESHOLD_PX) goNext();
      else if (dx > SWIPE_THRESHOLD_PX) goPrev();
      scheduleResumeAutoplay();
    },
    [goNext, goPrev, scheduleResumeAutoplay],
  );

  return (
    <section
      className="relative flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-navy touch-pan-y md:hidden"
      aria-label="Giới thiệu"
    >
      {/* Ảnh chiếm phần còn lại — cover + top: lấp kín, không dải đen dưới ảnh */}
      <div
        className="relative min-h-0 flex-1 touch-pan-x"
        aria-hidden
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex h-full transition-transform duration-700 ease-[var(--ease-premium)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {HERO_IMAGES.map((image, index) => (
            <div
              key={image.src}
              className="relative h-full min-h-0 w-full min-w-full flex-shrink-0"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-cover object-top"
              />
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/90 to-transparent"
          aria-hidden
        />
      </div>

      {/* Khối chữ sát ảnh — bỏ pt-24 gây hở đen */}
      <div className="relative z-10 shrink-0 bg-navy px-5 pb-[max(5.5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] pt-3">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-3 inline-flex max-w-full items-center gap-2.5 border border-white/20 bg-navy/50 px-3 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
            <span className="text-[10px] font-medium uppercase leading-snug tracking-[0.18em] text-gold">
              {HERO_BADGE}
            </span>
          </div>

          <h1 className="mb-3 text-xl font-bold leading-[1.2] tracking-tight text-white">
            {HERO_MOBILE_TITLE_LINE}
            <br />
            <span className="text-gold">{HERO_MOBILE_TITLE_GOLD}</span>
          </h1>

          <div className="mb-4 h-px w-12 bg-gold" />

          <div
            className="flex justify-center gap-2"
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
                className={`h-1 min-h-[4px] touch-manipulation transition-all duration-300 ease-[var(--ease-premium)] ${
                  index === activeIndex
                    ? "w-10 bg-gold"
                    : "w-6 bg-white/35 active:bg-white/55"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {HERO_IMAGES[activeIndex].alt}
      </p>
    </section>
  );
}
