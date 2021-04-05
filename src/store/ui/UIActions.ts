import {
  ISetActivePage,
  ISetSort,
  ISetShopGrid,
  SET_ACTIVE_PAGE,
  SET_SORT_VALUE,
  SET_SHOP_GRID,
} from '~/store/ui/UITypes';

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
