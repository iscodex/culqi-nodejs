import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Subscriptions (v2)', () => {
  let planId: string;
  let customerId: string;
  let cardId: string;
  let subsId: string;

  beforeAll(async () => {
    const plan = await sdk.plans.create({
      name: faker.commerce.productName(),
      short_name: faker.lorem.slug({ min: 1, max: 3 }),
      description: faker.lorem.words(),
      amount: 3000,
      currency: 'PEN',
      interval_unit_time: 1,
      interval_count: 1,
      initial_cycles: {
        count: 0,
        has_initial_charge: false,
        amount: 0,
        interval_unit_time: 1,
      },
    });
    planId = plan.id;

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

    const subscription = await sdk.subscriptions.create({
      card_id: card.id,
      plan_id: plan.id,
      tyc: true,
    });
    subsId = subscription.id;
  });

  it('should retrieve a subscription by its id', async () => {
    const subscription = await sdk.subscriptions.find(subsId);

    expect(subscription).toEqual(
      expect.objectContaining({
        id: subsId,
        status: expect.any(Number),
        creation_date: expect.any(Number),
        active_card: expect.stringMatching(/^crd_/),
        plan: expect.any(Object),
        periods: expect.any(Array),
        customer: expect.any(Object),
      }),
    );
  });

  it('should update subscription metadata', async () => {
    const updated = await sdk.subscriptions.update(subsId, {
      card_id: cardId,
      metadata: { e2e: true },
    });
    expect(updated.active_card).toEqual(cardId);
  });

  it('should list existing subscriptions with paging info', async () => {
    const subscriptions = await sdk.subscriptions.findBy({ limit: 2 });

    expect(subscriptions).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (subscriptions.data.length) {
      subscriptions.data.forEach(subs => {
        expect(subs).toEqual(
          expect.objectContaining({
            object: 'subscription',
            id: expect.stringMatching(/^sxn_/),
            creation_date: expect.any(Number),
            status: expect.any(Number),
            plan_id: expect.stringMatching(/^pln_/),
            card_id: expect.stringMatching(/^crd_/),
            customer: expect.any(Object),
          }),
        );
      });
    }
  });

  afterAll(async () => {
    await sdk.subscriptions.remove(subsId);
    await sdk.cards.remove(cardId);
    await sdk.customers.remove(customerId);
    await sdk.plans.remove(planId);
  });
});
