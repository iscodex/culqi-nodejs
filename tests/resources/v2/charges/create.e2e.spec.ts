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

describe('E2E Charge, create', () => {
  it('should create a valid token', async () => {
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

    if (isPending(charge)) {
      // NoAuthResponse
      expect(charge.action_code).toBe('REVIEW');
    } else {
      // ChargeResponse
      expect(charge.source.id).toBe(token.id);
      expect(charge.outcome.code).toBe('AUT0000');
    }
  });
});
