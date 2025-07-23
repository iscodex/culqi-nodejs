import { Pagination } from './common';

/* -------------------------------------------------------------------------- */
/*                                  Responses                                 */
/* -------------------------------------------------------------------------- */

export type OperationResponse = {
  reference_id: string;
  email: string;
  masked_card: string;
  operation_type: string;
  operation_amount: number;
  currency: 'PEN' | 'USD';
  fixed_commission: number;
  variable_commission: number;
  commission: number;
  fixed_commission_igv: number;
  variable_commission_igv: number;
  igv: number;
  full_discount: number;
  payable_amount: number;
  operation_date: number | string;
};

export type SettlementResponse = {
  id: string;
  status: string;
  currency: 'PEN' | 'USD';
  bank_name: string;
  account_holder: string;
  account_number: number;
  voucher_id: number;
  amount: number;
  date: string;
};

export type SettlementDetailResponse = {
  id: string;
  currency: 'PEN' | 'USD';
  status: string;
  voucher_id: number;
  accumulated_amount: number;
  accumulated_fixed_commission: number;
  accumulated_variable_commission: number;
  accumulated_fixed_commission_igv: number;
  accumulated_variable_commission_igv: number;
  accumulated_igv: number;
  accumulated_payable_amount: number;
  date: string;
  sales: Omit<OperationResponse, 'commission' | 'full_discount'>[];
};

export type BillingResponse = {
  reference_id: string;
  operation_type: string;
  email: string;
  masked_card: string;
  brand_card: 'Visa' | 'Mastercard' | 'Amex' | 'Diner';
  bank: string;
  account_number: number;
  voucher_number: number;
  operation_amount: number;
  currency: 'PEN' | 'USD';
  fixed_commission: number;
  variable_commission: number;
  commission: number;
  fixed_commission_igv: number;
  variable_commission_igv: number;
  igv: number;
  full_discount: number;
  payable_amount: number;
  operation_date: number;
  estimated_payment_date: number;
  effective_payment_date: number;
};

/* ------------------------------ List helpers ------------------------------ */

export type OperationListResponse = {
  list: OperationResponse[];
  pagination: Pagination;
};

export type BillingListResponse = {
  list: BillingResponse[];
  pagination: Pagination;
};

export type OperationListQuery = {
  currency_code: 'PEN' | 'USD';
  operation_type?: 'Authorized' | 'Canceled' | 'Return' | 'Fraud';
  date_from?: number;
  date_to?: number;
  limit?: number;
  page?: number;
  sort?: 'ASC' | 'DESC';
};

export type SettlementListQuery = {
  currency_code: 'PEN' | 'USD';
  date_from: number;
  date_to: number;
  sort?: 'ASC' | 'DESC';
};

export type BillingListQuery = OperationListQuery;
