"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DATA_TRANSPARENCY_ITEMS = [
  {
    region: "Phú Quốc",
    detail:
      "Định mức khai thác theo báo cáo vận hành thường niên Vincom Retail & Khảo sát BĐS Bán lẻ CBRE Q4/2025.",
  },
  {
    region: "Nha Trang",
    detail:
      "Quy mô sàn 25,000m² trích từ Hồ sơ Kỹ thuật Phân khu Harbour; Tỷ lệ lấp đầy theo Savills F&B Report.",
  },
  {
    region: "Cần Giờ",
    detail:
      "Số liệu quy hoạch 2,870 ha dựa trên Quyết định 1/500 UBND TP.HCM; Chỉ số quan tâm theo Batdongsan.com.vn.",
  },
] as const;

function DataSourcesPopover() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) close();
    };
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open, close]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) setOpen(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) setOpen(false);
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="zoning-data-sources-panel"
        aria-label="Xem nguồn dữ liệu minh bạch"
        className="inline-flex items-center gap-1.5 rounded border border-white/15 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/85 transition-colors hover:border-gold/40 hover:bg-gold/[0.08] hover:text-gold touch-manipulation"
      >
        <svg
          className="h-3.5 w-3.5 text-gold/80"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nguồn dữ liệu
      </button>

      {open ? (
        <div
          id="zoning-data-sources-panel"
          role="tooltip"
          className="absolute right-0 top-full z-30 mt-2 w-[min(20.5rem,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-white/12 bg-[#0c1118]/98 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md sm:w-80"
        >
          <div className="border-b border-gold/25 bg-gold/[0.06] px-3.5 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gold leading-snug">
              Hồ sơ minh bạch dữ liệu
            </p>
            <p className="text-[8px] uppercase tracking-widest text-gold-muted mt-0.5">
              Data Transparency
            </p>
          </div>
          <ul className="space-y-3 px-3.5 py-3.5">
            {DATA_TRANSPARENCY_ITEMS.map((item) => (
              <li key={item.region} className="text-[10px] leading-relaxed text-cream-bright">
                <span className="font-semibold text-white/90">{item.region}:</span>{" "}
                {item.detail}
              </li>
            ))}
          </ul>
          <p className="border-t border-white/8 px-3.5 py-2 text-[9px] text-gold-muted leading-snug">
            Vincom Retail · CBRE · Savills · UBND TP.HCM
          </p>
        </div>
      ) : null}
    </div>
  );
}

const LOGISTICS = [
  {
    title: "Tâm Điểm Kết Nối Giao Thông Biển",
    desc: "Vị trí huyết mạch kết nối trực tiếp ga sân bay, bến cảng du lịch quốc tế và chuỗi resort 5 sao thông qua trục trung chuyển xuyên suốt.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    title: "Chuỗi Lễ Hội & Điểm Đến Không Ngủ",
    desc: "Hưởng lợi từ chuỗi hoạt động hoạt náo, show diễn thực cảnh triệu đô và các giải đấu quốc tế tổ chức định kỳ, duy trì không khí sầm uất 24/7.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Chiến Dịch Marketing Synergy Tổng Lực",
    desc: "Đồng hành cùng các chiến dịch kích cầu du lịch toàn cầu của Vinpearl & Vincom Retail: tiếp cận trực tiếp tệp hội viên VinOne sành điệu.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
        />
      </svg>
    ),
  },
  {
    title: "Giải Pháp Hỗ Trợ Khởi Nghiệp Thương Mại",
    desc: "Áp dụng linh hoạt chính sách miễn phí tiền thuê thời gian đầu (Fit-out period) và các gói hỗ trợ doanh thu từ chủ đầu tư giúp tối ưu dòng tiền.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Hệ Thống VinBus Trung Chuyển Liên Tục",
    desc: "Mạng lưới xe buýt điện thông minh vận hành miễn phí tần suất cao, kết nối trực tiếp luồng khách lưu trú toàn khu vực đổ về cửa hàng của bạn.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    ),
  },
  {
    title: "Hạ Tầng Kỹ Thuật Thương Mại Chuẩn Cao Cấp",
    desc: "Hệ thống tủ điện công suất lớn, đường ống xả mùi trục đứng tách biệt và lối tiếp cận hậu cần thuận tiện được quy hoạch đồng bộ.",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

type Project = {
  name: string;
  status: string;
  statusColor: string;
  progressLabel: string;
  percentage: number;
  traffic: string;
  scale: string;
};

const PROJECTS: Project[] = [
  {
    name: "Grand World - VinWonders Phú Quốc",
    status: "LIVE — ĐANG VẬN HÀNH",
    statusColor: "#34D399",
    progressLabel: "Tỷ lệ lấp đầy thương mại",
    percentage: 92,
    traffic: "Đỉnh điểm (Peak)",
    scale: "85,000 m² sàn",
  },
  {
    name: "Vinpearl Harbour Nha Trang",
    status: "LIVE — ĐANG VẬN HÀNH",
    statusColor: "#7EB8F7",
    progressLabel: "Tỷ lệ lấp đầy thương mại",
    percentage: 85,
    traffic: "Tăng trưởng mạnh (High)",
    scale: "25,000 m² sàn",
  },
  {
    name: "Vinhomes Green Paradise Cần Giờ",
    status: "ĐÓN ĐẦU 2027 — ĐANG GIỮ CHỖ",
    statusColor: "#C5A059",
    progressLabel: "Mức độ quan tâm / Giữ chỗ trước",
    percentage: 75,
    traffic: "Sức hút cao (Hot Preview)",
    scale: "Đại đô thị 2,870 ha",
  },
];

const ECOSYSTEM_STATS = [
  { v: "310,000+ m²", l: "Tổng Diện Tích Hệ Sinh Thái" },
  { v: "3 Đại Tọa Độ", l: "Phú Quốc · Nha Trang · Cần Giờ" },
  { v: "120M+ Lượt/Năm", l: "Dự Phóng Lưu Lượng Khách Tiếp Cận" },
] as const;

function ProjectStatusBoard({ project }: { project: Project }) {
  return (
    <article className="border border-white/8 bg-navy/40 p-4 sm:p-5 transition-colors hover:border-white/12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <h3 className="heading-no-rule text-sm font-semibold text-white tracking-tight">
          {project.name}
        </h3>
        <span
          className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider shrink-0"
          style={{ color: project.statusColor }}
        >
          <span
            className="h-2 w-2 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: project.statusColor }}
            aria-hidden
          />
          {project.status}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10px] text-cream uppercase tracking-wide">
            {project.progressLabel}
          </span>
          <span
            className="text-xs font-bold tabular-nums"
            style={{ color: project.statusColor }}
          >
            {project.percentage}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${project.percentage}%`,
              backgroundColor: project.statusColor,
              boxShadow: `0 0 12px ${project.statusColor}55`,
            }}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-cream">
        <span>
          <span className="text-cream-bright uppercase tracking-wider">Lưu lượng · </span>
          <span className="text-white/80">{project.traffic}</span>
        </span>
        <span>
          <span className="text-cream-bright uppercase tracking-wider">Quy mô · </span>
          <span className="text-white/80">{project.scale}</span>
        </span>
      </div>
    </article>
  );
}

export default function ZoningSection() {
  return (
    <section id="zoning" className="section-mobile bg-navy-light px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 reveal-on-scroll">
          <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
            Location Intelligence & Operations
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Mật Độ Giao Thương &amp;
            <span className="text-gold"> Hạ Tầng Vận Hành</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="relative border border-white/8 bg-navy-light overflow-visible">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="text-[10px] text-cream tracking-[0.2em] uppercase">
                    Occupancy &amp; Development Status
                  </p>
                  <p className="text-xs text-cream-bright mt-0.5">
                    Hành lang biển — Vincom Retail 2026
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
                  <div className="hidden sm:flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[10px] text-gold/80 font-medium">LIVE DATA</span>
                  </div>
                  <DataSourcesPopover />
                </div>
              </div>

              <div className="p-4 sm:p-5 space-y-3">
                {PROJECTS.map((project) => (
                  <ProjectStatusBoard key={project.name} project={project} />
                ))}
              </div>

              <div className="border-t border-white/8 grid grid-cols-1 sm:grid-cols-3 gap-4 px-5 py-5 sm:px-6 bg-navy/30">
                {ECOSYSTEM_STATS.map((s) => (
                  <div key={s.l} className="text-center sm:text-left">
                    <p className="text-white font-semibold text-sm tabular-nums">{s.v}</p>
                    <p className="text-cream text-[10px] mt-0.5 leading-snug">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="space-y-px bg-white/5">
              {LOGISTICS.map((item, i) => (
                <div
                  key={i}
                  className="bg-navy-light p-6 flex gap-4 group hover:bg-navy-mid transition-colors duration-200 cursor-default"
                >
                  <div className="w-8 h-8 border border-gold/25 flex items-center justify-center text-gold flex-shrink-0 group-hover:border-gold/60 transition-colors duration-200">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1 leading-snug">
                      {item.title}
                    </p>
                    <p className="text-cream text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 border border-gold/20 bg-gold/5">
              <p className="text-gold text-xs font-semibold tracking-wide mb-2 uppercase">
                Cập nhật quỹ căn ưu đãi toàn chuỗi biển 2026
              </p>
              <p className="text-cream-bright text-sm leading-relaxed">
                Áp dụng chính sách bàn giao vận hành ngay tại Phú Quốc, Nha Trang (Ưu đãi miễn phí
                tiền thuê thời gian đầu) VÀ đặc quyền ưu tiên giữ chỗ vị trí đẹp đón sóng hạ tầng
                tại siêu đô thị biển Cần Giờ. Liên hệ để nhận trọn bộ file Layout chi tiết.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
