/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

import { FeeDetails, Paging } from './common';

export type ClientDetails = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
};

export type OrderCreateInput = {
  amount: number;
  currency_code: 'PEN' | 'USD';
  description: string;
  order_number: string;
  expiration_date: number;
  client_details: ClientDetails;
  confirm?: boolean;
  metadata?: Record<string, unknown>;
};

export type OrderTypeConfirmInput = {
  id: string;
  order_types: ('cuotealo' | 'cip')[];
};

export type OrderUpdateInput = {
  expiration_date: number;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type OrderResponse = {
  object: 'order';
  id: string;
  amount: number;
  payment_code: string;
  currency_code: 'PEN' | 'USD';
  description: string;
  order_number: string;
  state: 'created' | 'pending';
  total_fee: number | null;
  net_amount: number | null;
  fee_details: FeeDetails | null;
  creation_date: number;
  expiration_date: number;
  updated_at: number | null;
  paid_at: number | null;
  available_on: number | null;
  metadata?: Record<string, unknown>;
  qr: string | null;
  cuotealo: string | null;
  url_pe: string | null;
};

/* ------------------------------ List helpers ------------------------------ */

export type OrderListResponse = {
  data: OrderResponse[];
  paging: Paging;
};

export type OrderListQuery = {
  amount?: number;
  min_amount?: number;
  max_amount?: number;
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  state?: 'created' | 'pending';
  limit?: number;
  before?: string;
  after?: string;
};
