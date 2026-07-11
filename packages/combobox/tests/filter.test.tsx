import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as Combobox from "../src/index.parts";

function FilterCombobox({
  filter,
}: {
  filter?: (item: { label: string; textValue: string }, query: string) => boolean;
}) {
  return (
    <Combobox.Root defaultOpen filter={filter}>
      <Combobox.Input data-testid="input" />
      <Combobox.Content>
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
        </Combobox.List>
        <Combobox.Empty>No matches</Combobox.Empty>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("filter", () => {
  it("default substring filter is case-insensitive", async () => {
    const user = userEvent.setup();
    render(<FilterCombobox />);
    await user.type(screen.getByRole("combobox"), "SCRIPT");
    expect(screen.getByRole("option", { name: /typescript/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /javascript/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /python/i })).not.toBeInTheDocument();
  });

  it("empty query shows the full unfiltered list", () => {
    render(<FilterCombobox />);
    expect(screen.getByRole("option", { name: /typescript/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /javascript/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /python/i })).toBeInTheDocument();
  });

  it("supports a custom filter function", async () => {
    const user = userEvent.setup();
    render(
      <FilterCombobox
        filter={(item, query) => {
          const q = query.trim().toLowerCase();
          if (!q) return true;
          return item.label.toLowerCase().startsWith(q);
        }}
      />,
    );

    await user.type(screen.getByRole("combobox"), "java");
    expect(screen.getByRole("option", { name: /javascript/i })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: /typescript/i })).not.toBeInTheDocument();
  });

  it("shows Empty when nothing matches", async () => {
    const user = userEvent.setup();
    render(<FilterCombobox />);
    await user.type(screen.getByRole("combobox"), "zzzz");
    expect(screen.getByText("No matches")).toBeInTheDocument();
  });
});
