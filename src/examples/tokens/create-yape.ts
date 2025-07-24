import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.tokens
  .createYape({
    otp: '946627',
    number_phone: '951123456',
    amount: 500,
  })
  .then(console.log)
  .catch(console.error);
