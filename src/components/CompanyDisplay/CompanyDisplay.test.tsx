import { render, getByTestId, queryByTestId } from "@testing-library/react";
import CompanyDisplay from "./CompanyDisplay";
import { Company } from "../../types/types";
import React from "react";

test("renders CompanyDisplay with appropriate data", (): void => {
  const fakeCo: Company = {
    abn: "123",
    abnStatus: "Active",
    name: "fake co",
    postcode: "9999",
    state: "QLD",
  };
  const { container } = render(<CompanyDisplay company={fakeCo} />);

  const nameHeader = getByTestId(container, "company-name");
  expect(nameHeader).toBeInTheDocument();
  expect(nameHeader.textContent).toBe(fakeCo.name);

  const abnParagraph = getByTestId(container, "company-abn");
  expect(abnParagraph).toBeInTheDocument();
  expect(abnParagraph.textContent).toBe(`abn: ${fakeCo.abn}`);

  const abnStatusParagraph = getByTestId(container, "company-status");
  expect(abnStatusParagraph).toBeInTheDocument();
  expect(abnStatusParagraph.textContent).toBe(
    `abn status: ${fakeCo.abnStatus}`
  );

  const postcodeParagraph = getByTestId(container, "company-postcode");
  expect(postcodeParagraph).toBeInTheDocument();
  expect(postcodeParagraph.textContent).toBe(`postcode: ${fakeCo.postcode}`);

  const stateParagraph = getByTestId(container, "company-state");
  expect(stateParagraph).toBeInTheDocument();
  expect(stateParagraph.textContent).toBe(`state: ${fakeCo.state}`);

  expect(queryByTestId(container, "company-acn")).toBeNull();
});

test("renders CompanyDisplay with acn when supplied", (): void => {
  const fakeCo: Company = {
    abn: "123",
    abnStatus: "Active",
    name: "fake co",
    postcode: "9999",
    state: "QLD",
    acn: "321",
  };
  const { container } = render(<CompanyDisplay company={fakeCo} />);

  const acnParagraph = getByTestId(container, "company-acn");
  expect(acnParagraph).toBeInTheDocument();
  expect(acnParagraph.textContent).toBe(`acn: ${fakeCo.acn}`);
});
