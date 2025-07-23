import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.cards
  .create({
    customer_id: 'cus_123',
    token_id: 'tkn_123',
    validate: true,
    metadata: {
      client_id: '5a3419df-1b0a-459a-acae-46614095cd06',
    },
  })
  .then(console.log)
  .catch(console.error);
