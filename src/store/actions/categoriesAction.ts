import { ICar } from '~/interfaces';
import { FilterActions } from '~/store/actions/filtersActions';
import * as types from '~/store/types';

interface IMakesAction {
  type: typeof types.SET_MAKES_ACTION;
  payload: string[];
}

interface ISetCurrnetCarAction {
  type: typeof types.SET_CURRENT_CAR;
  payload: ICar | undefined;
}

export const makesAction = (makes: string[]): IMakesAction => {
  return {
    type: types.SET_MAKES_ACTION,
    payload: makes,
  };
};

export const setCurrentCarAction = (
  currentCar: ICar | undefined
): ISetCurrnetCarAction => {
  return {
    type: types.SET_CURRENT_CAR,
    payload: currentCar || undefined,
  };
};

export type OldShopActions =
  | IMakesAction
  | ISetCurrnetCarAction
  | FilterActions;
