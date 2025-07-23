import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Refunds } from '../../../src/resources/v2/refunds';

describe('Refunds resource (v2)', () => {
  let http: any;
  let refunds: Refunds;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    refunds = new Refunds(http, '2');
  });

  it('create() posts a refund', async () => {
    const payload = {
      amount: 2000,
      charge_id: 'chr_123',
      reason: 'fraudulento',
    } as any;

    http.post.mockResolvedValue({ id: 'ref_123' });

    const res = await refunds.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/refunds', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'ref_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', reason: 'duplicado', status: 'rechazado' } as any;

    await refunds.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/refunds', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single refund by id', async () => {
    http.get.mockResolvedValue({ id: 'ref_123' });

    await refunds.find('ref_123');

    expect(http.get).toHaveBeenCalledWith('/v2/refunds/ref_123', { pub: false });
  });

  it('update() patches card', async () => {
    const payload = { metadata: { foo: 'bar' } } as any;

    await refunds.update('ref_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/refunds/ref_123', {
      data: payload,
      pub: false,
    });
  });
});
