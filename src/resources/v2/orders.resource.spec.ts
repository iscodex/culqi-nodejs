import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import {
  OrderCreateInput,
  OrderListQuery,
  OrderTypeConfirmInput,
  OrderUpdateInput,
} from '../../types/v2/orders';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Orders – Unit Test (v2)', () => {
  it('should create an order', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'ord_123' });

    const payload: OrderCreateInput = {
      amount: 60000,
      currency_code: 'PEN',
      description: 'Lorem ipsum...',
      order_number: '#id-9999',
      expiration_date: 1476132639,
      client_details: {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@domain.com',
        phone_number: '999999987',
      },
      confirm: true,
    };

    const res = await sdk.orders.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/orders', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'ord_123' });

    postSpy.mockRestore();
  });

  it('should get a list of orders with given query params', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: OrderListQuery = { limit: 10, state: 'created' };

    await sdk.orders.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/orders', {
      params: query,
      pub: false,
    });
  });

  it('should confirm an order by its id', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'ord_123' });

    const res = await sdk.orders.confirm('ord_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/orders/ord_123/confirm', { pub: true });
    expect(res).toEqual({ id: 'ord_123' });

    postSpy.mockRestore();
  });

  it('should confirm an order with types', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'ord_123' });

    const payload: OrderTypeConfirmInput = {
      id: 'ord_123',
      order_types: ['cuotealo', 'cip'],
    };

    await sdk.orders.confirmWithType(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/orders/confirm', {
      data: payload,
      pub: true,
    });
  });

  it('should get a single order by its id', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'ord_123' });

    const res = await sdk.orders.find('ord_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/orders/ord_123', { pub: false });
    expect(res).toEqual({ id: 'ord_123' });

    postSpy.mockRestore();
  });

  it('should update an order', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'ord_123' });

    const payload: OrderUpdateInput = {
      expiration_date: 1538540487000,
      metadata: { foo: 'bar' },
    };

    await sdk.orders.update('ord_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/orders/ord_123', {
      data: payload,
      pub: false,
    });
  });

  it('should delete an order', async () => {
    const postSpy = jest
      .spyOn(HttpClient.prototype, 'del')
      .mockResolvedValue({ id: 'ord_123', deleted: true });

    const res = await sdk.orders.remove('ord_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/orders/ord_123', { pub: false });
    expect(res).toEqual({ id: 'ord_123', deleted: true });

    postSpy.mockRestore();
  });
});
