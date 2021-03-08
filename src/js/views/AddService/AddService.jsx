import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

// import { AddServiceStepPlan, AddServiceStepConfirm, AddServiceStepInformation, AddServiceSimBilling } from './index.js';
import AddServiceStepInformation from './AddServiceStepInformation.jsx';
import AddServiceStepPlan from './AddServiceStepPlan.jsx';
import AddServiceStepConfirm from './AddServiceStepConfirm.jsx';
import AddServiceSimBilling from './AddServiceSimBilling.jsx';

export const SCENES = {
  STEPS: 'steps',
};

class AddService extends Component {
  constructor(props) {
    super(props);
    const initialData = {
      activation_type: '',
      activation_code: '',
      activation_keep_existing_number: '',

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
      user_postcode_suburb: '',
      user_city: '',
      user_state: '',

      pack_type: '',

      billing_card_number: '',
      billing_card_name: '',
      billing_card_cvv: '',
      billing_card_expiry_date: '',
    };

    this.state = {
      ...initialData
    };
  }

  handleChangeValue(field, value) {
    this.setState({
      [field]: value,
    });
  }

  render() {
    const { scene } = this.state;
    return (
      <div className={'page page--activate-sim page--panel'}>

        {/* HERO SECTION */}
        <div
          className={'section'}
        >
          <div className={'container'}>
            <div className={'step-horizontal'}>
            <AddServiceStepInformation onChangeValue={this.handleChangeValue.bind(this)} data={this.state} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddService;
