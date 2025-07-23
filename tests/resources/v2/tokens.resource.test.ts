import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import { Tokens } from '../../../src/resources/v2/tokens.resource';

describe('Tokens resource (v2)', () => {
  let http: any;
  let tokens: Tokens;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    tokens = new Tokens(http, '2');
  });

  it('create() posts card token with public key', async () => {
    const payload = {
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '07',
      expiration_year: '2027',
      email: 'test@example.com',
    } as any;

    http.post.mockResolvedValue({ id: 'tkn_123' });

    const res = await tokens.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/tokens', {
      data: payload,
      pub: true,
    });
    expect(res).toEqual({ id: 'tkn_123' });
  });

  it('createYape() posts Yape token with public key', async () => {
    const payload = { otp: '123456', number_phone: '987654321', amount: '1000' } as any;
    http.post.mockResolvedValue({ id: 'tok_yape_123' });

    const res = await tokens.createYape(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/tokens/yape', {
      data: payload,
      pub: true,
    });
    expect(res).toEqual({ id: 'tok_yape_123' });
  });

  it('find() retrieves a token by id', async () => {
    http.get.mockResolvedValue({ id: 'tkn_123' });

    await tokens.find('tkn_123');

    expect(http.get).toHaveBeenCalledWith('/v2/tokens/tkn_123', { pub: false });
  });

  it('update() patches metadata', async () => {
    const meta = { metadata: { foo: 'bar' } } as any;

    await tokens.update('tkn_123', meta);

    expect(http.patch).toHaveBeenCalledWith('/v2/tokens/tkn_123', {
      data: meta,
      pub: false,
    });
  });

  it('findBy() lists tokens with filters', async () => {
    const params = { limit: '5', currency_code: 'PE' } as any;

    await tokens.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/tokens', {
      params,
      pub: false,
    });
  });
});
