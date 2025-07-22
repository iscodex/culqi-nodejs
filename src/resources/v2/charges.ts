import { BaseResource } from '../base-resource';
import type { HttpClient } from '../../client/http-client';
import type {
  ChargeCreateDto,
  ChargeListQuery,
  ChargeListResponse,
  ChargeResponse,
  ChargeUpdateDto,
} from '../../dtos/v2/charges';

/**
 * Charge endpoints for API v2.
 */
export class Charges extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/charges`);
  }

  /** Create a charge */
  create(payload: ChargeCreateDto) {
    return this.post<ChargeResponse, ChargeCreateDto>(payload);
  }

  // /** List charges with optional filters */
  findBy(query?: ChargeListQuery) {
    return this.get<ChargeListResponse>('', query);
  }

  /** Retrieve a single charge by its id */
  find(id: string) {
    return this.get<ChargeResponse>(`/${id}`);
  }

  /** Partial update – currently only metadata is supported */
  update(id: string, payload: ChargeUpdateDto) {
    return this.patch<ChargeResponse, ChargeUpdateDto>(`/${id}`, payload);
  }

  /** Capture a transaction by its id */
  capture(id: string) {
    return this.post<ChargeResponse, null>(null, `/${id}/capture`);
  }
}
