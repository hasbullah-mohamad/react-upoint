import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AddressCheck from '../../components/AddressInput/AddressCheck';

import { setGlobalNbnOrder } from '../../actions/global';
import UrlHelper from '../../helpers/UrlHelper';
import services from '../../services';

const CHECK_STATUS_SUCCESS = 'success';
const CHECK_STATUS_FAIL = 'fail';
const CHECK_STATUS_NONE = '';

class NbnCheckAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null,
      name: '',
      email: '',
      check_status: CHECK_STATUS_NONE,
      register_status: CHECK_STATUS_NONE,
    };
  }

  handleCheck(address, addressCovered) {
    this.setState({
      address,
      check_status: addressCovered ? CHECK_STATUS_SUCCESS : CHECK_STATUS_FAIL
    });

    this.props.setGlobalNbnOrder({
      ...this.props.data,
      address: address.address,
      addressCovered,
      addressInfo: address.info
    });
  }

  handleSelectPlan() {
    this.props.history.push(UrlHelper.getMainUrl('nbn/select-plan'));
  }

  handleGetStarted(event) {
    event.preventDefault();
    if (this.props.loggedIn) {
      this.props.history.push(UrlHelper.getMainUrl('nbn/select-plan'));
    } else {
      this.props.history.push({
        pathname: UrlHelper.getMainUrl('register'),
        search: `?redirect_to=${UrlHelper.getMainUrl('nbn/select-plan')}`
      });
    }
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleRegister() {
    const { email, name } = this.state;

    if (email && name) {

      services.Misc.registerInterest('nbn', { email, name }).then(() => {
        this.setState({
          register_status: CHECK_STATUS_SUCCESS
        });
      }, () => {
        this.setState({
          register_status: CHECK_STATUS_FAIL
        });
      });

    }
  }

  renderFail() {
    return (
      <div className={'panel-footer bg-primary px-4'}>
        <h1 className={'text-white text-center mb-4'}>Sorry, we’re not in your area.</h1>
        <p className={'text-center text-white mb-5'}>However, please register your interest to stay updated on upcoming developments.</p>
        <div className={'row px-lg-5'}>
          <div className={'col-md-6'}>
            <label className="text-white" htmlFor={'name'}>Name</label>
            <input
              className={'form-control bg-info text-white border-0'}
              type={'text'}
              name={'name'}
              id={'name'}
              onChange={this.handleChange.bind(this, 'name')}
            />
          </div>
          <div className={'col-md-6'}>
            <label className="text-white" htmlFor={'email'}>Email</label>
            <input
              className={'form-control bg-info text-white border-0'}
              type={'email'}
              name={'email'}
              id={'email'}
              onChange={this.handleChange.bind(this, 'email')}
            />
          </div>
          <div className={'d-flex justify-content-center align-items-center w-100 mt-5'}>
            <button type="button" onClick={this.handleRegister.bind(this)} className={'btn btn-info'}>Register your interest</button>
          </div>
        </div>
      </div>
    );
  }

  renderSuccess() {
    return (
      <div className={'panel-footer bg-primary px-4'}>
        <h1 className={'text-white text-center mb-4'}>Great news, we’re available in your area!</h1>
        <p className={'text-center text-white mb-5'}>Get started on your NBN service now.</p>
        <div className={'text-center mt-5'}>
          <button type="button" className={'btn btn-info'} onClick={this.handleGetStarted.bind(this)}>Get started</button>
        </div>
      </div>
    );
  }

  renderCheckStatus() {
    switch (this.state.check_status) {
      case CHECK_STATUS_FAIL:
        return this.renderFail();
      case CHECK_STATUS_SUCCESS:
        return this.renderSuccess();
      default:
        return null;
    }
  }

  renderRegisterSuccess() {
    return (
      <div className={'panel-footer bg-indigo px-4'}>
        <h1 className={'text-white text-center mb-4'}>Thank you for your interest!</h1>
        <p className={'text-center text-white'}>We will be in touch with updates about the NBN product in the near future!</p>
      </div>
    );
  }

  renderRegisterFail() {
    return (
      <div className={'panel-footer bg-indigo px-4'}>
        <h1 className={'text-white text-center mb-4'}>There was a problem signing you up.</h1>
        <p className={'text-center text-white'}>Please check the email you entered or try again later.</p>
      </div>
    );
  }

  renderRegisterStatus() {
    switch (this.state.register_status) {
      case CHECK_STATUS_FAIL:
        return this.renderRegisterFail();
      case CHECK_STATUS_SUCCESS:
        return this.renderRegisterSuccess();
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={'page--about'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/nbn_packs.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>NBN plans</h1>
            <span className={'hero-description'}>Start enjoying cheaper prices for top services today.</span>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-xl-1 col-md-1'} />
              <div className={'col-xl-10 col-md-10'}>
                <div className={'panel panel--primary panel--padding-large'}>
                  <div className={'panel-body'}>
                    <h3 className={'panel-title--large title-underlined-primary text-center font-weight-extra-bold'}>Check your address</h3>
                    <AddressCheck label="Address" onCheck={this.handleCheck.bind(this)} />
                  </div>
                  {this.renderCheckStatus()}
                  {this.renderRegisterStatus()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  data: state.global.nbnOrder
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalNbnOrder: order => dispatch(setGlobalNbnOrder(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NbnCheckAddress));
