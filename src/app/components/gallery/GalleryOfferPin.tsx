"use client";

import { SITE_CONTACT } from "@/app/config/contact";
import { EDGE_PIN_FIXED_Y } from "@/app/components/floating/edgePinLayout";
import { GALLERY_OFFER } from "./galleryOfferContent";
import { useCallback, useEffect, useRef, useState } from "react";

type GalleryOfferPinProps = {
  onRequestForm: () => void;
};

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D4AF37]"
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
  );
}

/** Tab ưu đãi cố định bên trái — tối ưu CRO thuê shophouse Vincom */
export default function GalleryOfferPin({ onRequestForm }: GalleryOfferPinProps) {
  const [open, setOpen] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { phoneDisplay, phoneTel, zaloUrl } = SITE_CONTACT;
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setShowPhone(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open, close]);

  return (
    <div
      ref={panelRef}
      className={`pointer-events-none ${EDGE_PIN_FIXED_Y} left-0 z-40 flex flex-row items-center max-md:left-[max(0px,env(safe-area-inset-left,0px))]`}
      aria-label="Ưu đãi shophouse"
    >
      <button
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (open) setShowPhone(false);
        }}
        aria-expanded={open}
        aria-controls="gallery-offer-panel"
        aria-label={GALLERY_OFFER.ariaTab}
        className="pointer-events-auto relative flex min-h-[7rem] w-8 flex-col items-center justify-center gap-1 rounded-r-xl border border-r-[#D4AF37]/55 border-y-[#D4AF37]/40 border-l-0 bg-[#151515] py-3 pl-1 pr-0.5 text-gold shadow-[6px_0_22px_rgba(21,21,21,0.16)] transition-all duration-300 ease-[var(--ease-premium)] hover:bg-[#1f1f1f] hover:shadow-[8px_0_26px_rgba(21,21,21,0.2)] active:scale-[0.98] touch-manipulation sm:w-9"
      >
        {!open ? (
          <span
            className="offer-pulse-dot absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 ring-2 ring-white"
            aria-hidden
          />
        ) : null}
        <span className="text-[9px] font-bold uppercase tracking-[0.32em] [writing-mode:vertical-rl]">
          {GALLERY_OFFER.tabLabel}
        </span>
        <span className="h-1 w-1 rounded-full bg-gold/80" aria-hidden />
      </button>

      {open ? (
        <div
          id="gallery-offer-panel"
          className="offer-panel-in pointer-events-auto relative ml-2 w-[min(18.5rem,calc(100vw-3.5rem))] max-h-[min(85dvh,640px)] overflow-y-auto overflow-x-hidden rounded-2xl border border-[#D4AF37]/40 bg-white shadow-[0_16px_48px_rgba(46,42,37,0.28)]"
          role="dialog"
          aria-labelledby="gallery-offer-title"
        >
          <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-gold-light to-[#D4AF37]/30" aria-hidden />

          <span className="absolute top-3 right-10 rounded-full bg-[#E85D4C] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
            {GALLERY_OFFER.hotTag}
          </span>

          <button
            type="button"
            onClick={close}
            className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cream-bright/40 hover:text-[#151515]"
            aria-label={GALLERY_OFFER.ariaClose}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="p-4 pt-3.5">
            <p
              id="gallery-offer-title"
              className="pr-14 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]"
            >
              {GALLERY_OFFER.title}
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF4E6] px-2.5 py-1 text-[10px] font-semibold text-[#B45309]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E85D4C]" aria-hidden />
              {GALLERY_OFFER.scarcity}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-[#151515]/90">
              {GALLERY_OFFER.intro}
            </p>

            <ul className="mt-3 space-y-2.5">
              {GALLERY_OFFER.benefits.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-snug text-[#151515]">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {showPhone ? (
              <div className="mt-4 space-y-2 border-t border-gold/25 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
                  {GALLERY_OFFER.phoneSectionTitle}
                </p>
                <a
                  href={`tel:${phoneTel}`}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#151515]/10 bg-[#F8F5F2] text-base font-bold tracking-wide text-[#151515] transition-all hover:border-[#D4AF37]/50 hover:shadow-md active:scale-[0.98] touch-manipulation"
                >
                  <svg
                    className="h-4 w-4 text-[#D4AF37]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.964 3.852a1.125 1.125 0 00-1.091-.852H4.125A2.25 2.25 0 002.25 6.75z"
                    />
                  </svg>
                  {phoneDisplay}
                </a>
                <a
                  href={zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#0068FF]/20 bg-[#0068FF]/5 text-xs font-semibold uppercase tracking-widest text-[#0068FF] transition-colors hover:bg-[#0068FF]/10 active:scale-[0.98] touch-manipulation"
                >
                  <img src="/images/icons/zalo.svg" alt="" className="h-7 w-7 shrink-0 object-contain" aria-hidden />
                  {GALLERY_OFFER.ctaZalo}
                </a>
                <button
                  type="button"
                  onClick={() => setShowPhone(false)}
                  className="w-full py-1 text-center text-[10px] text-ink-soft underline-offset-2 hover:underline"
                >
                  Quay lại
                </button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    close();
                    onRequestForm();
                  }}
                  className="min-h-12 w-full rounded-xl bg-[#151515] px-4 py-3.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_24px_rgba(21,21,21,0.25)] transition-all hover:bg-[#2a2a2a] active:scale-[0.98] touch-manipulation"
                >
                  {GALLERY_OFFER.ctaPrimary}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPhone(true)}
                  className="min-h-11 w-full rounded-xl border-2 border-[#D4AF37]/50 bg-white px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#AA8453] transition-all hover:border-[#D4AF37] hover:bg-[#FFFBF5] active:scale-[0.98] touch-manipulation"
                >
                  {GALLERY_OFFER.ctaSecondary}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
