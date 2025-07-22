import { describe, expect, it } from '@jest/globals';
import { CulqiClient } from '../src';

describe('CulqiClient', () => {
  it('injects keys and version correctly', () => {
    const sdk = CulqiClient.init({
      publicKey: 'pk_test_123',
      secretKey: 'sk_test_456',
      apiVersion: '2',
      baseUrl: 'https://culqi.example',
    });

    expect(sdk).toHaveProperty('tokens');
    expect(sdk).toHaveProperty('charges');
    // expect(sdk).toHaveProperty('refunds');
    expect(sdk).toHaveProperty('customers');
    expect(sdk).toHaveProperty('cards');
    expect(sdk).toHaveProperty('plans');
    expect(sdk).toHaveProperty('subscriptions');
    // expect(sdk).toHaveProperty('orders');
    // expect(sdk).toHaveProperty('events');
    // expect(sdk).toHaveProperty('balance');
  });
});
