import type { HttpClient } from '../../client/http-client';
import type { TokenCreateDto, TokenResponse } from '../../dtos/v2/tokens';

export class Tokens {
  private readonly basePath: string;

  constructor(
    private readonly http: HttpClient,
    apiVersion: string,
  ) {
    this.basePath = `/v${apiVersion}/tokens`;
  }

  /** Create token (public key auth) */
  async createToken(payload: TokenCreateDto): Promise<TokenResponse> {
    return this.http.post(this.basePath, payload, true);
  }

  /** Retrieve token by id */
  async getToken(id: string): Promise<TokenResponse> {
    return this.http.get(`${this.basePath}/${id}`);
  }
}
