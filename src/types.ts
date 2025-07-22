import { Tokens as TokensV2 } from './resources/v2/tokens';
import { Charges as ChargesV2 } from './resources/v2/charges';
import { Customers as CustomersV2 } from './resources/v2/customers';
import { Cards as CardsV2 } from './resources/v2/cards';
import { Plans as PlansV2 } from './resources/v2/plans';
import { Subscriptions as SubscriptionsV2 } from './resources/v2/subscriptions';

// import { Tokens as TokensV3 } from './resources/v3/tokens';

export type CulqiVersion = '2'; // | '3';

// Compile-time resource map
export type ResourceMap<V extends CulqiVersion> = V extends '2'
  ? {
      tokens: TokensV2;
      charges: ChargesV2;
      customers: CustomersV2;
      cards: CardsV2;
      plans: PlansV2;
      subscriptions: SubscriptionsV2;
    }
  : { tokens: TokensV2 };
