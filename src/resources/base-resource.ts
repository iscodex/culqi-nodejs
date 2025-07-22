import type { HttpClient } from '../client/http-client';

export abstract class BaseResource {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly basePath: string,
  ) {}

  protected get<T>(suffix = '') {
    return this.http.get<T>(`${this.basePath}${suffix}`);
  }

  protected post<T, B>(body: B, suffix = '', pub = false) {
    return this.http.post<T, B>(`${this.basePath}${suffix}`, body, pub);
  }

  protected patch<T, B>(body: B, suffix = '', pub = false) {
    return this.http.patch<T, B>(`${this.basePath}${suffix}`, body, pub);
  }

  protected del<T>(suffix = '', pub = false) {
    return this.http.del<T>(`${this.basePath}${suffix}`, pub);
  }
}
