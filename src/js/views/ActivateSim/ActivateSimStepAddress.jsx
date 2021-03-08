import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import MaskedInput from 'react-text-mask';

import { setGlobalActivate } from '../../actions/global';
import Step from '../../components/Step';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

class ActivateSimStepAddress extends Component {
  constructor(props) {
    super(props);

    this.validationRules = {
      user_street: 'required|max:255',
      user_street_number: 'required|numeric',
      user_city: 'required|max:255',
      user_postcode: 'required|numeric|length:4',
      user_state: 'required|max:255'
    };
    this.validator = new Validation(this.validationRules);

    this.state = {
      errors: this.validator.errors
    };
  }

  get validationData() {
    const { user_street_number, user_street, user_postcode, user_city, user_state } = this.props.data;
    return {
      user_street_number,
      user_street,
      user_postcode,
      user_city,
      user_state
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
    let modifiedValue = value;
    if (name === 'user_postcode') {
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
          this.props.history.push(UrlHelper.getMainUrl('activate-sim/step-identity'));
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
            <Step steps={['Activation Code', 'Information', 'Address', 'Identity', 'Select plan', 'Confirm']} index={2} />
            <div className={'panel panel--primary'}>
              <div className={'panel-body'}>
                <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Your address</h3>
                <form onSubmit={this.handleNext.bind(this)}>

                  <div className={'form-group'}>
                    <div className={'row'}>
                      <div className={'col-md-3'}>
                        <label htmlFor={'user_street_number'}>Street Number</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_street_number') })}
                          id={'user_street_number'}
                          value={data.user_street_number}
                          onChange={this.handleChange.bind(this, 'user_street_number')}
                        />
                        {this.renderHelperBlock('user_street_number')}
                      </div>
                      <div className={'col-md-5'}>
                        <label htmlFor={'street'}>Street</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_street') })}
                          id={'user_street'}
                          value={data.user_street}
                          onChange={this.handleChange.bind(this, 'user_street')}
                        />
                        {this.renderHelperBlock('user_street')}
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
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_postcode') })}
                          id={'user_postcode'}
                          value={data.user_postcode}
                          onChange={this.handleChange.bind(this, 'user_postcode')}
                        />
                        {this.renderHelperBlock('user_postcode')}
                      </div>
                    </div>
                    <div className={'col-md-3'}>
                      <div className={'form-group'}>
                        <label htmlFor={'user_city'}>City</label>
                        <input
                          type={'text'}
                          className={classnames({ 'form-control': true, 'is-invalid': errors.has('user_city') })}
                          id={'user_city'}
                          value={data.user_city}
                          onChange={this.handleChange.bind(this, 'user_city')}
                        />
                        {this.renderHelperBlock('user_city')}
                      </div>
                    </div>
                    <div className={'col-md-3'}>
                      <div className={'form-group'}>
                        <label htmlFor={'state'}>State</label>
                        <select
                          className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': errors.has('user_state') })}
                          id={'user_state'}
                          value={data.user_state}
                          onChange={this.handleChange.bind(this, 'user_state')}>
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
                        {this.renderHelperBlock('user_state')}
                      </div>
                    </div>
                  </div>

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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.activate
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivateSimStepAddress));
