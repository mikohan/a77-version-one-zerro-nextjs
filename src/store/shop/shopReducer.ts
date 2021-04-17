import {
  IShopState,
  SHOP_DELETE_FILTER,
  SHOP_PRODUCTS_LIST_LOADING,
  SHOP_RESET_FILTER,
  SHOP_RESET_FILTERS,
  SHOP_SET_PRICE_OLD_STATE,
  SHOP_SET_FILTER_VALUE,
  ShopLastCarsAction,
  SHOP_SET_LAST_CARS_ACTION,
  ShopSetUserId,
  SHOP_SET_USER_ID,
} from '~/store/shop/shopTypes';
import { IFilterValues } from '~/interfaces/list';
import {
  ShopProductLoadingAction,
  ShopSetPriceOldState,
  ShopResetFilterAction,
  ShopDeleteFilterAction,
  ShopSetFilterValueAction,
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
  filterPriceOldState: [],
  lastCars: [],
  userId: '',
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

function shopReducerDeleteFilter(
  state: IShopState,
  action: ShopDeleteFilterAction
): IShopState {
  const { filters } = state;
  delete filters[action.filterSlug];
  const newFilters = Object.assign({}, filters);
  return {
    ...state,
    filters: newFilters,
  };
}

function shopReducerResetFilter(
  state: IShopState,
  action: ShopResetFilterAction
): IShopState {
  const { filters } = state;
  const filter = filters[action.filterSlug];
  const fArr = filter.split(',');
  if (fArr.length) {
    const idx = fArr.indexOf(action.filterValue);
    fArr.splice(idx, 1);
    // make filter again
    if (fArr.length > 0) {
      filters[action.filterSlug] = fArr.join(',');
    } else {
      delete filters[action.filterSlug];
    }
  } else {
    delete filters[action.filterSlug];
  }
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

function shopSetOldPriceReducer(
  state: IShopState,
  action: ShopSetPriceOldState
): IShopState {
  return {
    ...state,
    filterPriceOldState: action.value,
  };
}

function shopSetLastCarsReducer(state: IShopState, action: ShopLastCarsAction) {
  return {
    ...state,
    lastCars: action.payload,
  };
}

function shopSetUserIdReducer(state: IShopState, action: ShopSetUserId) {
  return {
    ...state,
    userId: action.payload,
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
    case SHOP_DELETE_FILTER:
      return shopReducerDeleteFilter(state, action);
    case SHOP_SET_PRICE_OLD_STATE:
      return shopSetOldPriceReducer(state, action);
    case SHOP_SET_LAST_CARS_ACTION:
      return shopSetLastCarsReducer(state, action);
    case SHOP_SET_USER_ID:
      return shopSetUserIdReducer(state, action);
    default:
      return state;
  }
}
