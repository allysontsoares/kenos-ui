import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as Combobox from "../src/index.parts";

function BasicCombobox({
  defaultOpen = false,
  defaultValue,
}: {
  defaultOpen?: boolean;
  defaultValue?: string;
}) {
  return (
    <Combobox.Root defaultOpen={defaultOpen} defaultValue={defaultValue}>
      <Combobox.Label>Language</Combobox.Label>
      <Combobox.Input data-testid="input" placeholder="Search…" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content forceMount data-testid="content">
        <Combobox.List data-testid="list">
          <Combobox.Item value="ts">
            <Combobox.ItemText>TypeScript</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
          <Combobox.Item value="js">
            <Combobox.ItemText>JavaScript</Combobox.ItemText>
            <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
          </Combobox.Item>
          <Combobox.Item value="py" disabled>
            <Combobox.ItemText>Python</Combobox.ItemText>
          </Combobox.Item>
        </Combobox.List>
        <Combobox.Empty>No matches</Combobox.Empty>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("Label", () => {
  it("associates label with the input via htmlFor", () => {
    render(<BasicCombobox />);
    const label = screen.getByText("Language") as HTMLLabelElement;
    const input = screen.getByRole("combobox");
    expect(label.htmlFor).toBe(input.id);
  });
});

describe("Input ARIA", () => {
  it('has role="combobox" and aria-haspopup="listbox"', () => {
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-haspopup", "listbox");
  });

  it("reflects aria-expanded when open/closed", () => {
    function ControlledOpen({ open }: { open: boolean }) {
      return (
        <Combobox.Root open={open}>
          <Combobox.Input data-testid="input" />
          <Combobox.Content forceMount>
            <Combobox.List>
              <Combobox.Item value="ts">
                <Combobox.ItemText>TypeScript</Combobox.ItemText>
              </Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>
      );
    }

    const { rerender } = render(<ControlledOpen open={false} />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");

    rerender(<ControlledOpen open />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  it("sets aria-activedescendant on the Input (not List) while open", () => {
    render(<BasicCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    const highlighted = screen.getByRole("option", { name: /typescript/i });
    expect(input).toHaveAttribute("aria-activedescendant", highlighted.id);
    expect(screen.getByTestId("list")).not.toHaveAttribute("aria-activedescendant");
  });

  it("keeps focus on the Input while navigating", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveFocus();
  });
});

describe("List / Option ARIA", () => {
  it('List has role="listbox"', () => {
    render(<BasicCombobox defaultOpen />);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it('Items have role="option" and aria-selected', () => {
    render(
      <Combobox.Root
        defaultOpen
        defaultValue="js"
        defaultInputValue=""
        items={{ js: "JavaScript", ts: "TypeScript" }}
      >
        <Combobox.Input />
        <Combobox.Content forceMount>
          <Combobox.List>
            <Combobox.Item value="ts">
              <Combobox.ItemText>TypeScript</Combobox.ItemText>
            </Combobox.Item>
            <Combobox.Item value="js">
              <Combobox.ItemText>JavaScript</Combobox.ItemText>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );
    expect(screen.getByRole("option", { name: /javascript/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("option", { name: /typescript/i })).toHaveAttribute(
      "aria-selected",
      "false",
    );
  });
});
