import React from "react";
import { render, getByTestId, queryByTestId } from "@testing-library/react";
import App from "./App";

test("renders App CompanyDisplay hidden by default", () => {
  const { container } = render(<App />);
  const searchField = getByTestId(container, "search-field");
  expect(searchField).toBeInTheDocument();

  expect(queryByTestId(container, "company-display")).toBeNull();
});
