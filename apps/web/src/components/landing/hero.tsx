"use client";

import { KenosMark } from "@/components/docs/kenos-mark";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { AGGREGATOR_INSTALL, LANDING_PRIMITIVES } from "@/lib/landing-primitives";
import Link from "next/link";

const HERO_PILLS = [
  "Unstyled by design",
  "WAI-ARIA compliant",
  "Fully composable",
  "React 19 compatible",
] as const;

export function LandingHero() {
  const { copied, copy } = useCopyToClipboard(2000);

  return (
    <section className="relative overflow-hidden border-b border-white/[0.07]">
      <div className="relative mx-auto max-w-[1200px] border-x border-white/[0.07]">
        <div className="kenos-landing-dot-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[320px] w-[600px] -translate-x-1/2 bg-white/[0.03] blur-[120px]" />

        <div className="relative grid grid-cols-1 items-center gap-10 px-6 pb-14 pt-16 sm:px-8 lg:mx-auto lg:max-w-[920px] lg:grid-cols-[minmax(0,1fr)_minmax(160px,200px)] lg:items-center lg:gap-12 lg:pb-16 lg:pt-20">
          <div className="min-w-0 text-center lg:text-left">
            <h1 className="max-w-[16ch] text-balance font-heading text-4xl font-medium leading-[1.02] tracking-tight md:text-5xl lg:text-6xl">
              Headless primitives
              <br />
              <span className="text-zinc-500">for React.</span>
            </h1>

            <p className="mt-6 max-w-[44ch] text-pretty text-base leading-relaxed text-zinc-400 md:text-[17px]">
              Composable, accessible, unstyled primitives — Button, Date Picker, and more. Start
              with structure. Finish with style.
            </p>

            <ul
              className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Highlights"
            >
              {HERO_PILLS.map((label) => (
                <li key={label}>
                  <span className="kenos-landing-pill inline-flex items-center rounded-full px-3 py-1 font-mono text-[11px]">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/docs/installation" className="kenos-cta">
                Get started
              </Link>
              <Link
                href="/#primitives"
                className="kenos-cta-ghost inline-flex items-center gap-1.5"
              >
                Primitives
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <button
                type="button"
                onClick={() => copy(AGGREGATOR_INSTALL)}
                aria-label={copied ? "Copied install command" : "Copy install command"}
                className="group flex items-center gap-2 rounded-md border border-white/[0.07] px-4 py-2.5 font-mono text-xs text-zinc-500 transition-all duration-200 hover:border-white/15 hover:bg-zinc-900"
              >
                <span className="text-zinc-300">$</span>
                <span>{AGGREGATOR_INSTALL}</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="ml-1 h-3 w-3 opacity-50 transition-opacity group-hover:opacity-100"
                >
                  {copied ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  ) : (
                    <>
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="hidden items-center justify-center sm:flex">
            <div className="kenos-corner-mark shrink-0 text-zinc-100 opacity-90">
              <KenosMark size={176} strokeWidth={3} />
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07]">
          <div className="flex flex-col items-center md:flex-row">
            <div className="kenos-landing-label w-full whitespace-nowrap border-b border-white/[0.07] px-6 py-5 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400 md:w-auto md:border-b-0 md:border-r md:text-left">
              primitives
            </div>
            <div className="flex flex-1 flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5">
              {LANDING_PRIMITIVES.map((primitive) => (
                <span key={primitive.slug} className="text-sm">
                  <span
                    className={
                      primitive.status === "available"
                        ? "font-semibold text-zinc-100"
                        : "font-semibold text-zinc-500"
                    }
                  >
                    {primitive.name}
                  </span>
                  <span
                    className={`ml-1.5 font-mono text-[11px] ${
                      primitive.status === "available" ? "kenos-status-badge" : "text-zinc-500"
                    }`}
                  >
                    {primitive.status}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
