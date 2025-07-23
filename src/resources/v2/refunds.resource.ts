import { HttpClient } from '../../client/http-client';
import {
  RefundCreateInput,
  RefundResponse,
  RefundListQuery,
  RefundListResponse,
  RefundUpdateInput,
} from '../../types/v2/refunds';
import { BaseResource } from '../base.resource';

/**
 * Refunds endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Devoluciones Documentation}.
 * */
export class Refunds extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/refunds`);
  }

  /**
   * Create refund
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/refunds/create.ts Usage Example}
   * */
  create(data: RefundCreateInput) {
    return this.post<RefundResponse>(undefined, { data });
  }

  /**
   * List refunds
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/refunds/find-by.ts Usage Example}
   * */
  findBy(params?: RefundListQuery) {
    return this.get<RefundListResponse>(undefined, { params });
  }

  /**
   * Get refund
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/refunds/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<RefundResponse>(`/${id}`);
  }

  /**
   * Update refund metadata
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/refunds/update.ts Usage Example}
   * */
  update(id: string, data: RefundUpdateInput) {
    return this.patch<RefundResponse>(`/${id}`, { data });
  }
}
