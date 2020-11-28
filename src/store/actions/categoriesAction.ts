import { categoriesUrl } from '~/config';
import * as types from '~/store/types';
import axios from 'axios';

export const fetchCategories = (carModel: string) => async (dispatch: any) => {
  const res = await axios.get(categoriesUrl);
  const data = await res.data;

  dispatch({
    type: types.GET_CAGEGORIES,
    payload: data,
    car: carModel,
  });
};

export const changeCarModel = (carModel: string) => (dispatch: any) => {
  dispatch({
    type: types.CHANGE_CAR_MODEL,
    payload: carModel,
  });
};
