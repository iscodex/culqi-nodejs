import {
  CardCreateInput,
  CardListQuery,
  CardListResponse,
  CardResponse,
  CardUpdateInput,
} from '@src/types/v2/cards';
import { HttpClient } from '../../client/http-client';
import { BaseResource } from '../base.resource';
import { DeleteResponse, NoAuthResponse } from '@src/types/v2';

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
