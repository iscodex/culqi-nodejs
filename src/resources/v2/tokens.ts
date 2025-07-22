import { BaseResource } from '../base-resource';
import type { HttpClient } from '../../client/http-client';
import type { TokenCreateDto, TokenResponse } from '../../dtos/v2/tokens';

/**
 * Token endpoints for API v2.
 * `createToken` must use the public key; retrieval uses the secret key.
 */
export class Tokens extends BaseResource {
  constructor(http: HttpClient, apiVersion: string) {
    super(http, `/v${apiVersion}/tokens`);
  }

  /** Create a token (public-key auth) */
  createToken(payload: TokenCreateDto) {
    return this.post<TokenResponse, TokenCreateDto>(payload, '', true);
  }

  /** Retrieve a token by its ID (secret-key auth) */
  getToken(id: string) {
    return this.get<TokenResponse>(`/${id}`);
  }
}
