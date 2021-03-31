import {
  SHOP_SET_FILTER_VALUE,
  SHOP_RESET_FILTER,
  SHOP_RESET_FILTERS,
  ShopSetFilterValueAction,
  ShopResetFilterAction,
  ShopResetFiltersAction,
  ShopProductLoadingAction,
  SHOP_PRODUCTS_LIST_LOADING,
} from '~/store/shop/shopTypes';

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

export function shopResetFilter(filterSlug: string): ShopResetFilterAction {
  return {
    type: SHOP_RESET_FILTER,
    filterSlug,
  };
}

export function shopResetFilters(): ShopResetFiltersAction {
  return {
    type: SHOP_RESET_FILTERS,
  };
}

export function shopProductLoading(loading: boolean): ShopProductLoadingAction {
  return {
    type: SHOP_PRODUCTS_LIST_LOADING,
    loading: loading,
  };
}
