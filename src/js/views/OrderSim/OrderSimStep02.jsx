import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classnames from 'classnames';

import AddressInput from '../../components/AddressInput';
import Step from '../../components/Step';
import { setGlobalOrder } from '../../actions/global';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  data: state.global.order
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalOrder: order => dispatch(setGlobalOrder(order))
});

class OrderSimStep02 extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      address: '',
      street: 'required',
      street_number: 'required',
      city: 'required',
      postcode: 'required',
      state: 'required',

      delivery_address: '',
      delivery_street: 'required',
      delivery_street_number: 'required',
      delivery_postcode: 'required',
      delivery_state: 'required',
      delivery_city: 'required'
    };
    this.validator = new Validation(this.validationRules);
    this.state = {
      errors: this.validator.errors
    };
  }

  get validationData() {
    const { street_number, street, postcode, city, state, delivery_street_number, delivery_street, delivery_postcode, delivery_city, delivery_state } = this.props.data;
    return {
      street_number,
      street,
      postcode,
      city,
      state,
      delivery_street_number,
      delivery_street,
      delivery_postcode,
      delivery_city,
      delivery_state
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
    if (this.props.data.same_address) {
      this.props.setGlobalOrder({
        ...this.props.data,
        [name]: value,
        [`delivery_${name}`]: value
      });
    } else {
      this.props.setGlobalOrder({
        ...this.props.data,
        [name]: value
      });
    }
    if (typeof this.validationRules[name] !== 'undefined') {
      const { errors } = this.validator;
      errors.remove(name);
      this.validator.validate(name, value).then(() => {
        this.setState({
          errors
        });
      });
    }
  }

  handleAddressChange(value) {
    const { address, info } = value;
    console.log(value);
    if (this.props.data.same_address) {
      this.props.setGlobalOrder({
        ...this.props.data,
        address,
        unit: info.UnitNumber,
        street: info.Street,
        street_number: info.Number,
        city: info.Suburb,
        postcode: info.Postcode,
        state: info.State,
        delivery_address: address,
        delivery_unit: info.UnitNumber,
        delivery_street: info.Street,
        delivery_street_number: info.Number,
        delivery_city: info.Suburb,
        delivery_postcode: info.Postcode,
        delivery_state: info.State
      });
    } else {
      this.props.setGlobalOrder({
        ...this.props.data,
        address,
        unit: info.UnitNumber,
        street: info.Street,
        street_number: info.Number,
        city: info.Suburb,
        postcode: info.Postcode,
        state: info.State
      });
    }
  }

  handleDeliveryAddressChange(value) {
    const { address, info } = value;
    this.props.setGlobalOrder({
      ...this.props.data,
      delivery_address: address,
      delivery_unit: info.UnitNumber,
      delivery_street: info.Street,
      delivery_street_number: info.Number,
      delivery_city: info.Suburb,
      delivery_postcode: info.Postcode,
      delivery_state: info.State
    });
  }

  handleChangeSameAddress(event) {
    const { data } = this.props;
    if (event.target.checked) {
      this.props.setGlobalOrder({
        ...data,
        delivery_street_number: data.street_number,
        delivery_street: data.street,
        delivery_postcode: data.postcode,
        delivery_city: data.city,
        delivery_state: data.state,
        delivery_unit: data.unit,
        same_address: event.target.checked
      });
    } else {
      this.props.setGlobalOrder({
        ...data,
        delivery_street_number: '',
        delivery_street: '',
        delivery_postcode: '',
        delivery_city: '',
        delivery_state: '',
        delivery_unit: '',
        same_address: event.target.checked
      });
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleNext(event) {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('order-a-sim/step-3'));
        } else {
          this.setState({
            errors: this.validator.errors
          });
        }
      }
    );
  }

  renderHelperAddressBlock(name) {
    const { errors } = this.state;
    return errors.has(name) ? (
      <span className="invalid-feedback d-block">
        This address is not valid, please try again.
      </span>
    ) : null;
  }

  render() {
    const { data } = this.props;
    const { errors } = this.state;

    return (
      <div>
        <Step steps={['Information', 'Address', 'Confirm']} index={1} />
        <div className={'panel panel--primary panel--padding-large'}>
          <div className={'panel-body'}>
            <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Your address</h3>
            <form onSubmit={this.handleNext.bind(this)}>

              <div className={'form-group'}>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <label htmlFor={'address'}>Address</label>
                    <AddressInput
                      id="address"
                      initialValue={data.address}
                      className={classnames({ 'form-control': true, 'is-invalid': errors.has('postcode') })}
                      onChange={this.handleAddressChange.bind(this)}
                    />
                    {this.renderHelperAddressBlock('postcode')}
                  </div>
                  <div className={'col-md-4'}>
                    <small className={'form-text text-muted'}>
                      This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                    </small>
                  </div>
                </div>
              </div>
              <div className={'form-group'}>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <span className={'switch'}>
                      <input
                        type={'checkbox'}
                        id={'switch_order_same_address'}
                        checked={data.same_address}
                        onChange={this.handleChangeSameAddress.bind(this)}
                      />
                      <label htmlFor={'switch_order_same_address'}>
                        <span className={'text-muted text-center'}>
                          My delivery address is the same.
                        </span>
                      </label>
                    </span>
                  </div>
                </div>
              </div>
              {
                data.same_address ? null : (
                  <div className={'form-group'}>
                    <div className={'row'}>
                      <div className={'col-md-8'}>
                        <label htmlFor={'delivery_address'}>Address</label>
                        <AddressInput
                          id="delivery_address"
                          initialValue={data.delivery_address}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('delivery_postcode') })}
                          onChange={this.handleDeliveryAddressChange.bind(this)}
                        />
                        {this.renderHelperAddressBlock('delivery_postcode')}
                      </div>
                      <div className={'col-md-4'}>
                        <small className={'form-text text-muted'}>
                          This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                        </small>
                      </div>
                    </div>
                  </div>
                )
              }

              <div className={'row'}>
                <div className={'col-xs-12 col-md-12 mt-5'}>
                  <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
                  <button className={'btn btn-primary float-right'} type={'submit'}>Next</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

OrderSimStep02.defaultProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSimStep02));
