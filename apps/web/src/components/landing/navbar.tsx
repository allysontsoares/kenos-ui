"use client";

import { DocsSearchModal, SearchIcon } from "@/components/docs/search-modal";
import {
  TopbarBrand,
  topbarGithubLinkCls,
  topbarNavLinkCls,
  topbarSearchBtnCls,
  topbarShellCls,
} from "@/components/site-topbar";
import { Kbd } from "@/components/ui/kbd";
import { AGGREGATOR_NPM, GITHUB_REPO } from "@/lib/landing-primitives";
import Link from "next/link";
import { useEffect, useState } from "react";

const CENTER_LINKS = [
  { label: "Demos", href: "/#demos" },
  { label: "Features", href: "/#features" },
  { label: "Primitives", href: "/#primitives" },
  { label: "Docs", href: "/docs/installation" },
  { label: "npm", href: AGGREGATOR_NPM, external: true },
] as const;

const MOBILE_LINKS = [
  ...CENTER_LINKS,
  { label: "GitHub", href: GITHUB_REPO, external: true },
] as const;

export function LandingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`${topbarShellCls} flex items-center justify-between gap-4 px-3.5 md:px-[22px]`}
      >
        <TopbarBrand />

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {CENTER_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={topbarNavLinkCls}
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setSearchOpen(true)} className={topbarSearchBtnCls}>
            <SearchIcon s={14} />
            <span className="flex-1 text-left">Search docs…</span>
            <Kbd>⌘K</Kbd>
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800 text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-300 md:hidden"
            aria-label="Search docs"
          >
            <SearchIcon s={15} />
          </button>

          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className={`${topbarGithubLinkCls} hidden sm:inline-flex`}
          >
            GitHub
          </a>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="border-b border-zinc-800 bg-black/85 px-3.5 py-3 backdrop-blur-xl backdrop-saturate-150 lg:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {MOBILE_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                onClick={() => setMobileOpen(false)}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {searchOpen && <DocsSearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

export function GithubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`fill-current ${className}`} aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
