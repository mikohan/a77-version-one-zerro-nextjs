import * as types from '~/store/types';

export const selectBrand = (values: string[]) => (dispatch: any) => {
  dispatch({
    type: types.SELECT_BRAND,
  });
};
