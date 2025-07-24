import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import { RefundCreateInput, RefundListQuery, RefundUpdateInput } from '../../types/v2/refunds';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Refunds – Unit Test (v2)', () => {
  it('should create a refund', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'ref_123' });

    const payload: RefundCreateInput = {
      amount: 2000,
      charge_id: 'chr_123',
      reason: 'fraudulento',
    };

    const res = await sdk.refunds.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/refunds', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'ref_123' });

    postSpy.mockRestore();
  });

  it('should get a list of refunds with given query params', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: RefundListQuery = { limit: 10, reason: 'duplicado' };

    await sdk.refunds.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/refunds', {
      params: query,
      pub: false,
    });
  });

  it('should get a single refund by its id', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'ref_123' });

    const res = await sdk.refunds.find('ref_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/refunds/ref_123', { pub: false });
    expect(res).toEqual({ id: 'ref_123' });

    postSpy.mockRestore();
  });

  it('should update a refund', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'ref_123' });

    const payload: RefundUpdateInput = { metadata: { foo: 'bar' } };

    await sdk.refunds.update('ref_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/refunds/ref_123', {
      data: payload,
      pub: false,
    });
  });
});
