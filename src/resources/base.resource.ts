import type { HttpClient, RequestConfig } from '../client/http-client';

/**
 * Shared helpers for resource classes.
 * Handles path concatenation, query parameters and public‑key flag.
 */
export abstract class BaseResource {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly basePath: string,
  ) {}

  /* -------------------------- Convenience wrappers ------------------------- */

  protected get<T>(path = '', cfg?: RequestConfig) {
    return this.http.get<T>(`${this.basePath}${path}`, { pub: false, ...cfg });
  }

  protected post<T>(path = '', cfg?: RequestConfig) {
    return this.http.post<T>(`${this.basePath}${path}`, { pub: false, ...cfg });
  }

  protected patch<T>(path = '', cfg?: RequestConfig) {
    return this.http.patch<T>(`${this.basePath}${path}`, { pub: false, ...cfg });
  }

  protected del<T>(path = '', cfg?: RequestConfig) {
    return this.http.del<T>(`${this.basePath}${path}`, { pub: false, ...cfg });
  }
}
