import {
  SHOP_SET_FILTER_VALUE,
  SHOP_RESET_FILTER,
  SHOP_RESET_FILTERS,
  SHOP_PRODUCTS_LIST_LOADING,
  SHOP_DELETE_FILTER,
  SHOP_SET_PRICE_OLD_STATE,
  SHOP_SET_LAST_CARS_ACTION,
  SHOP_SET_USER_ID,
  ShopSetUserId,
  ShopSetPriceOldState,
  ShopSetFilterValueAction,
  ShopResetFilterAction,
  ShopResetFiltersAction,
  ShopDeleteFilterAction,
  ShopProductLoadingAction,
  ShopLastCarsAction,
} from '~/store/shop/shopTypes';
import { ICar } from '~/interfaces/ICar';

export function shopSetOldPrice(value: number[]): ShopSetPriceOldState {
  return {
    type: SHOP_SET_PRICE_OLD_STATE,
    value: value,
  };
}

export function shopSetUserId(payload: string): ShopSetUserId {
  return {
    type: SHOP_SET_USER_ID,
    payload,
  };
}

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
  filterSlug: string,
  filterValue: string
): ShopResetFilterAction {
  return {
    type: SHOP_RESET_FILTER,
    filterSlug,
    filterValue,
  };
}
export function shopDeleteFilter(filterSlug: string): ShopDeleteFilterAction {
  return {
    type: SHOP_DELETE_FILTER,
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

export function shopLastCarAction(payload: ICar[]): ShopLastCarsAction {
  return {
    type: SHOP_SET_LAST_CARS_ACTION,
    payload: payload,
  };
}
