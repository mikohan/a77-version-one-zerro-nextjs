import * as types from '~/store/types';
import { actionTypes } from '~/store/actions/UIActions';
import { defaultShopPageLayout } from '~/config';

const initialState = {
  activePage: 0,
  sortPage: 1,
  shopGrid: defaultShopPageLayout,
};

export const UIReducer = (state = initialState, action: actionTypes) => {
  switch (action.type) {
    case types.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case types.SET_SORT_VALUE:
      return {
        ...state,
        sortPage: action.payload,
      };
    case types.SET_SHOP_GRID:
      return {
        ...state,
        shopGrid: action.payload,
      };
    default:
      return state;
  }
};
