import { HttpClient } from '../../client/http-client';
import { DeleteResponse } from '../../types/v2/common';
import {
  CustomerCreateInput,
  CustomerResponse,
  CustomerListQuery,
  CustomerListResponse,
  CustomerUpdateInput,
} from '../../types/v2/customers';
import { BaseResource } from '../base.resource';

/**
 * Customers endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Clientes Documentation}.
 * */
export class Customers extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/customers`);
  }

  /**
   * Create customer
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/customers/create.ts Usage Example}
   * */
  create(data: CustomerCreateInput) {
    return this.post<CustomerResponse>(undefined, { data });
  }

  /**
   * List customers
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/customers/find-by.ts Usage Example}
   * */
  findBy(params?: CustomerListQuery) {
    return this.get<CustomerListResponse>(undefined, { params });
  }

  /**
   * Get customer
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/customers/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<CustomerResponse>(`/${id}`);
  }

  /**
   * Update customer
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/customers/update.ts Usage Example}
   * */
  update(id: string, data: CustomerUpdateInput) {
    return this.patch<CustomerResponse>(`/${id}`, { data });
  }

  /**
   * Delete customer
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/customers/remove.ts Usage Example}
   * */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
