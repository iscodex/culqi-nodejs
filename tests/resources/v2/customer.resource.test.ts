import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Customers } from '../../../src/resources/v2/customers';

describe('Customers resource (v2)', () => {
  let http: any;
  let customers: Customers;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    customers = new Customers(http, '2');
  });

  it('create() posts a customer', async () => {
    const payload = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@gmail.com',
      address: '2380 Lewis Street',
      address_city: 'Hickory Hills',
      country_code: 'US',
      phone_number: '6505434800',
    } as any;

    http.post.mockResolvedValue({ id: 'cus_123' });

    const res = await customers.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/customers', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'cus_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', country_code: 'US' } as any;

    await customers.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/customers', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single customer by id', async () => {
    http.get.mockResolvedValue({ id: 'cus_123' });

    await customers.find('cus_123');

    expect(http.get).toHaveBeenCalledWith('/v2/customers/cus_123', { pub: false });
  });

  it('update() patches customer', async () => {
    const payload = { phone_number: '6505135800', metadata: { foo: 'bar' } } as any;

    await customers.update('cus_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/customers/cus_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove() customer by id', async () => {
    await customers.remove('cus_123');

    expect(http.del).toHaveBeenCalledWith('/v2/customers/cus_123', { pub: false });
  });
});
