import { HttpClient } from '../../client/http-client';
import { EventListQuery, EventListResponse, EventResponse } from '../../dtos/v2/events';
import { BaseResource } from '../base.resource';

export class Events extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/events`);
  }

  /** List cards with optional filters */
  findBy(params?: EventListQuery) {
    return this.get<EventListResponse>(undefined, { params });
  }

  /** Retrieve a single event by its id */
  find(id: string) {
    return this.get<EventResponse>(`/${id}`);
  }
}
