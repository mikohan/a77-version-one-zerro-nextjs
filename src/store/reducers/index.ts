import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';
import { changeCarModelReducer } from './changeCarModelReducer';

export default combineReducers({
  getCategoriesReducer: getCategoriesReducer,
  changeCarModelReducer: changeCarModelReducer,
});
