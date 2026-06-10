"use client";

import LeadCaptureModal from "@/app/components/shared/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL } from "@/app/lib/leadTracking";
import { useCallback, useEffect, useRef, useState } from "react";

const FIRST_DELAY_MS = 5000;
const REPEAT_DELAY_MS = 15000;

export default function WelcomeLeadPopup() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);

  const scheduleOpen = useCallback((delayMs: number) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setOpen(true);
    }, delayMs);
  }, []);

  useEffect(() => {
    scheduleOpen(FIRST_DELAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [scheduleOpen]);

  const handleClose = () => {
    setOpen(false);
    scheduleOpen(REPEAT_DELAY_MS);
  };

  if (!open) return null;

  return (
    <LeadCaptureModal
      onClose={handleClose}
      title="Đăng Ký Nhận Tư Vấn"
      subtitle="Shophouse & BĐS Vinhomes Green Paradise · Cần Giờ"
      kicker="Liên Hệ Nhanh"
      submitLabel="Gửi Thông Tin"
      source={LEAD_SOURCE.welcomePopup}
      sourceLabel={LEAD_SOURCE_LABEL[LEAD_SOURCE.welcomePopup]}
      idPrefix="welcome-lead"
    />
  );
}
