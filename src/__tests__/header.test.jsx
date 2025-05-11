const { render, screen, fireEvent } = require("@testing-library/react");
import { Provider } from "react-redux";
import Header from "../components/Header";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";

it("Should load Header component with a login button", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  expect(loginButton).toBeInTheDocument();
});

it("Should load Header component with a logout button on click of login", () => {
  render(
    <Provider store={appStore}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  const loginButton = screen.getByRole("button", { name: "Login" });

  fireEvent.click(loginButton);

  const logout = screen.getByRole("button", { name: "Logout" });

  expect(logout).toBeInTheDocument();
});
