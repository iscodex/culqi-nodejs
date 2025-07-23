import { Tokens as TokensV2 } from '@resources/v2/tokens.resource';
import { Charges as ChargesV2 } from '@resources/v2/charges.resource';
import { Refunds as RefundsV2 } from '@resources/v2/refunds.resource';
import { Customers as CustomersV2 } from '@resources/v2/customers.resource';
import { Cards as CardsV2 } from '@resources/v2/cards.resource';
import { Plans as PlansV2 } from '@resources/v2/plans.resource';
import { Subscriptions as SubscriptionsV2 } from '@resources/v2/subscriptions.resource';
import { Orders as OrdersV2 } from '@resources/v2/orders.resource';
import { Events as EventsV2 } from '@resources/v2/events.resource';

// import { Tokens as TokensV3 } from '@resources/v3/tokens';

export type CulqiVersion = '2'; // | '3';

// Compile-time resource map
export type ResourceMap<V extends CulqiVersion> = V extends '2'
  ? {
      tokens: TokensV2;
      charges: ChargesV2;
      refunds: RefundsV2;
      customers: CustomersV2;
      cards: CardsV2;
      plans: PlansV2;
      subscriptions: SubscriptionsV2;
      orders: OrdersV2;
      events: EventsV2;
    }
  : undefined;
