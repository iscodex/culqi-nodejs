import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Charges } from '../../../src/resources/v2/charges';

/**
 * Unit‑tests for Charge resource wrapper (API v2).
 * We inject a mocked HttpClient and assert the correct paths, flags and payloads.
 */
describe('Charges resource (v2)', () => {
  let http: any;
  let charges: Charges;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    charges = new Charges(http, '2');
  });

  it('create() posts to /v2/charges', async () => {
    const payload = {
      amount: '10000',
      currency_code: 'PEN',
      email: 'richard@piedpiper.com',
      source_id: 'tkn_123',
      capture: true,
    } as any;

    http.post.mockResolvedValue({ id: 'tkn_123' });

    const res = await charges.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/charges', payload, false);
    expect(res).toEqual({ id: 'tkn_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const query = { limit: '10', currency_code: 'PE' } as any;

    await charges.findBy(query);

    expect(http.get).toHaveBeenCalledWith('/v2/charges', query, false);
  });

  it('find() fetches a single charge via GET', async () => {
    http.get.mockResolvedValue({ id: 'tkn_123' });

    await charges.find('tkn_123');

    expect(http.get).toHaveBeenCalledWith('/v2/charges/tkn_123', undefined, false);
  });

  it('update() patches metadata via secret‑key auth', async () => {
    const meta = { metadata: { foo: 'bar' } } as any;
    await charges.update('tkn_123', meta);

    expect(http.patch).toHaveBeenCalledWith('/v2/charges/tkn_123', meta, false);
  });

  it('capture()', async () => {
    http.get.mockResolvedValue({ id: 'tkn_123' });

    await charges.capture('tkn_123');

    expect(http.post).toHaveBeenCalledWith('/v2/charges/tkn_123/capture', null, false);
  });
});
