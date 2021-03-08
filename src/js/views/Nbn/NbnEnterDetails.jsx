import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import classnames from 'classnames';

import AddressInput from '../../components/AddressInput/AddressInput';
import Step from '../../components/Step';
import Validation from '../../helpers/ValidationHelper';
import { setGlobalNbnOrder } from '../../actions';
import UrlHelper from '../../helpers/UrlHelper';

class NbnEnterDetails extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      // octane_account_no: 'required|numeric',
      title: 'required',
      firstname: 'required|max:255',
      lastname: 'required|max:255',
      service_address: 'required',
      customer_mobile_contact: 'required|numeric|length:10',
      notification_email: 'required|email|max:255'
    };

    this.validator = new Validation(this.validationRules);

    this.state = {
      // octane_account_no: '',
      // title: '',
      // firstname: '',
      // lastname: '',
      // contact_number: '',
      // notification_email: '',
      errors: this.validator.errors
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);

    const { data, user } = props;
    props.setGlobalNbnOrder({
      ...data,
      title: user.title,
      firstname: user.first_name,
      lastname: user.last_name,
      notification_email: user.email
    });
  }

  get validationData() {
    const { octane_account_no, title, firstname, lastname, service_address, customer_mobile_contact, notification_email } = this.props.data;
    return {
      // octane_account_no,
      title,
      firstname,
      lastname,
      service_address,
      customer_mobile_contact,
      notification_email
    };
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleChangeValue(name, value) {
    this.props.setGlobalNbnOrder({
      ...this.props.data,
      [name]: value
    });

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
    const { address: service_address } = value;
    this.handleChangeValue('service_address', service_address);
  }

  handleNext(event) {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('nbn/confirm'));
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
    let message = null;
    if (errors.has(name)) {
      message = errors.first(name);
      if (message.includes('required')) {
        message = 'This field is required';
      }
    }
    return message ? (
      <span className="invalid-feedback d-block">
        { message }
      </span>
    ) : null;
  }

  renderAddressHelperBlock() {
    const { errors } = this.state;
    return errors.has('service_address') ? (
      <span className="invalid-feedback d-block">
        This address is not valid, please try again.
      </span>
    ) : null;
  }

  render() {
    const { errors } = this.state;
    const { data } = this.props;
    return (
      <div className={'page--panel page--login'}>
        <div className={'section'}>
          <div className={'container'}>
            <Step steps={['Enter details', 'Confirm', 'Payment Details']} index={0} />
            <form onSubmit={this.handleNext}>
              <div className={'row'}>
                <div className={'col-12'}>
                  <div className={'panel panel--primary panel--padding-large'}>
                    <div className={'panel-body'}>
                      <h3 className={'panel-title--large title-underlined-primary text-center font-weight-extra-bold'}>Enter your details below</h3>
                      {/*<div className={'row'}>
                        <div className={'col-md-8'}>
                          <div className={'form-group'}>
                            <label htmlFor={'union_name'}>Octane Account No</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('octane_account_no') })}
                              id={'octane_account_no'}
                              value={data.octane_account_no}
                              onChange={this.handleChange.bind(this, 'octane_account_no')}
                            />
                            {this.renderHelperBlock('octane_account_no')}
                          </div>
                        </div>
                      </div>*/}
                      <div className={'row'}>
                        <div className={'col-md-3'}>
                          <div className={'form-group'}>
                            <label className={'form-label'} htmlFor={'title'}>Title</label>
                            <select
                              className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('title') })}
                              id={'title'}
                              value={data.title}
                              onChange={this.handleChange.bind(this, 'title')}>
                              <option value={''}>Select a title</option>
                              <option value={'Mr'}>Mr</option>
                              <option value={'Miss'}>Miss</option>
                              <option value={'Mrs'}>Mrs</option>
                              <option value={'Ms'}>Ms</option>
                              <option value={'Other'}>Other</option>
                            </select>
                            {this.renderHelperBlock('title')}
                          </div>
                        </div>
                        <div className={'col-md-5'}>
                          <div className={'form-group'}>
                            <label htmlFor={'firstname'}>First name</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('firstname') })}
                              id={'firstname'}
                              value={data.firstname}
                              onChange={this.handleChange.bind(this, 'firstname')}
                            />
                            {this.renderHelperBlock('firstname')}
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'lastname'}>Last name</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('lastname') })}
                              id={'lastname'}
                              value={data.lastname}
                              onChange={this.handleChange.bind(this, 'lastname')}
                            />
                            {this.renderHelperBlock('lastname')}
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <label htmlFor={'service_address'}>Service Address</label>
                            <AddressInput
                              id="service_address"
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('service_address') })}
                              onChange={this.handleAddressChange.bind(this)}
                            />
                            {this.renderAddressHelperBlock()}
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'customer_mobile_contact'}>Mobile</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('customer_mobile_contact') })}
                              id={'customer_mobile_contact'}
                              value={data.customer_mobile_contact}
                              onChange={this.handleChange.bind(this, 'customer_mobile_contact')}
                            />
                            {this.renderHelperBlock('customer_mobile_contact')}
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'notification_email'}>Email</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <input
                              type={'notification_email'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('notification_email') })}
                              id={'user_email'}
                              value={data.notification_email}
                              onChange={this.handleChange.bind(this, 'notification_email')}
                            />
                            {this.renderHelperBlock('notification_email')}
                          </div>
                          <div className={'col-md-4'}>
                            <small className={'form-text text-muted'}>
                            This email address will be used to keep you updated on your order and to send you important information about your service.
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className={'form-group d-flex justify-content-between mt-5'}>
                        <button
                          type="button"
                          onClick={this.handleBack}
                          className={'btn btn-outline-primary'}>
                          Back
                        </button>
                        <LaddaButton
                          className={'btn btn-primary'}>
                          Next
                        </LaddaButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.nbnOrder,
  user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalNbnOrder: order => dispatch(setGlobalNbnOrder(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NbnEnterDetails));
