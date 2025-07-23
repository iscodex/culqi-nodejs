import { HttpClient } from '../../client/http-client';
import {
  OrderTypeConfirmDto,
  OrderCreateDto,
  OrderListQuery,
  OrderListResponse,
  OrderResponse,
  OrderUpdateDto,
} from '../../dtos/v2/orders.dto';
import { BaseResource } from '../base.resource';

export class Orders extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/orders`);
  }

  /** Create a order */
  create(data: OrderCreateDto) {
    return this.post<OrderResponse>(undefined, { data });
  }

  /** List orders with optional filters */
  findBy(params?: OrderListQuery) {
    return this.get<OrderListResponse>(undefined, { params });
  }

  /** Confirm a order */
  confirm(id: string) {
    return this.post<OrderResponse>(`/${id}/confirm`, { pub: true });
  }

  /** Confirm a order type */
  confirmWithType(data: OrderTypeConfirmDto) {
    return this.post<OrderResponse>(`/confirm`, { data, pub: true });
  }

  /** Retrieve a single order by its id */
  find(id: string) {
    return this.get<OrderResponse>(`/${id}`);
  }

  /** Partial update a order by its id */
  update(id: string, data: OrderUpdateDto) {
    return this.patch<OrderResponse>(`/${id}`, { data });
  }

  /** Delete a single order by its id */
  remove(id: string) {
    return this.del<OrderResponse>(`/${id}`);
  }
}
