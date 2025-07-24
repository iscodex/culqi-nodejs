import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Customer, find by', () => {
  it('should list existing customers', async () => {
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
});
