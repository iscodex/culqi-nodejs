import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import { CardCreateInput, CardListQuery, CardUpdateInput } from '../../types/v2/cards';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Cards resource - unit', () => {
  it('create()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'crd_123' });

    const payload: CardCreateInput = {
      customer_id: 'cus_123',
      token_id: 'tkn_123',
      validate: true,
    };

    const res = await sdk.cards.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/cards', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'crd_123' });

    postSpy.mockRestore();
  });

  it('findBy()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: CardListQuery = { limit: 10, creation_date: 1476132639 };

    await sdk.cards.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/cards', {
      params: query,
      pub: false,
    });
  });

  it('find()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'crd_123' });

    const res = await sdk.cards.find('crd_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/cards/crd_123', { pub: false });
    expect(res).toEqual({ id: 'crd_123' });

    postSpy.mockRestore();
  });

  it('update()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'crd_123' });

    const payload: CardUpdateInput = { token_id: 'tkn_123', metadata: { foo: 'bar' } };

    await sdk.cards.update('crd_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/cards/crd_123', {
      data: payload,
      pub: false,
    });
  });
});
