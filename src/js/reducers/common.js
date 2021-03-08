import Types from '../actions/actionTypes';
import { clearErrors, handleErrorResponse } from '../helpers';
import UrlHelper from '../helpers/UrlHelper';

const {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  REGISTER,
  ASYNC_START,
  ASYNC_END,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED,
  ACCOUNT_UPDATE_DETAILS,
  PASSWORD_RESET,
  PASSWORD_RESET_REQUEST
} = Types;

const defaultState = {
  appName: 'Upoint',
  token: null,
  viewChangeCounter: 0,
  isLoading: false
};

const loggedOutState = {
  loggedIn: false,
  currentUser: null,
  token: null
};

export default (state = defaultState, action) => {
  const formActions = [
    Types.PASSWORD_RESET,
    Types.PASSWORD_RESET_REQUEST
  ];

  let error = null;
  let errorState = null;

  // set errors if we're dealing with a form action
  if (formActions.includes(action.type)) {
    if (error = handleErrorResponse(action.payload)) {
      errorState = {
        ...error
      };
    }
  }

  switch (action.type) {
    case APP_LOAD:
      const currentUser = action.payload && !action.payload.error ? action.payload : null;
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser,
        loggedIn: !!currentUser,
        isLoading: false
      };
    case ASYNC_START:
      return {
        ...state,
        ...clearErrors,
        isLoading: true,
        serverError: null
      };
    case ASYNC_END:
      return {
        ...state,
        isLoading: false
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case ACCOUNT_UPDATE_DETAILS:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error
        };
      }
      return {
        ...state,
        currentUser: action.payload
      };
    case LOGOUT:
      return { ...state, redirectTo: UrlHelper.getMainUrl(''), token: null, currentUser: null, loggedIn: false };
    case PASSWORD_RESET:
    case PASSWORD_RESET_REQUEST:
      let successState = {};
      if (action.type === Types.PASSWORD_RESET) {
        successState = {
          passwordReset: !errorState
        };
      } else if (action.type === Types.PASSWORD_RESET_REQUEST) {
        successState = {
          passwordResetRequested: !errorState
        };
      }
      return {
        ...state,
        ...(errorState || {}),
        ...successState
      };
    case LOGIN:
    case REGISTER: {
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error,
          ...loggedOutState,
          redirectTo: null
        };
      }
      return {
        ...state,
        redirectTo: action.error ? null : '/',
        token: action.error ? null : action.payload.access_token,
        currentUser: action.error ? null : action.payload.profile,
        loggedIn: !action.error
      };
    }
    // these are used to track onloading of main pages
    // to make sure any async request events are not handled
    // if we've changed the view
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:

      return state;
  }
};
