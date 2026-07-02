"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";

import { DocsSearchModal, SearchIcon } from "@/components/docs/search-modal";
import {
  TopbarBrand,
  topbarGithubLinkCls,
  topbarNavLinkCls,
  topbarSearchBtnCls,
  topbarShellCls,
} from "@/components/site-topbar";
import { Kbd } from "@/components/ui/kbd";
import { NAV } from "../../lib/docs-data";
import { pathToRoute, routeToHref } from "../../lib/docs-routes";
import { DocsTableOfContents } from "./docs-table-of-contents";

/* ============================ TOPBAR ============================ */
function Topbar({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <header
      className={`${topbarShellCls} grid grid-cols-[1fr_auto] items-center px-3.5 md:grid-cols-[var(--sidebar-w)_1fr_auto] md:px-[22px]`}
    >
      <TopbarBrand />

      <nav className="hidden items-center justify-center gap-1 md:flex">
        {[
          { label: "Docs", href: "/" },
          { label: "npm", href: "https://www.npmjs.com/package/@kenos-ui/react" },
        ].map((l) => (
          <Link key={l.label} href={l.href} className={topbarNavLinkCls}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center justify-self-end gap-2.5">
        <button type="button" onClick={onSearchClick} className={topbarSearchBtnCls}>
          <SearchIcon s={14} />
          <span className="flex-1 text-left">Search docs…</span>
          <Kbd>⌘K</Kbd>
        </button>
        <a
          href="https://github.com/allysontsoares/kenos-ui/tree/main/packages/datepicker"
          target="_blank"
          rel="noopener noreferrer"
          className={`${topbarGithubLinkCls} hidden sm:inline-flex`}
        >
          GitHub
        </a>
      </div>
    </header>
  );
}

const sidebarItemCls = (on: boolean, disabled?: boolean) =>
  `flex min-h-9 items-center gap-2 rounded-full px-3 text-[13.5px] transition-colors ${
    disabled
      ? "cursor-not-allowed text-zinc-500 opacity-60"
      : on
        ? "bg-zinc-800 font-medium text-zinc-100"
        : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
  }`;

/* ============================ SIDEBAR ============================ */
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const route = pathToRoute(pathname) ?? "";
  return (
    <nav
      aria-label="Documentation"
      className={`sticky top-[var(--topbar-h)] z-50 h-[calc(100vh-var(--topbar-h))] overflow-y-auto border-r border-zinc-800 py-6 pl-[22px] pr-4 max-md:fixed max-md:left-0 max-md:w-[280px] max-md:bg-black max-md:transition-transform ${
        open ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      } md:block`}
    >
      {NAV.map((group) => (
        <div key={group.title} className="mb-[22px]">
          <div className="mb-1 flex items-center gap-2 px-2.5 py-1 text-xs font-bold text-zinc-900 dark:text-zinc-100">
            {group.title}
            {group.badge && (
              <Badge variant="status" className="h-5 px-2 text-[10px]">
                {group.badge}
              </Badge>
            )}
          </div>
          {group.items.map((item) => {
            const active = route === item.route;
            if (item.soon) {
              return (
                <span key={item.route} aria-disabled="true" className={sidebarItemCls(false, true)}>
                  <span className="flex-1">{item.label}</span>
                  <Badge variant="secondary" className="h-5 shrink-0 px-2 text-[10px]">
                    Soon
                  </Badge>
                </span>
              );
            }
            return (
              <Link
                key={item.route}
                href={routeToHref(item.route)}
                onClick={onClose}
                className={sidebarItemCls(active)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/* ============================ SHELL ============================ */
export function DocsShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const showTocRail = pathname !== "/docs" && pathname !== "/docs/";

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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
    <div className="min-h-screen bg-black text-zinc-100">
      <Topbar onSearchClick={() => setSearchOpen(true)} />
      <div className="grid items-start md:grid-cols-[var(--sidebar-w)_minmax(0,1fr)]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className={`relative min-w-0 ${showTocRail ? "min-[1180px]:pr-[var(--toc-w)]" : ""}`}>
          <div
            id="docs-content"
            className="mx-auto max-w-[760px] px-5 pb-28 pt-10 sm:px-10 sm:pt-[46px]"
          >
            {children}
          </div>
          <DocsTableOfContents />
        </main>
      </div>
      {searchOpen && <DocsSearchModal onClose={() => setSearchOpen(false)} />}
    </div>
  );
}
