import { HttpClient } from '../../client/http-client';
import {
  OrderCreateInput,
  OrderResponse,
  OrderListQuery,
  OrderListResponse,
  OrderTypeConfirmInput,
  OrderUpdateInput,
} from '../../types/v2/orders';
import { BaseResource } from '../base.resource';

/**
 * Orders endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Ordenes Documentation}.
 * */
export class Orders extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/orders`);
  }

  /**
   * Create order
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/create.ts Usage Example}
   * */
  create(data: OrderCreateInput) {
    return this.post<OrderResponse>(undefined, { data });
  }

  /**
   * Get orders
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/find-by.ts Usage Example}
   * */
  findBy(params?: OrderListQuery) {
    return this.get<OrderListResponse>(undefined, { params });
  }

  /**
   * Confirm order
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/confirm.ts Usage Example}
   * */
  confirm(id: string) {
    return this.post<OrderResponse>(`/${id}/confirm`, { pub: true });
  }

  /**
   * Confirm order type
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/confirm-with-type.ts Usage Example}
   * */
  confirmWithType(data: OrderTypeConfirmInput) {
    return this.post<OrderResponse>(`/confirm`, { data, pub: true });
  }
  /**
   * Get order
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<OrderResponse>(`/${id}`);
  }

  /**
   * Update order
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/update.ts Usage Example}
   * */
  update(id: string, data: OrderUpdateInput) {
    return this.patch<OrderResponse>(`/${id}`, { data });
  }

  /**
   * Delete order
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/orders/remove.ts Usage Example}
   * */
  remove(id: string) {
    return this.del<OrderResponse>(`/${id}`);
  }
}
