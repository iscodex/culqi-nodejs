import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Events (v2)', () => {
  let eventId: string;

  it('should get existing events', async () => {
    const events = await sdk.events.findBy({ limit: 2 });

    expect(events).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (events.data.length) {
      events.data.forEach(event => {
        expect(event).toEqual(
          expect.objectContaining({
            object: 'event',
            id: expect.stringMatching(/^evt_/),
            type: expect.any(String),
            data: expect.any(Object),
          }),
        );
      });
      eventId = events.data[0].id;
    }
  });

  it('should get an event by its id, otherwise handles undefined', async () => {
    if (eventId) {
      const event = await sdk.events.find(eventId);

      expect(event).toEqual(
        expect.objectContaining({
          object: 'event',
          id: expect.stringMatching(/^evt_/),
          type: expect.any(String),
          data: expect.any(Object),
        }),
      );
    } else {
      expect(eventId).toBeUndefined();
    }
  });
});
