import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.cards
  .findBy({
    card_type: 'credito',
    country_code: 'PE',
  })
  .then(console.log)
  .catch(console.error);
