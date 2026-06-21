export const BUTTON_FEATURES = [
  "Native-first use-press logic that replicates browser interactions.",
  "Provides logical focus and pointer-aware states like hovered and pressed.",
  "Fully accessible, managing disabled and pending states natively.",
  "First-class DOM rendering composition via the `render` prop.",
  "Zero CSS shipped — target semantic data-attributes to style.",
];

export const BUTTON_INSTALL = {
  button: "npm install @kenos-ui/react-button",
  react: "npm install @kenos-ui/react",
};

export const BUTTON_IMPORT = {
  button: `import { Button } from "@kenos-ui/react-button";`,
  react: `import { Button } from "@kenos-ui/react";`,
};

export const BUTTON_A11Y_ROLES = [{ part: "Button", role: "button" }];

export const BUTTON_KEYBOARD = [
  { name: "Enter", desc: "Activates the button." },
  { name: "Space", desc: "Activates the button. Prevents page scrolling when pressed." },
];
