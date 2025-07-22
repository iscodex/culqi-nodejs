import { HttpClient } from '../../client/http-client';
import {
  RefundCreateDto,
  RefundListQuery,
  RefundListResponse,
  RefundResponse,
  RefundUpdateDto,
} from '../../dtos/v2/refunds';
import { BaseResource } from '../base-resource';

export class Refunds extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/refunds`);
  }

  /** Create a refund */
  create(data: RefundCreateDto) {
    return this.post<RefundResponse>(undefined, { data });
  }

  /** List refunds with optional filters */
  findBy(params?: RefundListQuery) {
    return this.get<RefundListResponse>(undefined, { params });
  }

  /** Retrieve a single refund by its id */
  find(id: string) {
    return this.get<RefundResponse>(`/${id}`);
  }

  /** Partial update a refund by its id */
  update(id: string, data: RefundUpdateDto) {
    return this.patch<RefundResponse>(`/${id}`, { data });
  }
}
