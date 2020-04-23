import {
  Company,
  CompanyByName,
  CompanyByID,
  ResponseObject,
} from "../types/types";
import { mapToCompany } from "../common/support";

async function handleCallback(
  scriptPromise: Promise<string>,
  byName: boolean = false
): Promise<Company[] | undefined> {
  let returnVal: Company[] | undefined = undefined;

  function callback(value: CompanyByID | CompanyByName) {
    returnVal = byName
      ? (value as CompanyByName).Names.map(mapToCompany)
      : [mapToCompany(value as CompanyByID)];
  }

  // Response from ABR is a callback function
  // Would be significantly better for security, and reliability if it was a JSON object
  eval(await scriptPromise);

  return Promise.resolve(returnVal ? returnVal : returnVal);
}

export async function getByABN(
  ABN: string,
  returnIndex: number
): Promise<ResponseObject<Company[] | undefined>> {
  const response: Response = await fetch(
    `http://localhost:5000/abn?ABN=${ABN}`,
    {
      headers: {
        "Content-Type": "text/javascript",
      },
    }
  );

  return {
    response: await handleCallback(response.text()),
    index: returnIndex,
  };
}

export async function getByACN(
  ACN: string,
  returnIndex: number
): Promise<ResponseObject<Company[] | undefined>> {
  const response: Response = await fetch(
    `http://localhost:5000/acn?ACN=${ACN}`,
    {
      headers: {
        "Content-Type": "text/javascript",
      },
    }
  );

  return {
    response: await handleCallback(response.text()),
    index: returnIndex,
  };
}

export async function getByName(
  name: string,
  returnIndex: number
): Promise<ResponseObject<Company[] | undefined>> {
  const response: Response = await fetch(
    `http://localhost:5000/name?name=${name}`,
    {
      headers: {
        "Content-Type": "text/javascript",
      },
    }
  );

  return {
    response: await handleCallback(response.text(), true),
    index: returnIndex,
  };
}
