import { Dispatch } from 'redux';
import * as types from '~/store/types';

export const linkActiveAction = (activePage: string) => {
  return {
    type: types.SET_ACTIVE_PAGE,
    payload: activePage,
  };
};
