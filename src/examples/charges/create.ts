import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.charges
  .create({
    amount: 10000,
    currency_code: 'PEN',
    email: 'janedoe@domain.com',
    source_id: 'tkn_123',
    capture: true,
    antifraud_details: {
      address: 'Av Lima 1234',
      address_city: 'Lima',
      country_code: 'PE',
      first_name: 'Jane',
      last_name: 'Doe',
      phone_number: '999777666',
    },
    metadata: {
      documentNumber: '77723083',
    },
  })
  .then(console.log)
  .catch(console.error);
