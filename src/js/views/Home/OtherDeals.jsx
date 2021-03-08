import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import UrlHelper from '../../helpers/UrlHelper';

class OtherDeals extends Component {
  handleBuyNow() {
    this.props.history.push(UrlHelper.getMainUrl('register'));
  }

  render() {
    return (
      <div>
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
              <NavLink className={'btn btn-red'} to={UrlHelper.getMainUrl('member-discounts')}>Find out more</NavLink>
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

        {/* <div className="mt-4x panel panel--upoint">
          <div className="panel-heading bg-cyan">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_cars.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-cyan font-weight-bold">CARS</span>
            </div>
            <div className="panel-heading-hint text-cyan">
              <span className="text-white">Coming soon</span>
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <form>
                <label htmlFor="email" className="text-info">Enter email to receive updates</label>
                <div className="form-group position-relative">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    style={{ borderRadius: '0 30px 30px 0', paddingRight: '160px' }}
                    // onChange={this.handleAddressChange}
                  />
                  <LaddaButton
                    className="btn btn-cyan position-absolute text-white"
                    style={{ right: '0', top: '0', height: '48px' }}
                    type="button">
                    CHECK
                  </LaddaButton>
                </div>
              </form>
            </div>
            <div className="panel-right pl-lg-0 pt-0 pt-lg-5">
              <p className="mt-lg-4">Please check back for more information, or enter your email to receive updates.</p>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withRouter(OtherDeals);

