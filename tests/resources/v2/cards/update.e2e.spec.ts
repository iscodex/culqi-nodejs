import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Card, update', () => {
  it('should update a card by its id', async () => {
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

    let card = await sdk.cards.create({
      customer_id: customer.id,
      token_id: token.id,
      validate: true,
    });

    card = await sdk.cards.update(card.id, {
      token_id: token.id,
      metadata: {
        client_id: faker.string.uuid(),
      },
    });

    expect(card).toEqual(
      expect.objectContaining({
        object: 'card',
        id: expect.stringMatching(/^crd_/),
        active: expect.any(Boolean),
        creation_date: expect.any(Number),
        customer_id: expect.stringMatching(/^cus_/),
        source: expect.any(Object),
      }),
    );

    const removeCard = await sdk.cards.remove(card.id);
    expect(removeCard.deleted).toBe(true);

    const removeCustomer = await sdk.customers.remove(customer.id);
    expect(removeCustomer.deleted).toBe(true);
  });
});
