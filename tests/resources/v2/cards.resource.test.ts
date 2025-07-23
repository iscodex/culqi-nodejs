import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Cards } from '../../../src/resources/v2/cards.resource';

describe('Cards resource (v2)', () => {
  let http: any;
  let cards: Cards;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    cards = new Cards(http, '2');
  });

  it('create() posts a card', async () => {
    const payload = {
      customer_id: 'cus_123',
      token_id: 'tkn_123',
      validate: true,
    } as any;

    http.post.mockResolvedValue({ id: 'crd_123' });

    const res = await cards.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/cards', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'crd_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', creation_date: '1476132639' } as any;

    await cards.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/cards', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single card by id', async () => {
    http.get.mockResolvedValue({ id: 'crd_123' });

    await cards.find('crd_123');

    expect(http.get).toHaveBeenCalledWith('/v2/cards/crd_123', { pub: false });
  });

  it('update() patches card', async () => {
    const payload = { token_id: 'tkn_123', metadata: { foo: 'bar' } } as any;

    await cards.update('crd_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/cards/crd_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove() card by id', async () => {
    await cards.remove('crd_123');

    expect(http.del).toHaveBeenCalledWith('/v2/cards/crd_123', { pub: false });
  });
});
