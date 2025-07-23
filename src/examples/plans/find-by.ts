import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.plans
  .findBy({
    status: 1,
    creation_date_to: 1671720949000,
  })
  .then(console.log)
  .catch(console.error);
