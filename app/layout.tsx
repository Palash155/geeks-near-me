import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IT Support Sydney | On-Site & Remote Computer Help | Geeks Near Me",
  description:
    "Need practical IT support in Sydney? Geeks Near Me helps homes and small businesses with computers, laptops, Wi-Fi, printers, software and more. Request an appointment online.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-AU" className={plusJakartaSans.variable}>
      <body>{children}</body>
    </html>
  );
}
