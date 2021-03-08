const Registration = {
  union_name: '',
  union_number: '',
  title: '',
  first_name: '',
  last_name: '',
  birth_date: '',
  contact_number: '',
  street: '',
  street_number: '',
  city: '',
  postcode: '',
  state: '',
  email: '',
  password: '',
  errors: ''
};

const Order = {
  sim: '', //'nano',
  title: '',
  firstname: '',
  lastname: '',
  contact_number: '',
  email: '',
  date_of_birth: null,

  street_number: '',
  street: '',
  postcode: '',
  city: '',
  state: '',
  same_address: true,
  delivery_street_number: '',
  delivery_street: '',
  delivery_postcode: '',
  delivery_city: '',
  delivery_state: '',

  card_number: '', //'1234123412341234',
  card_expiry_date: '', //'12/30',
  card_cvv: '', //'123',
  card_name: '', //'John Doe',
};

const Registration = {
  activation_type: '',
  activation_code: '',
  sim_card_number: '', //'+61732573023',
  account_reference_number: '', //'12341234',
  ported_mobile_number: '', //'+61732573023',
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

  user_address: '',
  user_postcode: '',
  user_state: '',

  identification_type: '',
  identification_medicare_number: '', //'123123',
  identification_medicare_individual_name_no: '', //'J',
  identification_medicare_middle_name: '', //'Doe',
  identification_medicare_card_color: '', //'green',
  identification_medicare_card_expiry_date: '', //'12/2021',

  identification_driver_licence_state: '', //'NSW',
  identification_driver_licence_number: '', //'12341234',

  identification_passport_number: '', //'12341234',
  identification_passport_nationality: '', //'AU',

  pack_type: '', //'super_mobile_pack',

  billing_card_number: '', //'1234123412341234',
  billing_card_name: '', //'John Doe',
  billing_card_cvv: '', //'123',
  billing_card_expiry_date: '', //'12/20',
}
