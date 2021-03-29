import { IActiveFilter } from '~/interfaces/filters';
import {
  SHOP_SET_FILTER_VALUE,
  SHOP_RESET_FILTER,
  SHOP_RESET_FILTERS,
  ShopSetFilterValueAction,
  ShopResetFilterAction,
  ShopResetFiltersAction,
} from '~/store/types';

export function shopSetFilterVlue(
  filter: string,
  value: string | null
): ShopSetFilterValueAction {
  return {
    type: SHOP_SET_FILTER_VALUE,
    filter: filter,
    value: value,
  };
}

export function shopResetFilter(
  activeFilter: IActiveFilter
): ShopResetFilterAction {
  return {
    type: SHOP_RESET_FILTER,
    activeFilter,
  };
}

export function shopResetFilters(): ShopResetFiltersAction {
  return {
    type: SHOP_RESET_FILTERS,
  };
}
