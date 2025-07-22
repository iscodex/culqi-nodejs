/**
 * Data Transfer Objects for Token endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Tokens
 */

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

/** Payload for POST /v2/tokens (create token) */
export interface TokenCreateDto {
  /** Card number (13‑16 digits, no spaces) */
  card_number: string;
  /** CVV (3‑4 digits) */
  cvv: string;
  /** Expiration month (1‑2 digits, zero‑padded optional) */
  expiration_month: string;
  /** Expiration year (4 digits) */
  expiration_year: string;
  /** Customer e‑mail (5‑50 characters) */
  email: string;
  /** Optional metadata key/value pairs */
  metadata?: Record<string, unknown>;
}

/** Partial update ‑ currently only metadata is allowed */
export interface TokenUpdateDto {
  /** Custom key/value pairs */
  metadata: Record<string, unknown>;
}

/** Create a token via Yape */
export interface TokenCreateYapeDto {
  /** One‑time password sent by Yape (6 digits) */
  otp: string;
  /** Customer phone number (9 digits, no country code) */
  number_phone: string;
  /** Amount in minor units (3‑5 digits, no decimal point) */
  amount: string;
  /** Optional metadata */
  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface Issuer {
  name: string;
  country: string;
  country_code: string;
  website: string;
  phone_number: string;
}

export interface IINInfo {
  object: 'iin';
  bin: string;
  card_brand: 'Visa' | 'Mastercard' | 'Amex' | 'Diner' | string;
  card_type: 'credito' | 'debito' | 'internacional' | string;
  card_category: string;
  issuer: Issuer;
  installments_allowed: number[];
}

export interface ClientInfo {
  ip: string;
  ip_country: string;
  ip_country_code: string;
  browser: string;
  device_fingerprint: string;
  device_type: 'escritorio' | 'movil' | 'tablet' | string;
}

export interface TokenResponse {
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
}

/* ------------------------------ List helpers ------------------------------ */

export interface PagingCursors {
  before?: string;
  after?: string;
}

export interface Paging {
  previous?: string;
  next?: string;
  cursors: PagingCursors;
}

export interface TokenListResponse {
  data: TokenResponse[];
  paging: Paging;
}

export interface TokenListQuery extends Record<string, unknown> {
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  card_brand?: 'Visa' | 'Mastercard' | 'Amex' | 'Diner';
  card_type?: 'credito' | 'debito' | 'internacional';
  device_type?: 'escritorio' | 'movil' | 'tablet';
  bin?: string;
  country_code?: string;
  limit?: string; // 1‑100
  before?: string; // token id
  after?: string; // token id
}
