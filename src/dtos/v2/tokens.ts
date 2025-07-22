export interface TokenCreateDto {
  card_number: string;
  cvv: string;
  expiration_month: string;
  expiration_year: string;
  email?: string;
  metadata?: Record<string, string>;
}

export interface TokenResponse {
  object: 'token';
  id: string;
  type: 'card';
  email: string;
  creation_date: number;
  card_number: string;
  last_four: string;
  active: boolean;
  iin: string;
  client_ip: string;
  metadata: Record<string, string>;
}
