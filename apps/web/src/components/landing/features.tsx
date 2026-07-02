export function LandingFeatures() {
  return (
    <section id="features" className="border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] border-x border-white/[0.07]">
        <div className="border-b border-white/[0.07] px-6 py-12">
          <p className="kenos-landing-label mb-4">capabilities</p>
          <h2 className="max-w-2xl text-balance font-heading text-3xl font-medium leading-tight tracking-tight md:text-4xl">
            Built the same way, every primitive
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-relaxed text-zinc-400">
            Headless parts with predictable APIs, semantic data attributes, and zero shipped CSS —
            not themed widgets you fight to customize.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3">
          <Cell className="md:col-span-2">
            <TopicLabel name="headless" />
            <h3 className="mb-2 mt-4 font-heading text-xl font-medium tracking-tight">
              Zero default styles
            </h3>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-zinc-400">
              Every Kenos primitive is unstyled. Wire Tailwind, CSS modules, Panda CSS, StyleX,
              inline styles, or any CSS framework — Kenos ships no CSS. You bring your own, your
              way, and decide how your app looks.
            </p>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded border border-[var(--kenos-status-muted)] bg-[var(--kenos-status-muted)] sm:grid-cols-3">
              {[
                { name: "data-*", desc: "state-driven styling hooks", accent: true },
                { name: "render prop", desc: "compose your own DOM", accent: false },
                { name: "per-package", desc: "install only what you need", accent: false },
              ].map((item) => (
                <div key={item.name} className="bg-zinc-900 p-4">
                  <div
                    className={`font-mono text-sm font-semibold ${item.accent ? "text-[var(--kenos-status)]" : "text-zinc-200"}`}
                  >
                    {item.name}
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </Cell>

          <Cell>
            <TopicLabel name="accessibility" />
            <h3 className="mb-2 mt-4 font-heading text-xl font-medium tracking-tight">WAI-ARIA</h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Roles, keyboard patterns, and focus management built in — tested with axe-core and
              keyboard suites across primitives.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-px overflow-hidden rounded border border-[var(--kenos-status-muted)] bg-[var(--kenos-status-muted)]">
              {["keyboard", "focus-ring", "aria-roles", "screen reader"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 bg-zinc-900 p-2.5 font-mono text-[11px] text-zinc-500"
                >
                  <span className="kenos-landing-accent-dot h-1 w-1 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </Cell>

          <Cell>
            <TopicLabel name="composition" />
            <h3 className="mb-2 mt-4 font-heading text-xl font-medium tracking-tight">
              Compound APIs
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Shorthand composites for the common case, full part trees when you need control — from
              a single Button to multi-part pickers.
            </p>
            <div className="mt-auto flex gap-px">
              {["Button", "DatePicker", "Select", "Combobox"].map((name, i) => (
                <div
                  key={name}
                  className={`flex h-10 flex-1 items-center justify-center bg-zinc-900 font-mono text-[10px] first:rounded-l last:rounded-r ${
                    i === 0 ? "text-[var(--kenos-status)]" : "text-zinc-500"
                  }`}
                >
                  {name}
                </div>
              ))}
            </div>
          </Cell>

          <Cell className="md:col-span-2 !p-0">
            <div className="grid h-full grid-cols-1 sm:grid-cols-2">
              <div className="border-b border-white/[0.07] p-6 sm:border-b-0 sm:border-r">
                <TopicLabel name="typescript" />
                <h3 className="mb-2 mt-4 font-heading text-xl font-medium tracking-tight">
                  Strict, inferred types
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  Props and generics across every part — or import everything from{" "}
                  <code className="text-zinc-400">@kenos-ui/react</code> when you depend on multiple
                  primitives.
                </p>
              </div>
              <div className="landing-code-block overflow-x-auto p-5 font-mono text-xs leading-relaxed">
                <div className="mb-2 text-zinc-500">aggregator or per-package</div>
                <div>
                  <span className="landing-code-keyword">import</span> {"{ Button, DatePicker }"}{" "}
                  <span className="landing-code-keyword">from</span>{" "}
                  <span className="landing-code-string">&quot;@kenos-ui/react&quot;</span>
                </div>
                <div className="mt-3">
                  <span className="landing-code-highlight">&lt;Button&gt;</span>
                  Open picker
                  <span className="landing-code-highlight">&lt;/Button&gt;</span>
                </div>
                <div className="mt-2">
                  <span className="landing-code-highlight">&lt;DatePicker.Root&gt;</span>
                  <span className="landing-code-highlight">&lt;DatePicker.Calendar /&gt;</span>
                  <span className="landing-code-highlight">&lt;/DatePicker.Root&gt;</span>
                </div>
              </div>
            </div>
          </Cell>
        </div>
      </div>
    </section>
  );
}

function Cell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`flex flex-col border-b border-white/[0.07] p-6 md:[&:nth-child(odd)]:border-r ${className}`}
    >
      {children}
    </div>
  );
}

function TopicLabel({ name }: { name: string }) {
  return (
    <span className="kenos-landing-topic font-mono text-[11px] uppercase tracking-wide">
      {name}
    </span>
  );
}
