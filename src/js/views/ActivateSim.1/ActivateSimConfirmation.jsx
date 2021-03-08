import React, { Component } from 'react';
import { SCENES } from './ActivateSim';

class ActivateSimConfirmation extends Component {
  handleSelectActivateType(value) {
    this.props.onChangeValue('activation_type', value);
  }

  handleContinue() {
    this.props.onChangeValue('scene', SCENES.STEPS);
  }

  render() {
    return (
      <div className={'panel panel--primary'}>
        <div className={'d-flex flex-column flex-md-row bg-primary'}>
          <div className={'col-md-6 panel-heading'}>
            <p className={'icon-105 text-center'}>
              <img src={'/img/icons/customer_new.svg'} alt={'Thank you'} />
            </p>
            <h3 className={'title panel-title title-underlined-light font-weight-extra-bold text-center'}>Thank you for activating your uPoint SIM card.</h3>
            <p>
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-normal'}>Order Id</h4>
                </div>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-extra-bold'}>4567892</h4>
                </div>
              </div>
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-normal'}>Account number</h4>
                </div>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-extra-bold'}>129345</h4>
                </div>
              </div>
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-normal'}>Account password</h4>
                </div>
                <div className={'col-xs-6 col-sm-6'}>
                  <h4 className={'font-weight-extra-bold'}>js8ajalz</h4>
                </div>
              </div>
            </p>
            <p>
              <small><b>
                Your activation order has been received; please take a note of your order ID in case you need to contact us about your activation.
              </b></small>
            </p>
            <p>
              <small>You should also take a note of your account number and password information which is shown here, you&apos;ll need this to log into your uPoint account.</small>
            </p>
          </div>
          <div className={'col-md-6 panel-body bg-light'}>
            <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>What happens next?</h3>
            <ul className={'list-numeric'}>
              <li>
                Your new service will normally be active within 4 hours, so please allow time for your new number to be activated.&nbsp;
                Occasionally, delays do happen and can last 7-10 days, this is rare but you can find out more here.
              </li>
              <li>
                Put your new SIM card into your handset, and when the service is active we will send you an SMS to let you know that your new service is ready to use.
              </li>
              <li>
                Once you receive this SMS, you should turn your phone off for a few minutes and turn it back on,&nbsp;
                this is important as it will enable your handset to pick up the relevant settings which will need to be installed/downloaded to enable things like MMS and Internet to work.
              </li>
              <li>
                Your SIM card is pre-loaded with $5 of Pay As You Go credit so you can start using your service as soon as it is activated.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ActivateSimConfirmation.defaultProps = {
  data: {},
  onChangeValue: () => {},
};

export default ActivateSimConfirmation;
