"use client";

import { useCallback, useEffect, useState } from "react";
import { HERO_AUTOPLAY_MS, SLIDE_COUNT } from "./heroContent";

type UseHeroCarouselOptions = {
  /** Arrow keys; use false on mobile-only usage if this hook is ever shared. */
  enableKeyboard?: boolean;
};

export function useHeroCarousel(
  options: UseHeroCarouselOptions = {},
) {
  const { enableKeyboard = true } = options;
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || autoplayPaused) return;

    const timer = window.setInterval(goNext, HERO_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [goNext, autoplayPaused]);

  useEffect(() => {
    if (!enableKeyboard) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enableKeyboard, goNext, goPrev]);

  const pauseAutoplay = useCallback(() => setAutoplayPaused(true), []);
  const resumeAutoplay = useCallback(() => setAutoplayPaused(false), []);

  return {
    activeIndex,
    goTo,
    goNext,
    goPrev,
    pauseAutoplay,
    resumeAutoplay,
  };
}
