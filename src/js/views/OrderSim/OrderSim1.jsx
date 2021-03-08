import React, { Component } from 'react';
import StepZilla from 'react-stepzilla';

import OrderSimStep01 from './OrderSimStep01';
import OrderSimStep02 from './OrderSimStep02';
import OrderSimStep03 from './OrderSimStep03';
import OrderSimConfirmation from './OrderSimConfirmation';

export const SCENES = {
  STEPS: 'steps',
  CONFIRMATION: 'confirmation',
};

class OrderSim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: SCENES.STEPS,

      user_sim: '',

      user_title: '',
      user_firstname: '',
      user_lastname: '',
      user_contact_number: '',
      user_email: '',
      user_password: '',
      user_union_name: '',
      user_union_number: '',
      user_date_of_birth: null,
      user_keep_existing_number: '',

      user_street_number: '',
      user_street: '',
      user_postcode: '',
      user_city: '',
      user_state: '',
      user_same_address: true,
      user_delivery_street_number: '',
      user_delivery_street: '',
      user_delivery_postcode: '',
      user_delivery_city: '',
      user_delivery_state: '',
    };
  }

  handleChangeValue(field, value) {
    this.setState({
      [field]: value,
    });
  }

  renderConfirmation() {
    return (
      <OrderSimConfirmation data={this.state} onChangeValue={this.handleChangeValue.bind(this)} />
    );
  }

  renderSteps() {
    const steps = [
      { name: 'Information', component: <OrderSimStep01 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Address', component: <OrderSimStep02 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
      { name: 'Confirm', component: <OrderSimStep03 onChangeValue={this.handleChangeValue.bind(this)} data={this.state} /> },
    ];

    return (
      <div className={'step-horizontal'}>
        <StepZilla
          steps={steps}
          startAtStep={0}
          showNavigation={false}
          stepsNavigation={false}
        />
      </div>
    );
  }

  render() {
    const { scene } = this.state;
    let renderScene = null;
    switch (scene) {
      case SCENES.CONFIRMATION:
        renderScene = this.renderConfirmation();
        break;
      case SCENES.STEPS:
      default:
        renderScene = this.renderSteps();
        break;
    }

    return (
      <div className={'page page--order-sim page--panel'}>
        {/* HERO SECTION */}
        <div className={'section'}>
          <div className={'container'}>
            { renderScene }
          </div>
        </div>
      </div>
    );
  }
}

export default OrderSim;
