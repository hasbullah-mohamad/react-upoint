import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import { NavLink, withRouter } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import { connect } from 'react-redux';
import classnames from 'classnames';
import QueryString from 'qs';

import AddressInput from '../../components/AddressInput';
import Errors from '../../components/Errors';
import services from '../../services';
import Types from '../../actions/actionTypes';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  submitting: state.common.isLoading,
  serverError: state.common.serverError,
  validationErrors: state.common.validationErrors,
  interestedInEnergy: state.energy.interestedInEnergy
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data =>
    dispatch({ type: Types.REGISTER, payload: services.Auth.register(data) })
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      union_name: 'required',
      union_number: 'required|alpha_dash',
      register_type: 'required',
      title: 'required',
      first_name: 'required|max:255',
      last_name: 'required|max:255',
      birth_date: 'required|date_format:DD/MM/YYYY',
      contact_number: 'required|numeric|length:10',
      postcode: 'required',
      email: 'required|email|max:255',
      password: 'required|min:8'
    };

    this.validator = new Validation(this.validationRules);

    this.state = {
      union_name: '',
      union_number: '',
      register_type: 'Individual',
      company_name: '',
      abn: '',
      title: '',
      first_name: '',
      last_name: '',
      birth_date: null,
      contact_number: '',
      address: '',
      unit: '',
      street: '',
      street_number: '',
      city: '',
      postcode: '',
      state: '',
      email: '',
      password: '',
      errors: this.validator.errors,
      query: QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true })
    };
    console.log(this.state);
  }

  componentWillReceiveProps(props) {
    if (this.props.loggedIn !== props.loggedIn && props.loggedIn) {
      this.props.history.push(this.state.query && this.state.query.redirect_to ? this.state.query.redirect_to : '/account/overview');
    }
  }

  get validationData() {
    const { union_name, union_number, register_type, title, first_name, last_name, birth_date, contact_number, postcode, email, password } = this.state;
    return {
      union_name,
      union_number,
      register_type,
      title,
      first_name,
      last_name,
      birth_date,
      contact_number,
      postcode,
      email,
      password
    };
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleAddressChange(value) {
    console.log(value);
    const { info, value: address } = value;
    this.setState({
      address,
      unit: info.UnitNumber,
      street: info.Street,
      street_number: info.Number,
      city: info.Suburb,
      postcode: info.Postcode,
      state: info.State
    });
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

  handleRegister(event) {
    event.preventDefault();
    const registerData = {
      user: {
        title: this.state.title,
        email: this.state.email,
        password: this.state.password,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        union_number: this.state.union_number,
        contact_number: this.state.contact_number,
        birth_date: this.state.birth_date,
        company_name: this.state.company_name ? this.state.company_name : '',
        company_abn: this.state.company_abn ? this.state.company_abn : '',
        interest_energy: this.props.interestedInEnergy
      },
      union: {
        key: this.state.union_name
      },
      address: {
        street: this.state.street,
        postcode: this.state.postcode,
        state: this.state.state,
        suburb: this.state.city,
        unit: this.state.unit,
        street_number: this.state.street_number
      }
    };
    const { onSubmit } = this.props;
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          onSubmit(registerData);
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

  renderAddressHelperBlock() {
    const { errors } = this.state;
    return errors.has('postcode') ? (
      <span className="invalid-feedback d-block">
        This address is not valid, please try again.
      </span>
    ) : null;
  }

  render() {
    const { errors } = this.state;
    const loginUrl = this.state.query && this.state.query.redirect_to ? UrlHelper.getMainUrl(`login?redirect_to=${this.state.query.redirect_to}`) : UrlHelper.getMainUrl('login');
    return (
      <div className={'page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <form onSubmit={this.handleRegister.bind(this)}>
              <div className={'row'}>
                <div className="col-xs-12 col-sm-12">
                  <div className={'panel panel--primary panel--padding-large'}>
                    <div className={'panel-heading pt-4 pb-4'}>
                      <div className={'row align-items-center'}>
                        <div className={'col-sm-8'}>
                          Already with uPoint? Login to order a Service
                        </div>
                        <div className={'col-sm-4 text-right'}>
                          <NavLink className={'btn btn-info'} to={loginUrl}>Login</NavLink>
                        </div>
                      </div>
                    </div>
                    <div className={'panel-body'}>
                      <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Register with uPoint</h3>
                      <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                      <div className={'row'}>
                        <div className={'col-md-4'}>
                          <div className={'form-group'}>
                            <label htmlFor={'union_name'}>Union name</label>
                            <select
                              className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('union_name') })}
                              id={'user_union_name'}
                              value={this.state.union_name}
                              onChange={this.handleChange.bind(this, 'union_name')}>
                              <option value={''}>Select a union</option>
                              <option value={'ACTU'}>ACTU</option>
                              <option value={'CFMEU'}>CFMEU</option>
                            </select>
                            {this.renderHelperBlock('union_name')}
                          </div>
                        </div>
                        <div className={'col-md-4'}>
                          <div className={'form-group'}>
                            <label htmlFor={'union_number'}>Union number</label>
                            <input
                              type={'text'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('union_number') })}
                              id={'union_number'}
                              value={this.state.union_number}
                              onChange={this.handleChange.bind(this, 'union_number')}
                            />
                            {this.renderHelperBlock('union_number')}
                          </div>
                        </div>
                      </div>
                      <div className={'form-group'}>
                        <label htmlFor={'user_register_type'}>I am registering as</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <select
                              className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('register_type') })}
                              id={'user_register_type'}
                              value={this.state.register_type}
                              onChange={this.handleChange.bind(this, 'register_type')}>
                              <option value={'Individual'}>Individual</option>
                              <option value={'Business / Organisation'}>Business / Organisation</option>
                            </select>
                            {this.renderHelperBlock('register_type')}
                          </div>
                        </div>
                      </div>

                      {
                        this.state.register_type === 'Business / Organisation' && (
                          <div className={'row'}>
                            <div className={'col-md-4'}>
                              <div className={'form-group'}>
                                <label className={'form-label'} htmlFor={'user_company_name'}>Company / Organisation Name:</label>
                                <input
                                  type={'text'}
                                  className={classnames({ 'form-control': true })}
                                  id={'user_company_name'}
                                  value={this.state.company_name}
                                  onChange={this.handleChange.bind(this, 'company_name')}
                                />
                              </div>
                            </div>
                            <div className={'col-md-4'}>
                              <div className={'form-group'}>
                                <label htmlFor={'user_abn'}>ABN</label>
                                <input
                                  type={'text'}
                                  className={classnames({ 'form-control': true })}
                                  id={'user_abn'}
                                  value={this.state.company_abn}
                                  onChange={this.handleChange.bind(this, 'company_abn')}
                                />
                              </div>
                            </div>
                          </div>
                        )
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

                      <div className={'form-group'}>
                        <label htmlFor={'date_of_birth'}>Date of birth</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <MaskedInput
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('birth_date') })}
                              mask={'11/11/1111'}
                              placeholder={'dd/mm/yyyy'}
                              value={this.state.birth_date}
                              onChange={this.handleChange.bind(this, 'birth_date')}
                            />
                            {this.renderHelperBlock('birth_date')}
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'contact_number'}>Contact number</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
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
                            <small className={'form-text text-muted'}>
                              Contact number number should be active as we may need to contact you during the activation process. Please enter number only, no spaces or other characters.
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
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
                              This email address will be used to log in to your account
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className={'form-group'}>
                        <label htmlFor={'password'}>Password</label>
                        <div className={'row'}>
                          <div className={'col-md-8'}>
                            <input
                              type={'password'}
                              className={classnames({ 'form-control': true, 'is-invalid': errors.has('password') })}
                              id={'user_password'}
                              value={this.state.password}
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
                          <LaddaButton
                            className={'btn btn-primary float-right'}
                            loading={this.props.submitting}
                            type={'submit'}>
                            Register
                          </LaddaButton>
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));
