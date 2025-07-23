import { CulqiClient } from '../../client/culqi-client';
import { HttpClient } from '../../client/http-client';
import { PlanCreateInput, PlanListQuery, PlanUpdateInput } from '../../types/v2/plans';

let sdk: ReturnType<typeof CulqiClient.init>;

beforeEach(() => {
  sdk = CulqiClient.init({
    publicKey: 'pk_test_x',
    secretKey: 'sk_test_x',
    apiVersion: '2',
  });
});

afterEach(() => jest.restoreAllMocks());

describe('Plans resource - unit', () => {
  it('create()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'post').mockResolvedValue({ id: 'pln_123' });

    const payload: PlanCreateInput = {
      name: 'Plan Business Plus.',
      short_name: 'Business Plus',
      description: 'Lorem ipsum...',
      amount: 5000,
      currency: 'PEN',
      interval_unit_time: 1,
      interval_count: 1,
      initial_cycles: {
        count: 0,
        has_initial_charge: false,
        amount: 0,
        interval_unit_time: 1,
      },
    };

    const res = await sdk.plans.create(payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/plans/create', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'pln_123' });

    postSpy.mockRestore();
  });

  it('findBy()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ data: [] });

    const query: PlanListQuery = { status: 1, creation_date_to: 1671720949000 };

    await sdk.plans.findBy(query);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/plans', {
      params: query,
      pub: false,
    });
  });

  it('find()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'get').mockResolvedValue({ id: 'pln_123' });

    const res = await sdk.plans.find('pln_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', { pub: false });
    expect(res).toEqual({ id: 'pln_123' });

    postSpy.mockRestore();
  });

  it('update()', async () => {
    const postSpy = jest.spyOn(HttpClient.prototype, 'patch').mockResolvedValue({ id: 'pln_123' });

    const payload: PlanUpdateInput = {
      name: 'Plan Enterprise',
      short_name: 'Enterprise',
      status: 1,
    };

    await sdk.plans.update('pln_123', payload);

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove()', async () => {
    const postSpy = jest
      .spyOn(HttpClient.prototype, 'del')
      .mockResolvedValue({ id: 'pln_123', deleted: true });

    const res = await sdk.plans.remove('pln_123');

    expect(postSpy).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', { pub: false });
    expect(res).toEqual({ id: 'pln_123', deleted: true });

    postSpy.mockRestore();
  });
});
