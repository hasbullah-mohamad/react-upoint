import Types from '../actions/actionTypes';

const {
  ACCOUNT_SERVICES_GET,
  DASHBOARD_PAGE_LOADED,
  ACCOUNT_UPDATE_DETAILS,
  SERVICE_OVERVIEW_PAGE_LOADED,
  UPDATE_SERVICE_DETAILS,
  PAYMENT_DETAILS_UPDATE,
  PAYMENT_HISTORY_PAGE_LOADED,
  MEMBER_DISCOUNTS_PAGE_LOADED
} = Types;

import { handleErrorResponse, clearErrors } from '../helpers';

const defaultState = {
};

export default (state = defaultState, action) => {
  let error = null;
  switch (action.type) {
    case PAYMENT_HISTORY_PAGE_LOADED:
      return {
        ...state,
        services: action.payload[0].data
      };
    case ACCOUNT_SERVICES_GET:
      return {
        ...state,
        services: action.payload.data
      };
    case ACCOUNT_UPDATE_DETAILS:
      return {
        ...state,
        accountUpdated: !action.error
      };
    case DASHBOARD_PAGE_LOADED:
    case MEMBER_DISCOUNTS_PAGE_LOADED:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error
        };
      }
      return {
        ...state,
        services: action.payload[0].data,
        orders: action.payload[1]
      };
    case SERVICE_OVERVIEW_PAGE_LOADED:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error
        };
      }
      return {
        ...state,
        serviceDetails: action.payload[0],
        services: action.payload[1].data
      };
    case PAYMENT_DETAILS_UPDATE:
    if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error
        };
      }
      return {
        ...state,
        paymentDetailsUpdated: true
      };
    case UPDATE_SERVICE_DETAILS:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error
        };
      }
      return {
        ...state,
        serviceDetails: action.payload
      };
    default:
      return state;
  }
};
