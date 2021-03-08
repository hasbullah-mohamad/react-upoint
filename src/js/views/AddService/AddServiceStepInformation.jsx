import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';

import { setGlobalAddService } from '../../actions/global';
import Step from '../../components/Step';
import Validation from '../../helpers/ValidationHelper';
import { initialState } from '../../reducers/global';
import AddressInput from '../../components/AddressInput';
import UrlHelper from '../../helpers/UrlHelper';

class AddServiceStepInformation extends Component {
  constructor(props) {
    super(props);

    this.validationRules = {
      label_firstname: 'required|max:255',
      label_lastname: 'required|max:255',
    };
    this.validator = new Validation(this.validationRules);

    this.state = {
      errors: this.validator.errors,
    };
  }

  componentDidMount() {
    const user = this.props.currentUser;
    const address = user.homeAddress || {};

    const initialOrderData = {
      ...initialState.addService,

      user_title: user.title,
      user_firstname: user.first_name,
      user_lastname: user.last_name,
      user_contact_number: user.contact_number,
      user_email: user.email,

      label_firstname: user.first_name || '',
      label_lastname: user.last_name || '',

      user_street_number: address.street_number || '',
      user_street: address.street || '',
      user_postcode: address.postcode || '',
      user_city: address.suburb || '',
      user_state: address.state || '',

      pack_type: '',

      billing_card_number: '',
      billing_card_name: '',
      billing_card_cvv: '',
      billing_card_expiry_date: ''
    };

    this.props.setGlobalAddService({
      ...initialOrderData
    });

    const { user_street_number, user_street, user_postcode, user_city, user_state } = initialOrderData;

    this.setState({
      address_label: `${user_street_number}, ${user_street}, ${user_city}, ${user_state}, ${user_postcode}`
    });
  }

  get validationData() {
    const { label_firstname, label_lastname } = this.props.data;
    return {
      label_firstname,
      label_lastname,
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
    this.changeValue(name, value);

    let modifiedValue = value;
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

  handleAddressChange(value) {

    const { info, value: address } = value;
    const addressData = {
      address,
      user_unit: info.UnitNumber,
      user_street: info.Street,
      user_street_number: info.Number,
      user_city: info.Suburb,
      user_postcode: info.Postcode,
      user_state: info.State
    };

    this.props.setGlobalAddService({
      ...this.props.data,
      ...addressData,
    });

    this.setState({
      address_label: value.address,
    });
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleNext(event) {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('add-service/plan'));
        } else {
          this.setState({
            errors: this.validator.errors
          });
        }
      }
    );
  }

  handleEditDetails() {
    this.props.history.push(UrlHelper.getMainUrl('account/edit-contact-detail'));
  }

  renderAddressHelperBlock() {
    const { errors } = this.state;
    return errors.has('postcode') ? (
      <span className="invalid-feedback d-block">
        This address is not valid, please try again.
      </span>
    ) : null;
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
    const { data, currentUser } = this.props;
    const { errors, address_label } = this.state;

    // currentUser.is_company = true;

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <Step steps={['Order information', 'Select plan', 'Confirm & Pay']} index={0} />
            <div className={'panel panel--primary'}>

              {/* PANEL BODY */}
              <div className={'panel-body'}>
                <form onSubmit={this.handleNext.bind(this)}>
                  <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Service information</h3>
                  <p className={'text-center'}>If this service is for you, please leave these details unchanged. If this services is for a family member please provide their name below.</p>

                  <div className={'row'}>
                    <div className={'col-md-4'}>
                      <div className={'form-group'}>
                        <label htmlFor={'label_firstname'}>First name</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('label_firstname') })}
                          id={'label_firstname'}
                          value={data.label_firstname}
                          onChange={this.handleChange.bind(this, 'label_firstname')}
                        />
                        {this.renderHelperBlock('label_firstname')}
                      </div>
                    </div>

                    <div className={'col-md-4'}>
                      <div className={'form-group'}>
                        <label htmlFor={'label_lastname'}>Last name</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('label_lastname') })}
                          id={'label_lastname'}
                          value={data.label_lastname}
                          onChange={this.handleChange.bind(this, 'label_lastname')}
                        />
                        {this.renderHelperBlock('label_lastname')}
                      </div>
                    </div>
                  </div>

                  <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Account information</h3>
                  <p className={'text-center'}>Please review your account information below. If updates are required, please first change them <a href='javascript:;' onClick={this.handleEditDetails.bind(this)}>here</a>. Please note that even if this service is being registered for a family member, the service will be registered in your name and you are responsible for payment of all billing associated with the new service.</p>

                  <div className={'row'}>
                    <div className={'col-md-3'}>
                      <div className={'form-group'}>
                        <label className={'form-label'} htmlFor={'user_title'}>Title</label>
                        <select
                          className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('user_title'), 'disabled': true })}
                          id={'user_title'}
                          value={data.user_title}
                          disabled
                          onChange={this.handleChange.bind(this, 'user_title')}>
                          <option value={''}>Select a title</option>
                          <option value={'Mr'}>Mr</option>
                          <option value={'Miss'}>Miss</option>
                          <option value={'Mrs'}>Mrs</option>
                          <option value={'Ms'}>Ms</option>
                          <option value={'Other'}>Other</option>
                        </select>
                        {this.renderHelperBlock('user_title')}
                      </div>
                    </div>
                    <div className={'col-md-5'}>
                      <div className={'form-group'}>
                        <label htmlFor={'user_firstname'}>First name</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_firstname'), 'disabled': true })}
                          disabled
                          id={'user_firstname'}
                          value={data.user_firstname}
                          onChange={this.handleChange.bind(this, 'user_firstname')}
                        />
                        {this.renderHelperBlock('user_firstname')}
                      </div>
                    </div>
                  </div>

                  <div className={'form-group'}>
                    <label htmlFor={'user_lastname'}>Last name</label>
                    <div className={'row'}>
                      <div className={'col-md-8'}>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_lastname'), 'disabled': true })}
                          disabled
                          id={'user_lastname'}
                          value={data.user_lastname}
                          onChange={this.handleChange.bind(this, 'user_lastname')}
                        />
                        {this.renderHelperBlock('user_last_name')}
                      </div>
                      <div className={'col-md-4'}>
                        <small className={'form-text text-muted'}>
                          Please enter your full name, no abbreviations or initials and it should match your ID.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className={'form-group'}>
                    <label htmlFor={'user_contact_number'}>Contact number</label>
                    <div className={'row'}>
                      <div className={'col-md-8'}>
                        <input
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_contact_number'), 'disabled': true })}
                          disabled
                          id={'user_contact_number'}
                          value={data.user_contact_number}
                          onChange={this.handleChange.bind(this, 'user_contact_number')}
                        />
                        {this.renderHelperBlock('user_contact_number')}
                      </div>
                      <div className={'col-md-4'}>
                        <small className={'form-text text-muted'}>
                          This number should be active as we may need to contact you during the activation process.
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className={'form-group'}>
                    <label htmlFor={'user_email'}>Email</label>
                    <div className={'row'}>
                      <div className={'col-md-8'}>
                        <input
                          type={'email'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_email'), 'disabled': true })}
                          disabled
                          id={'user_email'}
                          value={data.user_email}
                          onChange={this.handleChange.bind(this, 'user_email')}
                        />
                        {this.renderHelperBlock('user_email')}
                      </div>
                      <div className={'col-md-4'}>
                        <small className={'form-text text-muted'}>
                          This email address will be used to keep you updated on your order and to send you important information about your service.
                        </small>
                      </div>
                    </div>
                  </div>

                  <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Shipping address</h3>
                  {
                    currentUser.is_company ? (
                      <div className={'row'}>
                        <div className={'col-md-8'}>
                          <label htmlFor={'user_address'}>Address</label>
                          <AddressInput
                            id="user_address"
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('postcode') })}
                            onChange={this.handleAddressChange.bind(this)}
                          />
                          {this.renderAddressHelperBlock()}
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                          </small>
                        </div>
                      </div>
                    ) : (
                      <div className={'row'}>
                        <div className={'col-md-8'}>
                          <label htmlFor={'user_address'}>Address</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'disabled': true })}
                            disabled
                            id={'user_address'}
                            value={address_label}
                          />
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                          </small>
                        </div>
                      </div>
                    )
                  }

                  <div className={'row'}>
                    <div className={'col-md-12 mt-5'}>
                      <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
                      <button className={'btn btn-primary float-right'} type={'submit'}>Next</button>
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

const mapStateToProps = state => ({
  data: state.global.addService,
  currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalAddService: order => dispatch(setGlobalAddService(order))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddServiceStepInformation));
