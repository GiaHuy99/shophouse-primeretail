"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Thị Trường", href: "#market" },
  { label: "Dự Án ", href: "#gallery" },
  { label: "ROI Simulator", href: "#roi" },
  { label: "Vị Trí", href: "#zoning" },
  { label: "Tư Vấn", href: "#contact" },
] as const;

function IconMarket({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
    </svg>
  );
}
function IconGallery({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}
function IconROI({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}
function IconMap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconContact({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}

const BOTTOM_ICONS = [IconMarket, IconGallery, IconROI, IconMap, IconContact] as const;

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-md:pb-0 ${
          scrolled
            ? "bg-navy/95 border-b border-white/5"
            : "bg-transparent"
        }`}
        style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-6 sm:py-4 sm:pt-4">
          <a href="#" className="flex items-center gap-3 group min-w-0">
            <div className="w-8 h-8 border border-gold flex items-center justify-center shrink-0">
              <span className="text-gold text-xs font-bold tracking-widest">VR</span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-white text-xs font-semibold tracking-widest uppercase leading-none truncate">
                Vincom Retail
              </p>
              <p className="text-cream text-[10px] tracking-widest uppercase truncate">
                F&B Investment
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Chính">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-cream text-xs tracking-widest uppercase font-medium hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/*<div className="hidden md:flex items-center gap-4">*/}
          {/*  <button*/}
          {/*    type="button"*/}
          {/*    onClick={() => console.log("Download Prospectus")}*/}
          {/*    className="px-5 py-2.5 bg-gold text-navy text-xs font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"*/}
          {/*  >*/}
          {/*    Tải Hồ Sơ Đầu Tư*/}
          {/*  </button>*/}
          {/*</div>*/}

          {/* Mobile: prospectus — desktop CTA lives above */}
          <button
            type="button"
            onClick={() => console.log("Download Prospectus")}
            className="md:hidden shrink-0 min-h-10 min-w-10 flex items-center justify-center border border-gold/40 text-gold hover:bg-gold/10 transition-colors duration-200 touch-manipulation"
            aria-label="Tải hồ sơ đầu tư"
            title="Tải Hồ Sơ Đầu Tư"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile: bottom primary navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-navy/95 backdrop-blur-xl pb-[max(0.35rem,env(safe-area-inset-bottom,0px))] pt-1.5 px-1 shadow-[0_-8px_32px_rgba(0,0,0,0.35)]"
        aria-label="Điều hướng nhanh"
      >
        <ul className="grid grid-cols-5 gap-0 max-w-lg mx-auto">
          {NAV_LINKS.map((link, i) => {
            const Icon = BOTTOM_ICONS[i];
            return (
              <li key={link.href} className="min-w-0">
                <a
                  href={link.href}
                  className="flex flex-col items-center justify-center gap-0.5 py-2 px-0.5 min-h-14 text-cream active:text-gold hover:text-gold-light transition-colors duration-200 touch-manipulation"
                >
                  <Icon className="w-5 h-5 shrink-0 opacity-90" />
                  <span className="text-[9px] font-medium tracking-wide uppercase text-center leading-tight line-clamp-2 w-full">
                    {link.label === "ROI Simulator" ? "ROI" : link.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
