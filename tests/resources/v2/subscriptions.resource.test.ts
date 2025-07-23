import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Subscriptions } from '../../../src/resources/v2/subscriptions';

describe('Subscriptions resource (v2)', () => {
  let http: any;
  let subs: Subscriptions;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    subs = new Subscriptions(http, '2');
  });

  it('create() posts a subscription', async () => {
    const payload = {
      card_id: 'crd_123',
      plan_id: 'pln_123',
      tyc: true,
    } as any;

    http.post.mockResolvedValue({ id: 'sxn_123' });

    const res = await subs.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/recurrent/subscriptions/create', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'sxn_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', status: '3' } as any;

    await subs.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/recurrent/subscriptions', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single subscription by id', async () => {
    http.get.mockResolvedValue({ id: 'sxn_123' });

    await subs.find('sxn_123');

    expect(http.get).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', { pub: false });
  });

  it('update() patches subscription', async () => {
    const payload = { card_id: 'crd_123', metadata: { foo: 'bar' } } as any;

    await subs.update('sxn_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove() card by id', async () => {
    await subs.remove('sxn_123');

    expect(http.del).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', { pub: false });
  });
});
