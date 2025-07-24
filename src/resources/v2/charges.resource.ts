import { HttpClient } from '../../client/http-client';
import {
  ChargeCreateInput,
  ChargeResponse,
  ChargeListQuery,
  ChargeListResponse,
  ChargeUpdateInput,
} from '../../types/v2/charges';
import { NoAuthResponse } from '../../types/v2/common';
import { BaseResource } from '../base.resource';

/**
 * Charges endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Cargos Documentation}.
 * */
export class Charges extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/charges`);
  }

  /**
   * Create charge
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/charges/create.ts Usage Example}
   * */
  create(data: ChargeCreateInput) {
    return this.post<NoAuthResponse | ChargeResponse>(undefined, { data });
  }

  /**
   * Get charges
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/charges/find-by.ts Usage Example}
   * */
  findBy(params?: ChargeListQuery) {
    return this.get<ChargeListResponse>(undefined, { params });
  }

  /**
   * Get charge
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/charges/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<ChargeResponse>(`/${id}`);
  }

  /**
   * Update charge metadata
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/charges/update.ts Usage Example}
   * */
  update(id: string, data: ChargeUpdateInput) {
    return this.patch<ChargeResponse>(`/${id}`, { data });
  }

  /**
   * Capture charge
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/charges/capture.ts Usage Example}
   * */
  capture(id: string) {
    return this.post<ChargeResponse>(`/${id}/capture`);
  }
}
