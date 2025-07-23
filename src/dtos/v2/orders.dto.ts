/**
 * Data Transfer Objects for Order endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Ordenes
 */

import { FeeDetails, Paging } from './common.dto';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface ClientDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export interface OrderCreateDto {
  amount: number;
  currency_code: 'PEN' | 'USD';
  description: string;
  order_number: string;
  expiration_date: string;
  client_details: ClientDetails;
  confirm?: boolean;
  metadata?: Record<string, unknown>;
}

export interface OrderTypeConfirmDto {
  id: string;
  order_types: ('cuotealo' | 'cip')[];
}

export interface OrderUpdateDto {
  expiration_date: number;
  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface OrderResponse {
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
}

/* ------------------------------ List helpers ------------------------------ */

export interface OrderListResponse {
  data: OrderResponse[];
  paging: Paging;
}

export interface OrderListQuery extends Record<string, unknown> {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  state?: 'created' | 'pending';
  limit?: string;
  before?: string;
  after?: string;
}
