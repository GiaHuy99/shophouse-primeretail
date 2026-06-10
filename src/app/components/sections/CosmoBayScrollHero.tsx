"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

type SlideKind = "hero" | "zone";

const GALLERY_IMAGES: ReadonlyArray<{
  src: string;
  label: string;
  kind: SlideKind;
}> = [
  {
    src: "/images/cangio/Screenshot 2026-05-20 at 19.07.49.png",
    label: "CosmoBay Cần Giờ",
    kind: "hero",
  },
  { src: "/images/zoneCanGio/Zone1.jpg", label: "Zone E1", kind: "zone" },
  { src: "/images/zoneCanGio/Zone2.jpg", label: "Zone E2", kind: "zone" },
  { src: "/images/zoneCanGio/Zone3.jpg", label: "Zone E3", kind: "zone" },
  { src: "/images/zoneCanGio/Zone4.jpg", label: "Zone E4", kind: "zone" },
  { src: "/images/zoneCanGio/Zone5.jpg", label: "Zone E5", kind: "zone" },
  { src: "/images/zoneCanGio/Zone6.jpg", label: "Zone E6", kind: "zone" },
];

const SLIDE_COUNT = GALLERY_IMAGES.length;
const SWIPE_THRESHOLD_PX = 48;
const AUTOPLAY_MS = 2000;
const AUTOPLAY_RESUME_MS = 3000;
const FADE_MS = 280;

const HERO_STATS = [
  { v: "2.870 ha", l: "Tổng quy mô", sub: "Siêu đô thị lấn biển" },
  { v: "Phân khu E", l: "Vị trí dự án", sub: "Lõi giải trí thương mại" },
  { v: "11.000+ tỷ", l: "Vốn cầu Cần Giờ", sub: "Rút ngắn còn 35 phút" },
] as const;

function assetSrc(path: string): string {
  if (!path.startsWith("/")) return path;
  return path
    .split("/")
    .map((segment, index) => (index <= 1 ? segment : encodeURIComponent(segment)))
    .join("/");
}

export default function CosmoBayScrollHero() {
  const [index, setIndex] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const current = GALLERY_IMAGES[index];

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDE_COUNT);
  }, []);

  const pauseAutoplay = useCallback(() => {
    setAutoplayPaused(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
  }, []);

  const scheduleAutoplayResume = useCallback(() => {
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setAutoplayPaused(false);
      resumeTimerRef.current = null;
    }, AUTOPLAY_RESUME_MS);
  }, []);

  const handleManualChange = useCallback(
    (action: () => void) => {
      pauseAutoplay();
      action();
      scheduleAutoplayResume();
    },
    [pauseAutoplay, scheduleAutoplayResume],
  );

  useEffect(() => {
    setImgVisible(false);
    const fadeIn = window.setTimeout(() => setImgVisible(true), 40);
    return () => window.clearTimeout(fadeIn);
  }, [index]);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || autoplayPaused || !inView) return;

    const timer = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [autoplayPaused, inView, goNext]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const active = strip.querySelector<HTMLElement>('[aria-selected="true"]');
    active?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [index]);

  const onTouchStart = (e: TouchEvent) => {
    (e.currentTarget as HTMLElement).dataset.touchX = String(e.touches[0].clientX);
  };

  const onTouchEnd = (e: TouchEvent) => {
    const startX = Number((e.currentTarget as HTMLElement).dataset.touchX);
    if (Number.isNaN(startX)) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx > 0) handleManualChange(goPrev);
    else handleManualChange(goNext);
  };

  return (
    <section
      className="relative bg-[#060a0c] section-mobile px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
      aria-label="CosmoBay Cần Giờ — Phân khu giải trí đỉnh cao"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,_#141c22_0%,_#060a0c_65%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(280px,36%)_1fr] lg:gap-10 lg:items-stretch">
        {/* ── Cột chữ ── */}
        <div className="flex flex-col justify-center border border-white/10 bg-navy/85 p-6 sm:p-8">
          <div className="mb-5 inline-flex w-fit items-center gap-2.5 border border-gold/40 bg-gold/10 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Green Paradise Cần Giờ
            </span>
          </div>

          <h2 className="font-bold leading-[1.1] tracking-tight text-white">
            <span className="block text-[2rem] sm:text-[2.35rem] lg:text-[2.75rem]">CosmoBay</span>
            <span className="block text-[1.65rem] text-gold sm:text-[2rem] lg:text-[2.35rem]">
              Cần Giờ
            </span>
            <span className="mt-3 block text-base font-medium leading-snug text-cream sm:text-lg">
              Tổ hợp vui chơi, giải trí và thương mại lấn biển — đón đầu làn sóng hạ tầng tỷ đô
            </span>
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-cream/90 sm:text-[0.9375rem]">
            Thuộc quy hoạch đại đô thị 2.870 ha, Phân khu CosmoBay sở hữu các cụm công viên chủ đề,
            sân golf cao cấp và shophouse kinh doanh dòng chảy du lịch quốc tế đầu tiên tại TP.HCM.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-px border border-white/10 bg-white/10">
            {HERO_STATS.map((s) => (
              <div key={s.l} className="bg-navy/70 px-2 py-3 text-center sm:px-3 sm:py-4">
                <p className="text-sm font-bold leading-none text-gold sm:text-base">{s.v}</p>
                <p className="mt-1 text-[10px] font-semibold text-white sm:text-[11px]">{s.l}</p>
                <p className="mt-0.5 text-[9px] leading-tight text-cream/80 sm:text-[10px]">
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cột ảnh (~64%) ── */}
        <div
          ref={galleryRef}
          className="flex min-h-0 flex-col gap-4"
          onMouseEnter={pauseAutoplay}
          onMouseLeave={() => setAutoplayPaused(false)}
          onFocus={pauseAutoplay}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setAutoplayPaused(false);
            }
          }}
        >
          <div
            className="relative touch-pan-y"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-gold/35 bg-[#0a1216] shadow-[0_16px_48px_rgba(0,0,0,0.45)] sm:aspect-[16/9] lg:min-h-[min(52vh,520px)] lg:aspect-auto lg:h-[min(52vh,520px)]">
              <Image
                key={current.src}
                src={assetSrc(current.src)}
                alt={current.label}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority={index === 0}
                {...(index === 0 ? {} : { loading: "lazy" as const })}
                decoding="async"
                className={`object-contain p-2 sm:p-4 transition-opacity ease-[var(--ease-premium)] ${
                  imgVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDuration: `${FADE_MS}ms` }}
              />

              {current.kind === "zone" ? (
                <div className="absolute left-0 top-0 border-b border-r border-gold/30 bg-navy/90 px-3 py-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    {current.label}
                  </span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => handleManualChange(goPrev)}
                aria-label="Ảnh trước"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-navy/70 text-cream-bright transition-colors hover:border-gold/50 hover:text-gold sm:left-3"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleManualChange(goNext)}
                aria-label="Ảnh sau"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-white/15 bg-navy/70 text-cream-bright transition-colors hover:border-gold/50 hover:text-gold sm:right-3"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-gold">{current.label}</p>
            <span className="text-[11px] uppercase tracking-widest text-cream/60" aria-live="polite">
              {index + 1} / {SLIDE_COUNT}
            </span>
          </div>

          <div
            ref={thumbStripRef}
            className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]"
            role="tablist"
            aria-label="Chọn ảnh CosmoBay"
          >
            {GALLERY_IMAGES.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={item.label}
                onClick={() => handleManualChange(() => goTo(i))}
                className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden border-2 transition-[opacity,border-color,transform] duration-200 sm:h-16 sm:w-24 ${
                  i === index
                    ? "scale-[1.02] border-gold opacity-100"
                    : "border-white/10 opacity-45 hover:opacity-70"
                }`}
              >
                <Image
                  src={assetSrc(item.src)}
                  alt=""
                  fill
                  sizes="96px"
                  loading="lazy"
                  decoding="async"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
