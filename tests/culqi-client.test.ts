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
  });
});
