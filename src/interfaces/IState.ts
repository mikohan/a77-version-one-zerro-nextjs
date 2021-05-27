import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';
import { IShopState as INewShopState } from '~/store/shop/shopTypes';
import { IMake } from '~/interfaces/IMake';
import { ICart } from '~/store/cart/cartTypes';

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

export interface IJwt {
  access: string;
  refresh: string;
}
export interface IUserState {
  access: string;
  refresh: string;
  email: string;
  username: string;
  isAuthenticated: boolean;
  id: string | number;
  errors: any;
  image: string | null;
  message: any;
}

export interface IState {
  shop: IShopState;
  shopNew: INewShopState;
  uiState: IUIstate;
  cart: ICart;
  user: IUserState;
}
