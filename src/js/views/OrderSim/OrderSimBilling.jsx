import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Card from 'card-react';
import LaddaButton from 'react-ladda';
// import moment from 'moment';
import classnames from 'classnames';

import { setGlobalOrder } from '../../actions/global';
import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import Validation from '../../helpers/ValidationHelper';
import Errors from '../../components/Errors';


import Types from '../../actions/actionTypes';
import services from '../../services';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  data: state.global.order,
  created: state.orders.created,
  loading: state.common.isLoading,
  serverError: state.orders.serverError,
  validationErrors: state.orders.validationErrors
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalOrder: order => dispatch(setGlobalOrder(order)),
  onSubmit: data =>
    dispatch({ type: Types.ORDER_CREATE, payload: services.Orders.create(data) })
});

class OrderSimBilling extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      card_name: 'required|max:30',
      card_number: 'required|length:16|numeric',
      card_cvv: 'required|min:3|max:4|numeric',
      card_expiry_date: 'required|length:4|numeric'
    };
    this.validator = new Validation(this.validationRules);
    this.state = {
      agree_terms: false,
      errors: this.validator.errors
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.created !== props.created && props.created) {
      this.props.history.push(UrlHelper.getMainUrl('order-a-sim/confirmation'));
    }
  }

  get validationData() {
    const { card_name, card_number, card_cvv, card_expiry_date } = this.props.data;
    return {
      card_name,
      card_number,
      card_cvv,
      card_expiry_date
    };
  }

  changeValue(name, value) {
    this.props.setGlobalOrder({
      ...this.props.data,
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
    let cardExpiryDate = data.card_expiry_date;
    if (cardExpiryDate) {
      cardExpiryDate = cardExpiryDate.replace(/\s/g, '');
    }
    const orderData = {
      billing_card_cvv: data.card_cvv,
      billing_card_expiry_date: cardExpiryDate,
      billing_card_name: data.card_name,
      billing_card_number: data.card_number,

      user_contact_number: data.contact_number,
      user_date_of_birth: data.birth_date,

      user_street_number: data.street_number,
      user_street: data.street,
      user_postcode: data.postcode,
      user_city: data.city,
      user_state: data.state,
      user_unit: data.unit,

      user_delivery_street_number: data.delivery_street_number,
      user_delivery_street: data.delivery_street,
      user_delivery_postcode: data.delivery_postcode,
      user_delivery_city: data.delivery_city,
      user_delivery_state: data.delivery_state,
      user_delivery_unit: data.delivery_unit,

      user_email: data.email,
      user_firstname: data.firstname,

      // user_keep_existing_number: data.keep_existing_number,
      user_lastname: data.lastname,
      user_password: data.password,
      user_same_address: data.same_address ? 'yes' : 'no',
      // user_sim: data.sim,
      user_title: data.title,
      user_union_name: data.union_name,
      user_union_number: data.union_number
    };

    console.log(orderData);
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
    const sim = ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', data.sim);

    return (
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
              number: data.card_number,
              cvc: data.card_cvv,
              expiry: data.card_expiry_date,
              name: data.card_name
            }
          }
        >
          <div className={'d-flex flex-column flex-md-row bg-primary'}>
            <div className={'col-md-6 panel-heading align-self-center'}>
              <div id={'card_container'} />
            </div>
            <div className={'col-md-6 panel-body bg-light'}>
              <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Billing</h3>
              <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
              <form onSubmit={this.handleNext.bind(this)}>
                <div className={'form-group'}>
                  <label htmlFor={'order_price'}>Pay Today</label>
                  <span className={'d-block'}>{sim ? `$${sim.price}` : null}</span>
                </div>
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
                  <div className={'col-md-12'}>
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
                      type={'submit'}
                      onClick={this.handleNext.bind(this)}>
                      Next
                    </LaddaButton>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSimBilling));
