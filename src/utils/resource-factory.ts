import { HttpClient } from '../client/http-client';
import * as V2 from '../resources/v2';
// import * as V3 from '../resources/v3';
import type { CulqiVersion, ResourceMap } from '../types';

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
        customers: new V2.Customers(http, version),
      } as ResourceMap<V>;
    // case '3':
    //   return {
    //     tokens: new V3.Tokens(http, version),
    //     charges: new V3.Charges(http, version),
    //   } as ResourceMap<V>;
    /* istanbul ignore next */
    default:
      throw new Error(`Unsupported API version: ${version}`);
  }
}
