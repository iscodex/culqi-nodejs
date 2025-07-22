import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Charges } from '../../../src/resources/v2/charges';

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

  it('create() posts a charge', async () => {
    const body = {
      amount: 10000,
      currency_code: 'PEN',
      email: 'richard@piedpiper.com',
      source_id: 'tkn_123',
    } as any;

    http.post.mockResolvedValue({ id: 'chr_123' });

    const res = await charges.create(body);

    expect(http.post).toHaveBeenCalledWith('/v2/charges', {
      data: body,
      pub: false,
    });
    expect(res).toEqual({ id: 'chr_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', currency_code: 'PEN' } as any;

    await charges.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/charges', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single charge by id', async () => {
    http.get.mockResolvedValue({ id: 'chr_123' });

    await charges.find('chr_123');

    expect(http.get).toHaveBeenCalledWith('/v2/charges/chr_123', { pub: false });
  });

  it('update() patches charge metadata', async () => {
    const meta = { metadata: { foo: 'bar' } } as any;

    await charges.update('chr_123', meta);

    expect(http.patch).toHaveBeenCalledWith('/v2/charges/chr_123', {
      data: meta,
      pub: false,
    });
  });

  it('capture() posts to capture endpoint', async () => {
    await charges.capture('chr_123');

    expect(http.post).toHaveBeenCalledWith('/v2/charges/chr_123/capture', { pub: false });
  });
});
