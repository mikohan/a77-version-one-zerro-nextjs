import { ICar } from '~/interfaces';
import { IActiveFilter } from '~/interfaces/filters';
import { IFilterValues } from '~/interfaces/list';

export const SHOP_NAMESPACE = 'shop';

export interface IShopState {
  init: boolean;
  filters: IFilterValues;
  productsLoading: boolean;
  activeFilters: IActiveFilter[];
  removedFilters: IActiveFilter[];
  currentFilters: IActiveFilter[];
  filterPriceOldState: number[];
  lastCars: ICar[];
  userId: string;
}

export const SHOP_RESET_FILTER = 'SHOP_RESET_FILTER';

export const SHOP_DELETE_FILTER = 'SHOP_DELETE_FILTER';

export const SHOP_RESET_FILTERS = 'SHOP_RESET_FILTERS';

export const SHOP_SET_FILTER_VALUE = 'SHOP_SET_FILTER_VALUE';

export const SHOP_PRODUCTS_LIST_LOADING = 'SHOP_PRODUCTS_LIST_LOADING';

export const SHOP_SET_PRICE_OLD_STATE = 'SHOP_SET_PRICE_OLD_STATE';

export const SHOP_SET_LAST_CARS_ACTION = 'SHOP_SET_LAST_CARS_ACTION';

export const SHOP_SET_USER_ID = 'SHOP_SET_USER_ID';

export interface ShopSetUserId {
  type: typeof SHOP_SET_USER_ID;
  payload: string;
}

export interface ShopSetPriceOldState {
  type: typeof SHOP_SET_PRICE_OLD_STATE;
  value: number[];
}

export interface ShopSetFilterValueAction {
  type: typeof SHOP_SET_FILTER_VALUE;
  filter: string;
  value: string | null;
}

export interface ShopResetFiltersAction {
  type: typeof SHOP_RESET_FILTERS;
}
export interface ShopDeleteFilterAction {
  type: typeof SHOP_DELETE_FILTER;
  filterSlug: string;
}

export interface ShopResetFilterAction {
  type: typeof SHOP_RESET_FILTER;
  filterSlug: string;
  filterValue: string;
}
export interface ShopProductLoadingAction {
  type: typeof SHOP_PRODUCTS_LIST_LOADING;
  loading: boolean;
}
export interface ShopLastCarsAction {
  type: typeof SHOP_SET_LAST_CARS_ACTION;
  payload: ICar[];
}

export type ShopAction =
  | ShopSetFilterValueAction
  | ShopResetFilterAction
  | ShopResetFiltersAction
  | ShopProductLoadingAction
  | ShopDeleteFilterAction
  | ShopSetPriceOldState
  | ShopResetFiltersAction
  | ShopLastCarsAction
  | ShopSetUserId;
