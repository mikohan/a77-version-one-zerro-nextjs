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

interface IActivePage {
  activePage: string | number;
}

export interface IState {
  shop: IShopState;
  uiState: IActivePage;
}
