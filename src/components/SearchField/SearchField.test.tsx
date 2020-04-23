import { render, getByTestId } from "@testing-library/react";
import React from "react";
import SearchField from "./SearchField";
import { shallow } from "enzyme";
import * as client from "../../client/client";
import { ResponseObject, Company } from "../../types/types";

test("renders SearchFiled", (): void => {
  const mockOnSelect = jest.fn();
  const { container } = render(<SearchField onSelect={mockOnSelect} />);

  const input = getByTestId(container, "search-input");
  expect(input).toBeInTheDocument();
});

test("adding test to input correctly calls getByName()", (): void => {
  const mockOnSelect = jest.fn();
  const mockGetByName = jest.fn().mockReturnValue(
    Promise.resolve({
      response: [
        {
          abn: "123",
          abnStatus: "Active",
          name: "fake co",
          postcode: "9999",
          state: "QLD",
        },
      ],
      index: 1,
    })
  );

  // Tell TS this is not readonly
  (client.getByName as (
    name: string,
    returnIndex: number
  ) => Promise<ResponseObject<Company[] | undefined>>) = mockGetByName;

  const container = shallow(<SearchField onSelect={mockOnSelect} />);

  const input = container.find("[data-testid='search-input']");

  input.simulate("change", { target: { value: "test" } });

  expect(mockGetByName).toHaveBeenCalledTimes(1);
});

test("adding 123456 to input correctly calls getByACN()", (): void => {
  const mockOnSelect = jest.fn();
  const mockGetByACN = jest.fn().mockReturnValue(
    Promise.resolve({
      response: [
        {
          abn: "123",
          abnStatus: "Active",
          name: "fake co",
          postcode: "9999",
          state: "QLD",
        },
      ],
      index: 1,
    })
  );

  // Tell TS this is not readonly
  (client.getByACN as (
    name: string,
    returnIndex: number
  ) => Promise<ResponseObject<Company[] | undefined>>) = mockGetByACN;

  const container = shallow(<SearchField onSelect={mockOnSelect} />);

  const input = container.find("[data-testid='search-input']");

  input.simulate("change", { target: { value: "123456" } });

  expect(mockGetByACN).toHaveBeenCalledTimes(1);
});

test("adding 11 digits to input correctly calls getByABN()", (): void => {
  const mockOnSelect = jest.fn();
  const mockGetByABN = jest.fn().mockReturnValue(
    Promise.resolve({
      response: [
        {
          abn: "123",
          abnStatus: "Active",
          name: "fake co",
          postcode: "9999",
          state: "QLD",
        },
      ],
      index: 1,
    })
  );

  // Tell TS this is not readonly
  (client.getByABN as (
    name: string,
    returnIndex: number
  ) => Promise<ResponseObject<Company[] | undefined>>) = mockGetByABN;

  const container = shallow(<SearchField onSelect={mockOnSelect} />);

  const input = container.find("[data-testid='search-input']");

  input.simulate("change", { target: { value: "1234 56 789 1 1" } });

  expect(mockGetByABN).toHaveBeenCalledTimes(1);
});
