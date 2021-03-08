import Types from '../actions/actionTypes';
import { handleErrorResponse, clearErrors } from '../helpers';

const { PAYMENT_HISTORY_PAGE_LOADED, DASHBOARD_PAGE_LOADED, ACCOUNT_PAYMENT_EDIT_LOADED } = Types;

const clearedOrdersState = {
  activated: false,
  created: false,
  createdOrder: {},
  activatedOrder: {}
};

export default (state = clearedOrdersState, action) => {
  let error = null;
  switch (action.type) {
    case PAYMENT_HISTORY_PAGE_LOADED:
      return {
        ...state,
        currentInvoice: action.payload[1].currentInvoice || null,
        olderInvoices: action.payload[1].olderInvoices || [],
        paymentsInfo: action.payload[2] || {},
      };
    case DASHBOARD_PAGE_LOADED:
      return {
        ...state,
        paymentsInfo: action.payload[2] || {},
      };
    case ACCOUNT_PAYMENT_EDIT_LOADED:
      return {
        ...state,
        paymentsInfo: action.payload[0] || {},
      };
    default:
      return state;
  }
};
