import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import {
  BillingListQuery,
  OperationListQuery,
  SettlementListQuery,
} from '../../types/v2/statements';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Statements resource - unit', () => {
  it('operations()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: OperationListQuery = { currency_code: 'PEN', operation_type: 'Authorized' };

    await sdk.statements.operations(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/balance/operations', {
      params: query,
      pub: false,
    });
  });

  it('deposits()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: SettlementListQuery = {
      currency_code: 'PEN',
      date_from: 1476132639,
      date_to: 1476132639,
    };

    await sdk.statements.deposits(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/balance/deposits', {
      params: query,
      pub: false,
    });
  });

  it('deposit()', async () => {
    const postSpy = jest
      .spyOn(HttpClient.prototype, 'get')
      .mockResolvedValue({ id: 'fARY6gP7VeRiI2L2' });

    const res = await sdk.statements.deposit('fARY6gP7VeRiI2L2');

    expect(postSpy).toHaveBeenCalledWith('/v2/balance/deposits/fARY6gP7VeRiI2L2', { pub: false });
    expect(res).toEqual({ id: 'fARY6gP7VeRiI2L2' });

    postSpy.mockRestore();
  });

  it('billings()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: BillingListQuery = {
      currency_code: 'PEN',
      operation_type: 'Authorized',
    };

    await sdk.statements.billings(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/balance/billing-operations', {
      params: query,
      pub: false,
    });
  });
});
