export interface PagingCursors {
  before?: string;
  after?: string;
}

export interface Paging {
  previous?: string;
  next?: string;
  cursors: PagingCursors;
  remaining_items?: number;
}

export interface Authentication3DS {
  xid?: string;
  cavv?: string;
  directoryServerTransactionId?: string;
  eci?: string;
  protocolVersion?: string;
}

export interface AntifraudDetails {
  address?: string;
  address_city?: string;
  country_code?: string; // ISO‑3166‑1 alpha‑2
  first_name?: string;
  last_name?: string;
  phone_number?: string;
}

export interface VariableFeeDetail {
  currency_code: 'PEN' | 'USD';
  commision?: number;
  total: number;
}

export interface FeeDetails {
  fixed_fee: Record<string, unknown>;
  variable_fee: VariableFeeDetail;
}
