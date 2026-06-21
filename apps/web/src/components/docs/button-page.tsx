"use client";

import {
  BUTTON_A11Y_ROLES,
  BUTTON_FEATURES,
  BUTTON_IMPORT,
  BUTTON_INSTALL,
  BUTTON_KEYBOARD,
} from "@/lib/button-docs-data";
import { API } from "@/lib/docs-data";
import { EXAMPLE_SNIPPETS, type ExampleSnippets } from "@/lib/example-snippets";
import { ActionRow, ApiReference, CopyPage, Example, PageNav } from "./blocks";
import { CodeBlock } from "./code-block";
import {
  ButtonDefaultDemo,
  ButtonDisabledDemo,
  ButtonPendingDemo,
  ButtonRenderPropsDemo,
} from "./demos";
import { docsTableClass } from "./docs-prose";
import { Eyebrow, H2, H3, InlineCode, Lead, P, PageIntro, PageTitle } from "./pages";

const BUTTON_SNIPPET_SET = EXAMPLE_SNIPPETS["button"] as ExampleSnippets;

export function ButtonPage() {
  return (
    <>
      <PageIntro>
        <Eyebrow>Primitive</Eyebrow>
        <PageTitle action={<CopyPage />}>Button</PageTitle>
        <Lead>
          An augmented native <InlineCode>&lt;button&gt;</InlineCode> primitive. Built with
          native-first press logic, keyboard support, robust state-driven data attributes, and a
          focus-visible polyfill. Zero CSS shipped.
        </Lead>
        <ActionRow />
      </PageIntro>

      <H2 id="features">Features</H2>
      <ul className="mb-4 list-disc space-y-1.5 pl-5 text-zinc-600 dark:text-zinc-300">
        {BUTTON_FEATURES.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <H2 id="installation">Installation</H2>
      <P>
        Install the Button primitive on its own, or use the aggregator{" "}
        <InlineCode>@kenos-ui/react</InlineCode> package if you already depend on other Kenos
        primitives.
      </P>
      <H3 id="install-package">Install a package</H3>
      <CodeBlock
        tabs={[
          {
            label: "@kenos-ui/react-button",
            lang: "bash",
            code: BUTTON_INSTALL.button,
          },
          {
            label: "@kenos-ui/react",
            lang: "bash",
            code: BUTTON_INSTALL.react,
          },
        ]}
      />
      <H3 id="import">Import</H3>
      <CodeBlock
        tabs={[
          {
            label: "@kenos-ui/react-button",
            lang: "jsx",
            code: BUTTON_IMPORT.button,
          },
          {
            label: "@kenos-ui/react",
            lang: "jsx",
            code: BUTTON_IMPORT.react,
          },
        ]}
      />

      <H2 id="examples">Examples</H2>
      <P>Every demo is interactive and keyboard-navigable.</P>

      <H3 id="default">Default</H3>
      <P>
        The base usage — provides <InlineCode>data-hovered</InlineCode>,{" "}
        <InlineCode>data-pressed</InlineCode>, and <InlineCode>data-focused</InlineCode> out of the
        box. Toggle the code tabs to see unstyled, CSS, Tailwind, Panda CSS, and StyleX approaches.
      </P>
      <Example snippets={BUTTON_SNIPPET_SET}>
        <ButtonDefaultDemo />
      </Example>

      <H3 id="pending">Pending State</H3>
      <P>
        Set <InlineCode>isPending</InlineCode> to indicate loading state. The button maintains
        focusability, blocks action (onClick/onPress), and announces via{" "}
        <InlineCode>aria-busy</InlineCode>. It exposes <InlineCode>data-pending</InlineCode> for
        styling.
      </P>
      <Example code={`<Button isPending>\n  <Spinner /> Saving...\n</Button>`} lang="tsx">
        <ButtonPendingDemo />
      </Example>

      <H3 id="disabled">Disabled State</H3>
      <P>
        Set <InlineCode>isDisabled</InlineCode> for semantic disabling. It prevents interaction and
        uses <InlineCode>aria-disabled</InlineCode> instead of native{" "}
        <InlineCode>disabled</InlineCode> so that the button is not implicitly removed from the
        accessibility tree, allowing screen readers to still discover it. It exposes{" "}
        <InlineCode>data-disabled</InlineCode> for styling.
      </P>
      <Example code={`<Button isDisabled>\n  Not allowed\n</Button>`} lang="tsx">
        <ButtonDisabledDemo />
      </Example>

      <H3 id="render-props">Render Props Composition</H3>
      <P>
        If you need to change the DOM node or integrate directly with the internal state, pass a
        function to the <InlineCode>render</InlineCode> prop. This allows you to apply inline styles
        based on <InlineCode>state.isHovered</InlineCode> or{" "}
        <InlineCode>state.isPressed</InlineCode>.
      </P>
      <Example
        code={`<Button\n  render={(props, state) => (\n    <button\n      {...props}\n      style={{\n        transform: state.isPressed ? "scale(0.95)" : "scale(1)",\n      }}\n    >\n      {state.isHovered ? "Hovered!" : "Hover me"}\n    </button>\n  )}\n/>`}
        lang="tsx"
      >
        <ButtonRenderPropsDemo />
      </Example>

      <H2 id="accessibility">Accessibility</H2>
      <P>
        Kenos enhances the native button accessibility. Roles, labels, and state management (like
        pending/disabled) are handled for you natively via <InlineCode>aria-disabled</InlineCode>{" "}
        and <InlineCode>aria-busy</InlineCode>.
      </P>

      <H3 id="roles">Roles and attributes</H3>
      <table className={docsTableClass}>
        <thead>
          <tr>
            <th>Part</th>
            <th>Role / Attributes</th>
          </tr>
        </thead>
        <tbody>
          {BUTTON_A11Y_ROLES.map((row) => (
            <tr key={row.part}>
              <td>{row.part}</td>
              <td>
                <code className="font-mono text-xs">{row.role}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <H3 id="keyboard">Keyboard support</H3>
      <table className={docsTableClass}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {BUTTON_KEYBOARD.map((row) => (
            <tr key={row.name}>
              <td>
                <span className="font-mono text-xs">{row.name}</span>
              </td>
              <td>{row.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <H2 id="api-reference">API Reference</H2>
      <P>
        Props and data attributes. Import from <InlineCode>@kenos-ui/react-button</InlineCode>.
      </P>
      <ApiReference groups={API.button || []} />
      <PageNav route="button" />
    </>
  );
}
