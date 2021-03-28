import { combineReducers } from 'redux';

import { filtersReducer } from './filtersReducer';
import { changeCarModelReducer } from './changeCarModelReducer';
import { UIReducer } from '~/store/reducers/UIReducer';

export default combineReducers({
  activeFilters: filtersReducer,
  shop: changeCarModelReducer,
  uiState: UIReducer,
});
