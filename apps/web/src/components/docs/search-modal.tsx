"use client";

import { Kbd } from "@/components/ui/kbd";
import { SEARCH, type SearchEntry } from "@/lib/docs-data";
import { routeToHref } from "@/lib/docs-routes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export function SearchIcon({ s = 16 }: { s?: number }) {
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

const DocIco = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

const CompIco = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const kindIco = (k: SearchEntry["kind"]) => (k === "comp" ? <CompIco /> : <DocIco />);

export function DocsSearchModal({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = q.trim()
    ? SEARCH.filter(
        (s) =>
          s.title.toLowerCase().includes(q.toLowerCase()) ||
          s.crumb.toLowerCase().includes(q.toLowerCase()),
      )
    : SEARCH.slice(0, 8);

  const go = useCallback(
    (route: string) => {
      router.push(routeToHref(route));
      onClose();
    },
    [router, onClose],
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSel((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSel((s) => Math.max(s - 1, 0));
      } else if (e.key === "Enter") {
        const r = results[sel];
        if (r) go(r.route);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const groups: Record<string, SearchEntry[]> = {};
  results.forEach((r) => (groups[r.crumb] = groups[r.crumb] || []).push(r));

  return (
    <div
      className="fixed inset-0 z-[100] flex animate-fade items-start justify-center bg-black/50 px-4 pt-[14vh] backdrop-blur-[3px]"
      onClick={onClose}
    >
      <div
        className="w-[min(580px,92vw)] animate-pop overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-800 px-[18px] py-4 text-zinc-400">
          <SearchIcon />
          <input
            ref={inputRef}
            placeholder="Search docs…"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setSel(0);
            }}
            className="flex-1 border-none bg-transparent text-base text-zinc-100 outline-none"
          />
          <Kbd>Esc</Kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-10 text-center text-sm text-zinc-400">
              No results for &ldquo;{q}&rdquo;
            </div>
          ) : (
            Object.entries(groups).map(([crumb, items]) => (
              <div key={crumb}>
                <div className="px-3 pb-1.5 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                  {crumb}
                </div>
                {items.map((r) => {
                  const idx = results.indexOf(r);
                  return (
                    <button
                      key={r.route + r.kind}
                      onMouseEnter={() => setSel(idx)}
                      onClick={() => go(r.route)}
                      className={`flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left ${
                        idx === sel ? "bg-zinc-800" : ""
                      }`}
                    >
                      <span className="grid h-[30px] w-[30px] shrink-0 place-items-center rounded-lg border border-zinc-800 bg-zinc-800 text-zinc-400">
                        {kindIco(r.kind)}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-zinc-100">{r.title}</span>
                        <span className="block text-xs text-zinc-400">{r.crumb}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
