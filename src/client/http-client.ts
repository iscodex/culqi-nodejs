import { CulqiOptions } from './culqi-client';

// Ideally injected from package.json at build time
const SDK_VERSION = '0.0.1';

/* -------------------------------------------------------------------------- */
/*                               Helper types                                 */
/* -------------------------------------------------------------------------- */

export interface RequestConfig {
  /** URL‑encoded query params */
  params?: Record<string, unknown>;
  /** JSON payload for POST / PATCH */
  data?: unknown;
  /** Extra HTTP headers */
  headers?: Record<string, string>;
  /** Use **public** key instead of secret */
  pub?: boolean;
  /** Override default timeout (ms) */
  timeout?: number;
  /** Override retry attempts */
  retries?: number;
}

export class CulqiError<T = unknown> extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly data: T | undefined,
  ) {
    super(message);
    this.name = 'CulqiError';
  }
}

/* -------------------------------------------------------------------------- */
/*                               HttpClient                                   */
/* -------------------------------------------------------------------------- */

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export class HttpClient {
  constructor(private readonly opts: CulqiOptions) {}

  /* -------------------------- Public facade (Axios‑like) -------------------------- */

  get<T = unknown>(url: string, cfg: RequestConfig = {}): Promise<T> {
    return this.request<T>('GET', url, cfg);
  }

  post<T = unknown>(url: string, cfg: RequestConfig): Promise<T> {
    return this.request<T>('POST', url, cfg);
  }

  patch<T = unknown>(url: string, cfg: RequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, cfg);
  }

  del<T = unknown>(url: string, cfg: RequestConfig = {}): Promise<T> {
    return this.request<T>('DELETE', url, cfg);
  }

  /* ------------------------------ Internals --------------------------------- */

  private headers(pub: boolean, extra?: Record<string, string>): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'User-Agent': `CulqiNodeSDK/${SDK_VERSION}`,
      Authorization: `Bearer ${pub ? this.opts.publicKey : this.opts.secretKey}`,
      ...extra,
    };
  }

  /** Serialize query parameters */
  private static serialize(params?: Record<string, unknown>): string {
    if (!params || Object.keys(params).length === 0) return '';
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) qs.append(k, String(v));
    }
    const s = qs.toString();
    return s ? `?${s}` : '';
  }

  private async request<T>(method: Method, path: string, cfg: RequestConfig): Promise<T> {
    const {
      params,
      data,
      headers: extraHeaders,
      pub = false,
      timeout = this.opts.timeout ?? 8000,
      retries = this.opts.retries ?? 2,
    } = cfg;

    const url = `${this.opts.baseUrl ?? 'https://api.culqi.com'}${path}${HttpClient.serialize(params)}`;
    const headers = this.headers(pub, extraHeaders);

    let attempt = 0;
    while (attempt <= retries) {
      const res = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        // @ts-expect-error Node fetch typings lack timeout
        timeout,
      });

      if (res.ok) {
        return (await res.json().catch(() => undefined)) as T;
      }

      if (attempt === retries) {
        const errJson = await res.json().catch(() => undefined);
        throw new CulqiError(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (errJson as any)?.merchant_message || res.statusText,
          res.status,
          errJson,
        );
      }
      attempt++;
    }
    /* istanbul ignore next */
    throw new CulqiError('Retry overflow', 500, undefined);
  }
}
