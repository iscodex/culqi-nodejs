import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';
import { NoAuthResponse } from '../../../../src/types/v2/common';
import { ChargeResponse } from '../../../../src/types/v2/charges';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

function isPending(c: NoAuthResponse | ChargeResponse): c is NoAuthResponse {
  return 'action_code' in c;
}

describe('E2E Charge, find', () => {
  it('should get a charge by its id', async () => {
    const token = await sdk.tokens.create({
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '09',
      expiration_year: String(new Date().getFullYear() + 1),
      email: faker.internet.email(),
    });

    let charge = await sdk.charges.create({
      amount: 10000,
      currency_code: 'PEN',
      email: token.email,
      source_id: token.id,
    });

    if (isPending(charge)) {
      // NoAuthResponse
      expect(charge.action_code).toBe('REVIEW');
    } else {
      // ChargeResponse
      charge = await sdk.charges.find(charge.id);

      expect(charge).toEqual(
        expect.objectContaining({
          object: 'charge',
          id: expect.stringMatching(/^chr_/),
          creation_date: expect.any(Number),
          amount: expect.any(Number),
          amount_refunded: expect.any(Number),
          current_amount: expect.any(Number),
          installments: expect.any(Number),
          email: expect.any(String),
          source: expect.any(Object),
          outcome: expect.any(Object),
          duplicated: expect.any(Boolean),
          dispute: expect.any(Boolean),
          capture: expect.any(Boolean),
          paid: expect.any(Boolean),
        }),
      );
    }
  });
});
