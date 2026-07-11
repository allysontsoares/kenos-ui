/* ============================================================
   Site data: navigation tree, component metadata, anatomy,
   API reference, search index. Kenos UI documentation site data.
   ============================================================ */

export type AnatomyNode = {
  tag: string;
  leaf?: boolean;
  note?: string;
  children?: AnatomyNode[];
};

export type ApiProp = {
  name: string;
  type?: string;
  def?: string;
  required?: boolean;
  desc: string;
};

export type ApiGroup = {
  group: string;
  attrs?: boolean;
  keys?: boolean;
  props: ApiProp[];
};

export type ComponentDocFeatures = {
  /** Show locale switcher + localized demo (datepicker family). */
  localeExamples?: boolean;
  /** Dialog interop example section (inline Content inside a modal). */
  dialogInterop?: boolean;
  /** Native form + HiddenSelect example. */
  forms?: boolean;
  /** Multiple selection example section. */
  multiple?: boolean;
  /** Portal + custom container example section. */
  portal?: boolean;
  /** Type-to-filter example section (combobox). */
  filter?: boolean;
  /**
   * Free-text + Button beside Combobox composition story (not a Combobox API).
   * Deferred / hidden from the public docs site until the Patient search demo is polished.
   */
  compositionSearch?: boolean;
};

export type ComponentMeta = {
  name: string;
  eyebrow: string;
  desc: string;
  demo: DemoKind;
  parts: AnatomyNode[];
  /** npm package for install/import copy. */
  npmPackage: string;
  /** Public namespace (DatePicker, Select, …). */
  importName: string;
  features?: ComponentDocFeatures;
};

export type DemoKind = "date-picker" | "select" | "combobox" | "button";

export type NavItem = { label: string; route: string; soon?: boolean };
export type NavGroup = { title: string; badge?: string; items: NavItem[] };

/** Component doc routes that appear in nav but are not published yet. */
export const SOON_ROUTES = [] as const;
export type SoonRoute = (typeof SOON_ROUTES)[number];

export function isSoonRoute(route: string): route is SoonRoute {
  return (SOON_ROUTES as readonly string[]).includes(route);
}

export const NAV: NavGroup[] = [
  {
    title: "Get Started",
    items: [
      { label: "Overview", route: "" },
      { label: "Installation", route: "installation" },
      { label: "Changelog", route: "changelog" },
    ],
  },
  {
    title: "Primitives",
    badge: "New",
    items: [
      { label: "Button", route: "button" },
      { label: "Date Picker", route: "date-picker" },
      { label: "Select", route: "select" },
      { label: "Combobox", route: "combobox" },
    ],
  },
];

export const COMPONENTS: Record<string, ComponentMeta> = {
  button: {
    name: "Button",
    eyebrow: "Primitive",
    desc: "An augmented native <button> primitive. Built with native-first press logic, keyboard support, and robust state-driven data attributes.",
    demo: "button",
    npmPackage: "@kenos-ui/react-button",
    importName: "Button",
    parts: [{ tag: "Button", leaf: true }],
  },
  "date-picker": {
    name: "Date Picker",
    eyebrow: "Primitive",
    desc: "Headless date primitives — segmented input, popover calendar, range and multiple selection, time granularity, presets, unavailable dates, HiddenInput, RTL keyboard. Built on Intl, timescape, and Floating UI. Zero CSS shipped.",
    demo: "date-picker",
    npmPackage: "@kenos-ui/react-datepicker",
    importName: "DatePicker",
    parts: [],
  },
  select: {
    name: "Select",
    eyebrow: "Primitive",
    desc: "A headless select with combobox + listbox pattern. Interop-first defaults: modal={false}, portal={false}. Pointer open keeps focus on the trigger; keyboard open moves focus into the listbox. Supports single and multiple selection, items prop for label maps, and Select.HiddenSelect for native form submission.",
    demo: "select",
    npmPackage: "@kenos-ui/react-select",
    importName: "Select",
    features: {
      dialogInterop: true,
      forms: true,
      multiple: true,
      portal: true,
    },
    parts: [
      {
        tag: "Select.Root",
        children: [
          { tag: "Select.Label", leaf: true },
          {
            tag: "Select.Trigger",
            children: [
              { tag: "Select.Value", leaf: true },
              { tag: "Select.Icon", leaf: true },
            ],
          },
          {
            tag: "Select.ClearTrigger",
            note: "sibling of Trigger — clears value without opening",
            leaf: true,
          },
          {
            tag: "Select.Portal",
            note: "optional — portal to body or custom container",
            children: [
              {
                tag: "Select.Positioner",
                note: "floating-ui anchor (side, align, sameWidth)",
                children: [
                  {
                    tag: "Select.Content",
                    note: "listbox container (inline when Portal omitted)",
                    children: [
                      {
                        tag: "Select.Backdrop",
                        note: "only when modal={true}",
                      },
                      { tag: "Select.ScrollUpButton", note: "long lists" },
                      {
                        tag: "Select.List",
                        note: "role=listbox — focused on keyboard open",
                        children: [
                          {
                            tag: "Select.Item value=…",
                            note: "registers in store",
                          },
                        ],
                      },
                      { tag: "Select.ScrollDownButton", note: "long lists" },
                    ],
                  },
                ],
              },
            ],
          },
          { tag: "Select.HiddenSelect", note: "native <select> for forms" },
        ],
      },
    ],
  },
  combobox: {
    name: "Combobox",
    eyebrow: "Primitive",
    desc: "A headless combobox with type-to-filter, Input-first focus (aria-activedescendant), and an Empty state when nothing matches. open and inputValue are independent — Trigger toggles the list without clearing the query. Interop-first defaults: modal={false}, portal={false}, Content anchored to the Input.",
    demo: "combobox",
    npmPackage: "@kenos-ui/react-combobox",
    importName: "Combobox",
    // TODO: re-enable compositionSearch when Patient search demo is ready for public docs
    features: { filter: true, dialogInterop: true, forms: true, compositionSearch: false },
    parts: [
      {
        tag: "Combobox.Root",
        children: [
          { tag: "Combobox.Label", leaf: true },
          {
            tag: "Combobox.Input",
            note: "role=combobox — focus stays here; typing filters",
          },
          {
            tag: "Combobox.Trigger",
            note: "toggles open only; empty query → full list",
          },
          {
            tag: "Combobox.Content",
            note: "floating listbox (portal=false default)",
            children: [
              {
                tag: "Combobox.List",
                children: [
                  {
                    tag: "Combobox.Item value=…",
                    note: "registers in store",
                    children: [
                      { tag: "Combobox.ItemText", leaf: true },
                      { tag: "Combobox.ItemIndicator", leaf: true },
                    ],
                  },
                ],
              },
              {
                tag: "Combobox.Empty",
                note: "shown when filter matches nothing",
              },
            ],
          },
          { tag: "Combobox.Clear", note: "clears value + input text" },
          { tag: "Combobox.HiddenInput", note: "native hidden field when name is set" },
        ],
      },
    ],
  },
};

const rootGroup = { group: "Root props" };

export const API: Record<string, ApiGroup[]> = {
  button: [
    {
      ...rootGroup,
      props: [
        {
          name: "isPending",
          type: "boolean",
          def: "false",
          desc: "Loading state. Maintains focusability, blocks action, announces via aria-busy.",
        },
        {
          name: "isDisabled",
          type: "boolean",
          def: "false",
          desc: "Semantic equivalent to `disabled`, explicitly named for intent clarity. Uses aria-disabled internally.",
        },
        {
          name: "excludeFromTabOrder",
          type: "boolean",
          def: "false",
          desc: "Removes from tab order without using native `disabled`.",
        },
        {
          name: "preventFocusOnPress",
          type: "boolean",
          def: "false",
          desc: "Prevents focus from moving to the button on press (mouse/touch).",
        },
        {
          name: "render",
          type: "DOMRenderFunction",
          desc: "Replaces the rendered DOM element, keeping behavior and props.",
        },
      ],
    },
    {
      group: "Data attributes",
      attrs: true,
      props: [
        { name: "[data-hovered]", desc: "Present when the button is hovered with mouse." },
        { name: "[data-pressed]", desc: "Present when the button is actively pressed." },
        { name: "[data-focused]", desc: "Present when the button has logical focus." },
        { name: "[data-pending]", desc: "Present when the button is in a pending/loading state." },
        { name: "[data-disabled]", desc: "Present when the button is semantically disabled." },
      ],
    },
  ],
  select: [
    {
      ...rootGroup,
      props: [
        {
          name: "value / defaultValue / onValueChange",
          type: "string | null | string[]",
          desc: "Controlled/uncontrolled selected value. string[] when multiple={true}.",
        },
        {
          name: "open / defaultOpen / onOpenChange",
          type: "boolean",
          desc: "Listbox open state.",
        },
        {
          name: "name",
          type: "string",
          desc: "Forwarded to Select.HiddenSelect for form submit.",
        },
        {
          name: "disabled / required / readOnly",
          type: "boolean",
          desc: "Root constraints.",
        },
        {
          name: "modal",
          type: "boolean",
          def: "false",
          desc: "Opt-in focus trap + aria-modal on Content. Renders Select.Backdrop.",
        },
        {
          name: "multiple",
          type: "boolean",
          def: "false",
          desc: "Multi-select mode. Toggle items on click; listbox stays open.",
        },
        {
          name: "items",
          type: "Record<string, string>",
          desc: "Value → label map. Resolves Select.Value labels without rendering every Item.",
        },
        {
          name: "isItemEqualToValue",
          type: "(a: string, b: string) => boolean",
          desc: "Custom string comparator for selection matching (default: ===). Not for object values.",
        },
        {
          name: "openOnFocus",
          type: "boolean",
          def: "false",
          desc: "Open the listbox when the trigger receives focus. Does not reopen after Escape/select restore focus.",
        },
      ],
    },
    {
      group: "Content props",
      props: [
        {
          name: "portal",
          type: "boolean",
          def: "false",
          desc: "Portal to document.body — avoid inside Dialogs.",
        },
        {
          name: "alignItemWithTrigger",
          type: "boolean",
          def: "false",
          desc: "Offset content to cover the trigger (by trigger height). Does not scroll the selected item into alignment. On Safari pinch-zoom, automatically falls back to standard anchoring.",
        },
        {
          name: "container",
          type: "HTMLElement | RefObject<HTMLElement>",
          desc: "Custom portal target (e.g. Dialog.Content ref). Requires portal={true}.",
        },
        {
          name: "side / align / sameWidth",
          desc: "Floating UI positioning via @kenos-ui/utils.",
        },
        {
          name: "lazyMount",
          type: "boolean",
          def: "true",
          desc: "Skip DOM until first open.",
        },
        {
          name: "onOpenChangeComplete",
          type: "(open: boolean) => void",
          desc: "Fires when open transitions finish, including presence exit.",
        },
      ],
    },
    {
      group: "Parts (Tier 2–4)",
      props: [
        {
          name: "Select.ClearTrigger",
          type: "span[role=button]",
          desc: "Clears the current value without opening the listbox. Place as a sibling of Trigger (not nested inside the button).",
        },
        {
          name: "Select.ScrollUpButton / ScrollDownButton",
          type: "button",
          desc: "Scroll the list when options overflow. Auto-hidden when not needed.",
        },
        {
          name: "scrollToIndex(index)",
          type: "context method",
          desc: "Programmatically scroll the list to an item index.",
        },
      ],
    },
    {
      group: "Data attributes",
      attrs: true,
      props: [
        { name: "[data-open]", desc: "On trigger when listbox is open." },
        { name: "[data-selected]", desc: "On selected option." },
        { name: "[data-highlighted]", desc: "Keyboard/hover highlight." },
        { name: "[data-disabled]", desc: "Disabled trigger or option." },
      ],
    },
    {
      group: "Keyboard",
      keys: true,
      props: [
        {
          name: "Arrow ↓ / Enter / Space (closed)",
          desc: "Open the listbox and move focus into the list.",
        },
        { name: "Arrow ↑ / ↓", desc: "Move highlight; skips disabled items." },
        { name: "Home / End", desc: "First / last enabled option." },
        { name: "Type characters", desc: "Typeahead match on textValue." },
        { name: "Enter / Space", desc: "Select highlighted option." },
        {
          name: "Escape",
          desc: "Close listbox (when focus is in content or on trigger); stopPropagation for Dialog interop.",
        },
      ],
    },
  ],
  combobox: [
    {
      ...rootGroup,
      props: [
        {
          name: "value / defaultValue / onValueChange",
          type: "string | null",
          desc: "Controlled/uncontrolled selected value.",
        },
        {
          name: "inputValue / defaultInputValue / onInputValueChange",
          type: "string",
          desc: "Controlled/uncontrolled filter text in the input.",
        },
        {
          name: "open / defaultOpen / onOpenChange",
          type: "boolean",
          desc: "Listbox open state.",
        },
        {
          name: "name",
          type: "string",
          desc: "Native form field name for Combobox.HiddenInput.",
        },
        {
          name: "openOnFocus",
          type: "boolean",
          def: "false",
          desc: "Open when Input receives focus. Breaking vs 0.2.x (which always opened on focus).",
        },
        {
          name: "openOnChange",
          type: "boolean",
          def: "true",
          desc: "Open when typing while closed. Independent of Trigger toggle.",
        },
        {
          name: "disabled / required / readOnly",
          type: "boolean",
          desc: "Root constraints.",
        },
        {
          name: "modal",
          type: "boolean",
          def: "false",
          desc: "Opt-in focus trap + aria-modal on Content.",
        },
        {
          name: "items",
          type: "Record<string, string>",
          desc: "Value → label map. Resolves input display when items are not mounted.",
        },
        {
          name: "isItemEqualToValue",
          type: "(item: string, value: string) => boolean",
          desc: "Custom comparator for value matching.",
        },
        {
          name: "filter",
          type: "(item: { textValue: string }, query: string) => boolean",
          desc: "Custom filter for type-to-filter. Default: case-insensitive substring on textValue.",
        },
      ],
    },
    {
      group: "Content props",
      props: [
        {
          name: "side / align / sameWidth",
          desc: "Floating UI positioning via @kenos-ui/utils. Reference is always the Input.",
        },
        {
          name: "portal",
          type: "boolean",
          def: "false",
          desc: "Render Content in a portal. Default false for Dialog interop.",
        },
        {
          name: "container",
          type: "HTMLElement | RefObject | null",
          desc: "Portal mount target when portal is true. Defaults to document.body.",
        },
        {
          name: "lazyMount",
          type: "boolean",
          def: "true",
          desc: "Skip DOM until first open.",
        },
        {
          name: "onOpenChangeComplete",
          type: "(open: boolean) => void",
          desc: "Fires when open transitions finish, including presence exit.",
        },
      ],
    },
    {
      group: "Parts",
      props: [
        {
          name: "Combobox.Empty",
          type: "div",
          desc: "Rendered when the filter matches no items. Place inside Content after List.",
        },
        {
          name: "Combobox.Clear",
          type: "span[role=button]",
          desc: "Clears value and input text without opening the listbox.",
        },
        {
          name: "Combobox.ItemIndicator",
          type: "span",
          desc: "Selected check; reads ItemContext or an explicit value prop.",
        },
        {
          name: "Combobox.HiddenInput",
          type: "input[type=hidden]",
          desc: "Native hidden field when name is set on Root.",
        },
      ],
    },
    {
      group: "Data attributes",
      attrs: true,
      props: [
        { name: "[data-open]", desc: "On input/trigger when listbox is open." },
        { name: "[data-selected]", desc: "On selected option." },
        { name: "[data-highlighted]", desc: "Keyboard/hover highlight." },
        {
          name: "[data-disabled]",
          desc: "Disabled input, trigger, or option.",
        },
      ],
    },
    {
      group: "Keyboard",
      keys: true,
      props: [
        {
          name: "Type characters",
          desc: "Filter options by textValue (substring match).",
        },
        {
          name: "Arrow ↑ / ↓",
          desc: "Move highlight via aria-activedescendant; skips disabled items.",
        },
        { name: "Home / End", desc: "First / last enabled option." },
        { name: "Enter", desc: "Select highlighted option; closes listbox." },
        {
          name: "Escape",
          desc: "Close listbox; stopPropagation for Dialog interop.",
        },
      ],
    },
  ],
};

export type SearchEntry = {
  title: string;
  route: string;
  crumb: string;
  kind: "page" | "comp";
};

export const SEARCH: SearchEntry[] = [
  { title: "Overview", route: "", crumb: "Get Started", kind: "page" },
  {
    title: "Installation",
    route: "installation",
    crumb: "Get Started",
    kind: "page",
  },
  {
    title: "Button",
    route: "button",
    crumb: "Primitives",
    kind: "comp",
  },
  {
    title: "Quick Start",
    route: "quickstart",
    crumb: "Get Started",
    kind: "page",
  },
  {
    title: "Date Picker",
    route: "date-picker",
    crumb: "Primitives",
    kind: "comp",
  },
  {
    title: "Form Integration",
    route: "date-picker",
    crumb: "Date Picker",
    kind: "comp",
  },
  {
    title: "Time Granularity",
    route: "date-picker",
    crumb: "Date Picker",
    kind: "comp",
  },
  {
    title: "Presets",
    route: "date-picker",
    crumb: "Date Picker",
    kind: "comp",
  },
  {
    title: "Accessibility",
    route: "date-picker",
    crumb: "Date Picker",
    kind: "comp",
  },
  {
    title: "Changelog",
    route: "changelog",
    crumb: "Get Started",
    kind: "page",
  },
];

/* flat route order for prev/next navigation */
export const ORDER: string[] = NAV.flatMap((g) => g.items.map((i) => i.route));
export const PUBLISHED_ROUTES: string[] = ORDER.filter((r) => !isSoonRoute(r));

export function titleForRoute(route: string): string {
  for (const g of NAV) for (const it of g.items) if (it.route === route) return it.label;
  return route;
}

/* helper: routes that map to /[slug] dynamic pages (non-component guides) */
export const GUIDE_ROUTES = ["installation", "quickstart", "changelog"];
export const COMPONENT_ROUTES = Object.keys(COMPONENTS).filter((r) => !isSoonRoute(r));
