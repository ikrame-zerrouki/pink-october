import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: {
    default: "أكتوبر وردي | توعية بسرطان الثدي",
    template: "%s | أكتوبر وردي",
  },
  description:
    "منصة توعوية شاملة عن سرطان الثدي: التعريف، الفحص الذاتي، الفحوصات الطبية، الوقاية، وقصص الناجيات.",
  keywords: [
    "سرطان الثدي",
    "أكتوبر الوردي",
    "الفحص الذاتي",
    "ماموجرام",
    "توعية صحية",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
      data-scroll-behavior="smooth"
    >
      <body className="font-[family-name:var(--font-cairo)] antialiased bg-[#FDF8F5]">
        <Header />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}