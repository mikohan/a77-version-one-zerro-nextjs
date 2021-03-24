import { combineReducers } from 'redux';

import { getCategoriesReducer } from './getCategoriesReducer';
import { changeCarModelReducer } from './changeCarModelReducer';
import { UIReducer } from '~/store/reducers/UIReducer';

export default combineReducers({
  llhop: getCategoriesReducer,
  shop: changeCarModelReducer,
  uiState: UIReducer,
});
