import * as types from '~/store/types';
import { IShopState } from '~/interfaces/IState';
import { OldShopActions } from '~/store/actions/categoriesAction';

const initialState = {
  filters: {},
};

export const filtersReducer = (
  state = initialState,
  action: OldShopActions
) => {
  switch (action.type) {
    case types.SET_ACTIVE_FILTER:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};
