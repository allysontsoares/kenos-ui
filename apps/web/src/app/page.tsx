import type { Metadata } from "next";
import { Overview } from "../components/docs/pages";

const title = "Kairo — Headless date primitives for React";
const description =
  "Unstyled, accessible React primitives for calendars, date pickers, range selection, and locale-aware date fields. Zero CSS, WAI-ARIA grid pattern, Intl-ready.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Kairo",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <Overview />;
}