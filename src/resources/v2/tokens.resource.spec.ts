import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import {
  TokenCreateInput,
  TokenCreateYapeInput,
  TokenListQuery,
  TokenUpdateInput,
} from '../../types/v2/tokens';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Tokens resource - unit', () => {
  it('create()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'tkn_123' });

    const payload: TokenCreateInput = {
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '09',
      expiration_year: '2025',
      email: 'janedoe@domain.com',
    };

    const res = await sdk.tokens.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/tokens', {
      data: payload,
      pub: true,
    });
    expect(res).toEqual({ id: 'tkn_123' });

    postSpy.mockRestore();
  });

  it('findBy()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: TokenListQuery = { limit: 10, country_code: 'US' };

    await sdk.tokens.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/tokens', {
      params: query,
      pub: false,
    });
  });

  it('find()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'tkn_123' });

    const res = await sdk.tokens.find('tkn_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/tokens/tkn_123', { pub: false });
    expect(res).toEqual({ id: 'tkn_123' });

    postSpy.mockRestore();
  });

  it('update()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'tkn_123' });

    const payload: TokenUpdateInput = { metadata: { foo: 'bar' } };

    await sdk.tokens.update('tkn_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/tokens/tkn_123', {
      data: payload,
      pub: false,
    });
  });

  it('createYape()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'ype_123' });

    const payload: TokenCreateYapeInput = {
      otp: '946627',
      number_phone: '951123456',
      amount: '500',
    };

    const res = await sdk.tokens.createYape(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/tokens/yape', {
      data: payload,
      pub: true,
    });
    expect(res).toEqual({ id: 'ype_123' });

    postSpy.mockRestore();
  });
});
