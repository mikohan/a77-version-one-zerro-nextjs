import { IActiveFilter } from '~/interfaces/filters';

export const GET_CAGEGORIES = 'GET_CAGEGORIES';
export const CHANGE_CAR_MODEL = 'CHANGE_CAR_MODEL';
export const GET_MAKES = 'GET_MAKES';
export const GET_MODELS = 'GET_MODELS';
export const SELECT_BRAND = 'SELECT_BRAND';
export const GET_ALL_CARS = 'GET_ALL_CARS';

export const SET_MAKES_ACTION = 'SET_MAKES_ACTION';

export const SET_CURRENT_CAR = 'SET_CURRENT_CAR';

export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';

export const SET_SORT_VALUE = 'SET_SORT_VALUE';

export const SET_SHOP_GRID = 'SET_SHOP_GRID';

export const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';

export const SHOP_RESET_FILTER = 'SHOP_RESET_FILTER';

export const SHOP_RESET_FILTERS = 'SHOP_RESET_FILTERS';

export const SHOP_SET_FILTER_VALUE = 'SHOP_SET_FILTER_VALUE';

export interface ShopSetFilterValueAction {
  type: typeof SHOP_SET_FILTER_VALUE;
  filter: string;
  value: string | null;
}

export interface ShopResetFiltersAction {
  type: typeof SHOP_RESET_FILTERS;
}

export interface ShopResetFilterAction {
  type: typeof SHOP_RESET_FILTER;
  activeFilter: IActiveFilter;
}

export type ShopAction =
  | ShopSetFilterValueAction
  | ShopResetFilterAction
  | ShopResetFiltersAction;
