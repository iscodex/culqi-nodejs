import { HttpClient } from '../../client/http-client';
import {
  BillingListQuery,
  BillingListResponse,
  OperationListQuery,
  OperationListResponse,
  SettlementDetailResponse,
  SettlementListQuery,
  SettlementResponse,
} from '../../types/v2/statements';
import { BaseResource } from '../base.resource';

/**
 * Statements endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Estado-Cuenta Documentation}.
 * */
export class Statements extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/balance`);
  }

  /**
   * List operations
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/statements/operations.ts Usage Example}
   * */
  operations(params?: OperationListQuery) {
    return this.get<OperationListResponse>('/operations', { params });
  }

  /**
   * List deposits
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/statements/deposits.ts Usage Example}
   * */
  deposits(params?: SettlementListQuery) {
    return this.get<SettlementResponse[]>('/deposits', { params });
  }

  /**
   * Get deposit detail
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/statements/deposit-detail.ts Usage Example}
   * */
  deposit(id: string) {
    return this.get<SettlementDetailResponse>(`/deposits/${id}`);
  }

  /**
   * List billings
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/statements/billings.ts Usage Example}
   * */
  billings(params?: BillingListQuery) {
    return this.get<BillingListResponse>('/billing-operations', { params });
  }
}
