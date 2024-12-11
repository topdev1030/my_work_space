import { Option } from "@/types";

export type CustomerOption = Option & {
  value: string;
  cust_id: string;
};

export type CreateVendorFormValues = {
  vendor_name: string;
  information_provided: string;
  pii: string;
  ephi: string;
  client_agent: string;
  notes: string;
  newsStreamID: string;
  url: string;
};

export interface VendorMornitor {
  vendor_name: string;
  information_provided: string;
  pii: string;
  ephi: string;
  client_agent: string;
  notes: string;
  newsStreamID: string;
}
