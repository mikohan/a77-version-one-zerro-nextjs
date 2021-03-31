import { IActiveFilter } from '~/interfaces/filters';
import {
  IShopState,
  ShopProductLoadingAction,
  SHOP_PRODUCTS_LIST_LOADING,
  SHOP_RESET_FILTER,
  SHOP_RESET_FILTERS,
} from '~/store/shop/shopTypes';
import { IFilterValues } from '~/interfaces/list';
import {
  ShopResetFilterAction,
  ShopResetFiltersAction,
  ShopSetFilterValueAction,
  SHOP_SET_FILTER_VALUE,
  ShopAction,
} from '~/store/shop/shopTypes';

// Initial shop state
const initialState: IShopState = {
  init: false,
  productsLoading: false,
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
  delete filters[action.filterSlug];
  const newFilters = Object.assign({}, filters);
  return {
    ...state,
    filters: newFilters,
  };
}
function shopReducerResetFilters(state: IShopState): IShopState {
  return {
    ...state,
    filters: {},
  };
}

function shopProductLoadingReducer(
  state: IShopState,
  action: ShopProductLoadingAction
): IShopState {
  return {
    ...state,
    productsLoading: action.loading,
  };
}

export function shopReducer(
  state = initialState,
  action: ShopAction
): IShopState {
  switch (action.type) {
    case SHOP_SET_FILTER_VALUE:
      return shopReducerSetFilterValue(state, action);
    case SHOP_PRODUCTS_LIST_LOADING:
      return shopProductLoadingReducer(state, action);
    case SHOP_RESET_FILTER:
      return shopReducerResetFilter(state, action);
    case SHOP_RESET_FILTERS:
      return shopReducerResetFilters(state);
    default:
      return state;
  }
}
