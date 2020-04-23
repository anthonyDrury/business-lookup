import React, { useState, Dispatch, SetStateAction, useEffect } from "react";
import { getByABN, getByACN, getByName } from "../../client/client";
import { Company, ResponseObject } from "../../types/types";

type SearchFieldOptionProps = {
  value: string;
  onSelect?: (k: number) => void;
  index?: number;
};
function SearchFieldOption(props: SearchFieldOptionProps) {
  return (
    <div
      data-testid={`option-${props.value}`}
      style={{
        cursor: props.onSelect !== undefined ? "pointer" : undefined,
        borderBottom: "1px solid black",
      }}
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (props.onSelect !== undefined && props.index !== undefined) {
          props.onSelect(props.index);
        }
      }}
      key={props.index}
    >
      {props.value}
    </div>
  );
}

type SearchFieldProps = {
  onSelect: (c: Company) => void;
};
type SearchFieldState = {
  options: Company[] | undefined;
  loading: boolean;
  dropdownHidden: boolean;
  promiseCount: number;
  inputText: string;
};
export default class SearchField extends React.Component<
  SearchFieldProps,
  SearchFieldState
> {
  constructor(props: SearchFieldProps) {
    super(props);
    this.state = {
      options: undefined,
      loading: false,
      dropdownHidden: true,
      promiseCount: 0,
      inputText: "",
    };
  }

  onTextChange(text: string) {
    let resultPromise:
      | Promise<ResponseObject<Company[] | undefined>>
      | undefined = undefined;
    // Show loading message only if no other results to show
    this.setState({
      loading:
        this.state.options === undefined || this.state.options?.length === 0,
      dropdownHidden: false,
    });

    // Remove all whitespace
    const trimmedText: string = text.replace(/\s/g, "");
    // If text is a number, use ABN/ACN lookup
    if (!isNaN(+trimmedText)) {
      // ABN are always 11 digits long, all numbers
      if (trimmedText.length === 11) {
        resultPromise = getByABN(trimmedText, this.state.promiseCount);
      } else {
        resultPromise = getByACN(trimmedText, this.state.promiseCount);
      }
    } else {
      resultPromise = getByName(trimmedText, this.state.promiseCount);
    }

    resultPromise.then((value: ResponseObject<Company[] | undefined>) => {
      // If promise is not latest, ignore result
      if (value.index === this.state.promiseCount) {
        this.setState({
          options: value.response,
          loading: false,
        });
      }
    });
  }

  onDropdownSelect(key: number) {
    if (this.state.options === undefined) {
      return;
    }
    this.props.onSelect(this.state.options[key]);
    this.setState({ dropdownHidden: true });
  }

  mapOptions(options: Company[] | undefined) {
    if (this.state.loading) {
      return <SearchFieldOption value="Loading..." />;
    }
    if (options === undefined || options.length === 0) {
      return <SearchFieldOption value="No results yet" />;
    }
    return (
      <>
        {options.map((company: Company, index: number) => {
          if (company.name === "") {
            return <SearchFieldOption value="No results yet" key={index} />;
          } else {
            return (
              <SearchFieldOption
                value={company.name}
                index={index}
                onSelect={this.onDropdownSelect.bind(this)}
              />
            );
          }
        })}
      </>
    );
  }

  render() {
    return (
      <div
        data-testid="search-field"
        style={{
          margin: "0 auto",
          display: "flex",
          maxWidth: "15rem",
          flexDirection: "column",
          position: "relative",
          textAlign: "left",
        }}
      >
        <input
          data-testid="search-input"
          name="ABN lookup"
          placeholder="Search via ABN/ACN or Name"
          autoComplete="off"
          onFocus={() => this.setState({ dropdownHidden: false })}
          onBlur={() =>
            // Need to delay this so the option click event can fire
            setTimeout(() => this.setState({ dropdownHidden: true }), 500)
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            this.setState(
              {
                promiseCount: this.state.promiseCount + 1,
                inputText: e.target.value,
              },
              () => {
                this.onTextChange(this.state.inputText);
              }
            )
          }
        />
        <div
          hidden={this.state.dropdownHidden}
          style={{
            backgroundColor: "#f4f4f4",
            border: "1px solid black",
            position: "absolute",
            top: "21.5px",
            width: "15rem",
          }}
        >
          {this.mapOptions(this.state.options)}
        </div>
      </div>
    );
  }
}
