export interface ChargeCreateDto {
  amount: number;
  currency_code: 'PEN' | 'USD';
  email: string;
  source_id: string; // token id
  metadata?: Record<string, string>;
  description?: string;
}

export interface ChargeResponse {
  object: 'charge';
  id: string;
  amount: number;
  currency_code: 'PEN' | 'USD';
  reference_code: string;
  email: string;
  description: string;
  state: 'AUTHORIZED' | 'CAPTURED' | 'VOIDED' | 'REFUNDED';
  metadata: Record<string, string>;
  creation_date: number;
}
