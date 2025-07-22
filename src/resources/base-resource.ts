import type { HttpClient } from '../client/http-client';

export abstract class BaseResource {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly basePath: string,
  ) {}

  /* ----------------------------- Helper wrappers ---------------------------- */

  protected get<T>(suffix = '', query?: Record<string, unknown>, pub = false) {
    return this.http.get<T>(`${this.basePath}${suffix}`, query, pub);
  }

  protected post<T, B>(body: B, suffix = '', pub = false) {
    return this.http.post<T, B>(`${this.basePath}${suffix}`, body, pub);
  }

  protected patch<T, B>(suffix: string, body: B, pub = false) {
    return this.http.patch<T, B>(`${this.basePath}${suffix}`, body, pub);
  }

  protected del<T>(suffix = '', pub = false) {
    return this.http.del<T>(`${this.basePath}${suffix}`, pub);
  }
}
