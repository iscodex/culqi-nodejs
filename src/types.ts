// File: src/types.ts
import { Tokens as TokensV2 } from './resources/v2/tokens';
import { Charges as ChargesV2 } from './resources/v2/charges';
// import { Tokens as TokensV3 } from './resources/v3/tokens';
// import { Charges as ChargesV3 } from './resources/v3/charges';

export type CulqiVersion = '2'; // | '3';

// Compile-time resource map
export type ResourceMap<V extends CulqiVersion> = V extends '2'
  ? { tokens: TokensV2; charges: ChargesV2 }
  : { tokens: TokensV2; charges: ChargesV2 };
