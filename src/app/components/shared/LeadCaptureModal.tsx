"use client";

import { sendLeadEmail, getEmailJsErrorMessage } from "@/app/lib/sendLeadEmail";
import {
  validateLeadContact,
  validateLeadName,
  validateLeadPhone,
  type LeadFieldErrors,
} from "@/app/lib/leadFormValidation";
import type { LeadSourceId } from "@/app/lib/leadTracking";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  type RefObject,
} from "react";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

function useFocusTrap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const focusable =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = Array.from(
        container.querySelectorAll<HTMLElement>(focusable),
      ).filter((el) => el.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [containerRef]);
}

export type LeadCaptureModalProps = {
  onClose: () => void;
  title: string;
  subtitle?: string;
  kicker?: string;
  submitLabel?: string;
  initialNote?: string;
  source: LeadSourceId | string;
  sourceLabel: string;
  extraPayload?: Record<string, unknown>;
  children?: ReactNode;
  idPrefix?: string;
};

export default function LeadCaptureModal({
  onClose,
  title,
  subtitle,
  kicker = "Yêu Cầu Tư Vấn",
  submitLabel = "Gửi Yêu Cầu",
  initialNote = "",
  source,
  sourceLabel,
  extraPayload,
  children,
  idPrefix = "lead",
}: LeadCaptureModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: initialNote,
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const closeGuardRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const requestClose = useCallback(() => {
    if (closeGuardRef.current) return;
    closeGuardRef.current = true;
    if (reducedMotion) {
      onClose();
      return;
    }
    setShow(false);
    window.setTimeout(() => onClose(), 300);
  }, [reducedMotion, onClose]);

  useFocusTrap(panelRef);

  useEffect(() => {
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const id = requestAnimationFrame(() => nameInputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      prevFocus?.focus?.();
    };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [requestClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const inputBase =
    "w-full text-sm text-white placeholder:text-white/50 px-4 py-3.5 outline-none transition-colors duration-200";
  const inputStyle = (f: string): CSSProperties => ({
    backgroundColor: "var(--color-navy-mid)",
    border: `1px solid ${focused === f ? "color-mix(in srgb, var(--color-gold) 60%, transparent)" : "rgba(255,255,255,0.08)"}`,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errors = validateLeadContact(form.name, form.phone);
    setFieldErrors(errors);
    if (errors.name || errors.phone) {
      if (errors.name) nameInputRef.current?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      await sendLeadEmail({
        source,
        sourceLabel,
        pageSection: title,
        pageDetail: subtitle,
        name: form.name.trim(),
        email: form.email,
        phone: form.phone.replace(/\D/g, ""),
        note: form.note,
        propertyName:
          typeof extraPayload?.propertyName === "string"
            ? extraPayload.propertyName
            : undefined,
        zoneName:
          typeof extraPayload?.zoneName === "string" ? extraPayload.zoneName : undefined,
        extraPayload,
      });
      setSent(true);
    } catch (err) {
      console.error("[LeadEmail]", err);
      setSubmitError(getEmailJsErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const titleId = `${idPrefix}-modal-title`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/88 backdrop-blur-[10px] max-md:items-end max-md:justify-stretch max-md:p-0 max-md:pt-[env(safe-area-inset-top,0px)] transition-opacity duration-300 ease-premium"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none" }}
      onClick={(e) => e.target === overlayRef.current && requestClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full max-w-md max-md:max-w-none bg-[#111111] border border-white/[0.08] outline-none max-md:rounded-t-2xl max-md:border-x-0 max-md:border-b-0 max-md:max-h-[min(92dvh,720px)] max-md:overflow-y-auto max-md:shadow-[0_-12px_48px_rgba(0,0,0,0.55)] max-md:pb-[max(0px,env(safe-area-inset-bottom))] transition-all duration-300 ease-premium ${
          show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 max-md:translate-y-full md:translate-y-0 md:scale-[0.97]"
        }`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-px w-full bg-gold max-md:rounded-t-[inherit]" />
        <button
          type="button"
          onClick={requestClose}
          aria-label="Đóng"
          title="Đóng (Escape)"
          className="absolute top-4 right-4 max-md:top-3 max-md:right-3 min-h-11 min-w-11 flex items-center justify-center text-cream hover:text-white transition-colors duration-200 ease-premium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6 sm:p-8">
          {sent ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-5 border border-emerald-400/40">
                <svg className="w-5 h-5 stroke-emerald-400" fill="none" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-semibold text-base mb-2">Yêu Cầu Đã Gửi</p>
              <p className="text-sm leading-relaxed text-cream">
                Kevin Phuoc Nguyen sẽ liên hệ trong <span className="text-white font-medium">24h</span> và gửi{" "}
                <span className="text-gold">{title}</span> về email của bạn.
              </p>
              <button type="button" onClick={requestClose} className="mt-6 text-xs tracking-widest uppercase text-gold hover:text-gold-light">
                Đóng
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-xs tracking-[0.2em] uppercase mb-1 text-gold">{kicker}</p>
                <h3 id={titleId} className="heading-no-rule text-white font-bold text-lg tracking-wide">
                  {title}
                </h3>
                {subtitle ? <p className="text-xs mt-1 text-cream">{subtitle}</p> : null}
              </div>
              {children}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                {(["name", "email", "phone"] as const).map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={`${idPrefix}-${field}`}
                      className="block text-[11px] tracking-[0.15em] uppercase mb-1.5 font-medium text-cream"
                    >
                      {{ name: "Họ & Tên", email: "Email", phone: "Số Điện Thoại" }[field]} *
                    </label>
                    <input
                      id={`${idPrefix}-${field}`}
                      ref={field === "name" ? nameInputRef : undefined}
                      required={field === "email"}
                      disabled={submitting}
                      autoComplete={{
                        name: "name",
                        email: "email",
                        phone: "tel",
                      }[field]}
                      type={{ name: "text", email: "email", phone: "tel" }[field]}
                      inputMode={field === "phone" ? "numeric" : undefined}
                      maxLength={field === "phone" ? 10 : undefined}
                      placeholder={{ name: "Nguyễn Văn A", email: "ceo@company.com", phone: "0905975795" }[field]}
                      value={form[field]}
                      onChange={(e) => {
                        const value =
                          field === "phone"
                            ? e.target.value.replace(/\D/g, "").slice(0, 10)
                            : e.target.value;
                        setForm({ ...form, [field]: value });
                        if (field === "name" || field === "phone") {
                          setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
                        }
                      }}
                      onFocus={() => setFocused(field)}
                      onBlur={() => {
                        setFocused(null);
                        if (field === "name") {
                          const err = validateLeadName(form.name);
                          setFieldErrors((prev) => ({ ...prev, name: err }));
                        }
                        if (field === "phone") {
                          const err = validateLeadPhone(form.phone);
                          setFieldErrors((prev) => ({ ...prev, phone: err }));
                        }
                      }}
                      aria-invalid={field === "name" || field === "phone" ? !!fieldErrors[field] : undefined}
                      className={inputBase}
                      style={inputStyle(field)}
                    />
                    {field === "name" && fieldErrors.name ? (
                      <p className="mt-1.5 text-xs text-red-400" role="alert">
                        {fieldErrors.name}
                      </p>
                    ) : null}
                    {field === "phone" && fieldErrors.phone ? (
                      <p className="mt-1.5 text-xs text-red-400" role="alert">
                        {fieldErrors.phone}
                      </p>
                    ) : null}
                  </div>
                ))}
                <div>
                  <label
                    htmlFor={`${idPrefix}-note`}
                    className="block text-[11px] tracking-[0.15em] uppercase mb-1.5 font-medium text-cream"
                  >
                    Lời Nhắn
                  </label>
                  <textarea
                    id={`${idPrefix}-note`}
                    rows={4}
                    disabled={submitting}
                    placeholder="Ghi chú dự án, phân khu, yêu cầu tư vấn..."
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    onFocus={() => setFocused("note")}
                    onBlur={() => setFocused(null)}
                    className={`${inputBase} resize-y min-h-[5.5rem]`}
                    style={inputStyle("note")}
                  />
                </div>
                {submitError ? (
                  <p className="text-sm text-red-400" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full py-4 text-sm font-semibold tracking-widest uppercase transition-colors duration-200 bg-gold text-navy hover:bg-gold-light disabled:opacity-60 disabled:pointer-events-none"
                >
                  {submitting ? "Đang Gửi…" : submitLabel}
                </button>
                <p className="text-center text-[10px] mt-1 text-white/65">
                  Thông tin bảo mật · Phản hồi trong 24h làm việc
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
