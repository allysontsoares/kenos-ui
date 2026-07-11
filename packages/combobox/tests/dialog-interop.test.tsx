import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import {
  MockDialog,
  MockDialogBody,
  MockDialogNextField,
} from "../../utils/tests/fixtures/dialog-interop";
import * as Combobox from "../src/index.parts";

function ComboboxInDialog({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <MockDialog label="Settings">
      <h2>Settings</h2>
      <MockDialogBody>
        <Combobox.Root name="theme" defaultOpen={defaultOpen}>
          <Combobox.Label>Theme</Combobox.Label>
          <Combobox.Input data-testid="combobox-input" />
          <Combobox.Trigger data-testid="combobox-trigger">▼</Combobox.Trigger>
          <Combobox.Content data-testid="combobox-content">
            <Combobox.List>
              <Combobox.Item value="light">
                <Combobox.ItemText>Light</Combobox.ItemText>
              </Combobox.Item>
              <Combobox.Item value="dark">
                <Combobox.ItemText>Dark</Combobox.ItemText>
              </Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
          <Combobox.HiddenInput />
        </Combobox.Root>
        <MockDialogNextField />
      </MockDialogBody>
    </MockDialog>
  );
}

describe("Combobox dialog interop (popup-policy matrix)", () => {
  it("renders inline content inside the mock dialog container by default (portal=false)", async () => {
    const user = userEvent.setup();
    render(<ComboboxInDialog />);

    const dialog = screen.getByTestId("mock-dialog");
    await user.click(screen.getByTestId("combobox-trigger"));

    const content = within(dialog).getByTestId("combobox-content");
    expect(dialog.contains(content)).toBe(true);
  });

  it("Escape closes Combobox but NOT the parent dialog (stopPropagation)", async () => {
    const user = userEvent.setup();
    render(<ComboboxInDialog defaultOpen />);

    expect(screen.getByRole("dialog", { name: /settings/i })).toBeInTheDocument();
    screen.getByTestId("combobox-input").focus();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("dialog", { name: /settings/i })).toBeInTheDocument();
    expect(screen.getByTestId("combobox-input")).toHaveAttribute("aria-expanded", "false");
  });

  it("content does not portal outside the mock dialog by default", async () => {
    const user = userEvent.setup();
    render(<ComboboxInDialog />);

    await user.click(screen.getByTestId("combobox-trigger"));

    const content = screen.getByTestId("combobox-content");
    const mockDialog = screen.getByTestId("mock-dialog");

    expect(mockDialog.contains(content)).toBe(true);
    expect(content.parentElement?.closest('[data-testid="mock-dialog"]')).toBe(mockDialog);
  });

  it("can navigate and select inside a dialog with focus on Input", async () => {
    const user = userEvent.setup();
    render(<ComboboxInDialog />);

    await user.click(screen.getByTestId("combobox-trigger"));
    const input = screen.getByTestId("combobox-input");
    expect(input).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Enter}");

    expect(input).toHaveAttribute("aria-expanded", "false");
  });

  it("Tab moves focus out without unmounting the parent dialog", async () => {
    const user = userEvent.setup();
    render(<ComboboxInDialog defaultOpen />);

    screen.getByTestId("combobox-input").focus();
    await user.tab();

    expect(screen.getByTestId("next-field")).toHaveFocus();
    expect(screen.getByTestId("mock-dialog")).toBeInTheDocument();
  });
});
