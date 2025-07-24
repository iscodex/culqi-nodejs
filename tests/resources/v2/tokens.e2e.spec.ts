import { faker } from '@faker-js/faker';
import { CulqiClient } from '../../../src/client/culqi-client';
import { config } from '../../e2e.config';

const sdk = CulqiClient.init({
  publicKey: config.publicKey,
  secretKey: config.secretKey,
  apiVersion: '2',
});

describe('E2E Tokens (v2)', () => {
  let tokenId: string;
  let tokenYapeId: string;

  beforeAll(async () => {
    const token = await sdk.tokens.create({
      card_number: '5111111111111118',
      cvv: '039',
      expiration_month: '12',
      expiration_year: String(new Date().getFullYear() + 1),
      email: faker.internet.email(),
    });
    tokenId = token.id;

    const tokenYape = await sdk.tokens.createYape({
      otp: '946627',
      number_phone: '900000001',
      amount: 500,
    });
    tokenYapeId = tokenYape.id;
  });

  it('should get a token by its id', async () => {
    const token = await sdk.tokens.find(tokenId);

    expect(token).toEqual(
      expect.objectContaining({
        object: 'token',
        id: tokenId,
        type: expect.any(String),
        email: expect.any(String),
        creation_date: expect.any(Number),
        card_number: expect.any(String),
        last_four: expect.any(String),
        active: expect.any(Boolean),
        iin: expect.any(Object),
        client: expect.any(Object),
      }),
    );
  });

  it('should get a token (yape) by its id', async () => {
    const tokenYape = await sdk.tokens.find(tokenYapeId);

    expect(tokenYape).toEqual(
      expect.objectContaining({
        object: 'token',
        id: tokenYapeId,
        type: expect.any(String),
        email: expect.any(String),
        creation_date: expect.any(Number),
        card_number: expect.any(String),
        last_four: expect.any(String),
        active: expect.any(Boolean),
        iin: expect.any(Object),
        client: expect.any(Object),
      }),
    );
  });

  it('should updates a token metadata', async () => {
    const updated = await sdk.tokens.update(tokenId, {
      metadata: { e2e: true },
    });
    expect(updated.metadata).toEqual({ e2e: true });
  });

  it('should updates a token (yape) metadata', async () => {
    const updated = await sdk.tokens.update(tokenYapeId, {
      metadata: { e2e: true, method: 'yape' },
    });
    expect(updated.metadata).toEqual({ e2e: true, method: 'yape' });
  });

  it('should get existing tokens', async () => {
    const tokens = await sdk.tokens.findBy({ limit: 2, country_code: 'PE' });

    expect(tokens).toEqual(
      expect.objectContaining({
        data: expect.any(Array),
        paging: expect.any(Object),
      }),
    );

    if (tokens.data.length) {
      tokens.data.forEach(token => {
        expect(token).toEqual(
          expect.objectContaining({
            object: 'token',
            id: expect.stringMatching(/^(tkn_|ype_)/),
            type: expect.any(String),
            email: expect.any(String),
            creation_date: expect.any(Number),
            card_number: expect.any(String),
            last_four: expect.any(String),
            active: expect.any(Boolean),
            iin: expect.any(Object),
            client: expect.any(Object),
          }),
        );
      });
    }
  });
});
