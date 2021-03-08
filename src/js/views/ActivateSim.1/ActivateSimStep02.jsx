import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import UrlHelper from '../../helpers/UrlHelper';

class ActivateSimStep02 extends Component {
  handleChange(field, event) {
    this.props.onChangeValue(field, event.target.value);
  }

  handleChangeValue(field, value) {
    this.props.onChangeValue(field, value);
  }

  render() {
    const { data } = this.props;

    return (
      <div className={'panel panel--primary'}>

        {/* PANEL BODY */}
        <div className={'panel-body'}>
          <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Your information</h3>
          <form>
            <div className={'row'}>
              <div className={'col-md-2'}>
                <div className={'form-group'}>
                  <label className={'form-label'} htmlFor={'user_title'}>Title</label>
                  <select
                    className={'form-control custom-select'}
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
                </div>
              </div>
              <div className={'col-md-5'}>
                <div className={'form-group'}>
                  <label htmlFor={'user_firstname'}>First name</label>
                  <input
                    type={'text'}
                    className={'form-control'}
                    id={'user_firstname'}
                    value={data.user_firstname}
                    onChange={this.handleChange.bind(this, 'user_firstname')}
                  />
                </div>
              </div>
            </div>

            <div className={'form-group'}>
              <label htmlFor={'user_lastname'}>Last name</label>
              <div className={'row'}>
                <div className={'col-md-7'}>
                  <input
                    type={'text'}
                    className={'form-control'}
                    id={'user_lastname'}
                    value={data.user_lastname}
                    onChange={this.handleChange.bind(this, 'user_lastname')}
                  />
                </div>
              </div>
            </div>
            <div className={'form-group'}>
              <label htmlFor={'user_contact_number'}>Contact number</label>
              <div className={'row'}>
                <div className={'col-md-7'}>
                  <input
                    type={'text'}
                    className={'form-control'}
                    id={'user_contact_number'}
                    value={data.user_contact_number}
                    onChange={this.handleChange.bind(this, 'user_contact_number')}
                  />
                </div>
                <div className={'col-md-5'}>
                  <small className={'form-text text-muted'}>
                    This number should be active as we may need to contact you during the activation process.
                  </small>
                </div>
              </div>
            </div>

            <div className={'form-group'}>
              <label htmlFor={'user_email'}>Email</label>
              <div className={'row'}>
                <div className={'col-md-7'}>
                  <input
                    type={'email'}
                    className={'form-control'}
                    id={'user_email'}
                    value={data.user_email}
                    onChange={this.handleChange.bind(this, 'user_email')}
                  />
                </div>
                <div className={'col-md-5'}>
                  <small className={'form-text text-muted'}>
                    This email address will be used to keep you updated on your order and to send you important information about your service.
                  </small>
                </div>
              </div>
            </div>

            <div className={'form-group'}>
              <label htmlFor={'user_password'}>Password</label>
              <div className={'row'}>
                <div className={'col-md-7'}>
                  <input
                    type={'password'}
                    className={'form-control'}
                    id={'user_password'}
                    value={data.user_password}
                    onChange={this.handleChange.bind(this, 'user_password')}
                  />
                </div>
                <div className={'col-md-5'}>
                  <small className={'form-text text-muted'}>
                    Password must be a minimum of 8 characters in length..
                  </small>
                </div>
              </div>
            </div>

            <div className={'row'}>
              <div className={'col-md-7'}>
                <div className={'row'}>
                  <div className={'col-md-6'}>
                    <div className={'form-group'}>
                      <label className={'d-block'} htmlFor={'user_union_name'}>
                        <span>Union name</span>
                        <NavLink to={UrlHelper.getMainUrl('login')} className={'float-right'}><small>Not a member?</small></NavLink>
                      </label>
                      <select
                        className={'form-control custom-select'}
                        id={'user_union_name'}
                        value={data.user_union_name}
                        onChange={this.handleChange.bind(this, 'user_union_name')}>
                        <option value={''}>Select a union</option>
                        <option value={'ACTU'}>ACTU</option>
                        <option value={'CFMEU'}>CFMEU</option>
                      </select>
                    </div>
                  </div>
                  <div className={'col-md-6'}>
                    <div className={'form-group'}>
                      <label htmlFor={'user_union_number'}>Union number</label>
                      <input
                        type={'text'}
                        className={'form-control'}
                        id={'user_union_number'}
                        value={data.user_union_number}
                        onChange={this.handleChange.bind(this, 'user_union_number')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={'form-group'}>
              <label htmlFor={'user_date_of_birth'}>Date of birth</label>
              <div className={'row'}>
                <div className={'col-md-7'}>
                  <DatePicker
                    className={'form-control'}
                    id={'user_date_of_birth'}
                    selected={data.user_date_of_birth}
                    placeholderText={'dd/mm/yyyy'}
                    dateFormat={'DD/MM/YYYY'}
                    onChange={this.handleChangeValue.bind(this, 'user_date_of_birth')}
                  />
                </div>
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-md-12'}>
                <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={() => { this.props.jumpToStep(0); }}>Back</button>
                <button className={'btn btn-primary float-right'} type={'button'} onClick={() => { this.props.jumpToStep(2); }}>Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ActivateSimStep02.defaultProps = {
  onChangeValue: () => {},
  data: {},
};

export default ActivateSimStep02;
