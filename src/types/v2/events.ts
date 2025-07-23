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
  creation_date?: string;
  creation_date_from?: string;
  creation_date_to?: string;
  limit?: string;
  before?: string;
  after?: string;
};
