import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import UrlHelper from '../../helpers/UrlHelper';

class FinanceInsurance extends Component {
  handleBuyNow() {
    this.props.history.push(UrlHelper.getMainUrl('register'));
  }

  render() {
    return (
      <div>
        {/* <div className="mt-4x panel panel--upoint">
          <div className="panel-heading bg-danger">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_credit_cards.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-danger font-weight-bold">CREDIT CARD</span>
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">Union members know that when we work together, we get a better deal.</h3>
              <p>That principle doesn't just apply to our working conditions and pay. it also means we can use our collective power to get you discounts on your shopping and services as well as cash-back to your union or nominated charity or super fund. All for the greater benifit of members!</p>
              <NavLink className={'btn btn-danger'} to={UrlHelper.getMainUrl('upoint-cards-detail')}>Find out more</NavLink>
            </div>
            <div className="panel-right bg-secondary">
              <img src="/img/media/upoint_card.png" alt="card" />
            </div>
          </div>
        </div>

        <div className="mt-4x panel panel--upoint">
          <div className="panel-heading bg-orange">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_insurance.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-orange font-weight-bold">INSURANCE</span>
            </div>
            <div className="panel-heading-hint text-orange">
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
                    className="btn btn-orange position-absolute"
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
        <h2 className="font-weight-extra-bold text-center mt-5">Coming soon</h2>
      </div>
    );
  }
}

export default withRouter(FinanceInsurance);

