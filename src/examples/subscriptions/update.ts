import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.subscriptions
  .update('sxn_123', {
    card_id: 'crd_123',
    metadata: {
      client_id: 'f8be7382-c778-4420-a705-7545089f2b8c',
    },
  })
  .then(console.log)
  .catch(console.error);
