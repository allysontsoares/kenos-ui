import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Combobox from "../src/index.parts";

function BasicCombobox({
  defaultOpen = false,
  defaultValue,
  onValueChange,
}: {
  defaultOpen?: boolean;
  defaultValue?: string;
  onValueChange?: (v: string | null) => void;
}) {
  return (
    <Combobox.Root
      defaultOpen={defaultOpen}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <Combobox.Label>Language</Combobox.Label>
      <Combobox.Input data-testid="input" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content data-testid="content">
        <Combobox.List>
          <Combobox.Item value="ts">
            <Combobox.ItemText>TypeScript</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="js">
            <Combobox.ItemText>JavaScript</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="py" disabled>
            <Combobox.ItemText>Python</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="rs">
            <Combobox.ItemText>Rust</Combobox.ItemText>
          </Combobox.Item>
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("Open / close", () => {
  it("opens via Trigger without changing inputValue", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("");
    expect(input).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByTestId("trigger"));

    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
    // Empty query → full unfiltered list
    expect(screen.getByRole("option", { name: /typescript/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /javascript/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /rust/i })).toBeInTheDocument();
  });

  it("ArrowDown from closed opens and highlights", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox />);
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("option", { name: /typescript/i })).toHaveAttribute(
      "data-highlighted",
      "true",
    );
  });

  it("Escape closes and restores focus to Input", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{Escape}");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveFocus();
  });
});

describe("Keyboard navigation", () => {
  it("highlights selected value on open when still in filtered set", () => {
    render(
      <Combobox.Root
        defaultOpen
        defaultValue="js"
        defaultInputValue=""
        items={{ js: "JavaScript" }}
      >
        <Combobox.Input />
        <Combobox.Content>
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
      "data-highlighted",
      "true",
    );
  });

  it("ArrowDown moves highlight; focus stays on Input", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: /javascript/i })).toHaveAttribute(
      "data-highlighted",
      "true",
    );
    expect(input).toHaveFocus();
  });

  it("ArrowDown skips disabled items", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);
    const input = screen.getByRole("combobox");
    input.focus();
    // ts → js → (skip py) → rs
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: /rust/i })).toHaveAttribute(
      "data-highlighted",
      "true",
    );
  });

  it("Enter selects highlighted item and closes", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox");
    input.focus();
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenCalledWith("ts");
    expect(input).toHaveValue("TypeScript");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
