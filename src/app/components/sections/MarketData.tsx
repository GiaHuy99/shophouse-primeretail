"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [value, setValue] = useState(target);
  const animated = useRef(false);
  
  useEffect(() => {
    if (!started || animated.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      animated.current = true;
      setValue(target);
      return;
    }
    animated.current = true;
    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, started]);
  return value;
}

const STATS = [
  {
    value: 45000,
    suffix: "+",
    label: "Daily Footfall Traffic",
    sub: "Lượt khách tiếp cận trung bình / ngày",
    desc: "Ghi nhận từ luồng khách du lịch bùng nổ tại Grand World Phú Quốc và Vinpearl Nha Trang (đạt hơn 8.3 triệu lượt khách năm qua). Đồng thời đón đầu tệp cư dân cao cấp từ Vinhomes Cần Giờ khi bàn giao hạ tầng từ năm 2027.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656-.126-1.283-.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    // Cột biểu đồ thể hiện sự bứt phá traffic vào mùa cao điểm du lịch và sự kiện
    bars: [55, 65, 60, 85, 75, 90, 100, 85, 95, 80],
    format: (v: number) =>
      v >= 1000 ? `${Math.floor(v / 1000)}K` : v.toString(),
  },
  {
    value: 24,
    suffix: "/7",
    label: "Night-Economy Active",
    sub: "Mô hình kinh doanh không ngủ",
    desc: "Trục cốt lõi tạo nên doanh thu đột phá cho Shophouse Vin. Tiên phong thắp sáng nền kinh tế đêm với các chuỗi hoạt động mua sắm, giải trí và lễ hội quốc tế diễn ra liên tục.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    bars: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100], 
    format: (v: number) => v.toString(),
  },
  {
    value: 150,
    suffix: "+",
    label: "Active Commercial Brands",
    sub: "Thương hiệu và chuỗi F&B đồng hành",
    desc: "Bảo chứng sinh lời từ sự hiện diện của hàng trăm thương hiệu lớn trong và ngoài nước (Starbucks, McDonald's, Highlands Coffee...). Hệ sinh thái tiện ích có sẵn giúp rút ngắn thời gian tiếp cận khách hàng.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    bars: [40, 50, 60, 65, 75, 80, 85, 90, 95, 100],
    format: (v: number) => v.toString(),
  },
];

function StatCard({
  stat,
  started,
  index,
}: {
  stat: (typeof STATS)[0];
  started: boolean;
  index: number;
}) {
  const count = useCountUp(stat.value, 2000 + index * 200, started);
  const maxBar = Math.max(...stat.bars);

  return (
    <div className="flex flex-col p-8 border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
          {stat.icon}
        </div>
        <div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-cream font-medium">
            {stat.label}
          </p>
          <p className="text-[11px] text-gold-muted mt-0.5">{stat.sub}</p>
        </div>
      </div>

      <div className="mb-6">
        <span className="text-5xl font-bold text-white tracking-tight tabular-nums">
          {stat.format(count)}
        </span>
        <span className="text-gold text-3xl font-bold ml-0.5">{stat.suffix}</span>
      </div>

      <div className="flex items-end gap-1 h-10 mb-6">
        {stat.bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-700"
            style={{
              height: started ? `${(h / maxBar) * 100}%` : "4px",
              backgroundColor:
                i === stat.bars.length - 1
                  ? "#C5A059"
                  : `rgba(197, 160, 89, ${0.15 + (i / stat.bars.length) * 0.25})`,
              transitionDelay: started ? `${i * 60}ms` : "0ms",
            }}
          />
        ))}
      </div>

      <p className="text-cream text-xs leading-relaxed mt-auto">{stat.desc}</p>
    </div>
  );
}

export default function MarketData() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="market" className="section-mobile bg-navy-light px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 reveal-on-scroll">
          <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
            Shophouse Market Intelligence
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Báo Cáo Nghiên Cứu
              <span className="text-gold"> BĐS Thương Mại Vin</span>
            </h2>
            <p className="text-cream text-sm max-w-md leading-relaxed">
              Phân tích dữ liệu thực tế tại các tọa độ Shophouse trọng điểm của hệ sinh thái Vingroup: Cần Giờ, Phú Quốc và Nha Trang.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {STATS.map((stat, i) => (
            <div key={i} className="bg-navy-light">
              <StatCard stat={stat} started={started} index={i} />
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 flex flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-5">
          <div className="flex-1 rounded-xl border border-gold/25 bg-gradient-to-r from-gold/[0.1] via-gold/[0.04] to-transparent px-4 py-3.5 sm:px-5 sm:py-4">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gold font-semibold mb-2">
              Nguồn tham chiếu dữ liệu
            </p>
            <p className="text-xs sm:text-sm font-medium leading-relaxed text-white/90">
              Báo cáo Vinhomes & Vincom Retail (IR) · CBRE Vietnam · Dữ liệu BĐS Thương mại Khách quan
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:flex-col sm:justify-center sm:gap-2.5 sm:px-5">
            {["Cần Giờ", "Phú Quốc", "Nha Trang"].map((city) => (
              <span
                key={city}
                className="text-[10px] sm:text-[11px] font-medium tracking-widest uppercase text-cream-bright"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}