import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.charges
  .update('chr_123', {
    metadata: {
      workspace_id: '2e00421e-65ad-44c9-8756-15f9a3bad9e1',
      plan_id: 'f1637d15-2d59-4ef5-a9b5-9b165f0d892b',
    },
  })
  .then(console.log)
  .catch(console.error);
