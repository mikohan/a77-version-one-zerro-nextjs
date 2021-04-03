import { IActiveFilter } from '~/interfaces/filters';
import { IFilterValues } from '~/interfaces/list';

export const SHOP_NAMESPACE = 'shop';

export interface IShopState {
  init: boolean;
  filters: IFilterValues;
  productsLoading: boolean;

  /**
   * All active filters.
   */
  activeFilters: IActiveFilter[];
  /**
   * Removed active filters.
   */
  removedFilters: IActiveFilter[];
  /**
   * Active filters except removed ones.
   */

  currentFilters: IActiveFilter[];
}

export const SHOP_RESET_FILTER = 'SHOP_RESET_FILTER';

export const SHOP_DELETE_FILTER = 'SHOP_DELETE_FILTER';

export const SHOP_RESET_FILTERS = 'SHOP_RESET_FILTERS';

export const SHOP_SET_FILTER_VALUE = 'SHOP_SET_FILTER_VALUE';

export const SHOP_PRODUCTS_LIST_LOADING = 'SHOP_PRODUCTS_LIST_LOADING';

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

export type ShopAction =
  | ShopSetFilterValueAction
  | ShopResetFilterAction
  | ShopResetFiltersAction
  | ShopProductLoadingAction
  | ShopDeleteFilterAction;
