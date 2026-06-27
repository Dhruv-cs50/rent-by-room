import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App.jsx";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it("mounts a root element with content", () => {
    const { container } = render(<App />);
    expect(container.firstChild).not.toBeNull();
  });
});
