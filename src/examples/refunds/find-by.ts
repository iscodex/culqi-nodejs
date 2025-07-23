import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.refunds
  .findBy({
    reason: 'fraudulento',
    status: 'rechazado',
  })
  .then(console.log)
  .catch(console.error);
