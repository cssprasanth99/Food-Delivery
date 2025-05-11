import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import RestaurantCard from "../components/RestaurantCard";
import MOCK_DATA from "../mocks/RestaurantCardData.json";

it("Should render the RestaurantCard component with props data", () => {
  render(<RestaurantCard resData={MOCK_DATA} />);

  const name = screen.getByText("McDonald's");
  expect(name).toBeInTheDocument();
});
