import { describe, expect, it, jest } from '@jest/globals';
import { CulqiClient } from '../../src/client/culqi-client';
import * as httpClientModule from '../../src/client/http-client';

describe('CulqiClient', () => {
  it('wires v2 resources and propagates config', () => {
    // Spy and return a dummy object so `new` succeeds
    const ctorSpy = jest
      .spyOn(httpClientModule, 'HttpClient')
      .mockImplementation(() => ({}) as any);

    const sdk = CulqiClient.init({
      publicKey: 'pk_test',
      secretKey: 'sk_test',
      apiVersion: '2',
      baseUrl: 'https://culqi.example',
      retries: 5,
    });

    // All expected resource wrappers should exist
    const resources = [
      'tokens',
      'charges',
      'refunds',
      'customers',
      'cards',
      'plans',
      'subscriptions',
      'orders',
      'events',
    ];
    resources.forEach(r => expect((sdk as any)[r]).toBeDefined());

    // Expect the unknown key to be undefined (no throw)
    expect((sdk as any).foo).toBeUndefined();

    // First (and only) call argument contains merged defaults
    expect(ctorSpy.mock.calls[0][0]).toEqual(
      expect.objectContaining({ retries: 5, baseUrl: 'https://culqi.example' }),
    );

    ctorSpy.mockRestore();
  });
});
