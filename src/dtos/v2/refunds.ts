/**
 * Data Transfer Objects for Refund endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Devoluciones
 */

import { Paging } from './tokens';

/* -------------------------------------------------------------------------- */
/*                                 Requests                                   */
/* -------------------------------------------------------------------------- */

export interface RefundCreateDto {
  amount: number;
  charge_id: string;
  reason: 'duplicado' | 'fraudulento' | 'solicitud_comprador';
}

export interface RefundUpdateDto {
  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface RefundResponse {
  object: 'refund';
  id: string;
  charge_id: string;
  creation_date: number;
  amount: number;
  reason: string;
  metadata?: Record<string, unknown>;
  status: 'pendiente' | 'rechazado' | 'completado';
  last_modified: number;
}

/* ------------------------------ List helpers ------------------------------ */

export interface RefundListResponse {
  data: RefundResponse[];
  paging: Paging & {
    remaining_items?: number;
  };
}

export interface RefundListQuery extends Record<string, unknown> {
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
}
