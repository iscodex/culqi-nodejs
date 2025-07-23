import { HttpClient } from '../../client/http-client';
import {
  CardCreateInput,
  CardResponse,
  CardListQuery,
  CardListResponse,
  CardUpdateInput,
} from '../../types/v2/cards';
import { NoAuthResponse, DeleteResponse } from '../../types/v2/common';
import { BaseResource } from '../base.resource';

export class Cards extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/cards`);
  }

  /** Create a card */
  create(data: CardCreateInput) {
    return this.post<CardResponse>(undefined, { data });
  }

  /** List cards with optional filters */
  findBy(params?: CardListQuery) {
    return this.get<NoAuthResponse | CardListResponse>(undefined, { params });
  }

  /** Retrieve a single card by its id */
  find(id: string) {
    return this.get<CardResponse>(`/${id}`);
  }

  /** Partial update a card by its id */
  update(id: string, data: CardUpdateInput) {
    return this.patch<CardResponse>(`/${id}`, { data });
  }

  /** Delete a single card by its id */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
