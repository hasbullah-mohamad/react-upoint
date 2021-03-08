import Types from '../actions/actionTypes';

const { ENERGY_SIGNUP } = Types;

const defaultState = {
  interestedInEnergy: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ENERGY_SIGNUP:
      return {
        ...state,
        interestedInEnergy: true
      };
    default:
      return state;
  }
};
