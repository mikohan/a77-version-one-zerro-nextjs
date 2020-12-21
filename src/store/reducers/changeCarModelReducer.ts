import { IState } from '~/interfaces/IState';
import { ICar } from '~/interfaces/ICar';
import * as types from '~/store/types';

const initialState: IState = {
  shop: {
    cars: [],
    currentCar: <ICar>{},
    makes: [],
    categories: [],
  },
  currentCar: <ICar>{},
};

export function changeCarModelReducer(
  state: IState = initialState,
  action: any
) {
  switch (action.type) {
    case types.CHANGE_CAR_MODEL:
      return {
        carModel: action.payload,
      };
    default:
      return state;
  }
}
