import { combineReducers } from 'redux';
import { userReducer } from '~/store/users/userReducer';

import { changeCarModelReducer } from './changeCarModelReducer';
import { UIReducer } from '~/store/ui/UIReducer';
import { shopReducer } from '~/store/shop/shopReducer';
import { cartReducer } from '~/store/cart/cartReducer';

export default combineReducers({
  shop: changeCarModelReducer,
  shopNew: shopReducer,
  uiState: UIReducer,
  cart: cartReducer,
  user: userReducer,
});
