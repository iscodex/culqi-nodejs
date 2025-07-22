/**
 * Data Transfer Objects for Plan endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Planes
 */

import { Paging } from './tokens';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface InitialCycles {
  count: number;
  has_initial_charge: boolean;
  amount: number;
  interval_unit_time: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface PlanCreateDto {
  name: string;
  short_name: string;
  description: string;
  amount: number;
  currency: 'PEN' | 'USD';
  interval_unit_time: 1 | 2 | 3 | 4 | 5 | 6;
  interval_count: number;
  initial_cycles: InitialCycles;
  image?: string;
  metadata?: Record<string, unknown>;
}

export interface PlanUpdateDto {
  name?: string;
  short_name?: string;
  description?: string;
  status?: 1 | 2;
  image?: string;
  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface PlanCreateResponse {
  id: string;
  slug: string;
}

export interface PlanResponse {
  object?: 'plan';
  id: string;
  interval_unit_time: 1 | 2 | 3 | 4 | 5 | 6;
  interval_count: number;
  amount: number;
  name: string;
  short_name: string;
  description: string;
  currency: 'PEN' | 'USD';
  initial_cycles: InitialCycles;
  metadata?: Record<string, unknown>;
  image: string | null;
  total_subscriptions: number;
  status: 1 | 2;
  creation_date: number;
  slug: string;
}

export interface PlanCancelResponse {
  id: string;
  deleted: boolean;
  merchant_message: string;
}

/* ------------------------------ List helpers ------------------------------ */

export interface PlanListResponse {
  data: Omit<
    PlanResponse,
    'interval_unit_time' | 'interval_count' | 'initial_cycles' | 'image' | 'slug'
  >[];
  paging: Paging & {
    remaining_items?: number;
  };
}

export interface PlanListQuery extends Record<string, unknown> {
  amount?: number;
  status?: 1 | 2;
  min_amount?: number;
  max_amount?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  limit?: string;
  before?: string;
  after?: string;
}
