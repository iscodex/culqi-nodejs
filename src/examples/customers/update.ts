import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.customers
  .update('cus_123', {
    country_code: 'PE',
    metadata: {
      client_id: 'f1637d15-2d59-4ef5-a9b5-9b165f0d892b',
    },
  })
  .then(console.log)
  .catch(console.error);
