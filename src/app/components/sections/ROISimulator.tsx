"use client";

import LeadCaptureModal from "@/app/components/shared/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/app/lib/leadTracking";
import { useEffect, useMemo, useRef, useState } from "react";

type Category = "cafe" | "restaurant" | "nightlife";

const CATEGORIES: { value: Category; label: string; labelEn: string }[] = [
  { value: "cafe", label: "Café / Cà Phê", labelEn: "Cafe & Beverage" },
  { value: "restaurant", label: "Nhà Hàng / Restaurant", labelEn: "Fine Dining / Casual" },
  { value: "nightlife", label: "Bar / Nightlife", labelEn: "Entertainment Venue" },
];

const CONFIG: Record<
  Category,
  { revenuePerSqm: number; profitMargin: number; investPerSqm: number; color: string; tag: string }
> = {
  cafe: {
    revenuePerSqm: 3.2,     
    profitMargin: 0.18,     
    investPerSqm: 14.0,     
    color: "#C5A059",
    tag: "Tối ưu vận hành",
  },
  restaurant: {
    revenuePerSqm: 5.5,     
    profitMargin: 0.20,     
    investPerSqm: 22.0,     
    color: "#7EB8F7",
    tag: "Dòng tiền ổn định",
  },
  nightlife: {
    revenuePerSqm: 9.0,     
    profitMargin: 0.28,     
    investPerSqm: 30.0,     
    color: "#A78BFA",
    tag: "Biên lợi nhuận cao",
  },
};

function useAnimatedValue(target: number, duration = 600) {
  const [value, setValue] = useState(target);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      prevTarget.current = target;
      setValue(target);
      return;
    }
    const start = prevTarget.current;
    prevTarget.current = target;
    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

function formatCurrency(millions: number): string {
  if (millions >= 1000) {
    return `${(millions / 1000).toFixed(2)} Tỷ`;
  }
  return `${millions.toFixed(0)} Triệu`;
}

const REFERENCE_SOURCES = [
  "Báo cáo thị trường bán lẻ Việt Nam (CBRE & Savills)",
  "Chỉ số P&L bình quân ngành F&B Việt Nam (Báo cáo iPOS)",
 ] as const;

const REFERENCE_SOURCE_HIGHLIGHT =
  "Định mức kỹ thuật & Suất đầu tư hoàn thiện thô (Bộ Xây dựng)";

export default function ROISimulator() {
  const [area, setArea] = useState(150);
  const [category, setCategory] = useState<Category>("cafe");
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const cfg = CONFIG[category];
  
  // --- THUẬT TOÁN TÀI CHÍNH THỰC TẾ (ECONOMIES OF SCALE) ---
  // Diện tích mốc chuẩn là 150m2. 
  // Diện tích càng lớn, suất đầu tư/m2 giảm tối đa 20%, nhưng doanh thu hiệu dụng/m2 giảm tối đa 12%
  const scaleFactor = area / 150;
  const investCurve = Math.max(0.8, 1 - (scaleFactor - 1) * 0.08); 
  const revenueCurve = Math.max(0.88, 1 - (scaleFactor - 1) * 0.05);

  const adjustedInvestPerSqm = cfg.investPerSqm * investCurve;
  const adjustedRevenuePerSqm = cfg.revenuePerSqm * revenueCurve;

  const monthlyRevenue = area * adjustedRevenuePerSqm;
  const monthlyProfit = monthlyRevenue * cfg.profitMargin;
  const annualProfit = monthlyProfit * 12;
  const totalInvestment = area * adjustedInvestPerSqm;
  
  const roi = (annualProfit / totalInvestment) * 100;
  const breakeven = totalInvestment / annualProfit;
  // --------------------------------------------------------

  const animROI = useAnimatedValue(roi);
  const animBreakeven = useAnimatedValue(breakeven);
  const animInvestment = useAnimatedValue(totalInvestment);
  const animMonthlyProfit = useAnimatedValue(monthlyProfit);

  const catInfo = CATEGORIES.find((c) => c.value === category)!;

  const reportNote = useMemo(
    () =>
      [
        `Mô phỏng ROI — ${catInfo.label}`,
        `Diện tích: ${area} m²`,
        `ROI dự kiến: ${roi.toFixed(1)}% · Hoàn vốn: ${breakeven.toFixed(1)} năm`,
        `Đầu tư ước tính: ${formatCurrency(totalInvestment)}`,
      ].join("\n"),
    [area, breakeven, catInfo.label, roi, totalInvestment],
  );

  return (
    <section id="roi" className="section-mobile relative bg-navy px-4 py-16 sm:px-6 sm:py-24">
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gold/10" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 reveal-on-scroll">
          <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
            Investment Modelling Tool
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Dự Phóng ROI
              <span className="text-gold"> Khách Quan</span>
            </h2>
            <p className="text-cream text-sm max-w-sm leading-relaxed">
              Mô phỏng bài toán tài chính kinh doanh F&B dựa trên định mức chi phí thực tế tại các trục Shophouse Vin hành lang biển.
            </p>
          </div>
        </div>

        {/* Simulator Container */}
        <div className="border border-white/8 bg-navy-light">
          {/* Terminal header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[11px] tracking-widest uppercase text-cream-bright">
              Shophouse Commercial Valuation Model v2.6
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-green-400/80 tracking-wide">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 divide-y lg:divide-y-0 lg:divide-x divide-white/8">
            {/* LEFT — Inputs */}
            <div className="lg:col-span-2 p-8 flex flex-col gap-8">
              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-cream font-medium mb-4">
                  Diện Tích Thuê (m²)
                </label>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-white tabular-nums">
                    {area}
                  </span>
                  <span className="text-cream text-sm ml-1.5">m²</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={500}
                  step={10}
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full accent-gold"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-cream text-[10px]">50 m²</span>
                  <span className="text-cream text-[10px]">500 m²</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] tracking-[0.2em] uppercase text-cream font-medium mb-4">
                  Mô Hình Kinh Doanh
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full bg-[#1C1C1C] border border-white/10 text-white text-sm px-4 py-3.5 pr-10 focus:outline-none focus:border-gold/60 cursor-pointer"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cfg.color }}
                  />
                  <span className="text-[11px] text-cream">{catInfo.labelEn}</span>
                  <span
                    className="ml-auto text-[10px] px-2 py-0.5 font-medium"
                    style={{
                      color: cfg.color,
                      border: `1px solid ${cfg.color}40`,
                    }}
                  >
                    {cfg.tag}
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-white/8 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 sm:p-4">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-gold font-semibold mb-3">
                    Cơ sở dữ liệu tham chiếu
                  </p>
                  <ul className="space-y-2.5" role="list">
                    {REFERENCE_SOURCES.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-[11px] sm:text-xs leading-snug text-cream-bright"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold/70" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                    <li
                      className="flex gap-2.5 rounded-lg border border-gold/40 bg-gold/[0.08] px-3 py-2.5 text-[11px] sm:text-xs font-medium leading-snug text-white shadow-[inset_0_0_0_1px_rgba(197,160,89,0.12)]"
                      role="listitem"
                    >
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-[9px] font-bold text-gold"
                        aria-hidden
                      >
                        ★
                      </span>
                      <span>{REFERENCE_SOURCE_HIGHLIGHT}</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gold-muted text-[10px] sm:text-[11px] leading-relaxed italic px-0.5">
                  * Kết quả mang tính chất dự phóng dựa trên hệ số quy mô mặt bằng. Lợi nhuận thực tế biến thiên tùy thuộc vào năng lực vận hành và vị trí thực tế của từng trục Shophouse.
                </p>
              </div>
            </div>

            {/* RIGHT — Results */}
            <div className="lg:col-span-3 p-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-cream font-medium mb-6">
                Kết Quả Dự Phóng Tài Chính (Ước Tính)
              </p>

              <div className="grid grid-cols-2 gap-px bg-white/5 mb-6">
                {/* ROI */}
                <div className="bg-navy-light p-6">
                  <p className="text-[10px] text-cream uppercase tracking-widest mb-3">
                    Tỷ Suất ROI Dự Kiến / Năm
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span
                      className="text-4xl font-bold tabular-nums"
                      style={{ color: cfg.color }}
                    >
                      {animROI.toFixed(1)}
                    </span>
                    <span className="text-xl font-bold mb-1" style={{ color: cfg.color }}>
                      %
                    </span>
                  </div>
                  <p className="text-cream text-[11px]">Annual Return on Investment</p>
                  <div className="mt-4 h-px bg-white/10">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${Math.min((animROI / 60) * 100, 100)}%`,
                        backgroundColor: cfg.color,
                      }}
                    />
                  </div>
                </div>

                {/* Breakeven */}
                <div className="bg-navy-light p-6">
                  <p className="text-[10px] text-cream uppercase tracking-widest mb-3">
                    Thời Gian Hoàn Vốn
                  </p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-bold text-white tabular-nums">
                      {animBreakeven.toFixed(1)}
                    </span>
                    <span className="text-xl font-bold text-cream mb-1">năm</span>
                  </div>
                  <p className="text-cream text-[11px]">Estimated Breakeven Period</p>
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 h-px transition-all duration-300"
                        style={{
                          backgroundColor:
                            i < Math.ceil(animBreakeven * 2)
                              ? cfg.color
                              : "rgba(255,255,255,0.1)",
                          transitionDelay: `${i * 30}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Investment */}
                <div className="bg-navy-light p-6">
                  <p className="text-[10px] text-cream uppercase tracking-widest mb-3">
                    Tổng Chi Phí Đầu Đầu Tư (Ước Tính)
                  </p>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {formatCurrency(animInvestment)}
                    </span>
                  </div>
                  <p className="text-cream text-[11px]">Est. Capital Expenditure (CAPEX)</p>
                  <p className="text-[10px] text-gold-muted mt-2">
                    Suất đầu tư thực tế: ~{adjustedInvestPerSqm.toFixed(1)} Tr/m²
                  </p>
                </div>

                {/* Monthly Profit */}
                <div className="bg-navy-light p-6">
                  <p className="text-[10px] text-cream uppercase tracking-widest mb-3">
                    Lợi Nhuận Ròng / Tháng
                  </p>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-2xl font-bold text-white tabular-nums">
                      {formatCurrency(animMonthlyProfit)}
                    </span>
                  </div>
                  <p className="text-cream text-[11px]">Net Profit (Đã trừ vận hành)</p>
                  <p className="text-[10px] text-gold-muted mt-2">
                    Doanh thu sàn: ~{formatCurrency(monthlyRevenue)} / tháng
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gold text-navy font-semibold text-xs tracking-widest uppercase hover:bg-gold-light transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Tải Full Báo Cáo Kinh Doanh Chuẩn
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reportModalOpen ? (
        <LeadCaptureModal
          onClose={() => setReportModalOpen(false)}
          kicker="Tải Báo Cáo"
          title="Full Báo Cáo Kinh Doanh Chuẩn"
          subtitle={`${catInfo.label} · ${area} m² · ROI ~${roi.toFixed(1)}%`}
          submitLabel="Nhận Báo Cáo Qua Email"
          initialNote={reportNote}
          source={LEAD_SOURCE.roiReport}
          sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.roiReport]}
          idPrefix="roi-report"
          extraPayload={{
            category,
            areaSqm: area,
            roiPercent: roi,
            breakevenYears: breakeven,
            totalInvestmentMillions: totalInvestment,
          }}
        />
      ) : null}
    </section>
  );
}