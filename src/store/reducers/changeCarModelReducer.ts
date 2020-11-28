import * as types from '~/store/types';

export function changeCarModelReducer(state: string = 'all', action: any) {
  switch (action.type) {
    case types.CHANGE_CAR_MODEL:
      return {
        carModel: action.payload,
      };
    default:
      return state;
  }
}
