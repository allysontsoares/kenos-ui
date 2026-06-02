import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DocsShell } from "../components/docs/Shell";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://kairo.at5.dev"),
  title: {
    default: "Kairo — Headless date primitives for React",
    template: "%s · Kairo",
  },
  description:
    "Unstyled, accessible React primitives for calendars, date pickers, range selection, and locale-aware date fields. Zero CSS, WAI-ARIA grid pattern, Intl-ready.",
  keywords: [
    "react date picker",
    "headless calendar",
    "date range picker",
    "WAI-ARIA date grid",
    "locale date field",
    "design system dates",
    "kairo",
  ],
  openGraph: {
    title: "Kairo — Headless date primitives for React",
    description:
      "Unstyled, accessible React primitives for calendars, date pickers, range selection, and locale-aware date fields.",
    type: "website",
    siteName: "Kairo",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("kairo-theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <DocsShell>{children}</DocsShell>
      </body>
    </html>
  );
}
