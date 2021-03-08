import { createBrowserHistory } from 'history';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

import reducers from './reducers';

// Add the reducer to your store on the `routing` key
export const history = createBrowserHistory();
const projectRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(projectRouterMiddleware, promiseMiddleware, localStorageMiddleware, thunkMiddleware);
  }
  // Enable additional logging in non-production environments.
  return applyMiddleware(projectRouterMiddleware, promiseMiddleware, localStorageMiddleware, thunkMiddleware, createLogger());
};

export const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  composeWithDevTools(getMiddleware())
);
