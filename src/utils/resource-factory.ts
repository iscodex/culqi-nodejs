import { CulqiVersion, ResourceMap } from '@src/type';
import { HttpClient } from '@client/http-client';
import * as V2 from '@resources/v2';

// import * as V3 from '../resources/v3';

/**
 * Returns an object with the appropriate resources for the given API version.
 */
export function buildResources<V extends CulqiVersion>(
  version: V,
  http: HttpClient,
): ResourceMap<V> {
  switch (version) {
    case '2':
      return {
        tokens: new V2.Tokens(http, version),
        charges: new V2.Charges(http, version),
        refunds: new V2.Refunds(http, version),
        customers: new V2.Customers(http, version),
        cards: new V2.Cards(http, version),
        plans: new V2.Plans(http, version),
        subscriptions: new V2.Subscriptions(http, version),
        orders: new V2.Orders(http, version),
        events: new V2.Events(http, version),
      } as ResourceMap<V>;
    default:
      throw new Error(`Unsupported API version: ${version}`);
  }
}
