import { CulqiVersion, ResourceMap } from '../types/resource';
import { buildResources } from '../utils/resource-factory';
import { HttpClient } from './http-client';

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
  readonly refunds: ResourceMap<V>['refunds'];
  readonly customers: ResourceMap<V>['customers'];
  readonly cards: ResourceMap<V>['cards'];
  readonly plans: ResourceMap<V>['plans'];
  readonly subscriptions: ResourceMap<V>['subscriptions'];
  readonly orders: ResourceMap<V>['orders'];
  readonly events: ResourceMap<V>['events'];

  private constructor(private readonly opts: CulqiOptions<V>) {
    const http = new HttpClient(opts);
    const r = buildResources(opts.apiVersion, http);
    this.tokens = r.tokens;
    this.charges = r.charges;
    this.refunds = r.refunds;
    this.customers = r.customers;
    this.cards = r.cards;
    this.plans = r.plans;
    this.subscriptions = r.subscriptions;
    this.orders = r.orders;
    this.events = r.events;
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
