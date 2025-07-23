import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.statements
  .billings({
    currency_code: 'PEN',
    operation_type: 'Authorized',
  })
  .then(console.log)
  .catch(console.error);
