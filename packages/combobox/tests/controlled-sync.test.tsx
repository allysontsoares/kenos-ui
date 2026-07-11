import React, { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Combobox from "../src/index.parts";

describe("controlled callbacks", () => {
  it("does not re-fire onValueChange when the parent sets the same value", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    function Controlled() {
      const [value, setValue] = useState<string | null>("ts");
      return (
        <Combobox.Root
          value={value}
          onValueChange={(next) => {
            onValueChange(next);
            setValue(next);
          }}
          defaultOpen
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
        </Combobox.Root>
      );
    }

    const { rerender } = render(<Controlled />);
    onValueChange.mockClear();
    rerender(<Controlled />);
    expect(onValueChange).not.toHaveBeenCalled();

    const input = screen.getByRole("combobox");
    await user.clear(input);
    await user.click(screen.getByRole("option", { name: /javascript/i }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(onValueChange).toHaveBeenCalledWith("js");
  });

  it("does not fire onValueChange when value is changed only via props", () => {
    const onValueChange = vi.fn();

    const { rerender } = render(
      <Combobox.Root value="ts" inputValue="" onValueChange={onValueChange} open>
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

    rerender(
      <Combobox.Root value="js" inputValue="" onValueChange={onValueChange} open>
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

    expect(onValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("option", { name: /javascript/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  it("does not fire onInputValueChange when inputValue is changed only via props", () => {
    const onInputValueChange = vi.fn();

    const { rerender } = render(
      <Combobox.Root inputValue="a" onInputValueChange={onInputValueChange}>
        <Combobox.Input />
      </Combobox.Root>,
    );

    rerender(
      <Combobox.Root inputValue="ab" onInputValueChange={onInputValueChange}>
        <Combobox.Input />
      </Combobox.Root>,
    );

    expect(onInputValueChange).not.toHaveBeenCalled();
    expect(screen.getByRole("combobox")).toHaveValue("ab");
  });

  it("rolls back value when the parent ignores onValueChange", async () => {
    const user = userEvent.setup();

    function Locked() {
      const [value] = useState<string | null>("ts");
      return (
        <Combobox.Root value={value} inputValue="" onValueChange={() => undefined} open>
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
        </Combobox.Root>
      );
    }

    render(<Locked />);
    await user.click(screen.getByRole("option", { name: /javascript/i }));

    await waitFor(() => {
      expect(screen.getByRole("option", { name: /typescript/i })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });
  });
});

describe("Escape scopeRef", () => {
  it("does not close when Escape is pressed while focus is outside content and input", async () => {
    const user = userEvent.setup();

    render(
      <>
        <button type="button" data-testid="outside">
          Outside
        </button>
        <Combobox.Root defaultOpen>
          <Combobox.Input data-testid="input" />
          <Combobox.Content data-testid="content">
            <Combobox.List>
              <Combobox.Item value="a">
                <Combobox.ItemText>Alpha</Combobox.ItemText>
              </Combobox.Item>
            </Combobox.List>
          </Combobox.Content>
        </Combobox.Root>
      </>,
    );

    screen.getByTestId("outside").focus();
    await user.keyboard("{Escape}");

    expect(screen.getByRole("combobox")).toHaveAttribute("aria-expanded", "true");
  });
});
