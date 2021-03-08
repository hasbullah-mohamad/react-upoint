import Types from './actionTypes';

export const setGlobalOrder = order =>
  ({ type: Types.SET_GLOBAL_ORDER, order });

export const setGlobalActivate = activate =>
  ({ type: Types.SET_GLOBAL_ACTIVATE, activate });

export const setGlobalAddService = addService =>
  ({ type: Types.SET_GLOBAL_ADD_SERVICE, addService });

export const setGlobalNbnOrder = order =>
  ({ type: Types.SET_GLOBAL_NBN_ORDER, order });

export const setGlobalEnergyPlansPricing = plansPricing =>
  ({ type: Types.SET_GLOBAL_ENERGY_PLANS_PRICING, plansPricing });

// export const setGlobalAuth = activate =>
//   ({ type: Types.setGlobalActivate, activate });
