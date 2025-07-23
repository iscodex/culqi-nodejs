import type { HttpClient } from '../../client/http-client';
import type {
  TokenCreateDto,
  TokenCreateYapeDto,
  TokenListQuery,
  TokenListResponse,
  TokenResponse,
  TokenUpdateDto,
} from '../../dtos/v2/tokens.dto';
import { BaseResource } from '../base.resource';

/** Token endpoints for API v2 */
export class Tokens extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/tokens`);
  }

  /** Create a card token (public‑key auth) */
  create(data: TokenCreateDto) {
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
  update(id: string, data: TokenUpdateDto) {
    return this.patch<TokenResponse>(`/${id}`, { data });
  }

  /** Create a Yape token (public‑key auth) */
  createYape(data: TokenCreateYapeDto) {
    return this.post<TokenResponse>('/yape', { data, pub: true });
  }
}
