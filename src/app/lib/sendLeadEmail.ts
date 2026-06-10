import emailjs from "@emailjs/browser";
import { buildLeadContext, formatExtraPayload } from "@/app/lib/leadTracking";

/** EmailJS — cấu hình trực tiếp (public key, dùng trên client) */
const EMAILJS_SERVICE_ID = "service_713ghyu";
const EMAILJS_TEMPLATE_ID = "template_u5h9uw4";
const EMAILJS_PUBLIC_KEY = "50L_bZd-kVl5zWvo8";

export type LeadEmailPayload = {
  name: string;
  email: string;
  phone: string;
  note?: string;
  brand?: string;
  model?: string;
  source: string;
  sourceLabel: string;
  pageSection?: string;
  pageDetail?: string;
  propertyName?: string;
  zoneName?: string;
  extraPayload?: Record<string, unknown>;
};

type EmailJsConfig = {
  serviceId: string;
  templateId: string;
  publicKey: string;
};

export function isEmailJsConfigured(): boolean {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

function getEmailJsConfig(): EmailJsConfig {
  return {
    serviceId: EMAILJS_SERVICE_ID,
    templateId: EMAILJS_TEMPLATE_ID,
    publicKey: EMAILJS_PUBLIC_KEY,
  };
}

/** EmailJS reject bằng string hoặc object { status, text } */
export function getEmailJsErrorMessage(err: unknown): string {
  if (typeof err === "string") return err;

  if (err instanceof Error) {
    return err.message;
  }

  const e = err as { status?: number; text?: string };
  if (e.status === 403) {
    return "Domain chưa được phép gửi email. Thêm https://ld-shop-house.vercel.app vào EmailJS → Allowed Origins.";
  }
  if (e.status === 412) {
    return "Gmail trên EmailJS chưa kết nối. Kiểm tra Email Services trên dashboard EmailJS.";
  }
  if (e.text) return e.text;

  return "Gửi email thất bại. Vui lòng gọi hotline hoặc thử lại.";
}

export async function sendLeadEmail(payload: LeadEmailPayload) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig();

  const propertyName = payload.propertyName?.trim() || "—";
  const zoneName = payload.zoneName?.trim() || "—";
  const pageSection = payload.pageSection?.trim() || "—";
  const pageDetail = payload.pageDetail?.trim() || "—";

  const extraInfo = formatExtraPayload(payload.extraPayload);

  const context = buildLeadContext([
    payload.sourceLabel,
    pageSection !== "—" ? pageSection : undefined,
    pageDetail !== "—" ? pageDetail : undefined,
    propertyName !== "—" ? propertyName : undefined,
    zoneName !== "—" ? zoneName : undefined,
  ]);

  const templateParams = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    brand: payload.brand?.trim() || "—",
    model: payload.model?.trim() || "—",
    note: payload.note?.trim() || "—",
    source: payload.source.trim(),
    source_label: payload.sourceLabel.trim(),
    page_section: pageSection,
    page_detail: pageDetail,
    propertyName,
    zoneName,
    context,
    extra_info: extraInfo,
    time: new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" }),
  };

  return emailjs.send(serviceId, templateId, templateParams, { publicKey });
}
