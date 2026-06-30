import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Combobox from "../src/index.parts";

function BasicCombobox({
  defaultOpen = false,
  onValueChange,
}: {
  defaultOpen?: boolean;
  onValueChange?: (v: string | null) => void;
}) {
  return (
    <Combobox.Root defaultOpen={defaultOpen} onValueChange={onValueChange}>
      <Combobox.Label>Language</Combobox.Label>
      <Combobox.Input data-testid="input" placeholder="Search…" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content data-testid="content">
        <Combobox.List>
          <Combobox.Item value="ts">
            <Combobox.ItemText>TypeScript</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="js">
            <Combobox.ItemText>JavaScript</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="py">
            <Combobox.ItemText>Python</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="rs">
            <Combobox.ItemText>Rust</Combobox.ItemText>
          </Combobox.Item>
        </Combobox.List>
        <Combobox.Empty>No matches</Combobox.Empty>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("Combobox basic", () => {
  it("renders input with combobox role", () => {
    render(<BasicCombobox />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument();
  });

  it("filters items when typing in the input", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);

    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.type(input, "java");

    expect(screen.getByRole("option", { name: /javascript/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /typescript/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /python/i })).not.toBeInTheDocument();
  });

  it("shows empty state when filter matches nothing", async () => {
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen />);

    const input = screen.getByRole("combobox");
    await user.type(input, "zzzzz");

    expect(screen.getByText("No matches")).toBeInTheDocument();
  });

  it("selects an item with Enter after arrow navigation", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen onValueChange={onValueChange} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "type");
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(onValueChange).toHaveBeenCalledWith("ts");
    expect(input).toHaveValue("TypeScript");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("selects an item on click", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(<BasicCombobox defaultOpen onValueChange={onValueChange} />);

    await user.click(screen.getByRole("option", { name: /rust/i }));

    expect(onValueChange).toHaveBeenCalledWith("rs");
    expect(screen.getByRole("combobox")).toHaveValue("Rust");
  });
});

describe("data-kenos fingerprints", () => {
  it("sets stable fingerprints on key parts", () => {
    render(<BasicCombobox defaultOpen />);
    expect(screen.getByTestId("input")).toHaveAttribute("data-kenos", "combobox-input");
    expect(screen.getByTestId("trigger")).toHaveAttribute("data-kenos", "combobox-trigger");
    expect(screen.getByText("Language")).toHaveAttribute("data-kenos", "combobox-label");
    expect(screen.getByRole("option", { name: /typescript/i })).toHaveAttribute(
      "data-kenos",
      "combobox-item",
    );
  });
});
