import { BrowserRouter } from "react-router-dom";
import UserContext from "../utils/UserContext";
import RestaurantMenu from "../components/RestaurantMenu";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import MOCK_DATA from "../mocks/ResMenuData.json";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import Header from "../components/Header";
import Cart from "../pages/Cart";

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  })
);

it("should show added items in the Cart page", async () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <UserContext.Provider
          value={{ loggedInUser: "TestUser", setUserName: () => {} }}
        >
          <Header />
          <RestaurantMenu />
          <Cart />
        </UserContext.Provider>
      </BrowserRouter>
    </Provider>
  );

  // Wait for accordion headers to render
  const accordionHeaders = await screen.findAllByText(/.*\(\d+\)/);
  expect(accordionHeaders.length).toBeGreaterThan(0);

  // Click first accordion to reveal items
  fireEvent.click(accordionHeaders[0]);

  // Wait for items to appear
  const items = await screen.findAllByTestId("Items");
  expect(items.length).toBeGreaterThan(0);

  // Click 'Add to Cart' button
  const addBtns = screen.getAllByRole("button", { name: /Add to Cart/i });
  fireEvent.click(addBtns[0]);

  // ✅ Check if cart badge updates
  expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();

  // ✅ Check if the Cart page displays the item
  const cartItems = await screen.findAllByTestId("cart-items");
  expect(cartItems.length).toBeGreaterThan(0);

  // ✅ Check if Clear Cart button is present
  expect(
    screen.getByRole("button", { name: /Clear Cart/i })
  ).toBeInTheDocument();

  // ✅ Simulate clicking Clear Cart
  fireEvent.click(screen.getByRole("button", { name: /Clear Cart/i }));

  // ✅ Cart should be empty now
  expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
});
