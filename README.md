# Culqi Node SDK (TypeScript)

**Culqi, zero‑runtime‑dependency SDK** to integrate Culqi’s REST API in Node.js.
This scaffold targets **API v2** and is ready for future versions side‑by‑side.

## Quick start

```bash
npm install @culqi/node-sdk
```

```ts
import { CulqiClient } from '@culqi/node-sdk';

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
});

await culqi.charges.create({
  amount: 1000,
  currency_code: 'PEN',
  source_id: tokenId,
  email: 'test@example.com',
});
```

## Scripts

| Command          | Description                    |
| ---------------- | ------------------------------ |
| `npm run build`  | Compile TypeScript to `dist/`  |
| `npm test`       | Run Jest test suite + coverage |
| `npm run lint`   | Lint using ESLint Flat Config  |
| `npm run format` | Format code with Prettier      |

---

## Project structure

```
├─ src/
│  ├─ client/
│  │   ├─ culqi-client.ts
│  │   └─ http-client.ts
│  ├─ dtos/
│  │   └─ v2/
│  │       ├─ common.dto.ts
│  │       ├─ cards.dto.ts
│  │       ├─ charges.dto.ts
│  │       ├─ customers.dto.ts
│  │       ├─ events.dto.ts
│  │       ├─ orders.dto.ts
│  │       ├─ plans.dto.ts
│  │       ├─ refunds.dto.ts
│  │       ├─ subscriptions.dto.ts
│  │       └─ tokens.dto.ts
│  ├─ resources/
│  │   ├─ v2/
│  │   │   ├─ cards.resource.ts
│  │   │   ├─ charges.resource.ts
│  │   │   ├─ customers.resource.ts
│  │   │   ├─ events.resource.ts
│  │   │   ├─ orders.resource.ts
│  │   │   ├─ plans.resource.ts
│  │   │   ├─ refunds.resource.ts
│  │   │   ├─ subscriptions.resource.ts
│  │   │   └─ tokens.resource.ts
│  │   ├─ base.resource.ts
│  ├─ utils/
│  │   └─ resource-factory.ts
│  ├─ index.ts
│  └─ types.ts
├─ tests/
│  ├─ client/
│  │   ├─ culqi-client.test.ts
│  │   └─ http-client.test.ts
│  └─ resources/
│      └─ v2/
│          ├─ cards.resource.test.ts
│          ├─ charges.resource.test.ts
│          ├─ customer.resource.test.ts
│          ├─ events.resource.test.ts
│          ├─ orders.resource.test.ts
│          ├─ plans.resource.test.ts
│          ├─ refunds.resource.test.ts
│          ├─ subscriptions.resource.test.ts
│          └─ tokens.resource.test.ts
└─ ...
```

---

## Versioning strategy

- **Code & DTOs are namespaced by API version** (`src/dtos/v2`, `src/resources/…`).
- When Culqi publishes v3 you’ll add new DTOs under `v3` and wire new resource classes without breaking v2 users.

---

## License

MIT © 2025 Francisco Luis Rios Vega
