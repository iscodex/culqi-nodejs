import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import {
  CustomerCreateInput,
  CustomerListQuery,
  CustomerUpdateInput,
} from '../../types/v2/customers';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Customers - Unit Test (v2)', () => {
  it('should create a customer', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'cus_123' });

    const payload: CustomerCreateInput = {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@domain.com',
      address: '2380 Lewis Street',
      address_city: 'Hickory Hills',
      country_code: 'US',
      phone_number: '6505434800',
    };

    const res = await sdk.customers.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/customers', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'cus_123' });

    postSpy.mockRestore();
  });

  it('should get a list of customers with given query params', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: CustomerListQuery = { limit: 10, country_code: 'US' };

    await sdk.customers.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/customers', {
      params: query,
      pub: false,
    });
  });

  it('should get a single customer by its id', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'cus_123' });

    const res = await sdk.customers.find('cus_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/customers/cus_123', { pub: false });
    expect(res).toEqual({ id: 'cus_123' });

    postSpy.mockRestore();
  });

  it('should update a customer', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'cus_123' });

    const payload: CustomerUpdateInput = {
      phone_number: '955533132',
      country_code: 'PE',
      metadata: { foo: 'bar' },
    };

    await sdk.customers.update('cus_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/customers/cus_123', {
      data: payload,
      pub: false,
    });
  });

  it('should delete a customer', async () => {
    const postSpy = jest
      .spyOn(HttpClient.prototype, 'del')
      .mockResolvedValue({ id: 'cus_123', deleted: true });

    const res = await sdk.customers.remove('cus_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/customers/cus_123', { pub: false });
    expect(res).toEqual({ id: 'cus_123', deleted: true });

    postSpy.mockRestore();
  });
});
