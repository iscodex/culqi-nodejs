import type { CulqiOptions } from './culqi-client';

const SDK_VERSION = '0.0.1';

export class HttpClient {
  constructor(private readonly opts: CulqiOptions) {}

  /** Build default headers for Culqi */
  private buildHeaders(usePublicKey: boolean): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'User-Agent': `CulqiNodeSDK/${SDK_VERSION}`,
      Authorization: `Bearer ${usePublicKey ? this.opts.publicKey : this.opts.secretKey}`,
    };
  }

  /* ------------------------------- Public API ------------------------------- */

  get<T = unknown>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  post<T = unknown, B = unknown>(path: string, body: B, usePublicKey = false): Promise<T> {
    return this.request<T>('POST', path, body, usePublicKey);
  }

  patch<T = unknown, B = unknown>(path: string, body: B, usePublicKey = false): Promise<T> {
    return this.request<T>('PATCH', path, body, usePublicKey);
  }

  /** `delete` is reserved, so we expose `del` instead. */
  del<T = unknown>(path: string, usePublicKey = false): Promise<T> {
    return this.request<T>('DELETE', path, undefined, usePublicKey);
  }

  /* ------------------------------ Internals --------------------------------- */

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    usePublicKey = false,
  ): Promise<T> {
    const { retries = 2, timeout = 8000, baseUrl = 'https://api.culqi.com' } = this.opts;
    const url = `${baseUrl}${path}`;
    const headers = this.buildHeaders(usePublicKey);

    let attempt = 0;
    while (attempt <= retries) {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        // @ts-expect-error Node fetch typings still lack timeout
        timeout,
      });

      if (res.ok) return (await res.json()) as T;

      if (attempt === retries) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson?.merchant_message || `HTTP ${res.status} – ${res.statusText}`);
      }
      attempt++;
    }
    /* istanbul ignore next */
    throw new Error('Unexpected retry overflow');
  }
}
