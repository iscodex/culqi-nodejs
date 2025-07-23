import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.tokens
  .create({
    card_number: '4111111111111111',
    cvv: '123',
    expiration_month: '09',
    expiration_year: '2025',
    email: 'janedoe@domain.com',
  })
  .then(console.log)
  .catch(console.error);
