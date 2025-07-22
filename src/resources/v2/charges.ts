import { BaseResource } from '../base-resource';
import type { HttpClient } from '../../client/http-client';
import type { ChargeCreateDto, ChargeResponse } from '../../dtos/v2/charges';

export class Charges extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/charges`);
  }

  /** Create a charge (secret key auth) */
  createCharge(payload: ChargeCreateDto) {
    return this.post<ChargeResponse, ChargeCreateDto>(payload);
  }

  /** Retrieve charge */
  getCharge(id: string) {
    return this.get<ChargeResponse>(`/${id}`);
  }
}
