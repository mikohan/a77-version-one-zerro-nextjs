import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';
import { IShopState as INewShopState } from '~/store/shop/shopTypes';
import { IMake } from '~/interfaces/IMake';

export interface IShopState {
  cars: ICar[];
  currentCar: ICar | undefined;
  makes: IMake[];
  categories: ICategory[];
}

interface IUIstate {
  activePage: string | number;
  sortPage: number | string;
  shopGrid: string;
  isDark: boolean;
}

export interface IState {
  shop: IShopState;
  shopNew: INewShopState;
  uiState: IUIstate;
}
