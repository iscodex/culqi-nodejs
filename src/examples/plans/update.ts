import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.plans
  .update('pln_123', {
    name: 'Plan Enterprise',
    short_name: 'Enterprise',
    status: 1,
  })
  .then(console.log)
  .catch(console.error);
