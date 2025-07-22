import { HttpClient } from './http-client';
import { buildResources } from '../utils/resource-factory';
import type { CulqiVersion, ResourceMap } from '../types';

export interface CulqiOptions<V extends CulqiVersion = '2'> {
  publicKey: string;
  secretKey: string;
  apiVersion: V;
  baseUrl?: string;
  retries?: number;
  timeout?: number;
}

/** High-level Culqi client exposing versioned resources. */
export class CulqiClient<V extends CulqiVersion = '2'> {
  // Typed resources (different per version)
  readonly tokens: ResourceMap<V>['tokens'];
  readonly charges: ResourceMap<V>['charges'];
  readonly customers: ResourceMap<V>['customers'];
  readonly cards: ResourceMap<V>['cards'];
  readonly plans: ResourceMap<V>['plans'];

  private constructor(private readonly opts: CulqiOptions<V>) {
    const http = new HttpClient(opts);
    const resources = buildResources(opts.apiVersion, http);
    this.tokens = resources.tokens;
    this.charges = resources.charges;
    this.customers = resources.customers;
    this.cards = resources.cards;
    this.plans = resources.plans;
  }

  /** Fluent initializer with sensible defaults. */
  static init<V extends CulqiVersion>(opts: CulqiOptions<V>): CulqiClient<V> {
    return new CulqiClient({
      baseUrl: 'https://api.culqi.com',
      retries: 2,
      timeout: 8000,
      ...opts,
    });
  }
}
