import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';
import { NoAuthResponse } from '../../../src/types/v2/common';
import { ChargeResponse } from '../../../src/types/v2/charges';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

function isPending(c: NoAuthResponse | ChargeResponse): c is NoAuthResponse {
  return 'action_code' in c;
}

let chargeId: string;

describe('E2E Charges (v2)', () => {
  beforeAll(async () => {
    const token = await sdk.tokens.create({
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '09',
      expiration_year: String(new Date().getFullYear() + 1),
      email: faker.internet.email(),
    });

    const charge = await sdk.charges.create({
      amount: 10000,
      currency_code: 'PEN',
      email: token.email,
      source_id: token.id,
    });

    if (!isPending(charge)) {
      chargeId = charge.id;
    }
  });

  it('creates charge', async () => {
    if (chargeId) {
      const charge = await sdk.charges.find(chargeId);

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

  it('updates charge metadata', async () => {
    if (chargeId) {
      const updated = await sdk.charges.update(chargeId, {
        metadata: { e2e: true },
      });

      expect(updated.metadata).toEqual({ e2e: true });
    }
  });

  it('get existing charges', async () => {
    const charges = await sdk.charges.findBy({ limit: 2, captured: true });

    expect(charges).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (charges.data.length) {
      charges.data.forEach(card => {
        expect(card).toEqual(
          expect.objectContaining({
            object: 'charge',
            id: expect.stringMatching(/^chr_/),
            creation_date: expect.any(Number),
            amount: expect.any(Number),
            amount_refunded: expect.any(Number),
            current_amount: expect.any(Number),
            installments: expect.any(Number),
            installments_amount: expect.any(Number),
            currency_code: expect.any(String),
            email: expect.any(String),
            dispute: expect.any(Boolean),
            capture: expect.any(Boolean),
            total_fee: expect.any(Number),
            total_fee_taxes: expect.any(Number),
            transfer_amount: expect.any(Number),
            paid: expect.any(Boolean),
          }),
        );
      });
    }
  });

  // afterAll(async () => {});
});
