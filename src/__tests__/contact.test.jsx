import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Contact from "../pages/Contact";

describe("Contact Page Tests", () => {
  test("Should load Contact Us Component", () => {
    render(<Contact />);

    const heading = screen.getByText("Contact Us");

    // assertion
    expect(heading).toBeInTheDocument();
  });
  test("Contact Us form should have Your Name placeholder", () => {
    render(<Contact />);

    const placeholder = screen.getByPlaceholderText("Your Name");

    // assertion
    expect(placeholder).toBeInTheDocument();
  });

  test("Contact page should load 3 input boxes", () => {
    render(<Contact />);

    const inputsBoxes = screen.getAllByRole("textbox");

    expect(inputsBoxes.length).toBe(3);
  });
});
