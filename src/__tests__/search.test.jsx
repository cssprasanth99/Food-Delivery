import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Body from "../pages/Body";
import ResListData from "../mocks/ResListData.json";
import { MemoryRouter } from "react-router-dom";
import UserContext from "../utils/UserContext";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(ResListData),
  })
);

describe("Body Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("filters restaurants based on search input", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ loggedInUser: "TestUser", setUserName: () => {} }}
        >
          <Body />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Wait for search input to appear
    await waitFor(() =>
      expect(
        screen.getByPlaceholderText("🔍 Search restaurants...")
      ).toBeInTheDocument()
    );

    // ✅ FIXED: await the findAllByTestId
    const cardBeforeSearch = await screen.findAllByTestId("resCard");
    expect(cardBeforeSearch.length).toBe(8);

    // Simulate search
    const searchInput = screen.getByPlaceholderText("🔍 Search restaurants...");
    fireEvent.change(searchInput, { target: { value: "burger" } });

    // Check updated result
    const cards = await screen.findAllByTestId("resCard");
    expect(cards.length).toBe(2);
  });

  it("should filter top rated restaurants", async () => {
    render(
      <MemoryRouter>
        <UserContext.Provider
          value={{ loggedInUser: "TestUser", setUserName: () => {} }}
        >
          <Body />
        </UserContext.Provider>
      </MemoryRouter>
    );

    // Wait for restaurant cards to load
    await screen.findAllByTestId("resCard");

    // Click on the "Top Rated" button
    const topRatedBtn = screen.getByTestId("topRatedBtn");
    fireEvent.click(topRatedBtn);

    // Get filtered restaurant cards
    const filteredCards = await screen.findAllByTestId("resCard");
    console.log("Filtered Cards", filteredCards);

    // Assert that all shown cards are top rated (> 4.5)
    for (let card of filteredCards) {
      const ratingText = card.querySelector(".rating")?.textContent;
      if (ratingText) {
        const rating = parseFloat(ratingText);
        expect(rating).toBeGreaterThan(4.5);
      }
    }
  });
});
