import type { CulqiOptions } from './culqi-client';

export class HttpClient {
  constructor(private readonly opts: CulqiOptions) {}

  /** Build default headers for Culqi */
  private buildHeaders(usePublicKey: boolean): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${usePublicKey ? this.opts.publicKey : this.opts.secretKey}`,
    };
  }

  async get<T = unknown>(path: string): Promise<T> {
    return this.request<T>('GET', path, undefined, false);
  }

  async post<T = unknown, B = unknown>(path: string, body: B, usePublicKey = false): Promise<T> {
    return this.request<T>('POST', path, body, usePublicKey);
  }

  private async request<T>(
    method: 'GET' | 'POST',
    path: string,
    body?: unknown,
    usePublicKey = false,
  ): Promise<T> {
    const { retries = 2, timeout = 8000, baseUrl = 'https://api.culqi.com' } = this.opts;
    const url = `${baseUrl}${path}`;
    const headers = this.buildHeaders(usePublicKey);

    let attempt = 0;
    // Very simple retry loop
    while (attempt <= retries) {
      const res = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        // @ts-expect-error  — fetch in Node does not yet expose timeout in typings
        timeout,
      });

      if (res.ok) {
        return (await res.json()) as T;
      }

      if (attempt === retries) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody?.merchant_message || `HTTP ${res.status} – ${res.statusText}`);
      }
      attempt++;
    }

    // Should never reach
    throw new Error('Unhandled retry loop');
  }
}
