import { Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type TokenCreateInput = {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email: string;

  metadata?: Record<string, unknown>;
};

export type TokenUpdateInput = {
  metadata: Record<string, unknown>;
};

export type TokenCreateYapeInput = {
  otp: string;
  number_phone: string;
  amount: string;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type Issuer = {
  name: string;
  country: string;
  country_code: string;
  website: string;
  phone_number: string;
};

export type IINInfo = {
  object: 'iin';
  bin: string;
  card_brand: 'Visa' | 'Mastercard' | 'Amex' | 'Diner' | string;
  card_type: 'credito' | 'debito' | 'internacional' | string;
  card_category: string;
  issuer: Issuer;
  installments_allowed: number[];
};

export type ClientInfo = {
  ip: string;
  ip_country: string;
  ip_country_code: string;
  browser: string;
  device_fingerprint: string;
  device_type: 'escritorio' | 'movil' | 'tablet' | string;
};

export type TokenResponse = {
  object: 'token';
  id: string;
  type: string;
  email: string;
  creation_date: number;
  card_number: string;
  last_four: string;
  active: boolean;
  iin: IINInfo;
  client: ClientInfo;
  metadata?: Record<string, unknown>;
};

/* ------------------------------ List helpers ------------------------------ */

export type TokenListResponse = {
  data: TokenResponse[];
  paging: Paging;
};

export type TokenListQuery = {
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  card_brand?: 'Visa' | 'Mastercard' | 'Amex' | 'Diner';
  card_type?: 'credito' | 'debito' | 'internacional';
  device_type?: 'escritorio' | 'movil' | 'tablet';
  bin?: number;
  country_code?: string;
  limit?: number;
  before?: string;
  after?: string;
};
