import type { HttpClient } from '../../client/http-client';
import type { ChargeCreateDto, ChargeResponse } from '../../dtos/v2/charges';

export class Charges {
  private readonly basePath: string;

  constructor(
    private readonly http: HttpClient,
    apiVersion: string,
  ) {
    this.basePath = `/v${apiVersion}/charges`;
  }

  /** Create a charge (secret key auth) */
  async createCharge(payload: ChargeCreateDto): Promise<ChargeResponse> {
    return this.http.post(this.basePath, payload, false);
  }

  /** Retrieve charge */
  async getCharge(id: string): Promise<ChargeResponse> {
    return this.http.get(`${this.basePath}/${id}`);
  }
}
