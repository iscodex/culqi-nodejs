import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.statements.deposit('fARY6gP7VeRiI2L2').then(console.log).catch(console.error);
