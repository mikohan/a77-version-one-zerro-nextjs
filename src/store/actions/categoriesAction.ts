import { categoriesUrl, makesUrl } from '~/config';
import { Dispatch } from 'redux';
import * as types from '~/store/types';
import axios from 'axios';
import { ICar } from '~/interfaces/ICar';
import { vehiclesUrl } from '~/config';

export interface IGetAllCarsAction {
  type: typeof types.GET_ALL_CARS;
  payload: ICar[];
}

export type IActions = IGetAllCarsAction;

export const getAllCarsAction = () => {
  return async (dispatch: Dispatch) => {
    const res = await axios.get(vehiclesUrl);
    const cars = res.data;
    console.log(cars, 'in cars get action');

    dispatch({
      type: types.GET_ALL_CARS,
      payload: cars,
    });
  };
};

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
