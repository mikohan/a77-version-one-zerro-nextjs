import { IActiveFilter } from '~/interfaces/filters';
import { IFilterValues } from '~/interfaces/list';

export const SHOP_NAMESPACE = 'shop';

export interface IShopState {
  init: boolean;
  filters: IFilterValues;

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
