import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Tokens } from '../../../src/resources/v2/tokens';

/**
 * Unit‑tests for Token resource wrapper (API v2).
 * We inject a mocked HttpClient and assert the correct paths, flags and payloads.
 */
describe('Tokens resource (v2)', () => {
  let http: any;
  let tokens: Tokens;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    tokens = new Tokens(http, '2');
  });

  it('create() posts to /v2/tokens with public‑key auth', async () => {
    const payload = {
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '07',
      expiration_year: '2027',
      email: 'test@example.com',
    } as any;

    http.post.mockResolvedValue({ id: 'tkn_123' });

    const res = await tokens.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/tokens', payload, true);
    expect(res).toEqual({ id: 'tkn_123' });
  });

  it('createYape() posts to /v2/tokens/yape with public‑key auth', async () => {
    const payload = { otp: '123456', number_phone: '987654321', amount: '1000' } as any;

    http.post.mockResolvedValue({ id: 'tok_yape_123' });

    const res = await tokens.createYape(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/tokens/yape', payload, true);
    expect(res).toEqual({ id: 'tok_yape_123' });
  });

  it('find() fetches a single token via GET', async () => {
    http.get.mockResolvedValue({ id: 'tkn_123' });

    await tokens.find('tkn_123');

    expect(http.get).toHaveBeenCalledWith('/v2/tokens/tkn_123', undefined, false);
  });

  it('update() patches metadata via secret‑key auth', async () => {
    const meta = { metadata: { foo: 'bar' } } as any;
    await tokens.update('tkn_123', meta);

    expect(http.patch).toHaveBeenCalledWith('/v2/tokens/tkn_123', meta, false);
  });

  it('findBy() sends query params correctly', async () => {
    const query = { limit: '10', card_brand: 'Visa' } as any;

    await tokens.findBy(query);

    expect(http.get).toHaveBeenCalledWith('/v2/tokens', query, false);
  });
});
