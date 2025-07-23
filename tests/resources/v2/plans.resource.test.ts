import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Plans } from '../../../src/resources/v2/plans.resource';

describe('Plans resource (v2)', () => {
  let http: any;
  let plans: Plans;

  beforeEach(() => {
    http = {
      get: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      del: jest.fn(),
    };
    plans = new Plans(http, '2');
  });

  it('create() posts a plan', async () => {
    const payload = {
      name: 'Plan Business',
      short_name: 'plan-business',
      description: 'Lorem ipsum...',
      amount: 500,
      currency: 'PEN',
      interval_unit_time: 1,
      interval_count: 1,
      initial_cycles: {
        count: 0,
        has_initial_charge: false,
        amount: 0,
        interval_unit_time: 1,
      },
    } as any;

    http.post.mockResolvedValue({ id: 'pln_123' });

    const res = await plans.create(payload);

    expect(http.post).toHaveBeenCalledWith('/v2/recurrent/plans/create', {
      data: payload,
      pub: false,
    });
    expect(res).toEqual({ id: 'pln_123' });
  });

  it('findBy() sends query params correctly', async () => {
    const params = { limit: '10', status: '1' } as any;

    await plans.findBy(params);

    expect(http.get).toHaveBeenCalledWith('/v2/recurrent/plans', {
      params,
      pub: false,
    });
  });

  it('find() fetches a single plan by id', async () => {
    http.get.mockResolvedValue({ id: 'pln_123' });

    await plans.find('pln_123');

    expect(http.get).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', {
      pub: false,
    });
  });

  it('update() patches plan', async () => {
    const payload = { status: '2', metadata: { foo: 'bar' } } as any;

    await plans.update('pln_123', payload);

    expect(http.patch).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', {
      data: payload,
      pub: false,
    });
  });

  it('remove() card by id', async () => {
    await plans.remove('pln_123');

    expect(http.del).toHaveBeenCalledWith('/v2/recurrent/plans/pln_123', { pub: false });
  });
});
