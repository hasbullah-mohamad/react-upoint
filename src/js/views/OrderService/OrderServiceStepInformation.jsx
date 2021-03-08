import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';

import { setGlobalActivate } from '../../actions/global';
import Step from '../../components/Step';
import Validation from '../../helpers/ValidationHelper';
import { initialState } from '../../reducers/global';
import UrlHelper from '../../helpers/UrlHelper';

class OrderServiceStepInformation extends Component {
  constructor(props) {
    super(props);

    this.validationRules = {
      user_title: 'required',
      user_firstname: 'required|max:255',
      user_lastname: 'required|max:255',
      user_contact_number: 'required|numeric|length:10',
      user_email: 'required|email|max:255'
    };
    this.validator = new Validation(this.validationRules);

    this.state = {
      errors: this.validator.errors
    };
  }

  componentDidMount() {
    const user = this.props.currentUser;
    const address = user.homeAddress || {};
    const identification = user.identification || {};

    const initialOrderData = {
      ...initialState.activate,

      sim_card_valid: false,

      user_title: user.title,
      user_firstname: user.first_name,
      user_lastname: user.last_name,
      user_contact_number: user.contact_number,
      user_email: user.email,

      user_street_number: address.street_number || '',
      user_street: address.street || '',
      user_postcode: address.postcode || '',
      user_city: address.suburb || '',
      user_state: address.state || '',

      identification_type: identification.type,
      identification_medicare_number: identification.medicare_number,
      identification_medicare_individual_name_no: identification.medicare_individual_name_no,
      identification_medicare_middle_name: identification.medicare_middle_name,
      identification_medicare_card_color: identification.medicare_card_color,
      identification_medicare_card_expiry_date: identification.medicare_card_expiry_date,

      identification_driver_licence_state: identification.driver_licence_state,
      identification_driver_licence_number: identification.driver_licence_number,

      identification_passport_number: identification.passport_number,
      identification_passport_nationality: identification.passport_nationality,

      pack_type: '',

      billing_card_number: '',
      billing_card_name: '',
      billing_card_cvv: '',
      billing_card_expiry_date: ''
    };

    this.props.setGlobalActivate({
      ...initialOrderData
    });
  }

  get validationData() {
    const { user_title, user_firstname, user_lastname, user_contact_number, user_email } = this.props.data;
    return {
      user_title,
      user_firstname,
      user_lastname,
      user_contact_number,
      user_email
    };
  }

  changeValue(name, value) {
    this.props.setGlobalActivate({
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
    if (name === 'user_contact_number') {
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
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('order-service/step-address'));
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

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <Step steps={['Information', 'Address', 'Identity', 'Select plan', 'Confirm']} index={0} />
            <div className={'panel panel--primary'}>

              {/* PANEL BODY */}
              <div className={'panel-body'}>
                <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Your information</h3>
                <form onSubmit={this.handleNext.bind(this)}>
                  <div className={'row'}>
                    <div className={'col-md-3'}>
                      <div className={'form-group'}>
                        <label className={'form-label'} htmlFor={'user_title'}>Title</label>
                        <select
                          className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('user_title') })}
                          id={'user_title'}
                          value={data.user_title}
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
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_firstname') })}
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
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_lastname') })}
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
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_contact_number') })}
                          id={'user_contact_number'}
                          value={data.user_contact_number}
                          onChange={this.handleChange.bind(this, 'user_contact_number')}
                        />
                        {/*<MaskedInput
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_contact_number') })}
                          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                          id={'user_contact_number'}
                          value={data.user_contact_number}
                          onChange={this.handleChange.bind(this, 'user_contact_number')}
                        />*/}
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
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_email') })}
                          id={'user_email'}
                          value={data.user_email}
                          onChange={this.handleChange.bind(this, 'user_email')}
                        />
                        {this.renderHelperBlock('user_email')}
                      </div>
                    </div>
                  </div>

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
  data: state.global.activate,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderServiceStepInformation));
