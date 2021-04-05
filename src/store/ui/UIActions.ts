import {
  ISetActivePage,
  ISetSort,
  ISetShopGrid,
  SET_ACTIVE_PAGE,
  SET_SORT_VALUE,
  SET_SHOP_GRID,
  ISetUITheme,
  SET_UI_THEME,
} from '~/store/ui/UITypes';

export function setUIThemeAction(value: boolean): ISetUITheme {
  return {
    type: SET_UI_THEME,
    payload: value,
  };
}

export const linkActiveAction = (activePage: string): ISetActivePage => {
  return {
    type: SET_ACTIVE_PAGE,
    payload: activePage,
  };
};

export const setSortPage = (value: number): ISetSort => {
  return {
    type: SET_SORT_VALUE,
    payload: value,
  };
};

export const setShopGrid = (value: string): ISetShopGrid => {
  return {
    type: SET_SHOP_GRID,
    payload: value,
  };
};

// export const sortAction = (value: number) => {
//   return {
//     type: SET_SORT_VALUE,
//     payload: value,
//   };
// };
