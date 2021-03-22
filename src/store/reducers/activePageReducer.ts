import * as types from '~/store/types';

const initialState = {};

export interface ISetActivePage {
  type: typeof types.SET_ACTIVE_PAGE;
  payload: string;
}
export const activePageReducer = (
  state = initialState,
  action: ISetActivePage
) => {
  switch (action.type) {
    case types.SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload,
      };
    default:
      return state;
  }
};
