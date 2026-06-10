import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "F&B Shophouse Investment | Vincom Retail — Phú Quốc & Nha Trang",
  description:
    "Quỹ căn Shophouse thương mại độc quyền từ Vincom Retail. Đầu tư thông minh với lợi nhuận F&B bền vững tại Phú Quốc & Nha Trang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full font-sans antialiased">
      <body className="min-h-full flex flex-col bg-navy font-sans text-white">
        {children}
      </body>
    </html>
  );
}
