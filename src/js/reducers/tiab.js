import Types from '../actions/actionTypes';

const { VALIDATE_SIM_NUMBER } = Types;

const defaultState = {
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case VALIDATE_SIM_NUMBER:
      return {
        ...state,
        simNumberChecked: action.payload.number,
        simNumberValid: action.payload.valid,
        simNumberValidationTimestamp: (new Date()).getTime()
      };
    default:
      return state;
  }
};
