import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Customers (v2)', () => {
  let customerId: string;

  beforeAll(async () => {
    const customer = await sdk.customers.create({
      address: faker.location.streetAddress(),
      address_city: faker.location.city(),
      country_code: 'US',
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone_number: '6505434800',
    });
    customerId = customer.id;
  });

  it('should get a customer by its id', async () => {
    const customer = await sdk.customers.find(customerId);

    expect(customer).toEqual(
      expect.objectContaining({
        object: 'customer',
        id: expect.stringMatching(/^cus_/),
        creation_date: expect.any(Number),
        email: expect.any(String),
        antifraud_details: expect.objectContaining({
          object: 'client',
          country_code: expect.any(String),
          first_name: expect.any(String),
          last_name: expect.any(String),
          address_city: expect.any(String),
          address: expect.any(String),
          phone: expect.any(String),
        }),
      }),
    );
  });

  it('should updates a customer metadata', async () => {
    const updated = await sdk.customers.update(customerId, {
      metadata: { e2e: true },
    });
    expect(updated.metadata).toEqual({ e2e: true });
  });

  it('should get existing customers', async () => {
    const customers = await sdk.customers.findBy({ limit: 2 });

    expect(customers).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (customers.data.length) {
      customers.data.forEach(customer => {
        expect(customer).toEqual(
          expect.objectContaining({
            object: 'customer',
            id: expect.stringMatching(/^cus_/),
            creation_date: expect.any(Number),
            email: expect.any(String),
            antifraud_details: expect.objectContaining({
              object: 'client',
              country_code: expect.any(String),
              first_name: expect.any(String),
              last_name: expect.any(String),
              address_city: expect.any(String),
              address: expect.any(String),
              phone: expect.any(String),
            }),
          }),
        );
      });
    }
  });

  afterAll(async () => {
    await sdk.customers.remove(customerId);
  });
});
