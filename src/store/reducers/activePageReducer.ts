import * as types from '~/store/types';
import { actionTypes } from '~/store/actions/UIActions';

const initialState = { activePage: 0, sortPage: 1 };

export const activePageReducer = (
  state = initialState,
  action: actionTypes
) => {
  switch (action.type) {
    case types.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    case types.SET_SORT_VALUE:
      return {
        ...state,
        sortPage: action.payload,
      };
    default:
      return state;
  }
};
