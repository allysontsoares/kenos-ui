"use client";

import { DatePickerComposed, ComboboxDemo, SelectDemo } from "@/components/docs/demos";
import { Button } from "@kenos-ui/react-button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";

function DemoFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[188px] w-full items-center justify-center overflow-hidden bg-zinc-950 p-4 sm:min-h-[200px]">
      <div className="max-w-full min-w-0">{children}</div>
    </div>
  );
}

function HighlightButton() {
  const [count, setCount] = useState(0);

  return (
    <DemoFrame>
      <div className="flex flex-col items-center gap-3">
        <Button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-full border border-white/20 bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 transition-all active:scale-97 data-[pressed]:scale-97 hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Press me
        </Button>
        <p className="font-mono text-[11px] text-zinc-500">
          clicks: <span className="text-zinc-300">{count}</span>
        </p>
      </div>
    </DemoFrame>
  );
}

function HighlightDatePicker() {
  return (
    <DemoFrame>
      <DatePickerComposed label="Pick a date" size="compact" />
    </DemoFrame>
  );
}

function HighlightSelect() {
  return (
    <DemoFrame>
      <SelectDemo label="Framework" />
    </DemoFrame>
  );
}

function HighlightCombobox() {
  return (
    <DemoFrame>
      <ComboboxDemo label="Language" />
    </DemoFrame>
  );
}

type Highlight = {
  slug: string;
  title: string;
  desc: string;
  demo: ReactNode;
  soon?: boolean;
};

const HIGHLIGHTS: Highlight[] = [
  {
    slug: "button",
    title: "Button",
    desc: "Unstyled pressable with data-hovered, data-pressed, and data-focused — style every state yourself.",
    demo: <HighlightButton />,
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    desc: "Segmented input, popover calendar, range and multiple selection — one composable API.",
    demo: <HighlightDatePicker />,
  },
  {
    slug: "select",
    title: "Select",
    desc: "Combobox + listbox with dialog-safe defaults — inline Content, Escape interop, HiddenSelect for forms.",
    demo: <HighlightSelect />,
    soon: true,
  },
  {
    slug: "combobox",
    title: "Combobox",
    desc: "Type-to-filter with aria-activedescendant navigation, Empty state, and inline floating Content.",
    demo: <HighlightCombobox />,
    soon: true,
  },
];

export function LandingInteractiveDemos() {
  return (
    <section id="demos" className="border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] border-x border-white/[0.07]">
        <div className="border-b border-white/[0.07] px-6 py-12">
          <p className="kenos-landing-label mb-4">live</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="max-w-xl text-balance font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                See what ships in the box
              </h2>
              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400">
                Real primitives — unstyled by default. Every demo below is running the actual
                package, not a mock.
              </p>
            </div>
            <Link
              href="/docs/installation"
              className="kenos-cta-ghost inline-flex shrink-0 items-center gap-1.5 self-start sm:self-auto"
            >
              Get started
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="relative px-6 py-10">
          <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {HIGHLIGHTS.map((h) => (
              <article
                key={h.slug}
                aria-disabled={h.soon || undefined}
                className={cn(
                  "isolate flex w-[min(100%,320px)] shrink-0 snap-start flex-col transition-transform duration-200 ease-[var(--ease-smooth)] motion-reduce:transition-none sm:w-[280px]",
                  h.soon ? "pointer-events-none opacity-50 saturate-50" : "hover:-translate-y-0.5",
                )}
              >
                <div className="overflow-hidden rounded-t-xl border border-b-0 border-white/[0.07]">
                  {h.demo}
                </div>
                <div className="flex flex-1 flex-col rounded-b-xl border border-white/[0.07] bg-zinc-950 p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-heading text-[17px] font-medium tracking-tight text-zinc-100">
                      {h.title}
                    </h3>
                    {h.soon && (
                      <span className="font-mono text-[10px] uppercase tracking-wide text-zinc-500">
                        soon
                      </span>
                    )}
                  </div>
                  <p className="mb-4 flex-1 text-[13.5px] leading-normal text-zinc-400">{h.desc}</p>
                  {h.soon ? (
                    <span className="text-[13px] font-medium text-zinc-500">
                      Documentation coming soon
                    </span>
                  ) : (
                    <Link
                      href={`/docs/${h.slug}`}
                      className="text-[13px] font-semibold text-zinc-100 transition-colors hover:text-zinc-400"
                    >
                      Documentation →
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
