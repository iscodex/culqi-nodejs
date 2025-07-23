import { HttpClient } from '../../client/http-client';
import {
  TokenCreateInput,
  TokenResponse,
  TokenListQuery,
  TokenListResponse,
  TokenUpdateInput,
  TokenCreateYapeInput,
} from '../../types/v2/tokens';
import { BaseResource } from '../base.resource';

/**
 * Tokens endpoints for API v2
 *
 * @see {@link https://apidocs.culqi.com/#tag/Tokens Documentation}.
 * */
export class Tokens extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/tokens`);
  }

  /**
   * Create token
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/tokens/create.ts Usage Example}
   * */
  create(data: TokenCreateInput) {
    return this.post<TokenResponse>(undefined, { data, pub: true });
  }

  /**
   * List tokens
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/tokens/find-by.ts Usage Example}
   * */
  findBy(params?: TokenListQuery) {
    return this.get<TokenListResponse>(undefined, { params });
  }

  /**
   * Get token
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/tokens/find.ts Usage Example}
   * */
  find(id: string) {
    return this.get<TokenResponse>(`/${id}`);
  }

  /**
   * Update token metadata
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/tokens/update.ts Usage Example}
   * */
  update(id: string, data: TokenUpdateInput) {
    return this.patch<TokenResponse>(`/${id}`, { data });
  }

  /**
   * Create token for yape
   *
   * @see {@link https://github.com/iscodex/culqi-nodejs/blob/main/src/examples/tokens/create-yape.ts Usage Example}
   * */
  createYape(data: TokenCreateYapeInput) {
    return this.post<TokenResponse>('/yape', { data, pub: true });
  }
}
