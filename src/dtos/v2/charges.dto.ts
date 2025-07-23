/**
 * Data Transfer Objects for Charge endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Cargos
 */

import { AntifraudDetails, Authentication3DS, FeeDetails, Paging } from './common.dto';
import { TokenResponse } from './tokens.dto';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface ChargeCreateDto {
  /** Amount integer (100-999900, no decimal point) */
  amount: number;
  /** Currency code ISO 4217 (PEN | USD)  */
  currency_code: 'PEN' | 'USD';
  /** Customer e‑mail (5‑50 characters) */
  email: string;
  /** Unique charge or recurrence: token | yape | card  */
  source_id: string;
  /**
   * Indicates whether the card will be automatically captured
   * @default true
   */
  capture?: boolean;
  /** Optional description (5‑80 characters) */
  description?: string;
  /** Optional number of installments to be applied to the payment (5‑48 characters) */
  installments?: string;
  /** Optional metadata key/value pairs */
  metadata?: Record<string, unknown>;
  /** Optional to detect possible fraud. */
  antifraud_details?: AntifraudDetails;
  /** Optional params 3DS */
  authentication_3DS?: Authentication3DS;
}

export interface ChargeUpdateDto {
  metadata: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface OutcomeInfo {
  type: string;
  code: string;
  merchant_message: string;
  user_message: string;
}

export interface ChargePendingResponse {
  user_message: string;
  action_code: string;
}

export interface ChargeResponse {
  object: 'charge';
  id: string;
  creation_date: number;
  amount: number;
  amount_refunded: number;
  current_amount: number;
  installments: number | null;
  installments_amount: number | null;
  currency_code: 'PEN' | 'USD';
  email: string;
  description: string | null;
  source: TokenResponse;
  outcome: OutcomeInfo;
  fraud_score: number;
  antifraud_details: AntifraudDetails & { object: 'client' };
  dispute: boolean;
  capture: boolean;
  capture_date?: number;
  reference_code: string | null;
  authorization_code: string | null;
  duplicated: boolean;
  metadata?: Record<string, unknown> | null;
  total_fee: number;
  fee_details: FeeDetails;
  total_fee_taxes: number;
  transfer_amount: number;
  paid: boolean;
  statement_descriptor: string;
  transfer_id: string | null;
  operations?: unknown[];
}

/* ------------------------------ List helpers ------------------------------ */

export interface ChargeListResponse {
  data: ChargeResponse[];
  paging: Paging;
}

export interface ChargeListQuery extends Record<string, unknown> {
  amount?: string;
  min_amount?: string;
  max_amount?: string;
  installments?: string;
  min_installments?: string;
  max_installments?: string;
  currency_code?: 'PEN' | 'USD';
  code?: string;
  decline_code?: string;
  fraud_score?: string;
  min_fraud_score?: string;
  max_fraud_score?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  country_code?: string;
  captured?: string;
  capture_date?: string;
  capture_date_from?: string;
  capture_date_to?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  card_brand?: 'visa' | 'mastercard' | 'american_express' | 'diners_club';
  card_type?: 'credito' | 'debito' | 'prepagada';
  bin?: string;
  limit?: string;
  before?: string;
  after?: string;
}
