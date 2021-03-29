import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';

export interface IMake {
  id: number;
  slug: string;
  name: string;
  country: number;
}

export interface IShopState {
  cars: ICar[];
  currentCar: ICar | undefined;
  makes: string[];
  categories: ICategory[];
}

interface IUIstate {
  activePage: string | number;
  sortPage: number | string;
  shopGrid: string;
}

export interface IFilters {
  filters: {
    [key: string]: string[];
  };
}
export interface IFilter {
  [key: string]: string[];
}

export interface IState {
  activeFilters: IFilter;
  shop: IShopState;
  uiState: IUIstate;
}
