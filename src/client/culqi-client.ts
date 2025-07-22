import { HttpClient } from './http-client';
import { Tokens } from '../resources/v2/tokens';
import { Charges } from '../resources/v2/charges';

export interface CulqiOptions {
  publicKey: string;
  secretKey: string;
  apiVersion: '2'; // "2" | "3"
  baseUrl?: string;
  retries?: number;
  timeout?: number;
}

/**
 * High‑level Culqi client. Holds configuration and exposes typed resources.
 */
export class CulqiClient {
  /** Token resource wrapper (public‑key auth) */
  readonly tokens: Tokens;

  /** Charges resource wrapper (secret‑key auth) */
  readonly charges: Charges;

  private constructor(private readonly opts: CulqiOptions) {
    const http = new HttpClient(opts);

    this.tokens = new Tokens(http, opts.apiVersion);
    this.charges = new Charges(http, opts.apiVersion);
  }

  /** Fluent initializer */
  static init(opts: CulqiOptions): CulqiClient {
    return new CulqiClient({
      baseUrl: 'https://api.culqi.com',
      retries: 2,
      timeout: 8000,
      ...opts,
    });
  }
}
