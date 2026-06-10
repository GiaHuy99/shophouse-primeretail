"use client";

import CosmoBayScrollHero from "@/app/components/sections/CosmoBayScrollHero";
import LeadCaptureModal from "@/app/components/shared/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/app/lib/leadTracking";
import { useEffect, useRef, useState } from "react";

/* ── Scroll-reveal hook ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ── Timeline data quy hoạch thực tế Cần Giờ ── */
type TimelineItem = {
  year: string;
  label: string;
  desc: string;
  done: boolean;
  highlight?: boolean;
};

const TIMELINE: TimelineItem[] = [
  {
    year: "2023 - 2024",
    label: "Điều chỉnh quy hoạch 1/500",
    desc: "UBND TP.HCM phê duyệt điều chỉnh cục bộ quy hoạch 1/500, định hình rõ 5 phân khu gồm CosmoBay.",
    done: true,
  },
  {
    year: "2025",
    label: "Khởi động hạ tầng cốt lõi",
    desc: "Đẩy mạnh chuẩn bị mặt bằng lấn biển, thi công gia cố nền và các trục giao thông kết nối nội khu.",
    done: true,
  },
  {
    year: "2026",
    label: "Giai đoạn bản lề · Cầu Cần Giờ",
    desc: "Thành phố tập trung hoàn tất thủ tục đấu thầu, giải phóng mặt bằng để khởi công cầu Cần Giờ trị giá hơn 11.000 tỷ đồng.",
    done: false,
    highlight: true,
  },
  {
    year: "2027",
    label: "Định hình trục CosmoBay",
    desc: "Hoàn thiện hạ tầng phân khu E, lộ diện tổ hợp công viên chủ đề, sân golf và khu shophouse thương mại.",
    done: false,
  },
  {
    year: "2028 - 2029",
    label: "Thông xe cầu Cần Giờ",
    desc: "Chính thức nối liền Nhà Bè - Cần Giờ, rút ngắn thời gian di chuyển từ trung tâm TP.HCM xuống còn khoảng 35 - 40 phút.",
    done: false,
  },
  {
    year: "2030",
    label: "Siêu đô thị biển vận hành",
    desc: "CosmoBay đón dòng khách du lịch khổng lồ cùng sự cộng hưởng từ Siêu cảng trung chuyển quốc tế Cần Giờ.",
    done: false,
  },
];

/* ── 5 ưu thế độc quyền của phân khu CosmoBay ── */
const ADVANTAGES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.5a.75.75 0 0 0 .75-.75V14a.75.75 0 0 0-.75-.75h-3.5A.75.75 0 0 0 6 14v3.25c0 .414.336.75.75.75Z" />
      </svg>
    ),
    title: "Trái tim giải trí & thương mại",
    desc: "Phân khu E (CosmoBay) được định vị là trung tâm vui chơi, giải trí, mua sắm sầm uất nhất toàn bộ siêu dự án lấn biển.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: "Chủ đầu tư Vingroup uy tín",
    desc: "Được phát triển bởi Công ty CP Đô thị Du lịch Cần Giờ (công ty con của Vinhomes), đảm bảo tiến độ và đẳng cấp quốc tế.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A8.959 8.959 0 0 1 3 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    title: "Đòn bẩy siêu hạ tầng",
    desc: "Hưởng lợi trực tiếp từ dự án cầu Cần Giờ thay thế phà Bình Khánh và quy hoạch Siêu cảng trung chuyển quốc tế 6 tỷ USD.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
      </svg>
    ),
    title: "Kế cận lá phổi xanh UNESCO",
    desc: "Trải nghiệm nghỉ dưỡng độc bản bên bờ biển lấn biển hiện đại nhưng ngay sát Khu dự trữ sinh quyển rừng ngập mặn Cần Giờ.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.4} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75V16.5m0 2.25h2.25m-2.25 0v-2.25m0 2.25h2.25m0 0V16.5m0 2.25h2.25m-2.25 0V16.5m2.25 2.25H12m0 0V16.5m0 2.25h2.25M12 18.75h2.25m0 0V16.5m0 2.25h2.25m0 0V16.5m0 2.25H21.75m0 0V16.5m0 2.25h-2.25m2.25 0v-2.25m0 2.25h-2.25m0 0v-2.25m0 2.25h-2.25M21.75 12V9.75m0 2.25h-2.25m2.25 0V9.75m0 2.25h-2.25m0 0V9.75m0 2.25H12m0 0V9.75m0 2.25h-2.25M12 12h-2.25m0 0V9.75m0 2.25H2.25m0 0V9.75m0 2.25h2.25m-2.25 0V9.75m0 2.25h2.25m0 0V9.75m0 2.25H12M3.75 6V3.75m0 2.25h2.25M3.75 6V3.75m0 2.25h2.25m0 0V3.75M12 6V3.75m0 2.25h2.25M12 6V3.75m0 2.25h2.25m0 0V3.75M20.25 6V3.75m0 2.25h1.5M20.25 6V3.75m0 2.25h1.5m0 0V3.75" />
      </svg>
    ),
    title: "Địa thế đô thị biển khan hiếm",
    desc: "Bất động sản biển duy nhất của TP.HCM. Sở hữu tài sản tại CosmoBay là sở hữu tiềm năng tăng giá phi mã khi hạ tầng khớp nối.",
  },
] as const;

export default function CosmobayCangioSection() {
  const timeline = useInView(0.1);
  const adv = useInView(0.1);

  const [infraFormOpen, setInfraFormOpen] = useState(false);

  return (
    <div className="bg-navy overflow-x-hidden">
      <CosmoBayScrollHero />

      {/* ───────────────────────────────────────
          SECTION 2 — Timeline Lộ trình thực tế
      ─────────────────────────────────────── */}
      <section className="section-mobile bg-navy-light px-4 py-16 sm:px-6 sm:py-24" aria-label="Lộ trình phát triển hạ tầng">
        <div ref={timeline.ref} className="max-w-7xl mx-auto">
          <div
            className={`mb-14 transition-all duration-700 ${
              timeline.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
              Chiến Lược Đồng Bộ
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Đi Trước <span className="text-gold">Sóng Hạ Tầng</span>
            </h2>
            <p className="text-cream text-sm sm:text-base leading-relaxed max-w-xl mt-4">
              Lộ trình đồng bộ từ việc hoàn tất pháp lý 1/500 đến cột mốc triển khai thi công cầu Cần Giờ và siêu cảng biển quốc tế.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-[2.35rem] left-0 right-0 h-px bg-white/10" />
              <div
                className={`absolute top-[2.35rem] left-0 h-px bg-gold/50 transition-all duration-[2s] ease-out ${
                  timeline.visible ? "w-1/2" : "w-0"
                }`}
              />

              <div className="grid grid-cols-6 gap-4">
                {TIMELINE.map((item, i) => (
                  <div
                    key={item.year}
                    className={`relative transition-all duration-700 ${
                      timeline.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div
                      className={`relative z-10 w-5 h-5 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${
                        item.highlight
                          ? "border-gold bg-gold shadow-[0_0_12px_rgba(197,160,89,0.6)] animate-pulse"
                          : item.done
                          ? "border-gold bg-gold/30"
                          : "border-white/20 bg-navy-light"
                      }`}
                    >
                      {item.done && (
                        <svg className="w-2.5 h-2.5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>

                    <div
                      className={`rounded-none border p-4 min-h-[180px] ${
                        item.highlight
                          ? "border-gold/50 bg-gold/8"
                          : item.done
                          ? "border-white/8 bg-white/3"
                          : "border-white/5 bg-navy/40"
                      }`}
                    >
                      <p className={`text-xs font-bold tracking-[0.2em] mb-1 ${item.highlight ? "text-gold" : item.done ? "text-gold/70" : "text-cream"}`}>
                        {item.year}
                      </p>
                      <p className="text-white text-xs font-semibold mb-2 leading-snug">
                        {item.label}
                        {item.highlight && (
                          <span className="ml-1.5 inline-block px-1.5 py-0.5 text-[9px] bg-gold text-navy font-bold rounded-none tracking-wide">
                            HIỆN TẠI
                          </span>
                        )}
                      </p>
                      <p className="text-cream text-[11px] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile timeline */}
          <div className="lg:hidden space-y-0">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`relative flex gap-4 transition-all duration-700 ${
                  timeline.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-4 h-4 mt-1 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      item.highlight
                        ? "border-gold bg-gold animate-pulse"
                        : item.done
                        ? "border-gold bg-gold/30"
                        : "border-white/20 bg-navy-light"
                    }`}
                  >
                    {item.done && (
                      <svg className="w-2 h-2 text-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className={`w-px flex-1 min-h-[2.5rem] mt-1 ${item.done ? "bg-gold/30" : "bg-white/8"}`} />
                  )}
                </div>

                <div className={`pb-6 flex-1 ${item.highlight ? "border border-gold/30 bg-gold/5 p-4 -mt-1" : ""}`}>
                  <p className={`text-[11px] font-bold tracking-[0.18em] mb-0.5 ${item.highlight ? "text-gold" : item.done ? "text-gold/70" : "text-cream/60"}`}>
                    {item.year}
                    {item.highlight && <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-gold text-navy font-bold">HIỆN TẠI</span>}
                  </p>
                  <p className="text-white text-sm font-semibold mb-1">{item.label}</p>
                  <p className="text-cream text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-12 flex justify-center transition-all duration-700 delay-300 ${
              timeline.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              type="button"
              onClick={() => setInfraFormOpen(true)}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 bg-gradient-to-r from-[#B8923F] via-[#C5A059] to-[#D4B878] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0C0C0C] ring-2 ring-[#C5A059]/50 transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:brightness-105 hover:ring-[#D4B878]/70 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/60 sm:text-sm"
            >
              Liên Hệ Ngay Để Nhận Ưu Đãi Và Chính Sách Tốt Nhất
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {infraFormOpen ? (
        <LeadCaptureModal
          onClose={() => setInfraFormOpen(false)}
          title="Tư Vấn Cơ Hội Hạ Tầng"
          subtitle="CosmoBay Cần Giờ — Đi trước sóng hạ tầng 2026"
          initialNote="Quan tâm lộ trình hạ tầng & cơ hội đầu tư CosmoBay Cần Giờ"
          source={LEAD_SOURCE.cangioTimeline}
          sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.cangioTimeline]}
          idPrefix="cangio-infra"
          submitLabel="Gửi Yêu Cầu Tư Vấn"
        />
      ) : null}

      {/* ───────────────────────────────────────
          SECTION 3 — 5 lý do đầu tư CosmoBay
      ─────────────────────────────────────── */}
      <section className="section-mobile bg-navy px-4 py-16 sm:px-6 sm:py-24" aria-label="Lợi thế cốt lõi CosmoBay">
        <div ref={adv.ref} className="max-w-7xl mx-auto">
          <div
            className={`mb-14 transition-all duration-700 ${
              adv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
              Giá Trị Độc Bản
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              5 Điểm Mấu Chốt Tạo Nên <span className="text-gold">Sức Hút CosmoBay</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6">
            {ADVANTAGES.map((item, i) => (
              <div
                key={item.title}
                className={`group bg-navy p-8 flex flex-col gap-4 hover:bg-navy-light transition-all duration-500 ${
                  i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                } ${adv.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 border border-gold/30 flex items-center justify-center text-gold group-hover:border-gold/60 group-hover:bg-gold/8 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-gold text-[11px] font-bold tracking-widest">0{i + 1}</span>
                    <h3 className="text-white font-semibold text-base">{item.title}</h3>
                  </div>
                  <p className="text-cream text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}