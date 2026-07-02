import Link from "next/link";

const QUALITIES = [
  {
    title: "Full keyboard navigation",
    desc: "Predictable patterns across primitives — arrows, Home/End, Escape, and typeahead where it matters.",
  },
  {
    title: "WAI-ARIA semantics",
    desc: "Roles, states, and relationships wired in — not unlabeled divs with onClick handlers.",
  },
  {
    title: "Locale-aware where needed",
    desc: "Date segments respect Intl — week start, order, and labels without manual format strings.",
  },
  {
    title: "Assistive technology ready",
    desc: "Meaningful labels, expanded states, and announcements so screen readers don't guess intent.",
  },
  {
    title: "Unstyled and lightweight",
    desc: "Zero CSS ships with the package. Import only the parts you render — no theme runtime.",
  },
  {
    title: "Composable parts",
    desc: "Shorthand for common cases, full part trees when you need control over structure and behavior.",
  },
] as const;

const CheckIcon = () => (
  <span
    className="kenos-landing-check grid h-6 w-6 shrink-0 place-items-center rounded-full border"
    aria-hidden
  >
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  </span>
);

export function LandingQualities() {
  return (
    <section id="accessibility" className="border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] border-x border-white/[0.07]">
        <div className="border-b border-white/[0.07] px-6 py-12">
          <p className="kenos-landing-label mb-4">accessible by default</p>
          <h2 className="max-w-[20ch] text-balance font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            Built for production UI
          </h2>
          <p className="mt-4 max-w-[52ch] text-pretty text-sm leading-relaxed text-zinc-400">
            Interactive widgets are easy to get wrong. Kenos handles semantics, keyboard support,
            and locale rules so your team can focus on visual design.{" "}
            <Link
              href="/docs/date-picker#accessibility"
              className="kenos-landing-accent-link font-semibold underline-offset-2 hover:underline"
            >
              Accessibility guide →
            </Link>
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-10 gap-y-8 px-6 py-12 md:grid-cols-2">
          {QUALITIES.map((q) => (
            <li key={q.title} className="flex gap-3">
              <CheckIcon />
              <div className="min-w-0">
                <h3 className="mb-1 font-heading text-[15px] font-medium text-zinc-100">
                  {q.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-zinc-400">{q.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
