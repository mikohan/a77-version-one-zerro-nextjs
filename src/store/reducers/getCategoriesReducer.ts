import * as types from '~/store/types';
import { ICategory } from '~/interfaces/ICategory';
import { IState } from '~/interfaces/IState';

interface IState {
  categories: ICategory[];
  loading: boolean;
  car: string;
}

const initialState = {
  categories: [],
  loading: false,
  car: '',
};
