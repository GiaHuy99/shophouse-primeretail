"use client";

import LeadCaptureModal from "@/app/components/shared/LeadCaptureModal";
import { LEAD_SOURCE, LEAD_SOURCE_LABEL, type LeadSourceId } from "@/app/lib/leadTracking";
import GalleryOfferPin from "./GalleryOfferPin";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type RefObject,
  type TouchEvent,
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

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
type SpecItem = { label: string; value: string };
type PropertyZone = { id: string; name: string; specs: readonly SpecItem[] };
type Property = {
  slug: string;
  name: string;
  address: string;
  coords: { lat: number; lng: number };
  images: readonly string[];
  zones: readonly PropertyZone[];
};

const PROPERTIES: Property[] = [
  {
    slug: "can-gio",
    name: "Shophouse Green Paradise Cần Giờ",
    address: "Mặt tiền biển, xã Long Hòa – thị trấn Cần Thạnh, huyện Cần Giờ, TPHCM (nay là Xã Cần Giờ, TPHCM)",
    coords: { lat: 10.21360, lng: 103.95580 },
    images: [
      "/images/cangio/Screenshot 2026-05-20 at 19.07.49.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.05.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.17.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.27.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.39.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.50.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.08.59.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.07.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.17.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.26.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.38.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.48.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.09.57.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.07.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.15.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.26.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.36.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.45.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.10.53.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.02.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.10.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.18.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.27.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.34.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.43.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.11.52.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.03.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.12.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.21.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.30.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.40.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.12.50.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.13.00.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.13.10.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.13.19.png",
      "/images/cangio/Screenshot 2026-05-20 at 19.13.32.png",
    ],
    zones: [
      {
        id: "zone-b",
        name: "Khu nhà phố thương mại (Shophouse / Liền kề / TMDV)",
        specs: [
          { label: "Diện Tích", value: "100 m², Căn góc lớn: Từ 142.9 – 153.3 m²" },
          { label: "Kết cấu", value: "1 trệt, 3 lầu, có ban công rộng" },
          { label: "Mặt Tiền", value: "9 m" },
          { label: "Trạng Thái", value: "Còn Trống" },
          { label: "Vị Trí", value: "Mặt tiền biển · Block B" },
        ],
      },
    ],
  },
  {
    slug: "vinwonders-phu-quoc",
    name: "Shophouse VinWonders Phú Quốc",
    address: "Cổng chào Công viên giải trí VinWonders, Bãi Dài, Gành Dầu, Phú Quốc",
    coords: { lat: 10.21395, lng: 103.95628 },
    images: [
      "/images/VinWonderphuquoc/2.png",
      "/images/VinWonderphuquoc/1.png",
      "/images/VinWonderphuquoc/3.png",
      "/images/VinWonderphuquoc/4.png",
      "/images/VinWonderphuquoc/5.png",
      "/images/VinWonderphuquoc/6.png",
      "/images/VinWonderphuquoc/7.png",
      "/images/VinWonderphuquoc/8.png",
      "/images/VinWonderphuquoc/9.png",
      "/images/VinWonderphuquoc/10.png",
      "/images/VinWonderphuquoc/11.png",
      "/images/VinWonderphuquoc/12.png",
      "/images/VinWonderphuquoc/13.png",
      "/images/VinWonderphuquoc/14.png",
      "/images/VinWonderphuquoc/15.png",
      "/images/VinWonderphuquoc/16.png",
      "/images/VinWonderphuquoc/17.png",
      "/images/VinWonderphuquoc/18.png",
      "/images/VinWonderphuquoc/19.png",
      "/images/VinWonderphuquoc/20.png",
      "/images/VinWonderphuquoc/21.png",
      "/images/VinWonderphuquoc/22.png",
      "/images/VinWonderphuquoc/23.png",
      "/images/VinWonderphuquoc/24.png",
      "/images/VinWonderphuquoc/25.png",
      "/images/VinWonderphuquoc/26.png",
      "/images/VinWonderphuquoc/27.png",
    ],
    zones: [
      {
        id: "greek-town",
        name: "Phân Khu Greek Town — 180 căn",
        specs: [
          {
            label: "Diện Tích",
            value: "111.6–171.6 m² (phố biến) · Căn góc/đặc biệt đến 581.9 m²",
          },
          {
            label: "Kết cấu",
            value: "3–4 tầng + 1 tum (bàn giao thô, hoàn thiện mặt ngoài)",
          },
          {
            label: "Mặt Tiền",
            value: "6m · 9m · 12m — 1 MT trục DT45 hoặc 2 MT căn góc giao lộ",
          },
          {
            label: "Trạng Thái",
            value: "Đã bán 96 · Tồn/QL 84 · Trống thô hoặc đang cho thuê",
          },
          {
            label: "Vị Trí",
            value:
              "Sát Vinpearl Resort & Spa, tiếp giáp VinOasis và Corona Resort & Casino. Đón khách cao cấp.",
          },
        ],
      },
      {
        id: "fairy-town-cochem",
        name: "Phân Khu Fairy Town + Cochem — 256 căn",
        specs: [
          {
            label: "Diện Tích",
            value: "80.6–150 m² (phố biến) · Căn góc lớn 282–348 m²",
          },
          {
            label: "Kết cấu",
            value: "3–4 tầng + 1 tum (trần 4.2–4.7m, tối ưu kính thương mại)",
          },
          {
            label: "Mặt Tiền",
            value: "Trục Quảng trường độc quyền đón khách · Đầu hồi MT mở rộng",
          },
          {
            label: "Trạng Thái",
            value: "Đã bán 189 · Tồn/QL 67 · Lấp đầy kinh doanh & fitout tốt nhất",
          },
          {
            label: "Vị Trí",
            value:
              "Lõi trung tâm, Quảng trường trung tâm & lối vào chính (cổng check-in) VinWonders.",
          },
        ],
      },
      {
        id: "palma-town",
        name: "Phân Khu Palma Town — 279 căn",
        specs: [
          {
            label: "Diện Tích",
            value: "86.5–128 m² (phố biến) · Căn góc đặc biệt 1.095–1.258 m²",
          },
          {
            label: "Kết cấu",
            value: "3–4 tầng + 1 tum (phong cách Địa Trung Hải & London)",
          },
          {
            label: "Mặt Tiền",
            value: "Nhiều dãy 2 MT: trước đường lớn, sau hướng lối khu nghỉ dưỡng",
          },
          {
            label: "Trạng Thái",
            value: "Đã bán 53 · Tồn/QL 226 · Chủ yếu thô trống, ưu tiên khách thuê lẻ",
          },
          {
            label: "Vị Trí",
            value:
              "Mặt tiền đại lộ Gành Dầu – Cửa Cạn, ôm Vinpearl Golf, lối vào Vinpearl Discovery.",
          },
        ],
      },
    ],
  },
  {
    slug: "vinpearl-nha-trang",
    name: "Shophouse Vinpearl Harbour Nha Trang",
    address: "Vinpearl Harbour, Nha Trang, Khánh Hòa",
    coords: { lat: 12.23912, lng: 109.19714 },
    images: [
      "/images/VinpearlHabourShop/z7863125304095_f9a84ff981bae307e4458c76eb9442fb.jpg",
      "/images/VinpearlHabourShop/z7863125311662_cc4aace71a5d8fd810066f024805706a.jpg",
      "/images/VinpearlHabourShop/z7863125316555_e2801b13313366e5951c5719f8e0eeb7.jpg",
      "/images/VinpearlHabourShop/z7863125324867_7ec9c2f85d649039a43a8551ec283f4c.jpg",
      "/images/VinpearlHabourShop/z7863125328620_aeae505d7f8f3c301e5e2a2adea4af01.jpg",
      "/images/VinpearlHabourShop/z7863125333587_1c0562a271eb2128b4f5ebd4a87b44f6.jpg",
      "/images/VinpearlHabourShop/z7863125333928_806276e6efebeea4114cf40d15f36a51.jpg",
      "/images/VinpearlHabourShop/z7863125347296_cc559ac36003a4fa077b4f4716fd0fbc.jpg",
      "/images/VinpearlHabourShop/z7863125348798_c9ff3cae33677bf97d72edeba12ead44.jpg",
      "/images/VinpearlHabourShop/1.png",
      "/images/VinpearlHabourShop/2.png",
      "/images/VinpearlHabourShop/3.png",
      "/images/VinpearlHabourShop/4.png",
      "/images/VinpearlHabourShop/5.png",
      "/images/VinpearlHabourShop/7.png",
      "/images/VinpearlHabourShop/9.png",
      "/images/VinpearlHabourShop/10.png",
      "/images/VinpearlHabourShop/11.png",
      "/images/VinpearlHabourShop/12.png",
      "/images/VinpearlHabourShop/13.png",
      "/images/VinpearlHabourShop/14.png",
      "/images/VinpearlHabourShop/15.png",
      "/images/VinpearlHabourShop/17.png",
      "/images/VinpearlHabourShop/18.png",
      "/images/VinpearlHabourShop/19.png",
      "/images/VinpearlHabourShop/20.png",
      "/images/VinpearlHabourShop/21.png",
      "/images/VinpearlHabourShop/22.png",
      "/images/VinpearlHabourShop/23.png",
      "/images/VinpearlHabourShop/626N1032.jpg",
      "/images/VinpearlHabourShop/626N1048.jpg",
      "/images/VinpearlHabourShop/626N1146.jpg",
      "/images/VinpearlHabourShop/626N10081.jpg",
      "/images/VinpearlHabourShop/EVT00043.jpg",
      "/images/VinpearlHabourShop/EVT00047.jpg",
    ],
    zones: [
      {
        id: "zone-a",
        name: "Zone A — Bãi biển",
        specs: [
          { label: "Diện Tích", value: "100 m²" },
          { label: "Kết cấu", value: "1 trệt, 3 lầu, có ban công rộng" },
          { label: "Mặt Tiền", value: "9 m" },
          { label: "Trạng Thái", value: "Còn Trống" },
          { label: "Vị Trí", value: "Mặt cầu cảng · Block A" },
        ],
      },
    ],
  },
  {
    slug: "grandworld-phu-quoc",
    name: "GrandWorld Phu Quoc - kios",
    address: "Bãi Dài Phú Quốc An Giang",
    coords: { lat: 12.23880, lng: 109.19670 },
    images: [
      "/images/GrandPhuQuocChoDem/107805802_130520992049927_1093880067457732905_n.jpg",
      "/images/GrandPhuQuocChoDem/107909847_130521135383246_7922414515361917934_n.jpg",
      "/images/GrandPhuQuocChoDem/107971816_130521105383249_1869740166975923878_n.jpg",
      "/images/GrandPhuQuocChoDem/108001644_130521065383253_6568976515565907800_n.jpg",
      "/images/GrandPhuQuocChoDem/109344900_130521162049910_8302296627036796847_n.jpg",
      "/images/GrandPhuQuocChoDem/109471906_130521088716584_5469038525833032932_n.jpg",
    ],
    zones: [
      {
        id: "default",
        name: "Chợ đêm GrandWorld",
        specs: [
          { label: "Diện Tích", value: "320 m²" },
          { label: "Tầng", value: "—" },
          { label: "Mặt Tiền", value: "12 m" },
          { label: "Trạng Thái", value: "2 kios Cuối" },
          { label: "Vị Trí", value: "Khu chợ đêm · Lô góc" },
        ],
      },
    ],
  },
  {
    slug: "vinpearl-harbour-kios",
    name: "Vinpearl Harbour -kios",
    address: "NHA Trang, Khánh Hòa",
    coords: { lat: 12.23912, lng: 109.19714 },
    images: [
      "/images/VinpearlHabour/R6CN7959.jpg",
      "/images/VinpearlHabour/R6CN7961.jpg",
      "/images/VinpearlHabour/R6CN7963.jpg",
      "/images/VinpearlHabour/R6CN7965.jpg",
      "/images/VinpearlHabour/R6CN7969.jpg",
      "/images/VinpearlHabour/R6CN7971.jpg",
      "/images/VinpearlHabour/R6CN7972.jpg",
      "/images/VinpearlHabour/R6CN7974.jpg",
      "/images/VinpearlHabour/R6CN7975.jpg",
      "/images/VinpearlHabour/R6CN7977.jpg",
      "/images/VinpearlHabour/R6CN8006.jpg",
      "/images/VinpearlHabour/R6CN8008.jpg",
    ],
    zones: [
      {
        id: "default",
        name: "Kios Vinpearl Harbour",
        specs: [
          { label: "Diện Tích", value: "150 m²" },
          { label: "Tầng", value: "—" },
          { label: "Mặt Tiền", value: "7.5 m" },
          { label: "Trạng Thái", value: "Còn Trống" },
          { label: "Vị Trí", value: "Cầu cảng · Khu F&B" },
        ],
      },
    ],
  },
];

function getActiveZone(property: Property, zoneId?: string): PropertyZone {
  return property.zones.find((z) => z.id === zoneId) ?? property.zones[0];
}

function mapsUrl(coords: { lat: number; lng: number }, label: string) {
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}&query_place_id=${encodeURIComponent(label)}`;
}

/** Encode tên file (khoảng trắng, ký tự đặc biệt) để Next/Image load đúng từ /public */
function galleryAssetSrc(path: string): string {
  if (!path.startsWith("/")) return path;
  return path
    .split("/")
    .map((segment, index) => (index <= 1 ? segment : encodeURIComponent(segment)))
    .join("/");
}

/** Focus trap: keep Tab cycling inside `containerRef` while mounted. */
function useFocusTrap(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selector =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

    const visibleFocusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(selector)).filter((el) => {
        const t = window.getComputedStyle(el);
        return (
          !el.hasAttribute("hidden") &&
          t.visibility !== "hidden" &&
          t.display !== "none"
        );
      });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = visibleFocusables();
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      const active = document.activeElement as HTMLElement | null;
      const activeInside = !!(active && container.contains(active));

      if (e.shiftKey) {
        if (!activeInside || active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (!activeInside || active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [containerRef]);
}

/* ─────────────────────────────────────────
   SVG Icons
───────────────────────────────────────── */
function IconArea() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}
function IconFloor() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
function IconFront() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  );
}
function IconTag() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}
function IconLocation() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

type SpecWithIcon = SpecItem & { Icon: () => React.JSX.Element };

function specIcon(label: string): () => React.JSX.Element {
  if (label === "Diện Tích") return IconArea;
  if (label === "Kết cấu" || label === "Tầng") return IconFloor;
  if (label === "Mặt Tiền") return IconFront;
  if (label === "Vị Trí") return IconLocation;
  return IconTag;
}

function specsWithIcons(specs: readonly SpecItem[]): SpecWithIcon[] {
  return specs.map((s) => ({ ...s, Icon: specIcon(s.label) }));
}

function SpecGrid({
  specs,
  variant = "card",
}: {
  specs: readonly SpecItem[];
  variant?: "card" | "modal";
}) {
  const items = specsWithIcons(specs);
  const gridClass =
    variant === "modal"
      ? "grid grid-cols-2 sm:grid-cols-5 mb-6 text-center border border-white/[0.06] bg-navy"
      : "grid w-full shrink-0 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border border-[#151515]/[0.14]";

  return (
    <div className={gridClass}>
      {items.map((spec, si) => (
        <div
          key={si}
          className={
            variant === "modal"
              ? `py-3 px-1 ${si < items.length - 1 ? "border-r border-white/[0.06]" : ""}`
              : "flex min-h-[5.85rem] flex-col items-center justify-center border-[#151515]/[0.12] px-1 py-2.5 text-center sm:min-h-[6.75rem] sm:px-2 sm:py-4 [&:not(:last-child)]:border-r"
          }
        >
          {variant === "card" ? (
            <div className="text-[#AA8453] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:stroke-[1.1] sm:[&_svg]:h-5 sm:[&_svg]:w-5">
              <spec.Icon />
            </div>
          ) : null}
          <p
            className={
              variant === "modal"
                ? "text-white text-xs font-semibold break-words"
                : "mt-1.5 break-words text-[10px] font-semibold leading-tight text-[#151515] sm:mt-2 sm:text-sm md:text-base"
            }
          >
            {spec.value.trim() && spec.value !== "—" ? spec.value : "—"}
          </p>
          <p
            className={
              variant === "modal"
                ? "text-[10px] mt-0.5 text-cream-bright"
                : "mt-0.5 text-[9px] font-normal leading-tight text-ink sm:mt-1 sm:text-xs"
            }
          >
            {spec.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Gallery Lightbox
───────────────────────────────────────── */

type LightboxProps = {
  property: Property;
  activeZone: PropertyZone;
  startIndex: number;
  onClose: () => void;
  onContact: () => void;
};

function GalleryLightbox({ property, activeZone, startIndex, onClose, onContact }: LightboxProps) {
  const safeStart = Math.min(Math.max(0, startIndex), Math.max(0, property.images.length - 1));
  const [current, setCurrent] = useState(safeStart);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("enter");
  const [dir, setDir] = useState<"left" | "right">("right");
  const [show, setShow] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const closeGuardRef = useRef(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const currentRef = useRef(current);
  const busyRef = useRef(false);
  const phaseRef = useRef(phase);
  const touchStartX = useRef<number | null>(null);

  const requestClose = useCallback(() => {
    if (closeGuardRef.current) return;
    closeGuardRef.current = true;
    if (reducedMotion) {
      onClose();
      return;
    }
    setShow(false);
    window.setTimeout(() => onClose(), 320);
  }, [reducedMotion, onClose]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useFocusTrap(overlayRef);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Mount animation + scroll lock + focus
  useEffect(() => {
    requestAnimationFrame(() => setShow(true));
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    const focusId = requestAnimationFrame(() => closeBtnRef.current?.focus());
    return () => {
      cancelAnimationFrame(focusId);
      document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, []);

  const go = useCallback((next: number, direction: "left" | "right") => {
    if (busyRef.current || phaseRef.current !== "idle") return;
    busyRef.current = true;
    setDir(direction);
    setPhase("exit");
    setTimeout(() => {
      setCurrent(next);
      setPhase("enter");
    }, 280);
  }, []);

  useEffect(() => {
    if (phase === "idle") busyRef.current = false;
  }, [phase]);

  useEffect(() => {
    if (phase === "enter") {
      const t = setTimeout(() => setPhase("idle"), 350);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const prev = useCallback(() => {
    const len = property.images.length;
    go((currentRef.current - 1 + len) % len, "right");
  }, [go, property.images.length]);

  const next = useCallback(() => {
    const len = property.images.length;
    go((currentRef.current + 1) % len, "left");
  }, [go, property.images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [requestClose, prev, next]);

  const exitX = dir === "left" ? "-6%" : "6%";
  const enterX = dir === "left" ? "6%" : "-6%";
  const imgStyle: CSSProperties =
    phase === "exit"
      ? {
          opacity: 0,
          transform: `translateX(${exitX}) scale(0.97)`,
          transition: "all 0.28s cubic-bezier(0.4,0,1,1)",
        }
      : phase === "enter"
        ? {
            opacity: 0,
            transform: `translateX(${enterX}) scale(0.97)`,
            transition: "none",
          }
        : {
            opacity: 1,
            transform: "translateX(0) scale(1)",
            transition: "all 0.35s cubic-bezier(0,0,0.2,1)",
          };

  const mainSrc = galleryAssetSrc(property.images[current]);
  const mainAlt = `${property.name} — ảnh ${current + 1} / ${property.images.length}`;

  const onSwipeTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onSwipeTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 56) return;
    if (dx > 0) prev();
    else next();
  };

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-property-title"
      className="fixed inset-0 z-50 flex min-h-[100dvh] flex-col outline-none max-md:pt-[env(safe-area-inset-top,0px)]"
      style={{
        backgroundColor: `rgba(0,0,0,${show ? 0.97 : 0})`,
        transition: "background-color 0.35s var(--ease-premium)",
        pointerEvents: show ? "auto" : "none",
      }}
      tabIndex={-1}
      onClick={(e) => e.target === overlayRef.current && requestClose()}
    >
      {/* ── Top bar ── */}
      <div
        className="flex flex-shrink-0 flex-col gap-3 border-b border-white/[0.06] px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-6 sm:py-4 sm:pt-4"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(-12px)",
          transition: "opacity 0.4s var(--ease-premium) 0.08s, transform 0.4s var(--ease-premium) 0.08s",
        }}
      >
        {/* Left: property info */}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] tracking-[0.25em] uppercase mb-0.5 text-gold">
            {activeZone.name}
          </p>
          <h3
            id="lightbox-property-title"
            className="heading-no-rule text-white font-bold text-base tracking-wide truncate"
          >
            {property.name}
          </h3>
          <a
            href={mapsUrl(property.coords, property.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-1 text-ink hover:text-gold transition-colors duration-150"
          >
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[10px] leading-snug line-clamp-2">{property.address}</span>
          </a>
        </div>

        {/* Center: slide indicators */}
        <div className="flex flex-wrap items-center justify-center gap-2 order-last sm:order-none" aria-label="Chọn ảnh">
          {property.images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i, i > current ? "left" : "right")}
              aria-label={`Ảnh ${i + 1} / ${property.images.length}`}
              aria-current={i === current ? "true" : undefined}
              className="transition-all duration-300 rounded-sm h-0.5 min-w-1.5"
              style={{
                width: i === current ? "24px" : "6px",
                backgroundColor: i === current ? "var(--color-gold)" : "rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>

        {/* Right: counter text + close */}
        <div className="flex items-center justify-end gap-4 flex-shrink-0">
          <span className="text-sm font-medium text-cream" aria-live="polite">
            <span className="text-white">{current + 1}</span>
            <span className="mx-1">/</span>
            {property.images.length}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={requestClose}
            aria-label="Đóng thư viện ảnh"
            title="Đóng (Escape)"
            className="min-h-11 min-w-11 flex items-center justify-center transition-colors duration-150 border border-white/10 text-cream-bright hover:text-white hover:border-white/30"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Main image area (full-bleed stage on mobile) ── */}
      <div className="flex max-md:flex-none max-md:flex-shrink-0 flex-1 items-center justify-center relative overflow-hidden px-0 py-2 sm:items-center sm:px-10 md:px-16 sm:py-6 min-h-0 max-md:min-h-0 sm:min-h-[45dvh]">
        <button
          type="button"
          onClick={prev}
          aria-label="Ảnh trước"
          title="Ảnh trước (←)"
          className="absolute left-1 sm:left-4 z-10 min-h-11 min-w-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 border border-white/12 text-cream-bright hover:bg-gold/15 hover:border-gold/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          className="w-full h-full flex items-center justify-center px-2 sm:px-14 max-md:touch-pan-y"
          onTouchStart={onSwipeTouchStart}
          onTouchEnd={onSwipeTouchEnd}
        >
          <div
            className="relative mx-auto flex h-full w-full max-w-[min(100%,1400px)] flex-col items-center justify-center max-md:gap-1.5 sm:min-h-[min(70vh,calc(100vh-220px))]"
            style={imgStyle}
          >
            <div className="relative h-full w-full min-h-[min(40dvh,360px)] max-md:max-h-[min(62dvh,560px)] sm:min-h-[12rem]">
              <Image
                key={current}
                src={mainSrc}
                alt={mainAlt}
                fill
                priority={current === safeStart}
                sizes="(max-width: 768px) 100vw, 90vw"
                {...(current === safeStart ? {} : { loading: "lazy" as const })}
                decoding="async"
                className="object-contain"
              />
            </div>
            <p className="flex-shrink-0 text-center text-[10px] tracking-wide text-white/75 sm:hidden" aria-hidden>
              {current + 1} / {property.images.length}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Ảnh sau"
          title="Ảnh sau (→)"
          className="absolute right-1 sm:right-4 z-10 min-h-11 min-w-11 sm:w-12 sm:h-12 flex items-center justify-center transition-all duration-200 border border-white/12 text-cream-bright hover:bg-gold/15 hover:border-gold/50 hover:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Bottom: thumbnails + specs + CTA ── */}
      <div
        className="flex-shrink-0 px-4 sm:px-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:pb-6"
        style={{
          opacity: show ? 1 : 0,
          transform: show ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s var(--ease-premium) 0.12s, transform 0.4s var(--ease-premium) 0.12s",
        }}
      >
        <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-5 overflow-x-auto snap-x snap-mandatory pb-1 justify-start sm:justify-center [-webkit-overflow-scrolling:touch]">
          {property.images.map((thumbSrc, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i, i > current ? "left" : "right")}
              aria-label={`Xem ảnh thu nhỏ ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className={`relative flex-shrink-0 snap-start overflow-hidden transition-all duration-300 w-[72px] h-12 sm:w-[72px] sm:h-12 ${
                i === current
                  ? "opacity-100 scale-105 border-2 border-gold"
                  : "opacity-50 border-2 border-white/[0.08]"
              }`}
            >
              <Image
                src={galleryAssetSrc(thumbSrc)}
                alt=""
                width={72}
                height={48}
                sizes="80px"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/[0.06] pt-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {specsWithIcons(activeZone.specs).map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-gold/60">
                  <s.Icon />
                </span>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">{s.value}</p>
                  <p className="text-[10px] mt-0.5 text-cream-bright">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-shrink-0 w-full sm:w-auto justify-stretch sm:justify-end">
            <button
              type="button"
              onClick={onContact}
              className="gallery-contact-btn-gold group flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-gold text-navy transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_10px_28px_-8px_rgba(197,160,89,0.55)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold/50"
            >
              Liên Hệ Tư Vấn
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Contact Modal
───────────────────────────────────────── */
type ModalProps = {
  property?: Property;
  zone?: PropertyZone;
  source: LeadSourceId | string;
  sourceLabel: string;
  onClose: () => void;
};

function buildContactNote(property?: Property, zone?: PropertyZone): string {
  if (!property) return "";
  const lines = [property.name];
  if (zone?.name) lines.push(zone.name);
  zone?.specs.forEach((s) => lines.push(`${s.label}: ${s.value}`));
  return lines.join("\n");
}

function ContactModal({ property, zone, source, sourceLabel, onClose }: ModalProps) {
  const title = property?.name ?? "Ưu đãi Shophouse Vincom";
  const subtitle = zone?.name?.trim() || "Chương trình ưu đãi · Tư vấn mặt bằng";
  const specs = zone?.specs ?? [];

  return (
    <LeadCaptureModal
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      initialNote={buildContactNote(property, zone)}
      source={source}
      sourceLabel={sourceLabel}
      idPrefix="contact"
      submitLabel="Gửi Yêu Cầu Tư Vấn"
      extraPayload={{
        propertySlug: property?.slug,
        zoneId: zone?.id,
        propertyName: property?.name,
        zoneName: zone?.name,
      }}
    >
      {specs.length > 0 ? <SpecGrid specs={specs} variant="modal" /> : null}
    </LeadCaptureModal>
  );
}

/* ─────────────────────────────────────────
   Property Card
───────────────────────────────────────── */
type PropertyCardProps = {
  prop: Property;
  index: number;
  isHovered: boolean;
  onHover: (index: number | null) => void;
  reducedMotion: boolean;
  onOpenGallery: (property: Property, zoneId: string) => void;
  onContact: (property: Property, zone: PropertyZone) => void;
};

function PropertyCard({
  prop,
  index,
  isHovered,
  onHover,
  reducedMotion,
  onOpenGallery,
  onContact,
}: PropertyCardProps) {
  const [selectedZoneId, setSelectedZoneId] = useState(prop.zones[0].id);
  const activeZone = getActiveZone(prop, selectedZoneId);
  const hasVideo = "videoUrl" in prop && !!(prop as Property & { videoUrl?: string }).videoUrl;
  const coverSrc = galleryAssetSrc(prop.images[0]);

  return (
    <article
      id={`gallery-${prop.slug}`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="relative isolate mx-auto flex h-full w-full max-w-4xl max-sm:active:scale-[0.98] flex-col bg-transparent"
    >
      <div className="relative w-full">
        <button
          type="button"
          onClick={() => onOpenGallery(prop, selectedZoneId)}
          className="group relative block w-full cursor-pointer touch-manipulation bg-transparent p-0"
          aria-label={`Xem ${hasVideo ? "video và " : ""}ảnh ${prop.name}`}
        >
          {hasVideo ? (
            <video
              src={(prop as Property & { videoUrl: string }).videoUrl}
              className={`mx-auto block h-auto w-full max-w-full object-contain transition-transform duration-700 ${isHovered ? "scale-[1.02]" : "scale-100"}`}
              muted
              loop
              playsInline
              autoPlay={!reducedMotion}
              preload="metadata"
              aria-hidden={!reducedMotion}
            />
          ) : (
            <Image
              src={coverSrc}
              alt={prop.name}
              width={1600}
              height={1200}
              sizes="(max-width: 896px) 100vw, 896px"
              quality={90}
              className={`mx-auto block h-auto w-full max-w-full object-contain transition-transform duration-700 ${isHovered ? "scale-[1.02]" : "scale-100"}`}
              priority={index < 2}
              {...(index < 2 ? {} : { loading: "lazy" as const })}
              decoding="async"
            />
          )}
        </button>
      </div>

      <div className="flex min-h-0 w-full flex-1 flex-col px-2 pt-8 text-center sm:px-4 sm:pt-10">
        <div className="mx-auto w-full max-w-md shrink-0">
          <h3 className="heading-no-rule text-xl font-semibold uppercase leading-snug tracking-[0.18em] text-[#AA8453] sm:text-2xl md:tracking-[0.22em]">
            {prop.name}
          </h3>
          <p className="mt-2 text-sm font-medium tracking-wide text-[#AA8453]/85">
            {activeZone.name}
          </p>
        </div>

        {prop.zones.length > 1 ? (
          <div className="mt-6 shrink-0">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f6d42]">
              Chọn phân khu
            </p>
            <div
              className="flex flex-wrap justify-center gap-2.5"
              role="tablist"
              aria-label={`Chọn zone — ${prop.name}`}
            >
              {prop.zones.map((zone) => {
                const selected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className={`min-h-11 min-w-[5.5rem] px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-200 border-2 sm:text-xs sm:tracking-[0.14em] ${
                      selected
                        ? "border-[#C5A059] bg-gradient-to-r from-[#B8923F] via-[#C5A059] to-[#D4B878] text-[#0C0C0C] shadow-[0_6px_20px_-8px_rgba(197,160,89,0.65)] ring-2 ring-[#D4B878]/40"
                        : "border-[#C5A059]/50 bg-[#FFF8EC] text-[#8f6d42] shadow-[0_2px_10px_-6px_rgba(197,160,89,0.35)] hover:-translate-y-0.5 hover:border-[#C5A059] hover:bg-[#F5EDD8] hover:text-[#6B5228] hover:shadow-[0_8px_22px_-10px_rgba(197,160,89,0.5)] active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]/60"
                    }`}
                  >
                    {zone.name.split("—")[0]?.trim() ?? zone.name}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        <div className="min-h-4 flex-1 basis-0" aria-hidden />

        <SpecGrid specs={activeZone.specs} variant="card" />

        <div className="gallery-contact-btn-wrap mt-10 flex w-full max-w-xl shrink-0 sm:mx-auto sm:mt-12">
          <span className="gallery-contact-btn-ring" aria-hidden />
          <button
            type="button"
            onClick={() => onContact(prop, activeZone)}
            className="gallery-contact-btn group inline-flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-none bg-gradient-to-r from-[#B8923F] via-[#C5A059] to-[#D4B878] px-6 py-4 text-base font-semibold uppercase tracking-[0.16em] text-[#0C0C0C] ring-2 ring-[#C5A059]/60 transition-[transform,box-shadow,filter] duration-300 hover:-translate-y-0.5 hover:from-[#A68335] hover:via-[#B8923F] hover:to-[#C5A059] hover:ring-[#D4B878]/80 hover:brightness-105 active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A059]/70 sm:min-h-14 sm:py-5 sm:text-[1.05rem] sm:tracking-[0.18em]"
          >
            <span className="gallery-contact-btn-dot" aria-hidden />
            Liên Hệ Ngay Để Nhận Ưu Đãi Và Chính Sách Tốt Nhất
            <svg
              className="h-4 w-4 shrink-0 text-[#0C0C0C] transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
type GalleryState = { property: Property; startIndex: number; zoneId: string } | null;
type ContactState = {
  property?: Property;
  zone?: PropertyZone;
  source: LeadSourceId | string;
  sourceLabel: string;
} | null;

export default function ShophouseGallery() {
  const [hovered, setHovered]   = useState<number | null>(null);
  const [gallery, setGallery]   = useState<GalleryState>(null);
  const [contact, setContact]   = useState<ContactState>(null);
  const reducedMotion = usePrefersReducedMotion();

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section id="gallery" className="section-mobile relative overflow-x-hidden bg-[#F8F5F2] py-12 sm:py-24">
        <div className="gallery-showcase-glow--light pointer-events-none absolute inset-0" aria-hidden />
        <GalleryOfferPin
          onRequestForm={() =>
            setContact({
              source: LEAD_SOURCE.galleryOfferPin,
              sourceLabel: LEAD_SOURCE_LABEL[LEAD_SOURCE.galleryOfferPin],
            })
          }
        />
        <div className="relative mx-auto max-w-7xl px-4 pl-11 sm:px-6 sm:pl-14 lg:pl-16">
          {/* Header — Hamptons / cream ground */}
          <div className="mb-12 sm:mb-14">
            <div className="gallery-stagger-1 inline-flex items-center rounded-full border border-[#D4AF37]/35 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <span className="mr-2.5 h-1.5 w-1.5 rounded-full bg-[#D4AF37]" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#151515]">
                Property Showcase
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="gallery-stagger-2 min-w-0 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tight text-[#151515] sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                  Không Gian
                  <span className="text-gradient-gold"> Shophouse Thực Tế</span>
                </h2>
              </div>
              <p className="gallery-stagger-3 max-w-md text-sm leading-relaxed text-ink md:text-[0.9375rem]">
                Nhấn để xem bộ ảnh chi tiết · Sẵn sàng bàn giao và vận hành.
              </p>
            </div>
          </div>

          <div
            className="reveal-on-scroll grid grid-cols-1 gap-14 sm:gap-y-20 lg:gap-y-24"
          >
            {PROPERTIES.map((prop, i) => (
              <PropertyCard
                key={prop.slug}
                prop={prop}
                index={i}
                isHovered={hovered === i}
                onHover={setHovered}
                reducedMotion={reducedMotion}
                onOpenGallery={(property, zoneId) =>
                  setGallery({ property, startIndex: 0, zoneId })
                }
                onContact={(property, zone) =>
                  setContact({
                    property,
                    zone,
                    source: LEAD_SOURCE.galleryCard,
                    sourceLabel: LEAD_SOURCE_LABEL[LEAD_SOURCE.galleryCard],
                  })
                }
              />
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-gold/25 pt-10 sm:flex-row sm:items-center">
            <p className="text-sm text-ink">
              Hiển thị{" "}
              <span className="font-semibold text-[#151515]">{PROPERTIES.length} mặt bằng</span> đại diện · Quỹ căn có thể thay đổi theo thời điểm.
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 border-b border-[#151515]/20 pb-0.5 text-xs font-semibold uppercase tracking-widest text-[#151515] transition-colors duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Xem Toàn Bộ Portfolio
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Lightbox */}
      {gallery && (
        <GalleryLightbox
          property={gallery.property}
          activeZone={getActiveZone(gallery.property, gallery.zoneId)}
          startIndex={gallery.startIndex}
          onClose={() => setGallery(null)}
          onContact={() => {
            const zone = getActiveZone(gallery.property, gallery.zoneId);
            setGallery(null);
            setContact({
              property: gallery.property,
              zone,
              source: LEAD_SOURCE.galleryLightbox,
              sourceLabel: LEAD_SOURCE_LABEL[LEAD_SOURCE.galleryLightbox],
            });
          }}
        />
      )}

      {contact && (
        <ContactModal
          property={contact.property}
          zone={contact.zone}
          source={contact.source}
          sourceLabel={contact.sourceLabel}
          onClose={() => setContact(null)}
        />
      )}
    </>
  );
}