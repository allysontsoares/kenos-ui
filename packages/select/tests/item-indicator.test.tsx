import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as Select from "../src/index.parts";

describe("ItemIndicator", () => {
  it("shows checked state for selected single item without value prop", () => {
    render(
      <Select.Root defaultOpen defaultValue="react">
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="react">
              <Select.ItemText>React</Select.ItemText>
              <Select.ItemIndicator data-testid="ind-react">✓</Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="vue">
              <Select.ItemText>Vue</Select.ItemText>
              <Select.ItemIndicator data-testid="ind-vue">✓</Select.ItemIndicator>
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByTestId("ind-react")).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("ind-vue")).toHaveAttribute("data-state", "unchecked");
  });

  it("shows checked state for multiple selected items", () => {
    render(
      <Select.Root multiple defaultOpen defaultValue={["react", "vue"]}>
        <Select.Trigger>
          <Select.Value />
        </Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="react">
              <Select.ItemText>React</Select.ItemText>
              <Select.ItemIndicator value="react" data-testid="ind-react">
                ✓
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="vue">
              <Select.ItemText>Vue</Select.ItemText>
              <Select.ItemIndicator value="vue" data-testid="ind-vue">
                ✓
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item value="svelte">
              <Select.ItemText>Svelte</Select.ItemText>
              <Select.ItemIndicator value="svelte" data-testid="ind-svelte">
                ✓
              </Select.ItemIndicator>
            </Select.Item>
          </Select.List>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByTestId("ind-react")).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("ind-vue")).toHaveAttribute("data-state", "checked");
    expect(screen.getByTestId("ind-svelte")).toHaveAttribute("data-state", "unchecked");
  });
});
