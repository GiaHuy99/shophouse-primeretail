import { SITE_CONTACT } from "@/app/config/contact";
import Image from "next/image";
import type { ReactNode } from "react";

type VrVariant = "zalo" | "phone" | "facebook";

function VrContactLink({
  href,
  label,
  variant,
  external,
  children,
}: {
  href: string;
  label: string;
  variant: VrVariant;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`phone-vr-link phone-vr-link--${variant}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="phone-vr-wrap">
        <span className="phone-vr-stack">
          <span className="phone-vr-ripple phone-vr-ripple--1" aria-hidden />
          <span className="phone-vr-ripple phone-vr-ripple--2" aria-hidden />
          <span className="phone-vr-circle-fill" aria-hidden />
          <span className={`phone-vr-img-circle phone-vr-img-circle--${variant}`}>
            <span className="phone-vr-icon-shake">{children}</span>
          </span>
        </span>
      </span>
    </a>
  );
}

/** Cụm nút liên hệ — vị trí do component cha đặt (vd. HeroContactFloatSticky dùng position:fixed). */
export default function HeroContactFloat({
  className = "",
}: {
  className?: string;
}) {
  const { phoneDisplay, phoneTel, zaloUrl, facebookUrl } = SITE_CONTACT;

  return (
    <aside
      className={`pointer-events-auto flex flex-col items-end gap-0.5 ${className}`}
      aria-label="Liên hệ nhanh"
    >
      <VrContactLink href={zaloUrl} label={`Chat Zalo — ${phoneDisplay}`} variant="zalo" external>
        <Image
          src="/images/icons/zalo.svg"
          alt=""
          width={44}
          height={44}
          className="phone-vr-logo"
          aria-hidden
        />
      </VrContactLink>

      <VrContactLink href={`tel:${phoneTel}`} label={`Gọi ${phoneDisplay}`} variant="phone">
        <svg
          className="h-[1.75rem] w-[1.75rem]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.964 3.852a1.125 1.125 0 00-1.091-.852H4.125A2.25 2.25 0 002.25 6.75z"
          />
        </svg>
      </VrContactLink>

      <VrContactLink href={facebookUrl} label="Facebook" variant="facebook" external>
        <Image
          src="/images/icons/facebook.svg"
          alt=""
          width={44}
          height={44}
          className="phone-vr-logo phone-vr-logo--fb"
          aria-hidden
        />
      </VrContactLink>
    </aside>
  );
}
