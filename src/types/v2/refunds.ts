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
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  reason?: 'duplicado' | 'fraudulento' | 'solicitud_comprador';
  modification_date_from?: string;
  modification_date_to?: string;
  status?: 'pendiente' | 'rechazado' | 'completado';
  limit?: string;
  before?: string;
  after?: string;
};
