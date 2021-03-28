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
  activeFilters: string[];
}

interface IUIstate {
  activePage: string | number;
  sortPage: number | string;
  shopGrid: string;
}

interface IFilter {
  filters: {
    [key: string]: string[];
  };
}

export interface IState {
  activeFilters: IFilter;
  shop: IShopState;
  uiState: IUIstate;
}
