import { AntifraudDetails, Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type CustomerCreateInput = {
  address: string;
  address_city: string;
  country_code: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  metadata?: Record<string, unknown>;
};

export type CustomerUpdateInput = Partial<Omit<CustomerCreateInput, 'email'>>;

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type CustomerResponse = {
  object: 'customer';
  id: string;
  creation_date: number;
  email: string;
  antifraud_details: AntifraudDetails & { object: 'client' };
  cards?: unknown[];
  metadata?: Record<string, unknown>;
};

/* ------------------------------ List helpers ------------------------------ */

export type CustomerListResponse = {
  data: CustomerResponse[];
  paging: Paging;
};

export type CustomerListQuery = {
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  country_code?: string;
  limit?: string;
  before?: string;
  after?: string;
};
