import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.charges
  .findBy({
    code: 'card_declined',
    decline_code: 'expired_card',
  })
  .then(console.log)
  .catch(console.error);
