import type { HttpClient } from '../../client/http-client';
import type {
  ChargeCreateDto,
  ChargeListQuery,
  ChargeListResponse,
  ChargePendingResponse,
  ChargeResponse,
  ChargeUpdateDto,
} from '../../dtos/v2/charges';
import { BaseResource } from '../base.resource';

/** Charge endpoints for API v2 */
export class Charges extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/charges`);
  }

  /** Create a charge */
  create(data: ChargeCreateDto) {
    return this.post<ChargePendingResponse | ChargeResponse>(undefined, { data });
  }

  /** List charges with optional filters */
  findBy(params?: ChargeListQuery) {
    return this.get<ChargeListResponse>(undefined, { params });
  }

  /** Retrieve a single charge by its id */
  find(id: string) {
    return this.get<ChargeResponse>(`/${id}`);
  }

  /** Partial update – currently only metadata is supported */
  update(id: string, data: ChargeUpdateDto) {
    return this.patch<ChargeResponse>(`/${id}`, { data });
  }

  /** Capture a transaction by its id */
  capture(id: string) {
    return this.post<ChargeResponse>(`/${id}/capture`);
  }
}
