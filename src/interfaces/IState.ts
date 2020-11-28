import { ICategory } from './ICategory';

export interface IMake {
  id: number;
  slug: string;
  name: string;
  country: number;
}

export interface IState {
  cars: { makes: IMake[]; categories: ICategory[] };
}
