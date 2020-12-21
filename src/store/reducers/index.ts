import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';
import { changeCarModelReducer } from './changeCarModelReducer';

export default combineReducers({
  shop: getCategoriesReducer,
  currentCar: changeCarModelReducer,
});
