import { Badge } from "@/components/ui/badge";
import { KenosMark } from "@/components/docs/kenos-mark";
import Link from "next/link";

export const topbarShellCls =
  "sticky top-0 z-[60] h-[var(--topbar-h)] border-b border-zinc-800 bg-black/80 backdrop-blur-xl backdrop-saturate-150";

export const topbarNavLinkCls =
  "rounded-full px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100";

export const topbarGithubLinkCls =
  "inline-flex h-8 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-transparent px-4 text-sm font-medium text-zinc-100 no-underline transition-colors hover:border-zinc-500 hover:bg-zinc-900";

export const topbarSearchBtnCls =
  "hidden h-8 min-w-[200px] items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-500 transition-colors hover:border-zinc-700 hover:text-zinc-400 md:flex";

export function TopbarBrand() {
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center gap-2.5 text-[17px] font-semibold tracking-tight"
    >
      <span className="text-[var(--kenos-mark)]">
        <KenosMark size={22} strokeWidth={2.5} />
      </span>
      <span className="font-mono text-[16px] tracking-[0.04em] text-zinc-100">kenos UI</span>
      <Badge variant="beta" className="ml-1 origin-left scale-[0.92]">
        Beta
      </Badge>
    </Link>
  );
}
