import { BaseResource } from '../base-resource';
import type { HttpClient } from '../../client/http-client';
import type {
  TokenCreateDto,
  TokenCreateYapeDto,
  TokenListQuery,
  TokenListResponse,
  TokenResponse,
  TokenUpdateDto,
} from '../../dtos/v2/tokens';

/**
 * Token endpoints for API v2.
 * `create` and `createYape` must use the public key; retrieval uses the secret key.
 */
export class Tokens extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/tokens`);
  }

  /** Create a card token (public‑key auth) */
  create(payload: TokenCreateDto) {
    return this.post<TokenResponse, TokenCreateDto>(payload, '', true);
  }

  /** Create a Yape token (public‑key auth) */
  createYape(payload: TokenCreateYapeDto) {
    return this.post<TokenResponse, TokenCreateYapeDto>(payload, '/yape', true);
  }

  /** Partial update – currently only metadata is supported */
  update(id: string, payload: TokenUpdateDto) {
    return this.patch<TokenResponse, TokenUpdateDto>(`/${id}`, payload);
  }

  /** Retrieve a single token by its id */
  find(id: string) {
    return this.get<TokenResponse>(`/${id}`);
  }

  /** List tokens with optional filters */
  findBy(query?: TokenListQuery) {
    return this.get<TokenListResponse>('', query);
  }
}
