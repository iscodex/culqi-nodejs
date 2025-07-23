import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.statements
  .deposits({
    currency_code: 'PEN',
    date_from: 1476132639,
    date_to: 1476132639,
  })
  .then(console.log)
  .catch(console.error);
