import { HttpClient } from '../../client/http-client';
import { DeleteResponse } from '../../types/v2/common';
import {
  PlanCreateInput,
  PlanCreateResponse,
  PlanListQuery,
  PlanListResponse,
  PlanResponse,
  PlanUpdateInput,
} from '../../types/v2/plans';
import { BaseResource } from '../base.resource';

/**
 * Plans endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Planes Documentation}.
 * */
export class Plans extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/recurrent/plans`);
  }

  /**
   * Create plan
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/plans/create.ts Usage Example}
   * */
  create(data: PlanCreateInput) {
    return this.post<PlanCreateResponse>('/create', { data });
  }

  /**
   * List plans
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/plans/find-by.ts Usage Example}
   * */
  findBy(params?: PlanListQuery) {
    return this.get<PlanListResponse>(undefined, { params });
  }

  /**
   * Get plan
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/plans/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<PlanResponse>(`/${id}`);
  }

  /**
   * Update plan
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/plans/update.ts Usage Example}
   * */
  update(id: string, data: PlanUpdateInput) {
    return this.patch<PlanResponse>(`/${id}`, { data });
  }

  /**
   * Delete plan
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/plans/remove.ts Usage Example}
   * */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
