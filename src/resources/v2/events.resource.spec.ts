import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import { EventListQuery } from '../../types/v2/events';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Events - Unit Test (v2)', () => {
  it('should list events with given query params', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: EventListQuery = { limit: 10, type: 'charge.creation.succeeded' };

    await sdk.events.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/events', {
      params: query,
      pub: false,
    });
  });

  it('should get a single event by its id', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'evt_123' });

    const res = await sdk.events.find('evt_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/events/evt_123', { pub: false });
    expect(res).toEqual({ id: 'evt_123' });

    postSpy.mockRestore();
  });
});
