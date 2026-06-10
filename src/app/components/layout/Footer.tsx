"use client";

import { SITE_CONTACT } from "@/app/config/contact";

const FOOTER_LINKS = {
  "Cơ Hội Đầu Tư": [
    "Shophouse Phú Quốc",
    "Shophouse Nha Trang",
    "Shophouse Cần Giờ",
    "Quỹ Căn Chính Sách",
    "Pipeline Q4/2025",
  ],
  "Phân Tích & Báo Cáo": [
    "Market Intelligence",
    "ROI Benchmarks",
    "Tenant Mix Analysis",
    "Case Studies",
  ],
  "Dịch Vụ": [
    "Tư Vấn Đầu Tư",
    "Thiết Kế Mặt Bằng",
    "Hỗ Trợ Pháp Lý",
    "Property Management",
  ],
};

/** Một số link cuộn tới dự án cụ thể; còn lại cuộn lên gallery */
const FOOTER_LINK_TARGETS: Record<string, string> = {
  "Shophouse Phú Quốc": "gallery-vinwonders-phu-quoc",
  "Shophouse Nha Trang": "gallery-vinpearl-nha-trang",
  "Shophouse Cần Giờ": "gallery-can-gio",
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleFooterLinkClick(link: string) {
  scrollToSection(FOOTER_LINK_TARGETS[link] ?? "gallery");
}

export default function Footer() {
  return (
    <footer className="bg-[#070707] border-t border-white/5">
      {/* Top strip */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-between gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-gold/40 flex items-center justify-center">
              <span className="text-gold text-[10px] font-bold tracking-widest">VR</span>
            </div>
            <div>
              <p className="text-white text-xs font-semibold tracking-widest uppercase leading-none">
                Vincom Retail
              </p>
              <p className="text-cream text-[10px] tracking-widest uppercase mt-0.5">
                F&B Investment Division
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            {[
              "Vincom Retail JSC",
              "CBRE Partner",
              "ISO 9001:2015",
              "RICS Affiliated",
            ].map((badge) => (
              <span
                key={badge}
                className="text-gold-muted text-[10px] tracking-widest uppercase"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 px-4 py-12 sm:gap-12 sm:px-6 sm:py-14 md:grid-cols-4">
        {/* Brand column */}
        <div className="md:col-span-1">
          <p className="text-cream text-xs leading-relaxed mb-6">
            Đơn vị phát triển và quản lý mạng lưới trung tâm thương mại hàng đầu
            Việt Nam. Chuyên tư vấn và phân phối shophouse F&B thương mại.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("gallery")}
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-white/30 hover:text-white transition-colors duration-200"
              aria-label="Xem dự án shophouse"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-white/30 hover:text-white transition-colors duration-200"
              aria-label="Liên hệ tư vấn"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <a
              href={`tel:${SITE_CONTACT.phoneTel}`}
              aria-label={`Gọi ${SITE_CONTACT.phoneDisplay}`}
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-cream hover:border-white/30 hover:text-white transition-colors duration-200"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-cream font-semibold mb-4">
              {title}
            </p>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleFooterLinkClick(link)}
                    className="text-cream-bright text-xs hover:text-cream transition-colors duration-200 text-left"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-start justify-between gap-3 px-4 py-5 sm:px-6 md:flex-row md:items-center">

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Investment Disclaimer"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection("gallery")}
                  className="text-gold-muted text-[10px] hover:text-cream-bright transition-colors duration-200"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
