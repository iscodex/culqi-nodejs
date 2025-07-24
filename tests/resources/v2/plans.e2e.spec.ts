import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Plans (v2)', () => {
  let planId: string;

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
  });

  it('should retrieve a plan by its id', async () => {
    const plan = await sdk.plans.find(planId);

    expect(plan).toEqual(
      expect.objectContaining({
        id: planId,
        interval_unit_time: expect.any(Number),
        interval_count: expect.any(Number),
        amount: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        short_name: expect.any(String),
        currency: expect.any(String),
        initial_cycles: expect.any(Object),
        total_subscriptions: expect.any(Number),
        status: expect.any(Number),
        creation_date: expect.any(Number),
        slug: expect.any(String),
      }),
    );
  });

  it('should update plan info', async () => {
    const updated = await sdk.plans.update(planId, {
      name: faker.commerce.productName(),
      short_name: faker.lorem.slug({ min: 1, max: 3 }),
      description: faker.lorem.words(),
      metadata: { e2e: true },
    });
    expect(updated.metadata).toEqual({ e2e: 'true' });
  });

  it('should list existing plans with paging info', async () => {
    const plans = await sdk.plans.findBy({ limit: 2, status: 1 });

    expect(plans).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (plans.data.length) {
      plans.data.forEach(plan => {
        expect(plan).toEqual(
          expect.objectContaining({
            object: 'plan',
            status: expect.any(Number),
            id: expect.stringMatching(/^pln_/),
            creation_date: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            short_name: expect.any(String),
            amount: expect.any(Number),
            currency: expect.any(String),
            total_subscriptions: expect.any(Number),
          }),
        );
      });
    }
  });

  afterAll(async () => {
    await sdk.plans.remove(planId);
  });
});
