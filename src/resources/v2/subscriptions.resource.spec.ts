import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import {
  SubscriptionCreateInput,
  SubscriptionListQuery,
  SubscriptionUpdateInput,
} from '../../types/v2/subscriptions';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Subscriptions resource - unit', () => {
  it('create()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'sxn_123' });

    const payload: SubscriptionCreateInput = {
      card_id: 'crd_123',
      plan_id: 'sxn_123',
      tyc: true,
    };

    const res = await sdk.subscriptions.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/subscriptions/create', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'sxn_123' });

    postSpy.mockRestore();
  });

  it('findBy()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: SubscriptionListQuery = { limit: 10, status: 2 };

    await sdk.subscriptions.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/subscriptions', {
      params: query,
      pub: false,
    });
  });

  it('find()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'sxn_123' });

    const res = await sdk.subscriptions.find('sxn_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', { pub: false });
    expect(res).toEqual({ id: 'sxn_123' });

    postSpy.mockRestore();
  });

  it('update()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'sxn_123' });

    const payload: SubscriptionUpdateInput = {
      card_id: 'crd_123',
      metadata: { foo: 'bar' },
    };

    await sdk.subscriptions.update('sxn_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove()', async () => {
    const postSpy = jest
      .spyOn(HttpClient.prototype, 'del')
      .mockResolvedValue({ id: 'sxn_123', deleted: true });

    const res = await sdk.subscriptions.remove('sxn_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/subscriptions/sxn_123', { pub: false });
    expect(res).toEqual({ id: 'sxn_123', deleted: true });

    postSpy.mockRestore();
  });
});
