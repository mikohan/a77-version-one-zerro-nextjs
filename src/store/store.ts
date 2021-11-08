import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useMemo } from 'react';

let store: any;

const initialState = {};

import rootReducer from './reducers';

const middleware = [thunk];

function initStore(preloadedState = initialState) {
  if (process.env.NODE_ENV === 'production') {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(...middleware)
    );
  } else {
    return createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(...middleware))
    );
  }
}

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === 'undefined') return _store;
  if (!store) store = _store;

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );
// export default store;

