import { HttpClient } from '../../client/http-client';
import {
  CustomerCreateDto,
  CustomerCancelResponse,
  CustomerListQuery,
  CustomerListResponse,
  CustomerResponse,
  CustomerUpdateDto,
} from '../../dtos/v2/customers.dto';
import { BaseResource } from '../base.resource';

export class Customers extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/customers`);
  }

  /** Create a customer */
  create(data: CustomerCreateDto) {
    return this.post<CustomerResponse>(undefined, { data });
  }

  /** List customers with optional filters */
  findBy(params?: CustomerListQuery) {
    return this.get<CustomerListResponse>(undefined, { params });
  }

  /** Retrieve a single customer by its id */
  find(id: string) {
    return this.get<CustomerResponse>(`/${id}`);
  }

  /** Partial update a customer by its id */
  update(id: string, data: CustomerUpdateDto) {
    return this.patch<CustomerResponse>(`/${id}`, { data });
  }

  /** Delete a single customer by its id */
  remove(id: string) {
    return this.del<CustomerCancelResponse>(`/${id}`);
  }
}
