export type PagingCursors = {
  before?: string;
  after?: string;
};

export type Paging = {
  previous?: string;
  next?: string;
  cursors: PagingCursors;
  remaining_items?: number;
};

export type Authentication3DS = {
  xid?: string;
  cavv?: string;
  directoryServerTransactionId?: string;
  eci?: string;
  protocolVersion?: string;
};

export type AntifraudDetails = {
  address?: string;
  address_city?: string;
  country_code?: string; // ISO‑3166‑1 alpha‑2
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

export type VariableFeeDetail = {
  currency_code: 'PEN' | 'USD';
  commision?: number;
  total: number;
};

export type FeeDetails = {
  fixed_fee: Record<string, unknown>;
  variable_fee: VariableFeeDetail;
};

export type NoAuthResponse = {
  user_message: string;
  action_code: string;
};

export type DeleteResponse = {
  id: string;
  deleted: boolean;
  merchant_message: string;
};

export type Pagination = {
  total_records: number;
  total_pages: number;
  prev_page: number | null;
  next_page: number | null;
  page: number;
  limit: number;
};
