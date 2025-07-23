import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.orders
  .create({
    amount: 60000,
    currency_code: 'PEN',
    description: 'Lorem ipsum...',
    order_number: '#id-9999',
    expiration_date: '1476132639',
    client_details: {
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'janedoe@domain.com',
      phone_number: '999999987',
    },
    confirm: true,
  })
  .then(console.log)
  .catch(console.error);
