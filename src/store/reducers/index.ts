import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';

export default combineReducers({
  getCategoriesReducer: getCategoriesReducer,
});
