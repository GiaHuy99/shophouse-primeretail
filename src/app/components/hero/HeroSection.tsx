"use client";

import { useHeroCarousel } from "./useHeroCarousel";
import HeroSectionDesktop from "./HeroSectionDesktop";
import HeroSectionMobile from "./HeroSectionMobile";

export default function HeroSection() {
  const carousel = useHeroCarousel({ enableKeyboard: true });

  return (
    <div id="hero">
      <HeroSectionMobile carousel={carousel} />
      <HeroSectionDesktop carousel={carousel} />
    </div>
  );
}
