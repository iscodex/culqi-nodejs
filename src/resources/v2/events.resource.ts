import { HttpClient } from '../../client/http-client';
import { EventListQuery, EventListResponse, EventResponse } from '../../types/v2/events';
import { BaseResource } from '../base.resource';

/**
 * Events endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Eventos Documentation}.
 * */
export class Events extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/events`);
  }

  /**
   * Get events
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/events/find-by.ts Usage Example}
   * */
  findBy(params?: EventListQuery) {
    return this.get<EventListResponse>(undefined, { params });
  }

  /**
   * Get event
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/events/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<EventResponse>(`/${id}`);
  }
}
