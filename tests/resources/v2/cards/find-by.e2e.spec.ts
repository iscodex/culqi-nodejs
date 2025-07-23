import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Card, find by', () => {
  it('should list existing cards', async () => {
    const cards = await sdk.cards.findBy({ limit: 2, country_code: 'PE' });

    expect(cards).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (cards.data.length) {
      cards.data.forEach(card => {
        expect(card).toEqual(
          expect.objectContaining({
            object: 'card',
            id: expect.stringMatching(/^crd_/),
            customer_id: expect.any(String),
            active: expect.any(Boolean),
            creation_date: expect.any(Number),
            source: expect.anything(),
            metadata: expect.any(Object),
          }),
        );
      });
    }
  });
});
