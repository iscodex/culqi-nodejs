import { Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type InitialCycles = {
  count: number;
  has_initial_charge: boolean;
  amount: number;
  interval_unit_time: 1 | 2 | 3 | 4 | 5 | 6;
};

export type PlanCreateInput = {
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
};

export type PlanUpdateInput = {
  name?: string;
  short_name?: string;
  description?: string;
  status?: 1 | 2;
  image?: string;
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type PlanCreateResponse = {
  id: string;
  slug: string;
};

export type PlanResponse = {
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
};

/* ------------------------------ List helpers ------------------------------ */

export type PlanListResponse = {
  data: Omit<
    PlanResponse,
    'interval_unit_time' | 'interval_count' | 'initial_cycles' | 'image' | 'slug'
  >[];
  paging: Paging;
};

export type PlanListQuery = {
  amount?: number;
  status?: 1 | 2;
  min_amount?: number;
  max_amount?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  limit?: string;
  before?: string;
  after?: string;
};
