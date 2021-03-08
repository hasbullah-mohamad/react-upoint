import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'card-react';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';

import Validation from '../../helpers/ValidationHelper';
import Errors from '../../components/Errors';

import Types from '../../actions/actionTypes';
import services from '../../services';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  user: state.common.currentUser,
  services: state.account.services,
  loading: state.common.isLoading,
  serverError: state.account.serverError,
  validationErrors: state.account.validationErrors,
  accountUpdated: state.account.accountUpdated,
  paymentDetailsUpdated: state.account.paymentDetailsUpdated,
  paymentsInfo: state.bills.paymentsInfo
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data =>
    dispatch({ type: Types.PAYMENT_DETAILS_UPDATE, payload: services.Account.paymentDetailsUpdate(data) }),
  onLoad: payload =>
    dispatch({ type: Types.ACCOUNT_PAYMENT_EDIT_LOADED, payload })
});

class AccountPaymentEdit extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      card_name: 'required|max:30',
      card_number: 'required|length:16|numeric',
      card_cvv: 'required|min:3|max:4|numeric',
      card_expiry_date: 'required|length:4|numeric'
    };

    this.validationRulesBank = {
      bank_bsb: 'required|max:10|numeric',
      bank_account_no: 'required|max:20|numeric'
    };

    this.validator = new Validation(this.validationRules);
    this.validatorBank = new Validation(this.validationRulesBank);

    this.state = {
      agree_terms: false,
      errors: this.validator.errors,
      errorsBank: this.validatorBank.errors,
      payment_type: 'card',
      card_name: '',
      card_number: '',
      card_cvv: '',
      card_expiry_date: '',
      bank_bsb: '',
      bank_account_no: ''
    };
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      services.Bills.paymentsInfo()
    ]));
  }

  componentWillReceiveProps(props) {
    if (this.props.created !== props.created && props.created) {
      this.props.history.push(UrlHelper.getMainUrl('order-a-sim/confirmation'));
    }
    if (this.props.paymentDetailsUpdated !== props.paymentDetailsUpdated && props.paymentDetailsUpdated) {
      this.props.history.push(UrlHelper.getMainUrl('account/payment-history?updated=true'));
    }
  }

  get validationData() {
    const { card_name, card_number, card_cvv, card_expiry_date } = this.state;
    return {
      card_name,
      card_number,
      card_cvv,
      card_expiry_date
    };
  }

  get validationDataBank() {
    const { bank_bsb, bank_account_no } = this.state;
    return {
      bank_bsb,
      bank_account_no
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
    if (name === 'card_number') {
      modifiedValue = value.replace(/\D+/g, '');
    }
    if (name === 'card_expiry_date') {
      modifiedValue = value.replace(/\D+/g, '');
    }
    this.changeValue(name, modifiedValue);

    if (typeof this.validationRules[name] !== 'undefined') {
      const { errors } = this.validator;
      errors.remove(name);
      this.validator.validate(name, modifiedValue).then(() => {
        this.setState({
          errors
        });
      });
    }

    if (typeof this.validationRulesBank[name] !== 'undefined') {
      const { errorsBank } = this.validator;
      errorsBank.remove(name);
      this.validatorBank.validate(name, modifiedValue).then(() => {
        this.setState({
          errorsBank
        });
      });
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleUpdate(event) {
    event.preventDefault();
    if (!this.state.agree_terms) {
      return;
    }

    // Update card details
    const { payment_type, card_name, card_number, card_cvv, card_expiry_date, bank_bsb, bank_account_no } = this.state;
    const { onSubmit } = this.props;

    const card = {
      payment_type,
      billing_card_name: card_name,
      billing_card_number: card_number,
      billing_card_cvv: card_cvv,
      billing_card_expiry_date: card_expiry_date,
      bank_bsb,
      bank_account_no
    };

    let validator;
    let validationData;

    if (payment_type === 'card') {
      validator = this.validator;
      validationData = this.validationData;
    } else {
      validator = this.validatorBank;
      validationData = this.validationDataBank;
    }

    validator.validateAll(validationData).then(
      (result) => {
        if (result) {
          onSubmit(card);
        } else {
          this.setState({
            errors: this.validator.errors,
            errorsBank: this.validatorBank.errors
          });
        }
      }
    );
  }

  renderHelperBlock(name) {
    const { errors } = this.state;
    return errors.has(name) ? (
      <span className="invalid-feedback d-block">
        { errors.first(name) }
      </span>
    ) : null;
  }

  renderHelperBlockBank(name) {
    const { errorsBank } = this.state;
    return errorsBank.has(name) ? (
      <span className="invalid-feedback d-block">
        { errorsBank.first(name) }
      </span>
    ) : null;
  }

  render() {
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});
    const { payment_type, card_name, card_number, card_cvv, card_expiry_date, bank_bsb, bank_account_no } = this.state;
    const { errors, errorsBank } = this.state;

    return (
      <div className="page page--panel">
        <div className="section">
          <div className="container">
            <div className={'panel panel--primary'}>
              <Card
                container={'card_container'}
                formInputsNames={{
                  number: 'card_number',
                  expiry: 'card_expiry_date',
                  cvc: 'card_cvv',
                  name: 'card_name'
                }}
                classes={{
                  valid: 'valid',
                  invalid: 'invalid'
                }}
                initialValues={
                  {
                    number: card_number,
                    cvc: card_cvv,
                    expiry: card_expiry_date,
                    name: card_name
                  }
                }
              >
                <div className={'d-flex flex-column flex-md-row bg-primary'}>
                  <div className={'col-md-6 panel-heading align-self-center'}>
                    <div id={'card_container'} />
                  </div>
                  <div className={'col-md-6 panel-body bg-light'}>
                    <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Billing</h3>
                    {
                      false ?
                        <div className="text-center py-3 pt-lg-0">
                          <span className="rounded-circle bg-danger text-white font-weight-semi-bold d-inline-block p-2">
                            <span className="mx-3">Your account is currently ${overdueCharges} in arrears.</span>
                          </span>
                        </div>
                        : null
                    }
                    <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />

                    <form onSubmit={this.handleUpdate.bind(this)}>
                      <div className={'form-group'}>
                        <label htmlFor={'payment_type'}>Pay by</label>
                        <select
                          className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('payment_type') })}
                          name={'payment_type'}
                          id={'payment_type'}
                          value={payment_type}
                          onChange={this.handleChange.bind(this, 'payment_type')}
                        >
                          <option value="card">Credit Card</option>
                          <option value="bank">Direct Debit</option>
                        </select>
                        {this.renderHelperBlock('payment_type')}
                      </div>

                      {
                        payment_type === 'card' ? (
                          <div>
                            <h4 className={'title text-center font-weight-extra-bold'}>Card details</h4>
                            <div className={'form-group'}>
                              <label htmlFor={'order_card_name'}>Name on card</label>
                              <input
                                type={'text'}
                                className={classnames({ 'form-control': true, 'is-invalid': errors.has('card_name') })}
                                name={'card_name'}
                                id={'order_card_name'}
                                onChange={this.handleChange.bind(this, 'card_name')}
                              />
                              {this.renderHelperBlock('card_name')}
                            </div>

                            <div className={'row'}>
                              <div className={'col-md-9'}>
                                <div className={'form-group'}>
                                  <label htmlFor={'order_card_number'}>Card number</label>
                                  <input
                                    type={'text'}
                                    className={classnames({ 'form-control': true, 'is-invalid': errors.has('card_number') })}
                                    name={'card_number'}
                                    id={'order_card_number'}
                                    onChange={this.handleChange.bind(this, 'card_number')}
                                  />
                                  {this.renderHelperBlock('card_number')}
                                </div>
                              </div>
                              <div className={'col-md-3'}>
                                <div className={'form-group'}>
                                  <label htmlFor={'order_card_cvv'}>CVV</label>
                                  <input
                                    type={'text'}
                                    className={classnames({ 'form-control': true, 'is-invalid': errors.has('card_cvv') })}
                                    name={'card_cvv'}
                                    id={'billing_card_cvv'}
                                    onChange={this.handleChange.bind(this, 'card_cvv')}
                                  />
                                  {this.renderHelperBlock('card_cvv')}
                                </div>
                              </div>
                            </div>

                            <div className={'form-group'}>
                              <label htmlFor={'order_card_expiry_date'}>Card expiry date</label>
                              <input
                                type={'text'}
                                className={classnames({ 'form-control': true, 'is-invalid': errors.has('card_expiry_date') })}
                                name={'card_expiry_date'}
                                id={'order_card_expiry_date'}
                                onChange={this.handleChange.bind(this, 'card_expiry_date')}
                              />
                              {this.renderHelperBlock('card_expiry_date')}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className={'title text-center font-weight-extra-bold'}>Bank details</h4>
                            <div className={'form-group'}>
                              <label htmlFor={'order_bank_account_no'}>Bank account number</label>
                              <input
                                type={'text'}
                                className={classnames({ 'form-control': true, 'is-invalid': errorsBank.has('bank_account_no') })}
                                name={'bank_account_no'}
                                value={bank_account_no}
                                id={'order_bank_account_no'}
                                onChange={this.handleChange.bind(this, 'bank_account_no')}
                              />
                              {this.renderHelperBlockBank('bank_account_no')}
                            </div>

                            <div className={'form-group'}>
                              <label htmlFor={'order_bank_bsb'}>Bank BSB</label>
                              <input
                                type={'text'}
                                className={classnames({ 'form-control': true, 'is-invalid': errorsBank.has('bank_bsb') })}
                                name={'bank_bsb'}
                                value={bank_bsb}
                                id={'order_bank_bsb'}
                                onChange={this.handleChange.bind(this, 'bank_bsb')}
                              />
                              {this.renderHelperBlockBank('bank_bsb')}
                            </div>
                          </div>
                        )
                      }
                      <div className={'form-group'}>
                        <span className={'switch'}>
                          <input
                            type={'checkbox'}
                            id={'switch_agree_terms'}
                            checked={this.state.agree_terms}
                            onChange={(event) => {
                              this.setState({
                                agree_terms: event.target.checked
                              });
                            }}
                          />
                          <label htmlFor={'switch_agree_terms'}>
                            <span className={'text-muted'}>
                              I understand my monthly services will be billed using these details.
                            </span>
                          </label>
                        </span>
                      </div>

                      <div className={'row'}>
                        <div className={'col-md-12'}>
                          <button
                            className={'btn btn-outline-primary float-left'}
                            type={'button'}
                            onClick={this.handleBack.bind(this)}>
                            Back
                          </button>
                          <LaddaButton
                            className="btn btn-primary float-right"
                            loading={this.props.loading}
                            disabled={!this.state.agree_terms}
                            type={'submit'}>
                            Update
                          </LaddaButton>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountPaymentEdit));
