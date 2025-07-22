# Culqi Node SDK (TypeScript)

**Official, zero‑runtime‑dependency SDK** to integrate Culqi’s REST API in Node.js.
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

const { id: tokenId } = await culqi.tokens.createToken({
  card_number: '4111111111111111',
  cvv: '123',
  expiration_month: '07',
  expiration_year: '2027',
});

await culqi.charges.createCharge({
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
│  │   ├─ CulqiClient.ts
│  │   └─ HttpClient.ts
│  ├─ resources/
│  │   ├─ Tokens.ts
│  │   └─ Charges.ts
│  ├─ dtos/
│  │   └─ v2/
│  │       ├─ tokens.ts
│  │       └─ charges.ts
│  └─ index.ts
├─ tests/
│  └─ culqi-client.test.ts
└─ …
```

---

## Versioning strategy

- **Code & DTOs are namespaced by API version** (`src/dtos/v2`, `src/resources/…`).
- When Culqi publishes v3 you’ll add new DTOs under `v3` and wire new resource classes without breaking v2 users.

---

## License

MIT © 2025 Francisco Luis Rios Vega
