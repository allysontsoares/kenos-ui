import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as Combobox from "../src/index.parts";

describe("ItemIndicator", () => {
  it("shows checked state for selected item without value prop", () => {
    render(
      <Combobox.Root defaultOpen defaultValue="ts">
        <Combobox.Input />
        <Combobox.Content>
          <Combobox.List>
            <Combobox.Item value="ts">
              <Combobox.ItemText>TypeScript</Combobox.ItemText>
              <Combobox.ItemIndicator data-testid="ind-ts">✓</Combobox.ItemIndicator>
            </Combobox.Item>
            <Combobox.Item value="js">
              <Combobox.ItemText>JavaScript</Combobox.ItemText>
              <Combobox.ItemIndicator data-testid="ind-js">✓</Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );

    expect(screen.getByTestId("ind-ts")).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("ind-js")).toHaveAttribute("data-state", "unchecked");
  });

  it("supports an explicit value prop", () => {
    render(
      <Combobox.Root defaultOpen defaultValue="js">
        <Combobox.Input />
        <Combobox.Content>
          <Combobox.List>
            <Combobox.Item value="ts">
              <Combobox.ItemText>TypeScript</Combobox.ItemText>
              <Combobox.ItemIndicator value="js" data-testid="ind">
                ✓
              </Combobox.ItemIndicator>
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Root>,
    );

    expect(screen.getByTestId("ind")).toHaveAttribute("data-state", "checked");
  });
});
