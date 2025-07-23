import {
  TokenCreateInput,
  TokenCreateYapeInput,
  TokenListQuery,
  TokenListResponse,
  TokenResponse,
  TokenUpdateInput,
} from '@src/types/v2/tokens';
import type { HttpClient } from '../../client/http-client';
import { BaseResource } from '../base.resource';

/** Token endpoints for API v2 */
export class Tokens extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/tokens`);
  }

  /** Create a card token (public‑key auth) */
  create(data: TokenCreateInput) {
    return this.post<TokenResponse>(undefined, { data, pub: true });
  }

  /** List tokens with optional filters */
  findBy(params?: TokenListQuery) {
    return this.get<TokenListResponse>(undefined, { params });
  }

  /** Retrieve a single token by its id */
  find(id: string) {
    return this.get<TokenResponse>(`/${id}`);
  }

  /** Partial update – currently only metadata is supported */
  update(id: string, data: TokenUpdateInput) {
    return this.patch<TokenResponse>(`/${id}`, { data });
  }

  /** Create a Yape token (public‑key auth) */
  createYape(data: TokenCreateYapeInput) {
    return this.post<TokenResponse>('/yape', { data, pub: true });
  }
}
