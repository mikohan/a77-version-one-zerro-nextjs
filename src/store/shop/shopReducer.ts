import { IActiveFilter } from '~/interfaces/filters';
import { IShopState } from '~/store/shop/shopTypes';
import { IFilterValues } from '~/interfaces/list';
import {
  ShopResetFilterAction,
  ShopSetFilterValueAction,
  SHOP_SET_FILTER_VALUE,
  ShopAction,
} from '../types';

// Initial shop state
const initialState: IShopState = {
  init: false,
  filters: {},
  activeFilters: [],
  removedFilters: [],
  currentFilters: [],
};

export function shopReducerSetFilterValue(
  state: IShopState,
  action: ShopSetFilterValueAction
): IShopState {
  const currentFilters = { ...state.filters };
  let filters: IFilterValues;

  if (action.value != null) {
    filters = { ...currentFilters, [action.filter]: action.value };
  } else {
    delete currentFilters[action.filter];
    filters = { ...currentFilters };
  }

  return {
    ...state,
    filters,
  };
}

function shopReducerResetFilter(
  state: IShopState,
  action: ShopResetFilterAction
): IShopState {
  const { filters } = state;
  return {
    ...state,
    filters,
  };
}

export function shopReducer(
  state = initialState,
  action: ShopAction
): IShopState {
  switch (action.type) {
    case SHOP_SET_FILTER_VALUE:
      return shopReducerSetFilterValue(state, action);
    default:
      return state;
  }
}
