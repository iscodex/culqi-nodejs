import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.refunds
  .create({
    amount: 2000,
    charge_id: 'chr_123',
    reason: 'fraudulento',
  })
  .then(console.log)
  .catch(console.error);
