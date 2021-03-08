import services from '../services';
import Types from '../actions/actionTypes';
import { tokenStorage } from '../helpers';
import UrlHelper from '../helpers/UrlHelper';

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: Types.ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch({ type: Types.ASYNC_END, promise: action.payload });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }

        console.log('ERROR', error);

        // check if session expired
        if (error.response.status === 401) {

          // Session and refresh token have expired - redirect to login
          // Could not refresh. Redirect start with expired session
          store.dispatch({ type: Types.LOGOUT });
          window.location.href = UrlHelper.getMainUrl('login');

        } else {

          action.error = true;
          action.payload = error.response.body;

          if (!action.skipTracking) {
            store.dispatch({ type: Types.ASYNC_END, promise: action.payload });
          }
          store.dispatch(action);
        }

      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === Types.REGISTER || action.type === Types.LOGIN) {
    if (!action.error) {
      tokenStorage.setToken(action.payload.access_token);
      services.setToken(action.payload.access_token);
    }
  } else if (action.type === Types.LOGOUT) {
    tokenStorage.clearToken();
    services.setToken(null);
  }

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware }
