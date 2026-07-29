import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Homepage Preview | Geeks Near Me",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyHomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
