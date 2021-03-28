import { IActiveFilterCheck } from '~/interfaces/filters';
import * as types from '~/store/types';

export interface ISetActivePage {
  type: typeof types.SET_ACTIVE_FILTER;
  payload: string;
  value: any;
}

export const filtersAction = (filter: any, value: any): IActiveFilterCheck => {
  return {
    type: types.SET_ACTIVE_FILTER,
    payload: filter,
    value: value,
  };
};
