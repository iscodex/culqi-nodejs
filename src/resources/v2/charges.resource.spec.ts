import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import { ChargeCreateInput, ChargeListQuery, ChargeUpdateInput } from '../../types/v2/charges';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Charges resource - unit', () => {
  it('create()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'chr_123' });

    const payload: ChargeCreateInput = {
      amount: 10000,
      currency_code: 'PEN',
      email: 'janedoe@domain.com',
      source_id: 'tkn_123',
    };

    const res = await sdk.charges.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/charges', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'chr_123' });

    postSpy.mockRestore();
  });

  it('findBy()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: ChargeListQuery = { limit: 10, creation_date: 1476132639 };

    await sdk.charges.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/charges', {
      params: query,
      pub: false,
    });
  });

  it('find()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'chr_123' });

    const res = await sdk.charges.find('chr_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/charges/chr_123', { pub: false });
    expect(res).toEqual({ id: 'chr_123' });

    postSpy.mockRestore();
  });

  it('update()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'chr_123' });

    const payload: ChargeUpdateInput = { metadata: { foo: 'bar' } };

    await sdk.charges.update('chr_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/charges/chr_123', {
      data: payload,
      pub: false,
    });
  });

  it('capture()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'chr_123' });

    const res = await sdk.charges.capture('chr_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/charges/chr_123/capture', { pub: false });
    expect(res).toEqual({ id: 'chr_123' });

    postSpy.mockRestore();
  });
});
