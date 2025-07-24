# Culqi Node SDK (TypeScript)

[![NPM Version](https://img.shields.io/npm/v/culqi-nodejs.svg)](https://www.npmjs.com/package/culqi-nodejs)

**Culqi, zero-runtime-dependency SDK** for integrating Culqi’s REST API in
Node.js projects.  
The library ships with **API v2** resources and is scaffolded to support future
versions side by side.

## Requirements

The SDK Supports NodeJS version 22 or higher.

## Quick start

```bash
npm install culqi-nodejs
```

```ts
import { CulqiClient } from 'culqi-nodejs';

const culqi = CulqiClient.init({
  publicKey: process.env.CULQI_PUBLIC_KEY!,
  secretKey: process.env.CULQI_SECRET_KEY!,
  apiVersion: '2',
});

const { id: tokenId } = await culqi.tokens.create({
  card_number: '4111111111111111',
  cvv: '123',
  expiration_month: '07',
  expiration_year: '2027',
  email: 'jane_doe@domain.com',
});

await culqi.charges.create({
  amount: 1000,
  currency_code: 'PEN',
  source_id: tokenId,
  email: 'jane_doe@domain.com',
});
```

## Scripts

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `npm run build`  | Compile TypeScript to `dist/`              |
| `npm test`       | Run **unit** tests + coverage (Jest)       |
| `npm test:e2e`   | Run **E2E** tests against Culqi sandbox¹   |
| `npm run lint`   | Lint codebase with ESLint v9 (Flat Config) |
| `npm run format` | Format code with Prettier                  |

¹ Requires `CULQI_PUBLIC_KEY` and `CULQI_SECRET_KEY` environment variables.

---

## Project structure

_(high-level; paths may vary)_

```
├─ src/
│  ├─ client/
│  │   ├─ culqi-client.ts
│  │   └─ http-client.ts
│  ├─ examples/
│  │   ├─ cards
│  │   ├─ charges
│  │   └─ ...
│  ├─ resources/
│  │   └─ v2/
│  │   │   ├─ cards.resource.spec.ts
│  │   │   ├─ cards.resource.ts
│  │   │   ├─ charges.resource.spec.ts
│  │   │   ├─ charges.resource.ts
│  │   │   └─ ...
│  │   ├─ base.resource.ts
│  ├─ types/
│  │   ├─ v2/
│  │   │   ├─ cards.ts
│  │   │   ├─ charges.ts
│  │   │   └─ ...
│  │   ├─ resource.ts
│  ├─ utils/
│  │   └─ resource-factory.ts
│  └─ index.ts
├─ tests/
│  ├─ resources/
│  │    └─ v2/
│  │        ├─ cards.e2e.spec.ts
│  │        ├─ charges.e2e.spec.ts
│  │        └─ ...
│  └─ e2e.config.ts
└─ ...
```

---

## Available operations

### [Tokens](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/tokens)

- Create token
- Get tokens
- Get token
- Update token
- Create token (Yape)

### [Charges](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/charges)

- Create charge
- Get charges
- Get charge
- Update charge
- Capture charge

### [Refunds](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/refunds)

- Create refund
- Get refunds
- Get refund
- Update refund

### [Customers](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/customers)

- Create customer
- Get customers
- Get customer
- Update customer
- Delete customer

### [Cards](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/cards)

- Create card
- Get cards
- Get card
- Update card
- Delete card

### [Plans](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/plans)

- Create plan
- Get plans
- Get plan
- Update plan
- Delete plan

### [Subscriptions](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/subscriptions)

- Create subscription
- Get subscriptions
- Get subscription
- Update subscription
- Cancel subscription

### [Orders](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/orders)

- Create order
- Get orders
- Confirm order
- Confirm order type
- Get order
- Update order
- Delete order

### [Events](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/events)

- Get events
- Get event

### [Statements](https://github.com/iscodex/culqi-nodejs/tree/main/src/examples/statements)

- Get operations
- Get deposits
- Get deposit
- Get billings

---

## Versioning strategy

- **Code & Types are namespaced by API version** (`src/types/v2`, `src/resources/v2`).
- If Culqi ever ships an API v3, we’ll simply add new types and resources inside a `v3` namespace without breaking applications that remain on v2.

---

## Sponsor this project

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://coff.ee/alckordevd)

---

## License

MIT © 2025 Francisco Luis Rios Vega
