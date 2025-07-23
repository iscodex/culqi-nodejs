import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.subscriptions
  .findBy({
    plan_id: 'pln_123',
    status: 3,
  })
  .then(console.log)
  .catch(console.error);
