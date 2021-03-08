import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import moment from 'moment';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';

import { env } from '../../config';
import { initialState } from '../../reducers/global';
import { setGlobalActivate } from '../../actions/global';
import Step from '../../components/Step';
import Types from '../../actions/actionTypes';
import services from '../../services';
import Validation from '../../helpers/ValidationHelper';
import Errors from '../../components/Errors';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  activated: state.orders.activated,
  simNumberValid: state.tiab.simNumberValid,
  simNumberValidTimestamp: state.tiab.simNumberValidationTimestamp,
  loading: state.common.isLoading,
  serverError: state.orders.serverError,
  validationErrors: state.orders.validationErrors
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order)),
  onValidateSimNumber: simCardNumber =>
    dispatch({ type: Types.VALIDATE_SIM_NUMBER, payload: services.Tiab.validateSimNumber(simCardNumber) }),
  onSubmit: data =>
    dispatch({
      type: Types.ORDER_ACTIVATE,
      payload: services.Orders.activateService(data)
    })
});

class ActivatePendingService extends Component {
  constructor(props) {
    super(props);

    this.validationRules1 = {
      sim_card_number: 'required|numeric|length:9',
      activation_code: 'required|length:8'
    };

    this.validationRules2 = {
      sim_card_number: 'required|numeric|length:9',
      activation_code: 'required|length:8',
      ported_mobile_number: 'required|numeric|length:10',
      account_reference_number: 'required|numeric'
    };

    this.validator1 = new Validation(this.validationRules1);
    this.validator2 = new Validation(this.validationRules2);

    console.log(props);

    const queryParameters = new URLSearchParams(this.props.location.search);
    const code = queryParameters.get('code');

    this.state = {
      contacted: false,
      sim_card_valid: false,
      activation_code: code || '',
      sim_card_number: '', // '+61732573023',
      account_reference_number: '', // '12341234',
      ported_mobile_number: '', // '+61732573023',
      activation_keep_existing_number: 'no',
      errors1: this.validator1.errors,
      errors2: this.validator2.errors
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.simNumberValidTimestamp !== props.simNumberValidTimestamp) {
      if (props.simNumberValid) {
        this.setState({
          sim_card_valid: true
        });

        const {
          sim_card_number,
          activation_keep_existing_number,
          ported_mobile_number,
          account_reference_number,
          activation_code
        } = this.state;

        this.props.onSubmit({
          sim_card_number,
          activation_code,
          user_keep_existing_number: activation_keep_existing_number,
          ported_mobile_number,
          arn: account_reference_number
        });
      } else {
        this.validator1.setDirectErrors({
          sim_card_number: [
            'Sorry, that is not a valid SIM. Please check the 9 digit number on your SIM package and enter it without any spaces or letters'
          ]
        });
        this.setState({
          errors1: this.validator1.errors
        });
      }
    }

    if (this.props.activated !== props.activated && props.activated) {
      this.props.history.push(UrlHelper.getMainUrl('activate/confirmation'));
    }
  }

  get validationData1() {
    const { sim_card_number, activation_code } = this.state;
    return {
      sim_card_number,
      activation_code
    };
  }

  get validationData2() {
    const { sim_card_number, ported_mobile_number, account_reference_number, activation_code } = this.state;
    return {
      sim_card_number,
      activation_code,
      ported_mobile_number,
      account_reference_number
    };
  }

  changeValue(name, value) {
    this.setState({
      [name]: value
    });
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleChangeValue(name, value) {
    let modifiedValue = value;
    if (name === 'sim_card_number' || name === 'ported_mobile_number') {
      modifiedValue = value.replace(/\D+/g, '');
    }
    this.changeValue(name, modifiedValue);
    if (typeof this.validationRules1[name] !== 'undefined') {
      const { errors } = this.validator1;
      errors.remove(name);
      this.validator1.validate(name, modifiedValue).then(() => {
        this.setState({
          errors1: errors
        });
      });
    }
    if (typeof this.validationRules2[name] !== 'undefined') {
      const { errors } = this.validator2;
      errors.remove(name);
      this.validator2.validate(name, modifiedValue).then(() => {
        this.setState({
          errors2: errors
        });
      });
    }
  }

  handleNext(event) {
    event.preventDefault();
    let validator;
    let validationData;

    if (this.state.activation_keep_existing_number === 'no') {
      validator = this.validator1;
      validationData = this.validationData1;
    } else {
      validator = this.validator2;
      validationData = this.validationData2;
    }
    validator.validateAll(validationData).then(
      (success) => {
        if (success) {
          this.props.onValidateSimNumber(this.state.sim_card_number);
        } else {
          this.setState({
            errors1: validator.errors,
            errors2: validator.errors
          });
        }
      }
    );
  }

  handleBack() {
    this.props.history.goBack();
  }

  renderHelperBlock1(name) {
    const { errors1 } = this.state;
    return errors1.has(name) ? (
      <span className="invalid-feedback d-block">
        { errors1.first(name) }
      </span>
    ) : null;
  }

  renderHelperBlock2(name) {
    const { errors2 } = this.state;
    return errors2.has(name) ? (
      <span className="invalid-feedback d-block">
        { errors2.first(name) }
      </span>
    ) : null;
  }

  render() {
    const { loading } = this.props;
    const { errors1, errors2 } = this.state;
    const data = this.state;
    const wantsToKeepExistingNumber = data.activation_keep_existing_number === 'yes';
    const submitButtonDisabled = data.activation_keep_existing_number === 'yes' && (!this.state.contacted);

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'panel panel--primary'}>
              {/* PANEL BODY */}
              <div className={'panel-body'}>
                <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Activate a SIM card</h3>
                <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                <p className={'text-center'}>
                  Make sure you have your SIM card number and activation code to hand and you&apos;re ready to get started!
                </p>
                <p>&nbsp;</p>
                <form onSubmit={this.handleNext.bind(this)}>
                  <div className={'row'}>
                    <div className={'col-md-8'}>
                      <label className={'d-block'} htmlFor={'sim_card_number'}>
                        <span>SIM Card number</span>
                        <NavLink to={UrlHelper.getMainUrl('login')} className={'float-right'}><small>Where is this?</small></NavLink>
                      </label>
                    </div>
                  </div>
                  <div className={'row'}>
                    <div className={'col-md-8'}>
                      <div className={'form-group'}>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors1.has('sim_card_number') })}
                          id={'sim_card_number'}
                          value={data.sim_card_number}
                          onChange={this.handleChange.bind(this, 'sim_card_number')}
                        /><br />
                        {this.renderHelperBlock1('sim_card_number')}
                        {/* <span className={'invalid-feedback'} style={{ display: data.sim_card_valid ? 'block' : 'none' }}>{data.sim_card_valid ? data.sim_card_valid : null}</span> */}
                      </div>
                      <div className={'form-group'}>
                        <label htmlFor={'activation_code'}>Activation code</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors1.has('activation_code') })}
                          id={'activation_code'}
                          value={data.activation_code}
                          onChange={this.handleChange.bind(this, 'activation_code')}
                        /><br />
                        {this.renderHelperBlock1('activation_code')}
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'activation_keep_existing_number'}>Would you like to keep your existing Australian mobile number?</label>
                        <select
                          type={'text'}
                          className={'form-control custom-select'}
                          id={'activation_keep_existing_number'}
                          value={data.activation_keep_existing_number}
                          onChange={this.handleChange.bind(this, 'activation_keep_existing_number')}>
                          <option value={'no'}>No - I would like a new number</option>
                          <option value={'yes'}>Yes - I would like to keep existing number</option>
                        </select>
                      </div>
                    </div>
                    <div className={'col-md-4'}>
                      <div className={'form-group'}>
                        <small className={'form-text text-muted'}>
                          To start making and receiving calls or using data, you must activate your new uPoint SIM.
                          You will find your SIM Card number printed on the quick reference card inside your uPoint Starter Pack.
                        </small>
                      </div>
                    </div>
                  </div>

                  { wantsToKeepExistingNumber &&
                    <div className={'row'}>
                      <div className={'col-md-8'}>
                        <div className={'form-group'}>
                          <label htmlFor={'ported_mobile_number'}>Your existing Australian mobile number</label>
                          <input
                            className={classnames({ 'form-control': true, 'is-invalid': errors2.has('ported_mobile_number') })}
                            id={'ported_mobile_number'}
                            value={data.ported_mobile_number}
                            onChange={this.handleChange.bind(this, 'ported_mobile_number')}
                          />
                          {/* <MaskedInput
                            className={classnames({ 'form-control': true, 'is-invalid': errors2.has('ported_mobile_number') })}
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            id={'ported_mobile_number'}
                            value={data.ported_mobile_number}
                            onChange={this.handleChange.bind(this, 'ported_mobile_number')}
                          /> */}
                          {this.renderHelperBlock2('ported_mobile_number')}
                        </div>
                      </div>
                      <div className={'col-md-8'}>
                        <div className={'form-group'}>
                          <label htmlFor={'account_reference_number'}>Account reference number at you current provider</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors2.has('account_reference_number') })}
                            id={'account_reference_number'}
                            value={data.account_reference_number}
                            onChange={this.handleChange.bind(this, 'account_reference_number')}
                          />
                          {this.renderHelperBlock2('account_reference_number')}
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className={'form-group'}>
                          <span className={'switch'}>
                            <input
                              type={'checkbox'}
                              id={'switch_contacted'}
                              checked={this.state.contacted}
                              onChange={(event) => {
                                this.setState({
                                  contacted: event.target.checked
                                });
                              }}
                            />
                            <label htmlFor={'switch_contacted'}>
                              <span className={'text-muted text-center'}>
                                Please tick here to confirm that you’ve contacted your current provider and/or are aware of any associated porting costs that will be incurred.
                              </span>
                            </label>
                          </span>
                        </div>
                      </div>
                    </div>
                  }
                  <div className={'row'}>
                    <div className={'col-md-12 mt-5'}>
                      <button
                        className={'btn btn-outline-primary float-left'}
                        type={'button'}
                        onClick={this.handleBack.bind(this)}>
                        Back
                      </button>
                      <LaddaButton
                        className={'btn btn-primary float-right'}
                        loading={loading}
                        disabled={submitButtonDisabled}
                        type={'submit'}>
                        Next
                      </LaddaButton>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivatePendingService));
