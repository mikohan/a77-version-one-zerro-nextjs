import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';
import { changeCarModelReducer } from './changeCarModelReducer';
import { activePageReducer } from '~/store/reducers/activePageReducer';

export default combineReducers({
  llhop: getCategoriesReducer,
  shop: changeCarModelReducer,
  uiState: activePageReducer,
});
