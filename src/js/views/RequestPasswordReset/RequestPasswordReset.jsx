import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import classnames from 'classnames';

import Errors from '../../components/Errors';
import Validation from '../../helpers/ValidationHelper';

import Types from '../../actions/actionTypes';
import services from '../../services';

const mapStateToProps = state => ({
  submitting: state.common.isLoading,
  serverError: state.common.serverError,
  validationErrors: state.common.validationErrors,
  passwordResetRequested: state.common.passwordResetRequested
});

const mapDispatchToProps = dispatch => ({
  onSubmit: data =>
    dispatch({ type: Types.PASSWORD_RESET_REQUEST, payload: services.Auth.resetPasswordRequest(data.email) })
});

class RequestPasswordReset extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validation({
      email: 'required|email'
    });

    this.state = {
      email: '',
      errors: this.validator.errors
    };

    this.getClasses = this.getClasses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.passwordResetRequested !== props.passwordResetRequested && props.passwordResetRequested) {
      // this.props.history.push('/login');
    }
  }

  getClasses(name) {
    return classnames({
      'form-control': true,
      'is-invalid': this.state.errors.has(name)
    });
  }

  get data() {
    return {
      email: this.state.email
    };
  }

  handleReset(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    this.validator.validateAll(this.data).then(
      (success) => {
        if (success) {
          onSubmit(this.data);
        } else {
          this.setState({
            errors: this.validator.errors
          });
        }
      }
    );
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: event.target.value
    });

    const { errors } = this.validator;
    errors.remove(name);
    this.validator.validate(name, value).then(() => {
      this.setState({
        errors
      });
    });
  }

  renderHelperBlock(name) {
    const { errors } = this.state;
    return errors.has(name) ? (
      <span className="invalid-feedback">
        { errors.first(name) }
      </span>
    ) : null;
  }

  render() {
    return (
      <div className={'page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-xl-2 col-md-1'} />
              <div className={'col-xl-8 col-md-10'}>
                <div className={'panel panel--primary panel--padding-large'}>
                  <div className={'panel-body'}>
                    <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                    {
                      this.props.passwordResetRequested === true ?
                        <div className={'row'} style={{ marginTop: '20px' }}>
                          <div className={'col-md-12'}>
                            <div className="alert alert-success">
                              <span>Password reset request sent! Please check you email.</span>
                            </div>
                          </div>
                        </div>
                        : null
                    }
                    <h3 className={'panel-title--large title-underlined-primary text-center font-weight-extra-bold'}>Reset your password</h3>
                    <form onSubmit={this.handleReset}>
                      <div className={'form-group'}>
                        <label htmlFor={'user_email'}>Enter email address</label>
                        <input
                          className={this.getClasses('email')}
                          type={'email'}
                          name={'email'}
                          id={'user_email'}
                          onChange={this.handleChange}
                        />
                        {this.renderHelperBlock('email')}
                      </div>
                      <div className={'form-group text-center mt-5'}>
                        <LaddaButton
                          className={'btn btn-primary'}
                          loading={this.props.submitting}
                          type={'submit'}>
                          Request password reset
                        </LaddaButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestPasswordReset);
