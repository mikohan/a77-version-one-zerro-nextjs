import * as types from '~/store/types';
import { IState } from '~/interfaces/IState';

const initialState: IState = {
  cars: {
    makes: [],
    categories: [],
  },
  currentCar: {
    carModel: '',
  },
};

export const getCategoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_CAGEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        car: action.car,
      };
    case types.GET_MAKES:
      return {
        ...state,
        makes: action.payload,
      };
    default:
      return state;
  }
};
