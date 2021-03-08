import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import Slick from 'react-slick';
import classnames from 'classnames';
import QueryString from 'qs';

import Pack from '../../components/Pack';
import Errors from '../../components/Errors';
import Validation from '../../helpers/ValidationHelper';


import Types from '../../actions/actionTypes';
import services from '../../services';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  submitting: state.common.isLoading,
  serverError: state.common.serverError,
  validationErrors: state.common.validationErrors
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (email, password) =>
    dispatch({ type: Types.LOGIN, payload: services.Auth.login(email, password) })
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validation({
      email: 'required|email',
      password: 'required|min:8'
    });

    this.state = {
      email: '',
      password: '',
      errors: this.validator.errors,
      query: QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true })
    };

    this.getClasses = this.getClasses.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.loggedIn !== props.loggedIn && props.loggedIn) {
      this.props.history.push(this.state.query && this.state.query.redirect_to ? this.state.query.redirect_to : UrlHelper.getMainUrl('account/overview'));
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
      email: this.state.email,
      password: this.state.password
    };
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { onSubmit } = this.props;
    this.validator.validateAll(this.data).then(
      (success) => {
        if (success) {
          onSubmit(email, password);
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
      <div className={'page--panel page--login'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-xl-1 col-md-1'} />
              <div className={'col-xl-10 col-md-10'}>
                <div className={'panel panel--primary panel--padding-large'}>
                  <div className={'panel-body'}>
                    <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                    <h3 className={'panel-title--large title-underlined-primary text-center font-weight-extra-bold'}>Log in to the portal</h3>
                    <form onSubmit={this.handleLogin}>
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
                      <div className={'form-group'}>
                        <label className={'d-block'} htmlFor={'user_password'}>
                          <span>Enter your password</span>
                          <NavLink to={UrlHelper.getMainUrl('password/email')} className={'float-right'}><small>Forgot your password?</small></NavLink>
                        </label>
                        <input
                          className={this.getClasses('password')}
                          type={'password'}
                          name={'password'}
                          id={'user_password'}
                          onChange={this.handleChange}
                        />
                        {this.renderHelperBlock('password')}
                      </div>

                      <div className={'form-group text-center mt-5'}>
                        <LaddaButton
                          className={'btn btn-primary'}
                          loading={this.props.submitting}
                          type={'submit'}>
                          Login
                        </LaddaButton>
                      </div>
                      <div className="form-group text-center">
                        Not a member yet?
                      </div>
                      <div className={'form-group text-center'}>
                        <NavLink
                          className={'btn btn-primary'}
                          to={UrlHelper.getMainUrl('register')}>
                          Join UPoint
                        </NavLink>
                      </div>
                    </form>
                  </div>
                  {/* <div className={'panel-footer text-center'}>
                    <img
                      src={'/img/media/sim_login.png'}
                      alt={'SIM'}
                      className={'mt-4'}
                      style={
                        { maxWidth: '84px' }
                      } />
                    <h3 className={'font-weight-extra-bold mt-4'}>Don’t have an account?</h3>
                    <p>Get started by <NavLink to={UrlHelper.getMainUrl('register')}>Order a SIM</NavLink></p>
                  </div> */}
                  <div className={'panel-footer bg-info px-4'}>
                    <Slick
                      dots
                      slidesToShow={3}
                      slidesToScroll={1}
                      arrows={false}
                      responsive={[
                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 1
                          }
                        }
                      ]}
                    >
                      <div>
                        <Pack
                          src={'/img/icons/sim2.svg'}
                          alt={'Check your usage'}
                          title={'Check your usage'}
                          description={"See what you've used and what you have left from your included calls, TXT and data."}
                        />
                      </div>
                      <div>
                        <Pack
                          src={'/img/icons/money_light.svg'}
                          scale={1.3}
                          alt={'Make a payment'}
                          title={'Make a payment'}
                          description={'Pay your bill, recharge your prepaid service, set up direct debit, or view recent bills and recharge history.'}
                        />
                      </div>
                      <div>
                        <Pack
                          src={'/img/icons/sim3.svg'}
                          alt={'Get add-ons'}
                          title={'Get add-ons'}
                          scale={2.15}
                          description={'Load up your service with more of what you love. Add extra data, national talk or international talk.'}
                        />
                      </div>
                    </Slick>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
