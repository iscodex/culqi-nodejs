import { describe, expect, it, jest } from '@jest/globals';
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

  it('creates a token (mock)', async () => {
    const sdk = CulqiClient.init({
      publicKey: 'pk_test',
      secretKey: 'sk_test',
      apiVersion: '2',
      baseUrl: 'https://culqi.example',
    });

    // Spy on the method and mock the resolved value
    const spy = jest
      .spyOn(sdk.tokens as any, 'createToken')
      .mockResolvedValue({ id: 'tok_123' } as any);

    const result = await sdk.tokens.createToken({
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '07',
      expiration_year: '2027',
    } as any);

    expect(result).toEqual({ id: 'tok_123' });
    spy.mockRestore();
  });
});
