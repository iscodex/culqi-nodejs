import { HttpClient } from '../../client/http-client';
import {
  PlanCreateDto,
  PlanDeletingResponse,
  PlanListQuery,
  PlanListResponse,
  PlanResponse,
  PlanSavingResponse,
  PlanUpdateDto,
} from '../../dtos/v2/plans';
import { BaseResource } from '../base-resource';

export class Plans extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/recurrent/plans`);
  }

  /** Create a plan */
  create(data: PlanCreateDto) {
    return this.post<PlanSavingResponse>('/create', { data });
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
  update(id: string, data: PlanUpdateDto) {
    return this.patch<PlanResponse>(`/${id}`, { data });
  }

  /** Delete a single plan by its id */
  remove(id: string) {
    return this.del<PlanDeletingResponse>(`/${id}`);
  }
}
