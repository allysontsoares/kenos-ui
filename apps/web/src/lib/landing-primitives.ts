import { COMPONENTS, isSoonRoute } from "./docs-data";
import { routeToHref } from "./docs-routes";

export const AGGREGATOR_INSTALL = "npm install @kenos-ui/react";
export const AGGREGATOR_NPM = "https://www.npmjs.com/package/@kenos-ui/react";
export const GITHUB_REPO = "https://github.com/allysontsoares/kenos-ui";

export const LANDING_PRIMITIVE_SLUGS = ["button", "date-picker", "select", "combobox"] as const;

const SNIPPETS: Record<(typeof LANDING_PRIMITIVE_SLUGS)[number], string> = {
  button: `import { Button } from "@kenos-ui/react-button";

export function Example() {
  return <Button>Click me</Button>;
}`,
  "date-picker": `import { DatePicker } from "@kenos-ui/react-datepicker";

<DatePicker.Root value={date} onValueChange={setDate}>
  <DatePicker.Input />
  <DatePicker.Calendar />
</DatePicker.Root>`,
  select: `import { Select } from "@kenos-ui/react-select";

<Select.Root>
  <Select.Trigger />
  <Select.Content />
</Select.Root>`,
  combobox: `import { Combobox } from "@kenos-ui/react-combobox";

<Combobox.Root>
  <Combobox.Input />
  <Combobox.List />
</Combobox.Root>`,
};

export type LandingPrimitiveStatus = "available" | "soon";

export type LandingPrimitive = {
  slug: string;
  name: string;
  desc: string;
  npmPackage: string;
  importName: string;
  status: LandingPrimitiveStatus;
  docsHref: string | null;
  npmHref: string;
  installCmd: string;
  snippet: string;
};

export const LANDING_PRIMITIVES: LandingPrimitive[] = LANDING_PRIMITIVE_SLUGS.map((slug) => {
  const meta = COMPONENTS[slug]!;
  const soon = isSoonRoute(slug);
  return {
    slug,
    name: meta.name,
    desc: meta.desc,
    npmPackage: meta.npmPackage,
    importName: meta.importName,
    status: soon ? "soon" : "available",
    docsHref: soon ? null : routeToHref(slug),
    npmHref: `https://www.npmjs.com/package/${meta.npmPackage}`,
    installCmd: `npm install ${meta.npmPackage}`,
    snippet: SNIPPETS[slug],
  };
});
