import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

import ActivateSimSplitter from './ActivateSimSplitter';
import ActivateSimStep01 from './ActivateSimStep01';
import ActivateSimStep02 from './ActivateSimStep02';
import ActivateSimStep03 from './ActivateSimStep03';
import ActivateSimStep04 from './ActivateSimStep04';
import ActivateSimStep05 from './ActivateSimStep05';
import ActivateSimStep06 from './ActivateSimStep06';
import ActivateSimConfirmation from './ActivateSimConfirmation';

export const SCENES = {
  SPLITTER: 'splitter',
  STEPS: 'steps',
  CONFIRMATION: 'confirmation',
};

class ActivateSim extends Component {
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

      identification_type: '',
      identification_medicare_number: '',
      identification_medicare_individual_name_no: '',
      identification_medicare_middle_name: '',
      identification_medicare_card_color: '',
      identification_medicare_card_expiry_date: null,

      identification_driver_licence_state: '',
      identification_driver_licence_number: '',

      identification_passport_number: '',
      identification_passport_nationality: '',

      pack_type: '',

      billing_card_number: '',
      billing_card_name: '',
      billing_card_cvv: '',
      billing_card_expiry_date: '',
    };

    this.state = {
      scene: SCENES.SPLITTER,
      ...initialData
    };
  }

  handleChangeValue(field, value) {
    this.setState({
      [field]: value,
    });
  }

  renderSplitter() {
    return (
      <ActivateSimSplitter data={this.state} onChangeValue={this.handleChangeValue.bind(this)} />
    );
  }

  renderSteps() {
    const steps = [
      { name: 'Activation Code', component: <ActivateSimStep01 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Information', component: <ActivateSimStep02 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Address', component: <ActivateSimStep03 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Identity', component: <ActivateSimStep04 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Select plan', component: <ActivateSimStep05 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Confirm', component: <ActivateSimStep06 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
    ];

    return (
      <StepZilla
        steps={steps}
        startAtStep={0}
        showNavigation={false}
        stepsNavigation={false}
      />
    );
  }

  renderConfirmation() {
    return (
      <ActivateSimConfirmation data={this.state} onChangeValue={this.handleChangeValue.bind(this)} />
    );
  }

  render() {
    const { scene } = this.state;
    let renderScene = null;
    switch (scene) {
      case SCENES.STEPS:
        renderScene = this.renderSteps();
        break;
      case SCENES.BILLING:
        renderScene = this.renderBilling();
        break;
      case SCENES.CONFIRMATION:
        renderScene = this.renderConfirmation();
        break;
      case SCENES.SPLITTER:
      default:
        renderScene = this.renderSplitter();
        break;
    }
    return (
      <div className={'page page--activate-sim page--panel'}>

        {/* HERO SECTION */}
        <div
          className={'section'}
        >
          <div className={'container'}>
            <div className={'step-horizontal'}>
              {renderScene}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActivateSim;
