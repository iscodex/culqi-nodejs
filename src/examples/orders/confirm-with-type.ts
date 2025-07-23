import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.orders
  .confirmWithType({ id: 'ord_123', order_types: ['cuotealo', 'cip'] })
  .then(console.log)
  .catch(console.error);
