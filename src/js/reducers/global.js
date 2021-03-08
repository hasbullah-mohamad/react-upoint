import Types from '../actions/actionTypes';

export const initialState = {
  addService: {
    label_firstname: '',
    label_lastname: '',

    user_title: '',
    user_firstname: '',
    user_lastname: '',
    user_contact_number: '',
    user_email: '',

    address_label: '',

    user_street_number: '',
    user_street: '',
    user_postcode: '',
    user_city: '',
    user_state: '',

    pack_type: '', // 'super_mobile_pack',

    billing_card_number: '', // '1234123412341234',
    billing_card_name: '', // 'John Doe',
    billing_card_cvv: '', // '123',
    billing_card_expiry_date: '' // '12/20',
  },

  order: {
    sim: '', // 'nano',
    title: '',
    firstname: '',
    lastname: '',
    contact_number: '',
    email: '',
    birth_date: null,

    address: '',
    street_number: '',
    street: '',
    postcode: '',
    city: '',
    state: '',
    unit: '',

    same_address: false,
    delivery_address: '',
    delivery_street_number: '',
    delivery_street: '',
    delivery_postcode: '',
    delivery_city: '',
    delivery_state: '',
    delivery_unit: '',

    card_number: '', // '1234123412341234',
    card_expiry_date: '', // '12/30',
    card_cvv: '', // '123',
    card_name: '' // 'John Doe',
  },
  activate: {
    activation_type: '',
    activation_code: '',
    sim_card_number: '', // '+61732573023',
    account_reference_number: '', // '12341234',
    ported_mobile_number: '', // '+61732573023',
    activation_keep_existing_number: 'no',

    user_title: '',
    user_firstname: '',
    user_lastname: '',
    user_contact_number: '',
    user_email: '',
    user_password: '',
    user_union_name: '',
    user_union_number: '',
    user_date_of_birth: null,

    user_street_number: '',
    user_street: '',
    user_postcode: '',
    user_city: '',
    user_state: '',

    identification_type: '',
    identification_medicare_number: '', // '123123',
    identification_medicare_individual_name_no: '', // 'J',
    identification_medicare_middle_name: '', // 'Doe',
    identification_medicare_card_color: '', // 'green',
    identification_medicare_card_expiry_date: '', // '12/2021',

    identification_driver_licence_state: '', // 'NSW',
    identification_driver_licence_number: '', // '12341234',

    identification_passport_number: '', // '12341234',
    identification_passport_nationality: '', // 'AU',

    pack_type: '', // 'super_mobile_pack',

    billing_card_number: '', // '1234123412341234',
    billing_card_name: '', // 'John Doe',
    billing_card_cvv: '', // '123',
    billing_card_expiry_date: '' // '12/20',
  },
  nbnOrder: {
    address: '',
    pack_type: '',
    octane_account_no: '',
    title: '',
    firstname: '',
    lastname: '',
    contact_number: '',
    notification_email: '',
    current_nbn_status: '',
    have_contract: '',
    contract_expiry_date: ''
  },
  energyPlansPricing: {
    energy_bill: '1',
    solar: '',
    tariff: '',
    water: '',
    peak: '',
    days: '',
    name: '',
    phone: '',
    email: '',
    meterTypes: [],
    marketSegments: [],
    postcodeFound: false,
    compare: null,
    offer: null,
    error: null
  }
};

const setGlobalOrder = (state, action) => ({
  ...state,
  order: action.order
});

const setGlobalActivate = (state, action) => ({
  ...state,
  activate: action.activate
});

const setGlobalAddService = (state, action) => ({
  ...state,
  addService: action.addService
});

const setGlobalNbnOrder = (state, action) => ({
  ...state,
  nbnOrder: action.order
});

const setGlobalEnergyPlansPricing = (state, action) => ({
  ...state,
  energyPlansPricing: action.plansPricing
});

export default (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_GLOBAL_ORDER:
      return setGlobalOrder(state, action);
    case Types.SET_GLOBAL_ACTIVATE:
      return setGlobalActivate(state, action);
    case Types.SET_GLOBAL_ADD_SERVICE:
      return setGlobalAddService(state, action);
    case Types.SET_GLOBAL_NBN_ORDER:
      return setGlobalNbnOrder(state, action);
    case Types.SET_GLOBAL_ENERGY_PLANS_PRICING:
      return setGlobalEnergyPlansPricing(state, action);
    case Types.NBN_ORDER_CREATE:
      return {
        ...state,
        nbnOrder: initialState.nbnOrder
      };
    default:
      return state;
  }
};
