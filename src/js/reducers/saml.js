import Types from '../actions/actionTypes';
import { clearErrors, handleErrorResponse } from '../helpers';

const {
  APP_LOAD,
  LOGIN_SAML
} = Types;

const defaultState = {
  samlResponse: null
};

export default (state = defaultState, action) => {
  let error = null;
  switch (action.type) {
    case APP_LOAD:
      const currentUser = action.payload && !action.payload.error ? action.payload : null;
      return {
        ...defaultState
      };
    case LOGIN_SAML: {
      // eslint-disable-next-line no-cond-assign
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error,
          samlResponse: null
        };
      }
      return {
        ...state,
        samlResponse: action.payload.samlResponse
      };
    }
    default:
      return state;
  }
};
