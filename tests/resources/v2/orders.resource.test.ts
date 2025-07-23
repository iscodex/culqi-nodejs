import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Orders } from '../../../src/resources/v2/orders';

describe('Orders resource (v2)', () => {
  let http: any;
  let orders: Orders;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    orders = new Orders(http, '2');
  });

  it('create() posts a order', async () => {
    const payload = {
      amount: 60000,
      currency_code: 'PEN',
      description: 'Lorem ipsum...',
      order_number: '#id-9999',
      expiration_date: '1476132639',
      client_details: {
        first_name: 'Richard',
        last_name: 'Hendricks',
        email: 'richard@piedpiper.com',
        phone_number: '999999987',
      },
      confirm: true,
    } as any;

    http.post.mockResolvedValue({ id: 'ord_123' });

    const res = await orders.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/orders', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'ord_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', state: 'created' } as any;

    await orders.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/orders', {
      params,
      pub: false,
    });
  });

  it('confirm() a order', async () => {
    http.post.mockResolvedValue({ id: 'ord_123' });

    const res = await orders.confirm('ord_123');

    expect(http.post).toHaveBeenCalledWith('/v2/orders/ord_123/confirm', {
      pub: true,
    });
    expect(res).toEqual({ id: 'ord_123' });
  });

  it('confirmWithType() a type of order', async () => {
    const payload = {
      id: 'ord_123',
      order_types: ['cuotealo', 'cip'],
    } as any;

    http.post.mockResolvedValue({ id: 'ord_123' });

    const res = await orders.confirmWithType(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/orders/confirm', {
      data: payload,
      pub: true,
    });
    expect(res).toEqual({ id: 'ord_123' });
  });

  it('find() fetches a single order by id', async () => {
    http.get.mockResolvedValue({ id: 'ord_123' });

    await orders.find('ord_123');

    expect(http.get).toHaveBeenCalledWith('/v2/orders/ord_123', { pub: false });
  });

  it('update() patches order', async () => {
    const payload = { expiration_date: 1661117022, metadata: { foo: 'bar' } } as any;

    await orders.update('ord_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/orders/ord_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove() order by id', async () => {
    await orders.remove('ord_123');

    expect(http.del).toHaveBeenCalledWith('/v2/orders/ord_123', { pub: false });
  });
});
