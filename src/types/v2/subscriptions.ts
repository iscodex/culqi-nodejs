import { Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                               Common pieces                                */
/* -------------------------------------------------------------------------- */

export type CulqiCustomerSummary = {
  first_name: string;
  last_name: string;
  email: string;
};

export type CulqiPlanSummary = {
  plan_id: string;
  name: string;
  amount: number;
  currency: 'PEN' | 'USD';
  interval_unit_time: 1 | 2 | 3 | 4 | 5 | 6;
};

export type CulqiChargeSummary = {
  card_id: string;
  card_number: string;
  card_brand: 'visa' | 'mastercard' | 'american_express' | 'diners_club';
  charge_id: string;
  charger_status: 1 | 2;
  charge_day: number;
  error: string | null;
  amount: number;
  currency: 'PEN' | 'USD';
};

export type CulqiPeriodInfo = {
  period: number;
  status: 1 | 2 | 3 | 4 | 5 | 6;
  charges: CulqiChargeSummary[];
};

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type SubscriptionCreateInput = {
  card_id: string;
  plan_id: string;
  tyc: boolean;
  metadata?: Record<string, unknown>;
};

export type SubscriptionUpdateInput = {
  card_id?: string;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type SubscriptionCreateResponse = {
  id: string;
  customer_id: string;
  plan_id: string;
  status: 1 | 2 | 3 | 4 | 5 | 6;
  created_at: number;
  metadata?: Record<string, unknown>;
};

export type SubscriptionResponse = {
  id: string;
  status: 1 | 2 | 3 | 4 | 5 | 6;
  creation_date: number;
  next_billing_date: number;
  current_period: number;
  trial_start: number;
  trial_end: number;
  active_card: string;
  plan: CulqiPlanSummary;
  periods: CulqiPeriodInfo[];
  customer: CulqiCustomerSummary;
  metadata?: Record<string, unknown>;
};

/* ------------------------------ List helpers ------------------------------ */

export type SubscriptionListQuery = {
  plan_id?: string;
  status?: 1 | 2 | 3 | 4 | 5 | 6;
  creation_date_from?: number;
  creation_date_to?: number;
  limit?: number;
  before?: string;
  after?: string;
};

export type SubscriptionListItem = {
  object: 'subscription';
  id: string;
  creation_date: number;
  status: number;
  current_period?: number;
  total_period?: number;
  next_billing_date?: number;
  trial_start?: number;
  trial_end?: number;
  plan_id: string;
  card_id: string;
  customer: CulqiCustomerSummary;
  metadata?: Record<string, unknown>;
};

export type SubscriptionListResponse = {
  data: SubscriptionListItem[];
  paging: Paging;
};
