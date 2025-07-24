import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Orders (v2)', () => {
  /*
   * NOTE: The following tests for create/confirm/update by ID
   * require the merchant account to have the "cip" payment method
   * enabled in Culqi. Without CIP enabled, these endpoints will
   * return an API error and the tests will fail.
   */

  // let orderId: string;
  // let orderNumber: string;

  beforeAll(async () => {
    // const order = await sdk.orders.create({
    //   amount: 60000,
    //   currency_code: 'PEN',
    //   description: faker.lorem.lines({ min: 1, max: 1 }),
    //   order_number: faker.string.alpha(10),
    //   expiration_date: minExpiration,
    //   client_details: {
    //     first_name: faker.person.firstName(),
    //     last_name: faker.person.lastName(),
    //     email: faker.internet.email(),
    //     phone_number: '999999987',
    //   },
    //   confirm: false, // to confirm
    // });
    // orderId = order.id;
    // orderNumber = order.order_number;
  });

  // it('should confirm an order by its id', async () => {
  //   const confirmed = await sdk.orders.confirm(orderId);
  //   expect(confirmed.order_number).toBe(orderNumber);
  //   expect(confirmed.state).toBe('pending');
  // });

  // it('should update order expiration date', async () => {
  //   const updated = await sdk.orders.update(orderId, {
  //     expiration_date: defaultExpiration,
  //     metadata: {
  //       e2e: true,
  //     },
  //   });
  //   expect(updated.expiration_date).toEqual(defaultExpiration);
  //   expect(updated.metadata).toEqual({ e2e: true });
  // });

  it('should list existing orders with paging info', async () => {
    const orders = await sdk.orders.findBy({ limit: 2 });

    expect(orders).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (orders.data.length) {
      orders.data.forEach(order => {
        expect(order).toEqual(
          expect.objectContaining({
            object: 'order',
            id: expect.stringMatching(/^ord_/),
            amount: expect.any(Number),
            payment_code: expect.any(String),
            currency_code: expect.any(String),
            description: expect.any(String),
            order_number: expect.any(String),
            state: expect.any(String),
            creation_date: expect.any(Number),
            expiration_date: expect.any(Number),
          }),
        );
      });
    }
  });

  afterAll(async () => {
    // Cleanup only if create/confirm tests were enabled.
    // await sdk.orders.remove(orderId);
  });
});
