import { HttpClient } from '../../client/http-client';
import {
  CardCreateDto,
  CardCancelResponse,
  CardListQuery,
  CardListResponse,
  CardPendingResponse,
  CardResponse,
  CardUpdateDto,
} from '../../dtos/v2/cards';
import { BaseResource } from '../base.resource';

export class Cards extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/cards`);
  }

  /** Create a card */
  create(data: CardCreateDto) {
    return this.post<CardResponse>(undefined, { data });
  }

  /** List cards with optional filters */
  findBy(params?: CardListQuery) {
    return this.get<CardPendingResponse | CardListResponse>(undefined, { params });
  }

  /** Retrieve a single card by its id */
  find(id: string) {
    return this.get<CardResponse>(`/${id}`);
  }

  /** Partial update a card by its id */
  update(id: string, data: CardUpdateDto) {
    return this.patch<CardResponse>(`/${id}`, { data });
  }

  /** Delete a single card by its id */
  remove(id: string) {
    return this.del<CardCancelResponse>(`/${id}`);
  }
}
