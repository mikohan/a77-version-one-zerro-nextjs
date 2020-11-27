import * as types from '~/store/types';
import { IState } from '~/interfaces/IState';

const initialState: IState = {
  categories: [],
  loading: false,
  car: '',
};

export const getCategoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_CAGEGORIES:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        car: action.payload.car,
      };
    default:
      return state;
  }
};
