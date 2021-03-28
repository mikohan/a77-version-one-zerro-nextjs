import * as types from '~/store/types';

interface IFilter {
  [filterName: string]: string[];
}

export interface ISetActiveFilter {
  type: typeof types.SET_ACTIVE_FILTER;
  payload: IFilter;
}

export const filtersAction = (
  filterName: string,
  value: string[]
): ISetActiveFilter => {
  return {
    type: types.SET_ACTIVE_FILTER,
    payload: { [filterName]: value },
  };
};

export type FilterActions = ISetActiveFilter;
