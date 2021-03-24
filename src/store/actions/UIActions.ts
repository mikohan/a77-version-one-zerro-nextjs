import * as types from '~/store/types';

export interface ISetActivePage {
  type: typeof types.SET_ACTIVE_PAGE;
  payload: string;
}

export const linkActiveAction = (activePage: string): ISetActivePage => {
  return {
    type: types.SET_ACTIVE_PAGE,
    payload: activePage,
  };
};

export interface ISetSort {
  type: typeof types.SET_SORT_VALUE;
  payload: number;
}

export const setSortPage = (value: number): ISetSort => {
  return {
    type: types.SET_SORT_VALUE,
    payload: value,
  };
};

interface IShopGrid {
  type: typeof types.SET_SHOP_GRID;
  payload: string;
}

export const setShopGrid = (value: number): ISetSort => {
  return {
    type: types.SET_SORT_VALUE,
    payload: value,
  };
};

export type actionTypes = ISetSort | ISetActivePage | IShopGrid;
