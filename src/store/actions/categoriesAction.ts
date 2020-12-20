import { categoriesUrl, makesUrl } from '~/config';
import { Dispatch } from 'redux';
import * as types from '~/store/types';
import axios from 'axios';

export const fetchCategories = (carModel: string) => async (
  dispatch: Dispatch
) => {
  const res = await axios.get(categoriesUrl);
  const data = await res.data;

  dispatch({
    type: types.GET_CAGEGORIES,
    payload: data,
    car: carModel,
  });
};

export const changeCarModel = (carModel: string) => (dispatch: Dispatch) => {
  dispatch({
    type: types.CHANGE_CAR_MODEL,
    payload: carModel,
  });
};

export const getMakes = () => async (dispatch: Dispatch) => {
  const res = await axios.get(makesUrl);
  const makes = await res.data;
  dispatch({
    type: types.GET_MAKES,
    payload: makes,
  });
};
