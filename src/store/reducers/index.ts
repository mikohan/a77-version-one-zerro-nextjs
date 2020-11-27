import { combineReducers } from 'redux';

import { getCategories } from './getCategories';

export default combineReducers({
  getCategories: getCategories,
});
