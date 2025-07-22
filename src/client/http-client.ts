import type { CulqiOptions } from './culqi-client';

// Ideally injected from package.json at build time
const SDK_VERSION = '0.0.1';

/**
 * Minimal HTTP adapter (Node ≥ 18) with simple retries and optional public‑key auth.
 */
export class HttpClient {
  constructor(private readonly opts: CulqiOptions) {}

  /* ----------------------------------------------------------------------- */
  /*                              Header helpers                             */
  /* ----------------------------------------------------------------------- */

  private buildHeaders(pub: boolean): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'User-Agent': `CulqiNodeSDK/${SDK_VERSION}`,
      Authorization: `Bearer ${pub ? this.opts.publicKey : this.opts.secretKey}`,
    };
  }

  /** Serialize an object to query‑string – undefined / null values skipped. */
  private static toQuery(params?: Record<string, unknown>): string {
    if (!params || Object.keys(params).length === 0) return '';
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) qs.append(k, String(v));
    }
    const s = qs.toString();
    return s ? `?${s}` : '';
  }

  /* ----------------------------------------------------------------------- */
  /*                               Public API                                */
  /* ----------------------------------------------------------------------- */

  get<T = unknown>(path: string, query?: Record<string, unknown>, pub = false): Promise<T> {
    return this.request<T>('GET', `${path}${HttpClient.toQuery(query)}`, undefined, pub);
  }

  post<T = unknown, B = unknown>(path: string, body: B, pub = false): Promise<T> {
    return this.request<T>('POST', path, body, pub);
  }

  patch<T = unknown, B = unknown>(path: string, body: B, pub = false): Promise<T> {
    return this.request<T>('PATCH', path, body, pub);
  }

  del<T = unknown>(path: string, pub = false): Promise<T> {
    return this.request<T>('DELETE', path, undefined, pub);
  }

  /* ----------------------------------------------------------------------- */
  /*                                Internal                                 */
  /* ----------------------------------------------------------------------- */

  private async request<T>(
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    pub = false,
  ): Promise<T> {
    const { retries = 2, timeout = 8000, baseUrl = 'https://api.culqi.com' } = this.opts;
    const url = `${baseUrl}${path}`;
    const headers = this.buildHeaders(pub);

    let attempt = 0;
    while (attempt <= retries) {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        // @ts-expect-error – timeout not yet in lib.dom
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
    throw new Error('Retry overflow');
  }
}
