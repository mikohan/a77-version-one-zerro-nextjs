export const SET_ACTIVE_PAGE = 'SET_ACTIVE_PAGE';

export const SET_SORT_VALUE = 'SET_SORT_VALUE';

export const SET_SHOP_GRID = 'SET_SHOP_GRID';

export const SET_UI_THEME = 'SET_UI_THEME';

export interface ISetUITheme {
  type: typeof SET_UI_THEME;
  payload: boolean;
}

export interface ISetActivePage {
  type: typeof SET_ACTIVE_PAGE;
  payload: string;
}
export interface ISetShopGrid {
  type: typeof SET_SHOP_GRID;
  payload: string;
}
export interface ISetSort {
  type: typeof SET_SORT_VALUE;
  payload: number;
}
export type actionTypes =
  | ISetSort
  | ISetActivePage
  | ISetShopGrid
  | ISetUITheme;
