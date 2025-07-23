import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.customers
  .findBy({
    email: 'janedoe@gmail.com',
    country_code: 'US',
  })
  .then(console.log)
  .catch(console.error);
