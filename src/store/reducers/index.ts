import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';
import { changeCarModelReducer } from './changeCarModelReducer';

export default combineReducers({
  cars: getCategoriesReducer,
  changeCarModelReducer: changeCarModelReducer,
});
