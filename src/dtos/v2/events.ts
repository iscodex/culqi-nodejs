/**
 * Data Transfer Objects for Event endpoints (API v2)
 * Docs: https://apidocs.culqi.com/#tag/Eventos
 */

import { Paging } from './tokens';

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export interface EventResponse {
  object: 'event';
  type: string;
  data: unknown;
}

/* ------------------------------ List helpers ------------------------------ */

export interface EventListResponse {
  data: EventResponse[];
  paging: Paging & {
    remaining_items?: number;
  };
}

export interface EventListQuery extends Record<string, unknown> {
  type?: string;
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  limit?: string;
  before?: string;
  after?: string;
}
