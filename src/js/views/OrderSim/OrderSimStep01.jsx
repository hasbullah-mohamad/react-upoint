import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
// import DatePicker from 'react-datepicker';
import MaskedInput from 'react-maskedinput';
import classnames from 'classnames';
// import moment from 'moment';

import Pack from '../../components/Pack/Pack';
import Step from '../../components/Step';
import CONSTANT from '../../config/constant';

import { setGlobalOrder } from '../../actions/global';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

class OrderSimStep01 extends Component {
  constructor(props) {
    super(props);
    this.validationRules = {
      // sim: 'required',
      title: 'required',
      firstname: 'required|max:255',
      lastname: 'required|max:255',
      contact_number: 'required|numeric|length:10',
      email: 'required|email|max:255',
      birth_date: 'required|date_format:DD/MM/YYYY'
    };
    this.validator = new Validation(this.validationRules);
    this.state = {
      errors: this.validator.errors
    };
  }

  get validationData() {
    const { /* sim, */ title, firstname, lastname, contact_number, email, birth_date } = this.props.data;
    return {
      // sim,
      title,
      firstname,
      lastname,
      contact_number,
      email,
      birth_date
    };
  }

  changeValue(name, value) {
    this.props.setGlobalOrder({
      ...this.props.data,
      [name]: value
    });
  }
  handleSelectSim(value) {
    this.handleChangeValue('sim', value);
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleChangeValue(name, value) {
    let modifiedValue = value;
    if (name === 'contact_number') {
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

  handleNext(event) {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('order-a-sim/step-2'));
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
    const { SIMS: packs } = CONSTANT;

    const { data } = this.props;
    const { errors } = this.state;

    const renderPacks = packs.map((item, index) => {
      const className = data.sim ? (data.sim === item.value ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round';
      return (
        <Pack
          key={`${index}`}
          className={className}
          src={item.src}
          title={item.title}
          onClick={this.handleSelectSim.bind(this, item.value)}
        />
      );
    });

    return (
      <div>
        <Step steps={['Information', 'Address', 'Confirm']} index={0} />
        <div className={'panel panel--primary'}>
          {/* PANEL HEADING */}
          {/* <div className={'panel-heading'}>
            <h3 className={'title text-center font-weight-extra-bold'}>Choose a SIM size</h3>
            <p className={'text-center title-underlined-light'}>
              Existing customer?&nbsp;
              <NavLink to={UrlHelper.getMainUrl('login')}>
                <strong>Log in here</strong>
              </NavLink>
            </p>
            <div className={'d-flex flex-column flex-md-row justify-content-center'}>
              {renderPacks}
            </div>
            {
              data.sim ? (
                <p className={'text-right d-block d-md-none'}>
                  <NavLink to={'#'} onClick={this.handleChangeValue.bind(this, 'sim', '')}>Change your SIM</NavLink>
                </p>
              ) : null
            }
            <p className={'text-center'}>
              Select which SIM size you need.
              <br /><small>All SIM packs are $5, there is no extra charge for postage and handling.</small>
            </p>
          </div> */}

          {/* PANEL BODY */}
          <div className={'panel-body'}>
            <h3 className={'title-underlined-primary text-center panel-title font-weight-extra-bold'}>Your information</h3>
            <form onSubmit={this.handleNext.bind(this)}>
              <div className={'row'}>
                <div className={'col-md-3'}>
                  <div className={'form-group'}>
                    <label className={'form-label'} htmlFor={'order_title'}>Title</label>
                    <select
                      className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('title') })}
                      id={'order_title'}
                      name={'title'}
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
                    <label htmlFor={'order_firstname'}>First name</label>
                    <input
                      type={'text'}
                      className={classnames({ 'form-control': true, 'is-invalid': errors.has('firstname') })}
                      id={'order_firstname'}
                      value={data.firstname}
                      onChange={this.handleChange.bind(this, 'firstname')}
                    />
                    {this.renderHelperBlock('firstname')}
                  </div>
                </div>
              </div>

              <div className={'form-group'}>
                <label htmlFor={'order_lastname'}>Last name</label>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <input
                      type={'text'}
                      className={classnames({ 'form-control': true, 'is-invalid': errors.has('lastname') })}
                      id={'order_lastname'}
                      value={data.lastname}
                      onChange={this.handleChange.bind(this, 'lastname')}
                    />
                    {this.renderHelperBlock('lastname')}
                  </div>
                </div>
              </div>
              <div className={'form-group'}>
                <label htmlFor={'order_contact_number'}>Contact number</label>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <input
                      className={classnames({ 'form-control': true, 'is-invalid': errors.has('contact_number') })}
                      id={'order_contact_number'}
                      value={data.contact_number}
                      onChange={this.handleChange.bind(this, 'contact_number')}
                    />
                    {this.renderHelperBlock('contact_number')}
                  </div>
                  <div className={'col-md-4'}>
                    <small className={'form-text text-muted'}>
                      This number should be active as we may need to contact you during the activation process.
                    </small>
                  </div>
                </div>
              </div>

              <div className={'form-group'}>
                <label htmlFor={'order_email'}>Email</label>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <input
                      type={'email'}
                      className={classnames({ 'form-control': true, 'is-invalid': errors.has('email') })}
                      id={'order_email'}
                      value={data.email}
                      onChange={this.handleChange.bind(this, 'email')}
                    />
                    {this.renderHelperBlock('email')}
                  </div>
                  <div className={'col-md-4'}>
                    <small className={'form-text text-muted'}>
                      This email address will be used to keep you updated on your order and to send you important information about your service.
                    </small>
                  </div>
                </div>
              </div>

              <div className={'form-group'}>
                <label htmlFor={'order_birth_date'}>Date of birth</label>
                <div className={'row'}>
                  <div className={'col-md-8'}>
                    <div>
                      <MaskedInput
                        className={classnames({ 'form-control': true, 'is-invalid': errors.has('birth_date') })}
                        mask={'11/11/1111'}
                        placeholder={'dd/mm/yyyy'}
                        value={data.birth_date}
                        onChange={this.handleChange.bind(this, 'birth_date')}
                      />
                    </div>
                    <div>
                      {this.renderHelperBlock('birth_date')}
                    </div>
                  </div>
                </div>
              </div>

              <div className={'row'}>
                <div className={'col-md-12 mt-5'}>
                  <button type="submit" className={'btn btn-primary float-right'}>Next</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

OrderSimStep01.defaultProps = {
};


const mapStateToProps = state => ({
  data: state.global.order
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalOrder: order => dispatch(setGlobalOrder(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSimStep01));
