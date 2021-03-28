import * as types from '~/store/types';

import { IFilter } from '~/interfaces/IState';

export interface ISetActiveFilter {
  type: typeof types.SET_ACTIVE_FILTER;
  payload: IFilter;
}

export const filtersAction = (value: IFilter): ISetActiveFilter => {
  return {
    type: types.SET_ACTIVE_FILTER,
    payload: value,
  };
};

export type FilterActions = ISetActiveFilter;
