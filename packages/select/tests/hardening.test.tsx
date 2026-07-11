import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Select from "../src/index.parts";

describe("isItemEqualToValue", () => {
  it("uses a custom string comparator for selection", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Select.Root
        defaultOpen
        defaultValue="REACT"
        isItemEqualToValue={(a, b) => a.toLowerCase() === b.toLowerCase()}
        onValueChange={onValueChange}
      >
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="react">
              <Select.ItemText>React</Select.ItemText>
            </Select.Item>
            <Select.Item value="vue">
              <Select.ItemText>Vue</Select.ItemText>
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByRole("option", { name: /react/i })).toHaveAttribute("aria-selected", "true");

    await user.click(screen.getByRole("option", { name: /vue/i }));
    expect(onValueChange).toHaveBeenCalledWith("vue");
  });
});

describe("controlled callbacks", () => {
  it("does not re-fire onValueChange when the parent sets the same value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    function Controlled() {
      const [value, setValue] = useState<string | null>("react");
      return (
        <Select.Root
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
          defaultOpen
        >
          <Select.Trigger>
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="react">
                <Select.ItemText>React</Select.ItemText>
              </Select.Item>
              <Select.Item value="vue">
                <Select.ItemText>Vue</Select.ItemText>
              </Select.Item>
            </Select.List>
          </Select.Content>
        </Select.Root>
      );
    }

    const { rerender } = render(<Controlled />);
    onValueChange.mockClear();

    // External prop sync (same value via parent re-render path).
    rerender(<Controlled />);
    expect(onValueChange).not.toHaveBeenCalled();

    await user.click(screen.getByRole("option", { name: /vue/i }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("vue");
  });

  it("does not fire onValueChange when value is changed only via props", () => {
    const onValueChange = vi.fn();

    const { rerender } = render(
      <Select.Root value="react" onValueChange={onValueChange}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content forceMount>
          <Select.List>
            <Select.Item value="react">
              <Select.ItemText>React</Select.ItemText>
            </Select.Item>
            <Select.Item value="vue">
              <Select.ItemText>Vue</Select.ItemText>
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    );

    rerender(
      <Select.Root value="vue" onValueChange={onValueChange}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content forceMount>
          <Select.List>
            <Select.Item value="react">
              <Select.ItemText>React</Select.ItemText>
            </Select.Item>
            <Select.Item value="vue">
              <Select.ItemText>Vue</Select.ItemText>
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    );

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveTextContent("Vue");
  });
});

describe("Escape scopeRef", () => {
  it("does not close when Escape is pressed while focus is outside the content", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button type="button" data-testid="outside">
          Outside
        </button>
        <Select.Root defaultOpen>
          <Select.Trigger data-testid="trigger">
            <Select.Value placeholder="Pick…" />
          </Select.Trigger>
          <Select.Content data-testid="content">
            <Select.List>
              <Select.Item value="a">
                <Select.ItemText>Alpha</Select.ItemText>
              </Select.Item>
            </Select.List>
          </Select.Content>
        </Select.Root>
      </>,
    );

    screen.getByTestId("outside").focus();
    await user.keyboard("{Escape}");

    expect(screen.getByTestId("trigger")).toHaveAttribute("aria-expanded", "true");
  });
});
