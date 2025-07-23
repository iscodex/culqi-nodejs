import { CulqiClient } from '../../../../src/client/culqi-client';
import { config } from '../../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Charge, find by', () => {
  it('should list existing charges', async () => {
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
});
