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
  currentCar: ICar;
  makes: string[];
  categories: ICategory[];
}

export interface IState {
  shop: IShopState;
}
