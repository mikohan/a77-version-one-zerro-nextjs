import { ICategory } from './ICategory';
export interface IState {
  categories: ICategory[];
  loading: boolean;
  car: string;
}
