import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src";

describe("Button", () => {
  it("renders a button with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("sets data-kenos fingerprint", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("data-kenos", "button");
  });

  it("handles basic onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  describe("isPending state", () => {
    it("sets aria-disabled and aria-busy when pending", () => {
      render(<Button isPending>Pending Button</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-disabled", "true");
      expect(btn).toHaveAttribute("aria-busy", "true");
      expect(btn).toHaveAttribute("data-pending", "true");
    });

    it("maintains focusability when pending (tabIndex not set to -1)", () => {
      render(<Button isPending>Pending Button</Button>);
      const btn = screen.getByRole("button");
      expect(btn).not.toHaveAttribute("tabindex", "-1");
    });

    it("blocks onClick when pending", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button isPending onClick={onClick}>
          Pending Button
        </Button>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("isDisabled state", () => {
    it("sets aria-disabled and data-disabled when disabled", () => {
      render(<Button isDisabled>Disabled Button</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("aria-disabled", "true");
      expect(btn).toHaveAttribute("data-disabled", "true");
      expect(btn).not.toHaveAttribute("aria-busy");
    });

    it("removes from tab order when disabled", () => {
      render(<Button isDisabled>Disabled Button</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveAttribute("tabindex", "-1");
    });

    it("blocks onClick when disabled", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button isDisabled onClick={onClick}>
          Disabled Button
        </Button>,
      );
      await user.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("data-* states", () => {
    it("sets data-hovered on pointer enter and removes on leave", async () => {
      const user = userEvent.setup();
      render(<Button>Hover me</Button>);
      const btn = screen.getByRole("button");
      expect(btn).not.toHaveAttribute("data-hovered");

      await user.hover(btn);
      expect(btn).toHaveAttribute("data-hovered", "true");

      await user.unhover(btn);
      expect(btn).not.toHaveAttribute("data-hovered");
    });

    it("sets data-pressed on pointer down and removes on pointer up", async () => {
      render(<Button>Press me</Button>);
      const btn = screen.getByRole("button");

      fireEvent.pointerDown(btn, { button: 0 });
      expect(btn).toHaveAttribute("data-pressed", "true");

      fireEvent.pointerUp(btn, { button: 0 });
      expect(btn).not.toHaveAttribute("data-pressed");
    });
  });

  describe("render prop", () => {
    it("warns if render returns a fragment", () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      render(
        <Button
          render={(props: any) => (
            <React.Fragment>
              <button {...props}>1</button>
              <button {...props}>2</button>
            </React.Fragment>
          )}
        >
          Render
        </Button>,
      );
      expect(warnSpy).toHaveBeenCalledWith(
        "Button: `render` prop must return a single valid React element.",
      );
      warnSpy.mockRestore();
    });

    it("merges props into custom element correctly", async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      render(
        <Button
          onClick={onClick}
          render={(props: any) => (
            <a href="#" {...props}>
              Link
            </a>
          )}
        >
          Link
        </Button>,
      );

      const link = screen.getByRole("link");
      await user.click(link);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
