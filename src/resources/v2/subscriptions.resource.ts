import { HttpClient } from '../../client/http-client';
import {
  SubscriptionCancelResponse,
  SubscriptionCreateDto,
  SubscriptionCreateResponse,
  SubscriptionListQuery,
  SubscriptionListResponse,
  SubscriptionResponse,
  SubscriptionUpdateDto,
} from '../../dtos/v2/subscriptions.dto';
import { BaseResource } from '../base.resource';

export class Subscriptions extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/recurrent/subscriptions`);
  }

  /** Create a subscription */
  create(data: SubscriptionCreateDto) {
    return this.post<SubscriptionCreateResponse>('/create', { data });
  }

  /** List subscriptions with optional filters */
  findBy(params?: SubscriptionListQuery) {
    return this.get<SubscriptionListResponse>(undefined, { params });
  }

  /** Retrieve a single subscription by its id */
  find(id: string) {
    return this.get<SubscriptionResponse>(`/${id}`);
  }

  /** Partial update a subscription by its id */
  update(id: string, data: SubscriptionUpdateDto) {
    return this.patch<SubscriptionResponse>(`/${id}`, { data });
  }

  /** Delete a single subscription by its id */
  remove(id: string) {
    return this.del<SubscriptionCancelResponse>(`/${id}`);
  }
}
