import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.customers
  .create({
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'janedoe@gmail.com',
    address: '2380 Lewis Street',
    address_city: 'Hickory Hills',
    country_code: 'US',
    phone_number: '6505434800',
  })
  .then(console.log)
  .catch(console.error);
