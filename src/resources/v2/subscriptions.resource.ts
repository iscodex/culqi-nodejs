import { HttpClient } from '../../client/http-client';
import { DeleteResponse } from '../../types/v2/common';
import {
  SubscriptionCreateInput,
  SubscriptionCreateResponse,
  SubscriptionListQuery,
  SubscriptionListResponse,
  SubscriptionResponse,
  SubscriptionUpdateInput,
} from '../../types/v2/subscriptions';
import { BaseResource } from '../base.resource';

/**
 * Subscriptions endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Tarjetas Documentation}.
 * */
export class Subscriptions extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/recurrent/subscriptions`);
  }

  /**
   * Create subscription
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/subscriptions/create.ts Usage Example}
   * */
  create(data: SubscriptionCreateInput) {
    return this.post<SubscriptionCreateResponse>('/create', { data });
  }

  /**
   * List subscriptions
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/subscriptions/find-by.ts Usage Example}
   * */
  findBy(params?: SubscriptionListQuery) {
    return this.get<SubscriptionListResponse>(undefined, { params });
  }

  /**
   * Get subscription
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/subscriptions/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<SubscriptionResponse>(`/${id}`);
  }

  /**
   * Update subscription
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/subscriptions/update.ts Usage Example}
   * */
  update(id: string, data: SubscriptionUpdateInput) {
    return this.patch<SubscriptionResponse>(`/${id}`, { data });
  }

  /**
   * Cancel subscription
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/subscriptions/remove.ts Usage Example}
   * */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
