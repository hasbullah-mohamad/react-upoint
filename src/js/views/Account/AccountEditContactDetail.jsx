import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';

import Errors from '../../components/Errors';
import services from '../../services';
import Types from '../../actions/actionTypes';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  user: state.common.currentUser,
  services: state.account.services,
  loading: state.common.isLoading,
  serverError: state.common.serverError,
  validationErrors: state.common.validationErrors,
  accountUpdated: state.account.accountUpdated,
  paymentsInfo: state.bills.paymentsInfo
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: Types.ACCOUNT_SERVICES_GET, payload }),
  onSubmit: data =>
    dispatch({ type: Types.ACCOUNT_UPDATE_DETAILS, payload: services.Account.update(data) })
});

class AccountEditContactDetail extends Component {
  constructor(props) {
    super(props);

    this.validationRules = {
      title: 'required',
      first_name: 'required|max:255',
      last_name: 'required|max:255',
      birth_date: 'required|date_format:DD/MM/YYYY',

      contact_number: 'required|numeric|length:10',
      street: 'required|max:255',
      street_number: 'required|numeric',
      suburb: 'required|max:255',
      postcode: 'required|numeric|length:4',
      state: 'required|max:255',

      email: 'required|email|max:255',
      password: 'min:8'
    };

    this.validator = new Validation(this.validationRules);

    this.state = {
      name: this.props.user.name,
      number: this.props.user.number,
      title: this.props.user.title,
      first_name: this.props.user.first_name,
      birth_date: this.props.user.birth_date,
      last_name: this.props.user.last_name,
      contact_number: this.props.user.contact_number,
      street: this.props.user.homeAddress.street,
      street_number: this.props.user.homeAddress.street_number,
      suburb: this.props.user.homeAddress.suburb,
      postcode: this.props.user.homeAddress.postcode,
      state: this.props.user.homeAddress.state,
      email: this.props.user.email,
      password: '',
      errors: this.validator.errors
    };
  }

  componentWillMount() {
    this.props.onLoad(services.Account.services());
  }

  get validationData() {
    const { title, first_name, last_name, contact_number, postcode, street, street_number, suburb, state, email, password, birth_date } = this.state;
    return {
      title,
      first_name,
      last_name,
      birth_date,
      contact_number,
      postcode,
      street,
      street_number,
      suburb,
      state,
      email,
      password
    };
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleBirthDate(e) {
    this.handleChangeValue('birth_date', e.target.value);
  }

  handleChangeValue(name, value) {
    this.setState({
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

  handleUpdate() {
    const userData = {
      user: {
        title: this.state.title,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        union_number: this.state.union_number,
        contact_number: this.state.contact_number,
        birth_date: this.state.birth_date
      },
      address: {
        street: this.state.street,
        postcode: this.state.postcode,
        state: this.state.state,
        suburb: this.state.suburb,
        unit: null,
        street_number: this.state.street_number
      }
    };
    const { onSubmit } = this.props;
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          onSubmit(userData);
        } else {
          this.setState({
            errors: this.validator.errors
          });
        }
      }
    );
  }

  handleBack() {
    this.props.history.goBack();
  }

  renderHelperBlock(name) {
    const { errors } = this.state;
    return errors.has(name) ? (
      <span className="invalid-feedback">
        {errors.first(name)}
      </span>
    ) : null;
  }

  render() {
    const { errors } = this.state;
    const totalServices = this.props.services ? this.props.services.length : 0;
    const servicesLabel = totalServices === 1 ? '1 Service' : `${totalServices} Services`;
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});

    return (
      <div>
        <div className={'page page--activate-sim page--panel'}>
          <div className={'section'}>
            <div className={'container'}>

              {/* Account Payment Notification */}
              {
                false && (
                  <div className="text-center pb-4 pt-4 pt-lg-0">
                    <span className="rounded-circle bg-danger text-white font-weight-semi-bold d-inline-block p-2">
                      <span className="mx-4">Your account is currently ${overdueCharges} in arrears.</span>
                      <NavLink className="btn btn-light btn-sm" to={UrlHelper.getMainUrl('account/payment-edit')}>Pay now</NavLink>
                    </span>
                  </div>
                )
              }

              <div className={'panel panel--primary panel--no-border'}>
                {/* PANEL HEADING */}
                <div className={'panel-heading-split'}>
                  <div className={'panel-heading-split-left'}>
                    <span className={'mr-4'}>{this.state.name}</span>
                    <span className={'font-weight-bold'}>{servicesLabel}</span>
                  </div>
                  <div className={'panel-heading-split-right bg-info'}>
                    <span className={'mr-4'}>Account number</span>
                    <span className={'font-weight-bold'}>{this.state.number}</span>
                  </div>
                </div>
                <div className={'panel-body'}>
                  <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Edit contact details</h3>
                  <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                  <form>
                    {
                      this.props.accountUpdated === true ?
                        <div className={'row'} style={{ marginTop: '20px' }}>
                          <div className={'col-md-12'}>
                            <div className="alert alert-success">
                              <span>Contact details successfully updated!</span>
                            </div>
                          </div>
                        </div>
                        : null
                    }
                    <div className={'row'}>
                      <div className={'col-md-3'}>
                        <div className={'form-group'}>
                          <label className={'form-label'} htmlFor={'title'}>Title</label>
                          <select
                            className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('title') })}
                            id={'user_title'}
                            value={this.state.title}
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
                          <label htmlFor={'first_name'}>First name</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('first_name') })}
                            id={'user_first_name'}
                            value={this.state.first_name}
                            onChange={this.handleChange.bind(this, 'first_name')}
                          />
                          {this.renderHelperBlock('first_name')}
                        </div>
                      </div>
                    </div>

                    <div className={'form-group'}>
                      <label htmlFor={'last_name'}>Last name</label>
                      <div className={'row'}>
                        <div className={'col-md-8'}>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('last_name') })}
                            id={'user_last_name'}

                            value={this.state.last_name}
                            onChange={this.handleChange.bind(this, 'last_name')}
                          />
                          {this.renderHelperBlock('last_name')}
                        </div>
                      </div>
                    </div>

                    {this.props.user.is_company &&
                      <div className={'row'}>
                        <div className={'col-md-4'}>
                          <div className={'form-group'}>
                            <label className={'form-label'} htmlFor={'user_company_name'}>Company / Organisation Name:</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'disabled': true })}
                              disabled='disabled'
                              id={'user_company_name'}
                              value={this.props.user.company_name}
                            />
                          </div>
                        </div>
                        <div className={'col-md-4'}>
                          <div className={'form-group'}>
                            <label htmlFor={'user_abn'}>ABN</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'disabled': true })}
                              disabled='disabled'
                              id={'user_abn'}
                              value={this.props.user.company_abn}
                            />
                          </div>
                        </div>
                      </div>
                    }

                    <div className={'form-group'}>

                      <div className={'row'}>
                        <div className={'col-md-4'}>
                          <label htmlFor={'contact_number'}>Contact number</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('contact_number') })}
                            id={'user_contact_number'}
                            value={this.state.contact_number}
                            onChange={this.handleChange.bind(this, 'contact_number')}
                          />
                          {this.renderHelperBlock('contact_number')}
                        </div>
                        <div className={'col-md-4'}>
                          <label htmlFor={'date_of_birth'}>Date of birth</label>
                          <MaskedInput
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('birth_date') })}
                            mask={'11/11/1111'}
                            placeholder={'dd/mm/yyyy'}
                            value={this.state.birth_date}
                            onChange={this.handleBirthDate.bind(this)}
                          />
                          {this.renderHelperBlock('birth_date')}
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            Contact number number should be active as we may need to contact you during the activation process. Please enter number only, no spaces or other characters.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className={'form-group'}>
                      <div className={'row'}>
                        <div className={'col-md-3'}>
                          <label htmlFor={'user_street_number'}>Street Number</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('street_number') })}
                            id={'user_street_number'}
                            value={this.state.street_number}
                            onChange={this.handleChange.bind(this, 'street_number')}
                          />
                          {this.renderHelperBlock('street_number')}
                        </div>
                        <div className={'col-md-5'}>
                          <label htmlFor={'street'}>Street</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('street') })}
                            id={'street'}
                            value={this.state.street}
                            onChange={this.handleChange.bind(this, 'street')}
                          />
                          {this.renderHelperBlock('street')}
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className={'row'}>
                      <div className={'col-md-2'}>
                        <div className={'form-group'}>
                          <label htmlFor={'user_postcode'}>Postcode</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('postcode') })}
                            id={'user_postcode'}
                            value={this.state.postcode}
                            onChange={this.handleChange.bind(this, 'postcode')} />
                          {this.renderHelperBlock('postcode')}
                        </div>
                      </div>
                      <div className={'col-md-3'}>
                        <div className={'form-group'}>
                          <label htmlFor={'user_city'}>Suburb</label>
                          <input
                            type={'text'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('suburb') })}
                            id={'user_suburb'}
                            value={this.state.suburb}
                            onChange={this.handleChange.bind(this, 'suburb')} />
                          {this.renderHelperBlock('suburb')}
                        </div>
                      </div>
                      <div className={'col-md-3'}>
                        <div className={'form-group'}>
                          <label htmlFor={'state'}>State</label>
                          <select
                            className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('state') })}
                            id={'user_state'}
                            value={this.state.state}
                            onChange={this.handleChange.bind(this, 'state')}>
                            <option value={''}>Select a state</option>
                            <option value={'ACT'}>ACT</option>
                            <option value={'NSW'}>NSW</option>
                            <option value={'NT'}>NT</option>
                            <option value={'QLD'}>QLD</option>
                            <option value={'SA'}>SA</option>
                            <option value={'TAS'}>TAS</option>
                            <option value={'VIC'}>VIC</option>
                            <option value={'WA'}>WA</option>
                          </select>
                          {this.renderHelperBlock('state')}
                        </div>
                      </div>
                    </div>

                    <div className={'form-group'}>
                      <label htmlFor={'email'}>Email</label>
                      <div className={'row'}>
                        <div className={'col-md-8'}>
                          <input
                            type={'email'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('email') })}
                            id={'user_email'}
                            value={this.state.email}
                            onChange={this.handleChange.bind(this, 'email')}
                          />
                          {this.renderHelperBlock('email')}
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            This email address will be used to keep you updated on your order and to
                            send you important information about your service.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className={'form-group'}>
                      <label htmlFor={'password'}>Change password</label>
                      <div className={'row'}>
                        <div className={'col-md-8'}>
                          <input
                            type={'password'}
                            className={classnames({ 'form-control': true, 'is-invalid': errors.has('password') })}
                            id={'user_password'}
                            onChange={this.handleChange.bind(this, 'password')}
                          />
                          {this.renderHelperBlock('password')}
                        </div>
                        <div className={'col-md-4'}>
                          <small className={'form-text text-muted'}>
                            Password must be a minimum of 8 characters in length.
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className={'row'}>
                      <div className={'col-md-12'}>
                        <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
                        <LaddaButton
                          className={'btn btn-primary float-right'}
                          loading={this.props.loading}
                          onClick={this.handleUpdate.bind(this)}
                          type={'button'}>
                          Save
                        </LaddaButton>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default AccountEditContactDetail;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountEditContactDetail));
