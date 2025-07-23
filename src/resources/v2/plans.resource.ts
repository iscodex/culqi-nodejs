import {
  PlanCreateInput,
  PlanCreateResponse,
  PlanListQuery,
  PlanListResponse,
  PlanResponse,
  PlanUpdateInput,
} from '@src/types/v2/plans';
import { HttpClient } from '../../client/http-client';
import { BaseResource } from '../base.resource';
import { DeleteResponse } from '@src/types/v2';

export class Plans extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/recurrent/plans`);
  }

  /** Create a plan */
  create(data: PlanCreateInput) {
    return this.post<PlanCreateResponse>('/create', { data });
  }

  /** List plans with optional filters */
  findBy(params?: PlanListQuery) {
    return this.get<PlanListResponse>(undefined, { params });
  }

  /** Retrieve a single plan by its id */
  find(id: string) {
    return this.get<PlanResponse>(`/${id}`);
  }

  /** Partial update a plan by its id */
  update(id: string, data: PlanUpdateInput) {
    return this.patch<PlanResponse>(`/${id}`, { data });
  }

  /** Delete a single plan by its id */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
