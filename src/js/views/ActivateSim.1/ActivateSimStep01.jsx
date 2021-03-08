import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { SCENES } from './ActivateSim';
import UrlHelper from '../../helpers/UrlHelper';

class ActivateSimStep01 extends Component {
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
        {/* PANEL HEADING */}
        <div className={'panel-heading'}>
          <div className={'d-flex flex-column flex-sm-row justify-content-between align-items-center'}>
            <div className={'font-weight-bold p-2'}>If you have an account already, log in to avoid having multiple uPoint accounts.</div>
            <button className={'btn btn-info'}>Login</button>
          </div>
        </div>

        {/* PANEL BODY */}
        <div className={`panel-body ${data.activation_type ? '' : 'd-none'}`}>
          <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Activation code</h3>
          <p className={'text-center'}>
            Make sure you have your activation code and ID to hand and you&apos;re ready to get started!
          </p>
          <p className={'text-center'}>
            <strong className={'font-weight-extra-bold'}>Please note</strong> - it is very important that your name and address details used for activation are the same as those on your ID.
            If they don&apos;t match, your activation will be delayed and we&apos;ll have to verify your identity differently.
          </p>
          <p>&nbsp;</p>
          <form>
            <div className={'row'}>
              <div className={'col-md-7'}>
                <label className={'d-block'} htmlFor={'activation_code'}>
                  <span>Activation code</span>
                  <NavLink to={UrlHelper.getMainUrl('login')} className={'float-right'}><small>Where is this?</small></NavLink>
                </label>
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-md-7'}>
                <div className={'form-group'}>
                  <input
                    type={'text'}
                    className={'form-control'}
                    id={'activation_code'}
                    value={data.activation_code}
                    onChange={this.handleChange.bind(this, 'activation_code')}
                  />
                </div>
                <div className={'form-group'}>
                  <label htmlFor={'activation_keep_existing_number'}>Would you like to keep your existing Australian mobile number?</label>
                  <select
                    type={'text'}
                    className={'form-control custom-select'}
                    id={'activation_keep_existing_number'}
                    value={data.activation_keep_existing_number}
                    onChange={this.handleChange.bind(this, 'activation_keep_existing_number')}>
                    <option value={'no'}>No - I would like a new number</option>
                    <option value={'yes'}>Yes - I would like to keep existing number</option>
                  </select>
                </div>
              </div>
              <div className={'col-md-5'}>
                <div className={'form-group'}>
                  <small className={'form-text text-muted'}>
                    To start making and receiving calls or using data, you must activate your new uPoint SIM.
                    You will find your Activation Code printed on the quick reference card inside your uPoint Starter Pack.
                  </small>
                </div>
              </div>
            </div>
            <div className={'row'}>
              <div className={'col-md-12'}>
                <button
                  className={'btn btn-outline-primary float-left'}
                  type={'button'}
                  onClick={() => { this.handleChangeValue('scene', SCENES.SPLITTER); }}>
                  Back
                </button>
                <button
                  className={'btn btn-primary float-right'}
                  type={'button'}
                  onClick={() => { this.props.jumpToStep(1); }}>
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default ActivateSimStep01;
