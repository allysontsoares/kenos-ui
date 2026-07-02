"use client";

import { LANDING_PRIMITIVES } from "@/lib/landing-primitives";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import Link from "next/link";

function CopyInstallButton({ cmd }: { cmd: string }) {
  const { copied, copy } = useCopyToClipboard(2000);

  return (
    <button
      type="button"
      onClick={() => copy(cmd)}
      aria-label={copied ? "Copied install command" : `Copy ${cmd}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] px-3 py-1.5 font-mono text-[11px] text-zinc-500 transition-colors hover:border-white/15 hover:bg-zinc-900 hover:text-zinc-300"
    >
      <span className="text-zinc-400">$</span>
      <span>{cmd.replace("npm install ", "")}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-3 w-3 opacity-60"
        aria-hidden
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
  );
}

function StatusBadge({ status }: { status: "available" | "soon" }) {
  if (status === "available") {
    return <span className="kenos-status-badge">available</span>;
  }
  return <span className="font-mono text-[11px] uppercase tracking-wide text-zinc-500">soon</span>;
}

export function LandingPrimitivesCatalog() {
  return (
    <section id="primitives" className="border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] border-x border-white/[0.07]">
        <div className="border-b border-white/[0.07] px-6 py-12">
          <p className="kenos-landing-label mb-4">primitives</p>
          <h2 className="max-w-2xl text-balance font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            One library, many primitives
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-zinc-400">
            Install the aggregator or pick individual packages. Each primitive ships unstyled, with
            WAI-ARIA patterns and data attributes you style yourself.
          </p>
        </div>

        <div className="divide-y divide-white/[0.07]">
          {LANDING_PRIMITIVES.map((primitive) => (
            <article
              key={primitive.slug}
              className="grid grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10 lg:py-10"
            >
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-xl font-medium tracking-tight">
                    {primitive.name}
                  </h3>
                  <StatusBadge status={primitive.status} />
                </div>
                <p className="max-w-md text-sm leading-relaxed text-zinc-400">{primitive.desc}</p>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <CopyInstallButton cmd={primitive.installCmd} />
                  {primitive.docsHref ? (
                    <Link
                      href={primitive.docsHref}
                      className="text-sm font-semibold text-zinc-100 transition-colors hover:text-zinc-300"
                    >
                      Docs →
                    </Link>
                  ) : null}
                  <a
                    href={primitive.npmHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-500 transition-colors hover:text-zinc-300"
                  >
                    npm
                  </a>
                </div>
              </div>

              <div className="min-w-0 overflow-hidden rounded-md border border-white/[0.07] bg-zinc-900">
                <div className="border-b border-white/[0.07] px-3 py-2">
                  <span className="font-mono text-[11px] text-zinc-500">
                    {primitive.npmPackage}
                  </span>
                </div>
                <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-zinc-300">
                  {primitive.snippet}
                </pre>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
