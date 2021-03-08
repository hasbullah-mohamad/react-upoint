import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'card-react';
// import moment from 'moment';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';

import Errors from '../../components/Errors';
import Validation from '../../helpers/ValidationHelper';
import { setGlobalAddService } from '../../actions/global';
import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';

import Types from '../../actions/actionTypes';
import services from '../../services';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  data: state.global.addService,
  added: state.orders.added,
  loading: state.common.isLoading,
  serverError: state.orders.serverError,
  validationErrors: state.orders.validationErrors
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalAddService: order => dispatch(setGlobalAddService(order)),
  onSubmit: data =>
    dispatch({ type: Types.ORDER_ADD_SERVICE, payload: services.Orders.addService(data) })
});

class AddServiceBilling extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      billing_card_name: 'required|max:30',
      billing_card_number: 'required|length:16|numeric',
      billing_card_cvv: 'required|min:3|max:4|numeric',
      billing_card_expiry_date: 'required|length:4|numeric'
    };
    this.validator = new Validation(this.validationRules);
    this.state = {
      agree_terms: false,
      errors: this.validator.errors
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.added !== props.added && props.added) {
      this.props.history.push(UrlHelper.getMainUrl('add-service/confirmation'));
    }
  }

  get validationData() {
    const { billing_card_name, billing_card_number, billing_card_cvv, billing_card_expiry_date } = this.props.data;
    return {
      billing_card_name,
      billing_card_number,
      billing_card_cvv,
      billing_card_expiry_date
    };
  }

  changeValue(name, value) {
    this.props.setGlobalAddService({
      ...this.props.data,
      [name]: value
    });
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleChangeValue(name, value) {
    let modifiedValue = value;
    if (name === 'billing_card_number') {
      modifiedValue = value.replace(/\D+/g, '');
    }
    if (name === 'billing_card_expiry_date') {
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
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleNext(event) {
    event.preventDefault();
    if (!this.state.agree_terms) {
      return;
    }

    const { data } = this.props;
    let cardExpiryDate = data.billing_card_expiry_date;
    if (cardExpiryDate) {
      cardExpiryDate = cardExpiryDate.replace(/\s/g, '');
    }
    const orderData = {
      billing_card_cvv: data.billing_card_cvv,
      billing_card_expiry_date: cardExpiryDate,
      billing_card_name: data.billing_card_name,
      billing_card_number: data.billing_card_number,

      user_street_number: data.user_street_number,
      user_street: data.user_street,
      user_postcode: data.user_postcode,
      user_city: data.user_city,
      user_state: data.user_state,

      label_firstname: data.label_firstname,
      label_lastname: data.label_lastname,

      pack_type: data.pack_type,
    };

    const { onSubmit } = this.props;
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          onSubmit(orderData);
        } else {
          this.setState({
            errors: this.validator.errors
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


  render() {
    const { data } = this.props;
    const { errors } = this.state;
    const priceData = ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', data.pack_type);

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'panel panel--primary'}>
              <Card
                container={'billing_card_container'}
                formInputsNames={{
                  number: 'billing_card_number',
                  expiry: 'billing_card_expiry_date',
                  cvc: 'billing_card_cvv',
                  name: 'billing_card_name'
                }}
                classes={{
                  valid: 'valid',
                  invalid: 'invalid'
                }}
                initialValues={
                  {
                    number: data.billing_card_number,
                    cvc: data.billing_card_cvv,
                    expiry: data.billing_card_expiry_date,
                    name: data.billing_card_name
                  }
                }
              >
                <div className={'d-flex flex-column flex-md-row bg-primary'}>
                  <div className={'col-md-6 panel-heading align-self-center'}>
                    <div id={'billing_card_container'} />
                  </div>
                  <div className={'col-md-6 panel-body bg-light'}>
                    <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Billing</h3>
                    <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                    <form onSubmit={this.handleNext.bind(this)}>
                      <div className={'form-group'}>
                        <label htmlFor={'billing_price'}>Pay Today</label>
                        <span className={'d-block'}>$5.00</span>
                      </div>
                      <div className={'form-group'}>
                        <label htmlFor={'billing_card_name'}>Name on card</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('billing_card_name') })}
                          name={'billing_card_name'}
                          id={'billing_card_name'}
                          onChange={this.handleChange.bind(this, 'billing_card_name')}
                        />
                        {this.renderHelperBlock('billing_card_name')}
                      </div>

                      <div className={'row'}>
                        <div className={'col-md-9'}>
                          <div className={'form-group'}>
                            <label htmlFor={'billing_card_number'}>Card number</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('billing_card_number') })}
                              name={'billing_card_number'}
                              id={'billing_card_number'}
                              onChange={this.handleChange.bind(this, 'billing_card_number')}
                            />
                            {this.renderHelperBlock('billing_card_number')}
                          </div>
                        </div>
                        <div className={'col-md-3'}>
                          <div className={'form-group'}>
                            <label htmlFor={'billing_card_cvv'}>CVV</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('billing_card_cvv') })}
                              name={'billing_card_cvv'}
                              id={'billing_card_cvv'}
                              onChange={this.handleChange.bind(this, 'billing_card_cvv')}
                            />
                            {this.renderHelperBlock('billing_card_cvv')}
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'billing_card_expiry_date'}>Card expiry date</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('billing_card_expiry_date') })}
                          name={'billing_card_expiry_date'}
                          placeholder="mm/yy"
                          id={'billing_card_expiry_date'}
                          onChange={this.handleChange.bind(this, 'billing_card_expiry_date')}
                        />
                        {this.renderHelperBlock('billing_card_expiry_date')}
                      </div>

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
                            <span className={'text-muted text-center '}>
                              I understand I will be billed monthly for this pack.
                            </span>
                          </label>
                        </span>
                      </div>

                      <div className={'row'}>
                        <div className={'col-md-12 col-xs-12 mt-5'}>
                          <button
                            className={'btn btn-outline-primary float-left'}
                            type={'button'}
                            onClick={this.handleBack.bind(this)}>
                            Back
                          </button>
                          <LaddaButton
                            className={'btn btn-primary float-right'}
                            loading={this.props.loading}
                            disabled={!this.state.agree_terms}
                            type={'submit'}>
                            Next
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddServiceBilling));
