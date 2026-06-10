/** ID máy — dùng filter / analytics */
export const LEAD_SOURCE = {
  contactForm: "contact-form",
  cangioTimeline: "cangio-timeline",
  roiReport: "roi-report",
  galleryCard: "gallery-card",
  galleryLightbox: "gallery-lightbox",
  galleryOfferPin: "gallery-offer-pin",
  welcomePopup: "welcome-popup",
} as const;

export type LeadSourceId = (typeof LEAD_SOURCE)[keyof typeof LEAD_SOURCE];

/** Nhãn tiếng Việt hiển thị trong email */
export const LEAD_SOURCE_LABEL: Record<LeadSourceId, string> = {
  [LEAD_SOURCE.contactForm]: "Form tư vấn chính · Cuối trang",
  [LEAD_SOURCE.cangioTimeline]: "Cần Giờ · Timeline hạ tầng · Nút liên hệ",
  [LEAD_SOURCE.roiReport]: "ROI Simulator · Tải báo cáo kinh doanh",
  [LEAD_SOURCE.galleryCard]: "Gallery · Thẻ dự án · Nút ưu đãi",
  [LEAD_SOURCE.galleryLightbox]: "Gallery · Lightbox ảnh · Liên hệ tư vấn",
  [LEAD_SOURCE.galleryOfferPin]: "Gallery · Tab ưu đãi góc màn hình",
  [LEAD_SOURCE.welcomePopup]: "Popup chào mừng · Tự hiện sau 5 giây",
};

export function buildLeadContext(parts: Array<string | undefined | null>): string {
  return parts
    .map((p) => p?.trim())
    .filter((p): p is string => Boolean(p && p !== "—"))
    .join(" · ");
}

export function formatExtraPayload(extra?: Record<string, unknown>): string {
  if (!extra || Object.keys(extra).length === 0) return "—";

  const labels: Record<string, string> = {
    category: "Loại hình",
    areaSqm: "Diện tích (m²)",
    roiPercent: "ROI (%)",
    breakevenYears: "Hoàn vốn (năm)",
    totalInvestmentMillions: "Vốn (triệu)",
    propertySlug: "Slug dự án",
    zoneId: "Mã phân khu",
  };

  return Object.entries(extra)
    .map(([key, value]) => {
      const label = labels[key] ?? key;
      const formatted =
        typeof value === "number"
          ? Number.isInteger(value)
            ? String(value)
            : value.toFixed(1)
          : String(value);
      return `${label}: ${formatted}`;
    })
    .join(" | ");
}
