import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';

export interface IMake {
  id: number;
  slug: string;
  name: string;
  country: number;
}

export interface IState {
  shop: {
    cars: ICar[];
    currentCar: ICar;
    makes: IMake[];
    categories: ICategory[];
  };
  currentCar: ICar;
}
