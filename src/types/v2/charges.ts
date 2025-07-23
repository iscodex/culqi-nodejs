import { AntifraudDetails, Authentication3DS, FeeDetails, Paging } from './common';
import { TokenResponse } from './tokens';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type ChargeCreateInput = {
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
};

export type ChargeUpdateInput = {
  metadata: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type OutcomeInfo = {
  type: string;
  code: string;
  merchant_message: string;
  user_message: string;
};

export type ChargePendingResponse = {
  user_message: string;
  action_code: string;
};

export type ChargeResponse = {
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
};

/* ------------------------------ List helpers ------------------------------ */

export type ChargeListResponse = {
  data: ChargeResponse[];
  paging: Paging;
};

export type ChargeListQuery = {
  amount?: number;
  min_amount?: number;
  max_amount?: number;
  installments?: number;
  min_installments?: number;
  max_installments?: number;
  currency_code?: 'PEN' | 'USD';
  code?: string;
  decline_code?: string;
  fraud_score?: string;
  min_fraud_score?: number;
  max_fraud_score?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  address_city?: string;
  phone_number?: string;
  country_code?: string;
  captured?: boolean;
  capture_date?: number;
  capture_date_from?: number;
  capture_date_to?: number;
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  card_brand?: 'visa' | 'mastercard' | 'american_express' | 'diners_club';
  card_type?: 'credito' | 'debito' | 'prepagada';
  bin?: number;
  limit?: number;
  before?: string;
  after?: string;
};
