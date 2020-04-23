import { Company, CompanyByID, CompanyShort } from "../types/types";

export function mapToCompany(result: CompanyByID | CompanyShort): Company {
  return (result as CompanyShort).Name !== undefined
    ? {
        abn: (result as CompanyShort).Abn,
        abnStatus: (result as CompanyShort).AbnStatus,
        acn: undefined,
        name: (result as CompanyShort).Name,
        state: (result as CompanyShort).State,
        postcode: (result as CompanyShort).Postcode,
      }
    : {
        abn: (result as CompanyByID).Abn,
        abnStatus: (result as CompanyByID).AbnStatus,
        acn: (result as CompanyByID).Acn,
        name: (result as CompanyByID).EntityName,
        state: (result as CompanyByID).AddressState,
        postcode: (result as CompanyByID).AddressPostcode,
      };
}
