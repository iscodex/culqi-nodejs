import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.tokens
  .update('tkn_123', {
    metadata: {
      client_id: '86eb9bed-9a36-406d-8f88-84f630f205a9',
    },
  })
  .then(console.log)
  .catch(console.error);
