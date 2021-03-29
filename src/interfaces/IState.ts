import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';
import { IShopState as INewShopState } from '~/store/shop/shopTypes';

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

export interface IState {
  shop: IShopState;
  shopNew: INewShopState;
  uiState: IUIstate;
}
