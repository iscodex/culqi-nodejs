import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { ChargeResponse } from '../../../src/types/v2/charges';
import { NoAuthResponse } from '../../../src/types/v2/common';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

function isPending(c: NoAuthResponse | ChargeResponse): c is NoAuthResponse {
  return 'action_code' in c;
}

describe('E2E Refunds (v2)', () => {
  let refundId: string;

  beforeAll(async () => {
    const token = await sdk.tokens.create({
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '09',
      expiration_year: String(new Date().getFullYear() + 1),
      email: faker.internet.email(),
    });

    const charge = await sdk.charges.create({
      amount: 1300,
      currency_code: 'PEN',
      email: token.email,
      source_id: token.id,
    });

    if (!isPending(charge)) {
      const refund = await sdk.refunds.create({
        amount: 1300,
        charge_id: charge.id,
        reason: 'solicitud_comprador',
      });

      refundId = refund.id;
    }
  });

  it('should get a refund by its id', async () => {
    if (refundId) {
      const refund = await sdk.refunds.find(refundId);

      expect(refund).toEqual(
        expect.objectContaining({
          object: 'refund',
          id: expect.stringMatching(/^ref_/),
          charge_id: expect.stringMatching(/^chr_/),
          creation_date: expect.any(Number),
          amount: expect.any(Number),
          reason: expect.any(String),
          status: expect.any(String),
          last_modified: expect.any(Number),
        }),
      );
    }
  });

  it('should updates a refund metadata', async () => {
    if (refundId) {
      const updated = await sdk.refunds.update(refundId, {
        metadata: { e2e: true },
      });
      expect(updated.metadata).toEqual({ e2e: true });
    }
  });

  it('should get existing refunds', async () => {
    const refunds = await sdk.refunds.findBy({ limit: 2 });

    expect(refunds).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (refunds.data.length) {
      refunds.data.forEach(refund => {
        expect(refund).toEqual(
          expect.objectContaining({
            object: 'refund',
            id: expect.stringMatching(/^ref_/),
            charge_id: expect.stringMatching(/^chr_/),
            creation_date: expect.any(Number),
            amount: expect.any(Number),
            reason: expect.any(String),
            status: expect.any(String),
            last_modified: expect.any(Number),
          }),
        );
      });
    }
  });
});
