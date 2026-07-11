import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Combobox from "../src/index.parts";

function LanguageCombobox({
  name = "language",
  required = false,
  disabled = false,
  value,
  defaultValue,
  onValueChange,
}: {
  name?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | null;
  defaultValue?: string;
  onValueChange?: (v: string | null) => void;
}) {
  return (
    <Combobox.Root
      name={name}
      required={required}
      disabled={disabled}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      <Combobox.Input data-testid="input" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content data-testid="content" forceMount>
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
      </Combobox.Content>
      <Combobox.HiddenInput />
    </Combobox.Root>
  );
}

describe("HiddenInput — native form submission", () => {
  it("hidden input has the correct name attribute", () => {
    render(<LanguageCombobox name="language" />);
    const hidden = document.querySelector('input[name="language"]') as HTMLInputElement;
    expect(hidden).toBeInTheDocument();
    expect(hidden).toHaveAttribute("type", "hidden");
  });

  it("hidden input reflects defaultValue", () => {
    render(<LanguageCombobox defaultValue="ts" />);
    const hidden = document.querySelector('input[name="language"]') as HTMLInputElement;
    expect(hidden.value).toBe("ts");
  });

  it("hidden input value updates when user selects an item", async () => {
    const user = userEvent.setup();
    render(<LanguageCombobox />);

    await user.click(screen.getByTestId("trigger"));
    await user.click(screen.getByRole("option", { name: /javascript/i }));

    const hidden = document.querySelector('input[name="language"]') as HTMLInputElement;
    expect(hidden.value).toBe("js");
  });

  it("disabled attribute is forwarded to hidden input", () => {
    render(<LanguageCombobox disabled />);
    const hidden = document.querySelector('input[name="language"]') as HTMLInputElement;
    expect(hidden).toBeDisabled();
  });

  it("does not render when name is omitted", () => {
    render(
      <Combobox.Root>
        <Combobox.Input />
        <Combobox.HiddenInput />
      </Combobox.Root>,
    );
    expect(document.querySelector('[data-kenos="combobox-hidden-input"]')).not.toBeInTheDocument();
  });

  it("is included in FormData on submit", () => {
    let capturedData: FormData | null = null;
    const onSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      capturedData = new FormData(e.currentTarget);
    });

    render(
      <form onSubmit={onSubmit}>
        <LanguageCombobox defaultValue="py" />
        <button type="submit">Submit</button>
      </form>,
    );

    screen.getByRole("button", { name: /submit/i }).click();
    expect(onSubmit).toHaveBeenCalled();
    expect(capturedData).not.toBeNull();
    expect(capturedData!.get("language")).toBe("py");
  });
});
