import Types from '../actions/actionTypes';
import { handleErrorResponse, clearErrors } from '../helpers';

const { ORDER_CREATE, ORDER_ACTIVATE, ASYNC_START, ORDER_ADD_SERVICE } = Types;

const clearedOrdersState = {
  activated: false,
  created: false,
  added: false,
  createdOrder: {},
  activatedOrder: {},
  addedServiceOrder: {}
};

export default (state = clearedOrdersState, action) => {
  let error = null;
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        ...clearErrors,
        // remove any previous order from the state
        ...clearedOrdersState
      };
    case ORDER_CREATE:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error,
          created: false,
          createdOrder: {}
        };
      }
      return {
        ...state,
        created: !!action.payload,
        createdOrder: action.payload ? action.payload : null
      };
    case ORDER_ACTIVATE:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error,
          activated: false,
          activatedOrder: {}
        };
      }
      return {
        ...state,
        activated: !!action.payload,
        activatedOrder: action.payload ? action.payload : null
      };
    case ORDER_ADD_SERVICE:
      if (error = handleErrorResponse(action.payload)) {
        return {
          ...state,
          ...error,
          added: false,
          addedServiceOrder: {}
        };
      }
      return {
        ...state,
        added: !!action.payload,
        addedServiceOrder: action.payload ? action.payload : null
      };
    default:
      return state;
  }
};
