import { HttpClient } from '../../client/http-client';
import {
  CardCreateInput,
  CardResponse,
  CardListQuery,
  CardListResponse,
  CardUpdateInput,
} from '../../types/v2/cards';
import { DeleteResponse } from '../../types/v2/common';
import { BaseResource } from '../base.resource';

/**
 * Cards endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Tarjetas Documentation}.
 * */
export class Cards extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/cards`);
  }

  /**
   * Create card
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/cards/create.ts Usage Example}
   * */
  create(data: CardCreateInput) {
    return this.post<CardResponse>(undefined, { data });
  }

  /**
   * List cards
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/cards/find-by.ts Usage Example}
   * */
  findBy(params?: CardListQuery) {
    return this.get<CardListResponse>(undefined, { params });
  }

  /**
   * Get card
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/cards/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<CardResponse>(`/${id}`);
  }

  /**
   * Update card
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/cards/update.ts Usage Example}
   * */
  update(id: string, data: CardUpdateInput) {
    return this.patch<CardResponse>(`/${id}`, { data });
  }

  /**
   * Delete card
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/cards/remove.ts Usage Example}
   * */
  remove(id: string) {
    return this.del<DeleteResponse>(`/${id}`);
  }
}
