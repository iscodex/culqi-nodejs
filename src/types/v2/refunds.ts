import { Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export type RefundCreateInput = {
  amount: number;
  charge_id: string;
  reason: 'duplicado' | 'fraudulento' | 'solicitud_comprador';
};

export type RefundUpdateInput = {
  metadata?: Record<string, unknown>;
};

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type RefundResponse = {
  object: 'refund';
  id: string;
  charge_id: string;
  creation_date: number;
  amount: number;
  reason: string;
  metadata?: Record<string, unknown>;
  status: 'pendiente' | 'rechazado' | 'completado';
  last_modified: number;
};

/* ------------------------------ List helpers ------------------------------ */

export type RefundListResponse = {
  data: RefundResponse[];
  paging: Paging;
};

export type RefundListQuery = {
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  reason?: 'duplicado' | 'fraudulento' | 'solicitud_comprador';
  modification_date_from?: number;
  modification_date_to?: number;
  status?: 'pendiente' | 'rechazado' | 'completado';
  limit?: number;
  before?: string;
  after?: string;
};
