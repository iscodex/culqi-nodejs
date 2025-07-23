/**
 * Data Transfer Objects for Customer endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Clientes
 */

import { AntifraudDetails, Paging } from './common.dto';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface CustomerCreateDto {
  address: string;
  address_city: string;
  currency_code: 'PEN' | 'USD';
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  metadata?: Record<string, unknown>;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CustomerUpdateDto extends Partial<Omit<CustomerCreateDto, 'email'>> {}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface CustomerResponse {
  object: 'customer';
  id: string;
  creation_date: number;
  email: string;
  antifraud_details: AntifraudDetails & { object: 'client' };
  cards?: unknown[];
  metadata?: Record<string, unknown>;
}

export interface CustomerCancelResponse {
  id: string;
  deleted: boolean;
  merchant_message: string;
}

/* ------------------------------ List helpers ------------------------------ */

export interface CustomerListResponse {
  data: CustomerResponse[];
  paging: Paging;
}

export interface CustomerListQuery extends Record<string, unknown> {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  currency_code?: 'PEN' | 'USD';
  limit?: string;
  before?: string;
  after?: string;
}
