import { Paging } from './common';

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type EventResponse = {
  object: 'event';
  type: string;
  data: unknown;
};

/* ------------------------------ List helpers ------------------------------ */

export type EventListResponse = {
  data: EventResponse[];
  paging: Paging;
};

export type EventListQuery = {
  type?: string;
  creation_date?: number;
  creation_date_from?: number;
  creation_date_to?: number;
  limit?: number;
  before?: string;
  after?: string;
};
