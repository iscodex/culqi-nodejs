import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Cards (v2)', () => {
  let customerId: string;
  let cardId: string;

  beforeAll(async () => {
    const token = await sdk.tokens.create({
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '09',
      expiration_year: String(new Date().getFullYear() + 1),
      email: faker.internet.email(),
    });

    const customer = await sdk.customers.create({
      address: faker.location.streetAddress(),
      address_city: faker.location.city(),
      country_code: 'US',
      email: token.email,
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone_number: '6505434800',
    });
    customerId = customer.id;

    const card = await sdk.cards.create({
      customer_id: customer.id,
      token_id: token.id,
      validate: true,
    });
    cardId = card.id;
  });

  it('should retrieve a card by its id', async () => {
    const card = await sdk.cards.find(cardId);

    expect(card).toEqual(
      expect.objectContaining({
        object: 'card',
        id: cardId,
        active: expect.any(Boolean),
        creation_date: expect.any(Number),
        customer_id: customerId,
        source: expect.any(Object),
      }),
    );
  });

  it('should update card metadata', async () => {
    const updated = await sdk.cards.update(cardId, {
      metadata: { e2e: true },
    });
    expect(updated.metadata).toEqual({ e2e: true });
  });

  it('should list existing cards with paging info', async () => {
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

  afterAll(async () => {
    await sdk.cards.remove(cardId);
    await sdk.customers.remove(customerId);
  });
});
