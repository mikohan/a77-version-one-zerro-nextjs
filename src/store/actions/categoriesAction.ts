import { ICar, IMake } from '~/interfaces';
import * as types from '~/store/types';

interface IMakesAction {
  type: typeof types.SET_MAKES_ACTION;
  payload: IMake[];
}

interface ISetCurrnetCarAction {
  type: typeof types.SET_CURRENT_CAR;
  payload: ICar | undefined;
}

export const makesAction = (makes: IMake[]): IMakesAction => {
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

export type OldShopActions = IMakesAction | ISetCurrnetCarAction;
