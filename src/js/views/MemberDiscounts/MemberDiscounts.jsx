import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UrlHelper from '../../helpers/UrlHelper';

import services from '../../services';
import Types from '../../actions/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: Types.MEMBER_DISCOUNTS_PAGE_LOADED, payload })
});

class MemberDiscounts extends Component {

  componentWillMount() {
    this.props.onLoad(Promise.all([
      services.Account.services(),
      services.Account.orders(),
    ]));
  }

  render() {
    const {
      loggedIn, user, services, orders
    } = this.props;

    const servicesOrdered = services && services.length > 0;

    return (
      <div className={'page--about'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/upoint_cards.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>Member Discounts</h1>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <div className="mt-4x panel panel--upoint">
              <div className="panel-heading bg-red">
                <div className="panel-heading-icon">
                  <img src="/img/icons/upoint_advantage.svg" alt="uPoint mobile" />
                </div>
                <div className="panel-heading-content">
                  <img src="/img/icons/logo.svg" alt="uPoint" />
                  <span className="ml-2 text-red font-weight-bold">MEMBER ADVANTAGE</span>
                </div>
              </div>
              <div className="panel-body">
                <div className="panel-left">
                  <img className="mb-5" src="/img/media/member_advantage.png" style={{ width: '289px', height: '81px' }} alt="member advantage" />
                  <p>uPoint has recently partnered with Member Advantage, a leading provider of member benefit programs, to expand on the range of benefits you can access as one of our valued members.</p>
                  <p>
                    {
                      loggedIn ? (
                        user && user.validated && servicesOrdered ? (
                          <a href="https://upoint.memberadvantage.com.au/saml/sso" className="btn btn-red" target="_blank" rel="noreferrer noopener">
                            <span className="d-none d-md-block">Click here to login to Member Advantage now</span>
                            <span className="d-block d-md-none">Member Advantage</span>
                          </a>
                        ) : null
                        // 'To access your Member Advantage discounts, please login to your account and click the “Member Advantage” option'
                      ) : (
                        <NavLink to={UrlHelper.getMainUrl('login')} className="btn btn-red">Login</NavLink>
                      )
                    }
                  </p>
                </div>
                <div className="panel-right bg-secondary">
                  <ul className="advantage-list">
                    <li><span>✓</span>Dining</li>
                    <li><span>✓</span>Movie tickets</li>
                    <li><span>✓</span>Airline lounge memberships</li>
                    <li><span>✓</span>Hotel accommodation</li>
                    <li><span>✓</span>Leisure activities</li>
                    <li><span>✓</span>Credit cards</li>
                    <li><span>✓</span>Car rental</li>
                    <li><span>✓</span>Electronics</li>
                    <li><span>✓</span>Whitegoods</li>
                  </ul>
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
  user: state.common.currentUser,
  services: state.account.services,
  orders: state.account.orders,
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(MemberDiscounts);
