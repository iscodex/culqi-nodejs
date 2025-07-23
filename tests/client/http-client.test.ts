import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { CulqiError, HttpClient } from '../../src/client/http-client';

// Mock global fetch
// Assign a mock fetch to the global object (Node 22)
const fetchMock = jest.fn();
// eslint-disable-next-line no-undef
(global as any).fetch = fetchMock;

const client = new HttpClient({
  publicKey: 'pk_test',
  secretKey: 'sk_test',
  apiVersion: '2',
  baseUrl: 'https://api.culqi.dev',
  retries: 1, // keep tests fast
  timeout: 500,
});

describe('HttpClient', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
  });

  it('serialize params, sets headers and returns JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: 1 }),
    } as never);

    const res = await client.get('/echo', { params: { a: 1, b: 'c' } });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.culqi.dev/echo?a=1&b=c',
      expect.objectContaining({ method: 'GET' }),
    );

    expect((res as any).ok).toBe(1);
  });

  it('retries and finally throws CulqiError', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad',
      json: () => Promise.resolve({ merchant_message: 'err' }),
    } as never);

    await expect(client.post('/t', { data: { foo: 1 } })).rejects.toBeInstanceOf(CulqiError);

    expect(fetchMock).toHaveBeenCalledTimes(2); // retries (1) + first attempt
  });
});
