import React from "react";
import { Company } from "../../types/types";

type CompanyDisplayProps = {
  company: Company;
};
export default function CompanyDisplay(props: CompanyDisplayProps) {
  return (
    <div
      data-testid="company-display"
      style={{
        border: "1px solid black",
        maxWidth: "40rem",
        margin: "0 auto",
        marginTop: "2rem",
        textAlign: "left",
        padding: "1rem",
      }}
    >
      <h1 data-testid="company-name">{props.company.name}</h1>
      <p data-testid="company-abn">
        <span
          style={{
            fontWeight: 700,
          }}
        >
          abn:
        </span>{" "}
        {props.company.abn}
      </p>
      <p data-testid="company-status">
        <span
          style={{
            fontWeight: 700,
          }}
        >
          abn status:
        </span>{" "}
        {props.company.abnStatus}
      </p>
      {props.company.acn !== undefined ? (
        <p data-testid="company-acn">
          <span
            style={{
              fontWeight: 700,
            }}
          >
            acn:
          </span>{" "}
          {props.company.acn}
        </p>
      ) : null}
      <p data-testid="company-postcode">
        <span
          style={{
            fontWeight: 700,
          }}
        >
          postcode:
        </span>{" "}
        {props.company.postcode}
      </p>
      <p data-testid="company-state">
        <span
          style={{
            fontWeight: 700,
          }}
        >
          state:
        </span>{" "}
        {props.company.state}
      </p>
    </div>
  );
}
