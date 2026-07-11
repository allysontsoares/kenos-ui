import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import * as Combobox from "../src/index.parts";

function PresenceCombobox({
  defaultOpen = false,
  lazyMount = true,
  unmountOnExit = false,
  forceMount,
  onOpenChangeComplete,
}: {
  defaultOpen?: boolean;
  lazyMount?: boolean;
  unmountOnExit?: boolean;
  forceMount?: boolean;
  onOpenChangeComplete?: (open: boolean) => void;
}) {
  return (
    <Combobox.Root defaultOpen={defaultOpen}>
      <Combobox.Input data-testid="input" />
      <Combobox.Trigger data-testid="trigger">▼</Combobox.Trigger>
      <Combobox.Content
        data-testid="content"
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        forceMount={forceMount}
        onOpenChangeComplete={onOpenChangeComplete}
      >
        <Combobox.List>
          <Combobox.Item value="react">
            <Combobox.ItemText>React</Combobox.ItemText>
          </Combobox.Item>
        </Combobox.List>
      </Combobox.Content>
    </Combobox.Root>
  );
}

describe("presence (lazyMount / unmountOnExit)", () => {
  it("lazyMount: does not mount content until first open", () => {
    render(<PresenceCombobox />);
    expect(screen.queryByTestId("content")).not.toBeInTheDocument();
  });

  it("lazyMount: mounts content after trigger opens", async () => {
    const user = userEvent.setup();
    render(<PresenceCombobox />);
    await user.click(screen.getByTestId("trigger"));
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("lazyMount=false: content is in the DOM while closed", () => {
    render(<PresenceCombobox lazyMount={false} />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toHaveAttribute("data-state", "closed");
  });

  it("unmountOnExit=false: keeps content mounted after close", async () => {
    const user = userEvent.setup();
    render(<PresenceCombobox defaultOpen />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    screen.getByTestId("input").focus();
    await user.keyboard("{Escape}");
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByTestId("content")).toHaveAttribute("data-state", "closed");
  });

  it("unmountOnExit=true: removes content from DOM after close", async () => {
    const user = userEvent.setup();
    render(<PresenceCombobox defaultOpen unmountOnExit />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
    screen.getByTestId("input").focus();
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByTestId("content")).not.toBeInTheDocument();
    });
  });

  it("forceMount: always keeps content in the DOM", () => {
    render(<PresenceCombobox forceMount />);
    expect(screen.getByTestId("content")).toBeInTheDocument();
  });

  it("fires onOpenChangeComplete via presence", async () => {
    const onOpenChangeComplete = vi.fn();
    const user = userEvent.setup();
    render(<PresenceCombobox onOpenChangeComplete={onOpenChangeComplete} />);

    await user.click(screen.getByTestId("trigger"));
    await waitFor(() => {
      expect(onOpenChangeComplete).toHaveBeenCalledWith(true);
    });
  });
});
