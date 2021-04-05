import {
  SET_ACTIVE_PAGE,
  SET_SORT_VALUE,
  SET_SHOP_GRID,
  actionTypes,
  SET_UI_THEME,
} from '~/store/ui/UITypes';
import { defaultShopPageLayout } from '~/config';

const initialState = {
  activePage: 0,
  sortPage: 1,
  shopGrid: defaultShopPageLayout,
  isDark: false,
};

export const UIReducer = (state = initialState, action: actionTypes) => {
  switch (action.type) {
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case SET_SORT_VALUE:
      return {
        ...state,
        sortPage: action.payload,
      };
    case SET_SHOP_GRID:
      return {
        ...state,
        shopGrid: action.payload,
      };
    case SET_UI_THEME:
      const isDark = state.isDark;
      return {
        ...state,
        isDark: !isDark,
      };
    default:
      return state;
  }
};
