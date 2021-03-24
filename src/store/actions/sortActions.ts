import * as types from '~/store/types';

export const sortAction = (value: number) => {
  return {
    type: types.SET_SORT_VALUE,
    payload: value,
  };
};
