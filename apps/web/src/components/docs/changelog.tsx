import fs from "node:fs/promises";
import path from "node:path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DocsProse } from "./docs-prose";
import { Eyebrow, Lead, PageIntro, PageTitle } from "./pages";

const CHANGELOG_PATH = path.join(process.cwd(), "../../packages/datepicker/CHANGELOG.md");
const CHANGELOG_URL =
  "https://github.com/allysontsoares/kenos-ui/blob/main/packages/datepicker/CHANGELOG.md";

async function getChangelogSource() {
  const raw = await fs.readFile(CHANGELOG_PATH, "utf8");
  return raw.replace(/^#[^\n]+\n+/, "");
}

export async function Changelog() {
  const source = await getChangelogSource();

  return (
    <>
      <PageIntro>
        <Eyebrow>Get Started</Eyebrow>
        <PageTitle>Changelog</PageTitle>
        <Lead>
          Release notes for{" "}
          <code className="font-mono text-[0.9em]">@kenos-ui/react-datepicker</code>. Rendered from{" "}
          <a
            href={CHANGELOG_URL}
            className="font-semibold underline decoration-line-strong underline-offset-[3px] hover:text-indigo-600 hover:decoration-accent dark:hover:text-indigo-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            packages/datepicker/CHANGELOG.md
          </a>
          .
        </Lead>
      </PageIntro>
      <DocsProse>
        <MDXRemote source={source} />
      </DocsProse>
    </>
  );
}
