import { CulqiClient } from '../../client/culqi-client';

const culqi = CulqiClient.init({
  publicKey: '<PUBLIC_KEY>',
  secretKey: '<SECRET_KEY>',
  apiVersion: '2',
});

culqi.plans
  .create({
    name: 'Plan Business Plus.',
    short_name: 'Business Plus',
    description: 'Lorem ipsum...',
    amount: 5000,
    currency: 'PEN',
    interval_unit_time: 1,
    interval_count: 1,
    initial_cycles: {
      count: 0,
      has_initial_charge: false,
      amount: 0,
      interval_unit_time: 1,
    },
  })
  .then(console.log)
  .catch(console.error);
