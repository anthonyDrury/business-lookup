// Type returned by ABR for ABN/ACN lookup
export type CompanyByID = {
  Abn: string;
  AbnStatus: "Active" | "Inactive";
  Acn: string;
  AddressDate: string;
  AddressPostcode: string;
  AddressState: string;
  BusinessName: string[];
  EntityName: string;
  EntityTypeCode: string;
  EntityTypeName: string;
  Gst: string;
  Message: string;
};

// Type returned by ABR name lookup
export type CompanyByName = {
  Message: string;
  Names: CompanyShort[];
};

export type CompanyShort = {
  Abn: string;
  AbnStatus: "Active" | "Inactive";
  IsCurrent: boolean;
  Name: string;
  NameType: string;
  Postcode: string;
  Score: number;
  State: string;
};

export type Company = {
  abn: string;
  abnStatus: "Active" | "Inactive";
  acn?: string;
  name: string;
  state: string;
  postcode: string;
};

// Wrapper Type for responses from the client
export type ResponseObject<T> = {
  response: T;
  // Used to keep reference to the newest Promise
  index: number;
};
