/**
 * Data Transfer Objects for Card endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Tarjetas
 */

import { Authentication3DS, Paging } from './common.dto';
import { TokenResponse } from './tokens.dto';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface CardCreateDto {
  customer_id: string;
  token_id: string;
  validate?: boolean;
  authentication_3DS?: Authentication3DS;
  metadata?: Record<string, unknown>;
}

export interface CardUpdateDto {
  token_id?: string;
  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface CardPendingResponse {
  user_message: string;
  action_code: string;
}

export interface CardResponse {
  object: 'card';
  id: string;
  active: boolean;
  creation_date: number;
  customer_id: string;
  source: TokenResponse;
  metadata?: Record<string, unknown>;
}

export interface CardCancelResponse {
  id: string;
  deleted: boolean;
  merchant_message: string;
}

/* ------------------------------ List helpers ------------------------------ */

export interface CardListResponse {
  data: CardResponse[];
  paging: Paging;
}

export interface CardListQuery extends Record<string, unknown> {
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  card_brand?: 'Visa' | 'Mastercard' | 'Amex' | 'Diner';
  card_type?: 'credito' | 'debito' | 'prepagada';
  device_type?: 'escritorio' | 'movil' | 'tablet';
  bin?: string;
  country_code?: string;
  limit?: string;
  before?: string;
  after?: string;
}
