import { LandingCtaFooter } from "@/components/landing/cta-footer";
import { LandingFeatures } from "@/components/landing/features";
import { LandingHero } from "@/components/landing/hero";
import { LandingInteractiveDemos } from "@/components/landing/interactive-demos";
import { LandingNavbar } from "@/components/landing/navbar";
import { LandingPrimitivesCatalog } from "@/components/landing/primitives-catalog";
import { LandingQualities } from "@/components/landing/qualities";
import type { Metadata } from "next";

const title = "kenos UI - Headless primitives";
const description =
  "The space before design. Composable, accessible, unstyled React primitives — Button, Date Picker, and more. Start with structure. Finish with style.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "kenos",
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
  return (
    <div className="landing-page min-h-screen bg-black text-zinc-100">
      <LandingNavbar />
      <LandingHero />
      <LandingInteractiveDemos />
      <LandingFeatures />
      <LandingPrimitivesCatalog />
      <LandingQualities />
      <LandingCtaFooter />
    </div>
  );
}
