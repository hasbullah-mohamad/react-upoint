import Types from '../actions/actionTypes';

const { NBN_ORDER_CREATE, ASYNC_START } = Types;

const defaultState = {
};

const clearedOrdersState = {
  nbnOrderNumber: null,
  orderCreated: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ASYNC_START:
      return {
        ...state,
        // remove any previous order from the state
        ...clearedOrdersState
      };
    case NBN_ORDER_CREATE:
      return {
        ...state,
        nbnOrderNumber: action.payload.number,
        orderCreated: true
      };
    default:
      return state;
  }
};
