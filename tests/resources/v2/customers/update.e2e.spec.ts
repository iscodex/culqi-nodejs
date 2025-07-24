import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Customer, update', () => {
  it('should update a customer by its id', async () => {
    let customer = await sdk.customers.create({
      address: faker.location.streetAddress(),
      address_city: faker.location.city(),
      country_code: 'US',
      email: faker.internet.email(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      phone_number: '6505434800',
    });

    customer = await sdk.customers.update(customer.id, {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      metadata: {
        client_id: faker.string.uuid(),
      },
    });

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
        metadata: {
          client_id: expect.any(String),
        },
      }),
    );

    const removeCustomer = await sdk.customers.remove(customer.id);
    expect(removeCustomer.deleted).toBe(true);
  });
});
