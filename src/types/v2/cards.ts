import { Authentication3DS, Paging } from './common';
import { TokenResponse } from './tokens';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type CardCreateInput = {
  customer_id: string;
  token_id: string;
  validate?: boolean;
  authentication_3DS?: Authentication3DS;
  metadata?: Record<string, unknown>;
};

export type CardUpdateInput = {
  token_id?: string;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type CardResponse = {
  object: 'card';
  id: string;
  active: boolean;
  creation_date: number;
  customer_id: string;
  source: TokenResponse;
  metadata?: Record<string, unknown>;
};

/* ------------------------------ List helpers ------------------------------ */

export type CardListResponse = {
  data: CardResponse[];
  paging: Paging;
};

export type CardListQuery = {
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  card_brand?: 'Visa' | 'Mastercard' | 'Amex' | 'Diner';
  card_type?: 'credito' | 'debito' | 'prepagada';
  device_type?: 'escritorio' | 'movil' | 'tablet';
  bin?: number;
  country_code?: string;
  limit?: number;
  before?: string;
  after?: string;
};
