import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import * as Combobox from "../src/index.parts";

function OpenOnFocusCombobox({ openOnFocus = true }: { openOnFocus?: boolean }) {
  return (
    <Combobox.Root openOnFocus={openOnFocus}>
      <Combobox.Input data-testid="input" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content data-testid="content">
        <Combobox.List>
          <Combobox.Item value="a">
            <Combobox.ItemText>Alpha</Combobox.ItemText>
          </Combobox.Item>
          <Combobox.Item value="b">
            <Combobox.ItemText>Beta</Combobox.ItemText>
          </Combobox.Item>
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("openOnFocus", () => {
  it("defaults to false — focus alone does not open", async () => {
    const user = userEvent.setup();
    render(
      <Combobox.Root>
        <Combobox.Input data-testid="input" />
        <Combobox.Content data-testid="content">
          <Combobox.List>
            <Combobox.Item value="a">
              <Combobox.ItemText>Alpha</Combobox.ItemText>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );

    await user.tab();
    expect(screen.getByRole("combobox")).toHaveFocus();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "false");
  });

  it("opens when openOnFocus is true", async () => {
    const user = userEvent.setup();
    render(<OpenOnFocusCombobox />);

    await user.tab();
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });

  it("does not reopen after Escape restores focus to the Input", async () => {
    const user = userEvent.setup();
    render(<OpenOnFocusCombobox />);

    const input = screen.getByRole("combobox");
    await user.tab();
    expect(input).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveFocus();
  });

  it("does not reopen after selecting an item restores focus", async () => {
    const user = userEvent.setup();
    render(<OpenOnFocusCombobox />);

    const input = screen.getByRole("combobox");
    await user.tab();
    expect(input).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("option", { name: /alpha/i }));
    expect(input).toHaveAttribute("aria-expanded", "false");
    expect(input).toHaveFocus();
  });
});

describe("openOnChange", () => {
  it("defaults to true — typing opens when closed", async () => {
    const user = userEvent.setup();
    render(
      <Combobox.Root>
        <Combobox.Input data-testid="input" />
        <Combobox.Content>
          <Combobox.List>
            <Combobox.Item value="a">
              <Combobox.ItemText>Alpha</Combobox.ItemText>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );

    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("does not open on typing when openOnChange is false", async () => {
    const user = userEvent.setup();
    render(
      <Combobox.Root openOnChange={false}>
        <Combobox.Input data-testid="input" />
        <Combobox.Content>
          <Combobox.List>
            <Combobox.Item value="a">
              <Combobox.ItemText>Alpha</Combobox.ItemText>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );

    const input = screen.getByRole("combobox");
    await user.type(input, "a");
    expect(input).toHaveValue("a");
    expect(input).toHaveAttribute("aria-expanded", "false");
  });
});
