import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.orders
  .findBy({
    amount: 6000,
    state: 'created',
  })
  .then(console.log)
  .catch(console.error);
