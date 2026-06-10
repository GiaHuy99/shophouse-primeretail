"use client";

import { SITE_CONTACT } from "@/app/config/contact";
import { sendLeadEmail, getEmailJsErrorMessage } from "@/app/lib/sendLeadEmail";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/app/lib/leadTracking";
import { useState } from "react";

const BUSINESS_MODELS = [
  "Cafe / Cà Phê",
  "Nhà Hàng / Restaurant",
  "Bar / Nightlife",
  "Fast Food / QSR",
  "Bakery / Patisserie",
  "Bubble Tea / Beverage",
  "Fine Dining",
  "Khác",
];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    phone: "",
    email: "",
    model: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    try {
      await sendLeadEmail({
        source: LEAD_SOURCE.contactForm,
        sourceLabel: LEAD_SOURCE_LABEL[LEAD_SOURCE.contactForm],
        pageSection: "Nhận Tư Vấn & Báo Cáo Chuyên Sâu",
        pageDetail: "Form liên hệ cuối trang (#contact)",
        name: form.name,
        email: form.email,
        phone: form.phone,
        brand: form.brand,
        model: form.model,
        note: form.note,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("[LeadEmail]", err);
      setSubmitError(getEmailJsErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-navy border text-white text-sm px-4 py-3.5 outline-none transition-colors duration-200 placeholder:text-gold-muted ${
      focused === field
        ? "border-gold/60"
        : "border-white/10 hover:border-white/20"
    }`;

  return (
    <section id="contact" className="section-mobile bg-navy px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14 reveal-on-scroll">
          <p className="text-gold text-[11px] tracking-[0.25em] uppercase font-medium mb-3">
            Expert Consultation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Nhận Tư Vấn &amp;
            <span className="text-gold"> Báo Cáo Chuyên Sâu</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* LEFT — Expert Profile */}
          <div className="flex flex-col gap-6">
            <div className="border border-white/8 p-6">
              {/* Profile image */}
              <div className="flex items-start gap-4 mb-6">
                <div className="relative flex-shrink-0">
                  <img
                    src="/images/avatar/kevin.png"
                    alt="Kevin — Investment Consultant"
                    className="w-16 h-16 object-cover object-top"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400/90 border-2 border-navy" />
                </div>
                <div>
                  <p className="text-white font-semibold text-base">Phước Nguyễn ( Kevin  )</p>
                  <p className="text-cream text-xs mt-0.5">
                    Senior Investment Consultant
                  </p>
                  <p className="text-gold text-[11px] mt-0.5 tracking-wide">
                    Vincom Retail JSC
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-px bg-white/5 mb-6">
                {[
                  { v: "8+", l: "Năm KN" },
                  { v: "120+", l: "Deals" },
                  { v: "₫2.4T", l: "Managed" },
                ].map((s) => (
                  <div key={s.l} className="bg-navy p-3 text-center">
                    <p className="text-gold text-sm font-bold">{s.v}</p>
                    <p className="text-cream text-[10px] mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>

              <p className="text-cream text-xs leading-relaxed mb-6">
                Chuyên gia tư vấn F&B Investment với kinh nghiệm triển khai thành
                công hơn 120 shophouse thương mại tại các trung tâm Vincom trên toàn
                quốc. Cố vấn chiến lược cho các chuỗi F&B quốc tế.
              </p>

              {/* Social + contact */}
              <div className="flex items-center gap-3">
                <a
                  href={SITE_CONTACT.zaloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/10 text-cream text-xs hover:border-white/30 hover:text-white transition-colors duration-200"
                >
                  <img
                    src="/images/icons/zalo.svg"
                    alt=""
                    className="h-4 w-4 shrink-0 object-contain"
                    aria-hidden
                  />
                  Zalo
                </a>
                <a
                  href={`tel:${SITE_CONTACT.phoneTel}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 text-gold text-xs hover:bg-gold/15 transition-colors duration-200"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {SITE_CONTACT.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Lead Form (spanning 2 columns) */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="border border-green-500/30 bg-green-500/5 p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                <div className="w-12 h-12 border border-green-400/50 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-semibold mb-3">
                  Yêu Cầu Đã Được Ghi Nhận
                </h3>
                <p className="text-cream text-sm leading-relaxed max-w-sm">
                  Kevin Phuoc Nguyen sẽ liên hệ trong vòng{" "}
                  <span className="text-white font-medium">24 giờ làm việc</span>.{" "}
                  Báo cáo PDF 48 trang &amp; file Excel sẽ được gửi về email của bạn.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-cream text-xs tracking-wide hover:text-white transition-colors duration-200"
                >
                  Gửi thêm thông tin khác →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="border border-white/8 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-white font-semibold text-lg">
                    Nhận Báo Cáo &amp; Tư Vấn Miễn Phí
                  </h3>
                  <span className="text-[10px] text-cream border border-white/10 px-3 py-1 tracking-widest uppercase">
                    Confidential
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Họ Tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("name")}
                    />
                  </div>

                  {/* Brand */}
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Thương Hiệu / Công Ty *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Tên brand hoặc công ty"
                      value={form.brand}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      onFocus={() => setFocused("brand")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("brand")}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocused("phone")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("phone")}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="ceo@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      className={inputClass("email")}
                    />
                  </div>

                  {/* Business Model Dropdown */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Mô Hình Kinh Doanh *
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={form.model}
                        onChange={(e) =>
                          setForm({ ...form, model: e.target.value })
                        }
                        onFocus={() => setFocused("model")}
                        onBlur={() => setFocused(null)}
                        className={inputClass("model") + " pr-10 cursor-pointer"}
                      >
                        <option value="" disabled>
                          Chọn mô hình kinh doanh
                        </option>
                        {BUSINESS_MODELS.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-cream"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] tracking-[0.15em] uppercase text-cream font-medium mb-2">
                      Note
                    </label>
                    <textarea
                      rows={4}
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      onFocus={() => setFocused("note")}
                      onBlur={() => setFocused(null)}
                      placeholder="Ghi chú dự án, phân khu, mô hình kinh doanh dự kiến..."
                      className={inputClass("note") + " resize-y min-h-[5.5rem]"}
                    />
                  </div>
                </div>

                {/* Consent note */}
                <p className="text-gold-muted text-[10px] leading-relaxed mb-6">
                  Thông tin của bạn được bảo mật tuyệt đối và chỉ được sử dụng
                  để liên hệ tư vấn đầu tư. Không chia sẻ với bên thứ ba.
                </p>

                {submitError ? (
                  <p className="mb-4 text-sm text-red-400" role="alert">
                    {submitError}
                  </p>
                ) : null}

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2.5 px-8 py-4 bg-gold text-navy font-semibold text-sm tracking-widest uppercase hover:bg-gold-light transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? "Đang gửi..." : "Nhận Báo Cáo & Tư Vấn"}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2 text-cream-bright text-[10px]">
                    <svg
                      className="w-3.5 h-3.5 text-gold/60"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    SSL Encrypted · Phản hồi trong 24h
                  </div>
                </div>

                {/* Value props */}
                <div className="mt-8 pt-6 border-t border-white/8 grid grid-cols-3 gap-4">
                  {[
                    { icon: "📊", label: "Báo cáo PDF 48 trang" },
                    { icon: "📈", label: "File Excel ROI Model" },
                    { icon: "📞", label: "1-on-1 Consultation" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 text-gold/60 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-cream text-[11px]">{item.label}</span>
                    </div>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
