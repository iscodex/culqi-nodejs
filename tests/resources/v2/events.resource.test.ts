import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Events } from '../../../src/resources/v2/events.resource';

describe('Events resource (v2)', () => {
  let http: any;
  let events: Events;

  beforeEach(() => {
    http = {
      get: jest.fn(),
    };
    events = new Events(http, '2');
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', type: 'charge.creation.succeeded' } as any;

    await events.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/events', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single event by id', async () => {
    http.get.mockResolvedValue({ id: 'evt_123' });

    await events.find('evt_123');

    expect(http.get).toHaveBeenCalledWith('/v2/events/evt_123', { pub: false });
  });
});
