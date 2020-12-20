import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { ICar } from '~/interfaces/ICar';
import { IMake } from '~/interfaces/IState';

const initialState = {};
export interface IState {
  cars: {
    cars: ICar[];
    currentCar: ICar;
    makes: IMake[];
  };
  currentCar: ICar;
}

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
