"use client";

import { EDGE_PIN_FIXED_Y } from "./edgePinLayout";
import { useEffect, useState } from "react";
import HeroContactFloat from "./HeroContactFloat";

/** Ẩn trong hero; khi mép đáy hero đã kéo lên khỏi viewport thì cố định giữa-phải cả trang. */
const HERO_BOTTOM_CLEAR_PX = 32;

export default function HeroContactFloatSticky() {
  const [showBelowHero, setShowBelowHero] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const sync = () => {
      const { bottom } = hero.getBoundingClientRect();
      setShowBelowHero(bottom <= HERO_BOTTOM_CLEAR_PX);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);

    const ro = new ResizeObserver(sync);
    ro.observe(hero);

    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      ro.disconnect();
    };
  }, []);

  if (!showBelowHero) return null;

  return (
    <HeroContactFloat
      className={`${EDGE_PIN_FIXED_Y} right-0 z-[55] max-md:right-[env(safe-area-inset-right,0px)]`}
    />
  );
}
