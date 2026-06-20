import React, { useState, cloneElement, isValidElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../src";
import { composeEventHandlers } from "../src/utils/compose-event-handlers";

// Mock Radix Trigger that uses asChild
const MockRadixTrigger = ({ asChild, children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = composeEventHandlers(() => setIsOpen(!isOpen), children.props.onClick);

  if (asChild && isValidElement(children)) {
    return (
      <>
        {cloneElement(children as any, {
          ...props,
          onClick,
          "data-radix-state": isOpen ? "open" : "closed",
        })}
        {isOpen && <div data-testid="radix-content">Content</div>}
      </>
    );
  }
  return null;
};

// Mock Base UI Trigger that uses render
const MockBaseUITrigger = ({ render: renderProp, children, ...props }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = composeEventHandlers(() => setIsOpen(!isOpen), props.onClick);

  const domProps = {
    ...props,
    onClick,
    "data-base-state": isOpen ? "open" : "closed",
  };

  return (
    <>
      {renderProp ? renderProp(domProps) : <button {...domProps}>{children}</button>}
      {isOpen && <div data-testid="base-content">Content</div>}
    </>
  );
};

describe("Interop", () => {
  it("works as a trigger for Radix (via asChild and render prop)", async () => {
    const user = userEvent.setup();
    render(
      <MockRadixTrigger asChild>
        <Button.Root render={(props) => <button {...props}>Trigger</button>} />
      </MockRadixTrigger>,
    );

    const btn = screen.getByRole("button");
    expect(screen.queryByTestId("radix-content")).not.toBeInTheDocument();

    await user.click(btn);

    expect(screen.getByTestId("radix-content")).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-radix-state", "open");
  });

  it("works as a trigger for Base UI (via render prop)", async () => {
    const user = userEvent.setup();
    render(
      <MockBaseUITrigger render={(props: any) => <Button.Root {...props}>Trigger</Button.Root>} />,
    );

    const btn = screen.getByRole("button");
    expect(screen.queryByTestId("base-content")).not.toBeInTheDocument();

    await user.click(btn);

    expect(screen.getByTestId("base-content")).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-base-state", "open");
  });

  it("maintains its own state even when composed with external libraries", async () => {
    const user = userEvent.setup();
    render(
      <MockRadixTrigger asChild>
        <Button.Root>Trigger</Button.Root>
      </MockRadixTrigger>,
    );

    const btn = screen.getByRole("button");

    await user.hover(btn);
    expect(btn).toHaveAttribute("data-hovered", "true");

    await user.click(btn);
    expect(screen.getByTestId("radix-content")).toBeInTheDocument();
  });
});
