import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.subscriptions
  .create({
    card_id: 'crd_123',
    plan_id: 'pln_123',
    tyc: true,
  })
  .then(console.log)
  .catch(console.error);
