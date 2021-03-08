import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import PricingTableMini from '../../components/PricingTable/PricingTableMini';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class MobilePacks extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     address: null,
  //     addressCovered: false
  //   };
  // }

  handleBuyNow() {
    this.props.history.push(UrlHelper.getMainUrl('register'));
  }

  handleGotoNbn() {
    this.props.history.push(UrlHelper.getMainUrl('nbn/select-plan'));
  }

  render() {
    const { PRICING_MINI_MOBILE, PRICING_MINI_NBN } = CONSTANT;
    const renderPricingTablesMobile = PRICING_MINI_MOBILE.map((item, index) => (
      <div key={`${index}`}>
        <PricingTableMini
          {...item}
        />
      </div>
    ));
    const renderPricingTablesNbn = PRICING_MINI_NBN.map((item, index) => (
      <div key={`${index}`}>
        <PricingTableMini
          {...item}
        />
      </div>
    ));
    return (
      <div>
        <div className="mt-4x panel panel--upoint">
          <div className="panel-heading bg-primary">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_mobile.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-primary font-weight-bold">MOBILE</span>
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">Need a great deal? We have plans starting at $29.</h3>
              <div className="row">
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/wifi.svg" style={{ width: '51px', height: '39px' }} alt="wifi" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Trusted Network</span>
                      <p>Enjoy a great mobile experience on a 4G Network. Our service has extensive breadth and depth of coverage and is supported by a quality network.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/sim1.svg" style={{ width: '51px', height: '50px' }} alt="sim" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Zero Bill-Shock</span>
                      <p>You’ll pay what you were expecting to pay.</p>
                    </div>
                  </div>
                </div>
                
               
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/mobile_transfer.svg" style={{ width: '51px', height: '50px' }} alt="mobile transfer" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Keep your number</span>
                      <p>It’s quick and easy to port an existing number or get a new one.</p>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/mobile.svg" style={{ width: '51px', height: '51px' }} alt="mobile" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">BYO or buy a device</span>
                      <p>
                        BYO device and get all the benefits of a SIM-only plan. <br /><br />
                        Need a new device? Have a look at the great deals offered by our partner <a href="https://www.mobileciti.com.au/upoint"><strong>Mobileciti</strong></a> and get an exclusive 10% discount across all products.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <NavLink className="btn btn-primary" to={UrlHelper.getMainUrl('mobile/plans')}>Find out more</NavLink>
            </div>
            <div className="panel-right bg-primary text-white">
              <h3 className="text-center">Mobile Plans</h3>
              <div className="text-center">Compatible with Smartphones and Tablets</div>
              {renderPricingTablesMobile}
            </div>
          </div>
        </div>

        <div className="mt-4x panel panel--upoint">
          <div className="panel-heading bg-purple">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_nbn.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-purple font-weight-bold">NBN</span>
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">Unlimited data plans at super fast speeds!</h3>
              <div className="row">
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/download.svg" style={{ width: '51px', height: '46px' }} alt="download" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Unlimited data*</span>
                      <p>Don’t worry about data caps or your speed being restricted – we have you covered.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/nbn_network.svg" style={{ width: '51px', height: '51px' }} alt="mobile" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">NBN network</span>
                      <p>Take advantage of Australia’s Fibre network.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/super_speeds.svg" style={{ width: '51px', height: '51px' }} alt="super speeds" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Super speeds</span>
                      <p>We offer two different speed tiers so you can get the best bang for buck.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-4 mb-md-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/whole_family.svg" style={{ width: '51px', height: '50px' }} alt="whole family" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">Speed for the whole family</span>
                      <p>We will provide you with the best plan to suit your family’s Internet needs</p>
                    </div>
                  </div>
                </div>
              </div>
              <NavLink className="btn btn-purple" to={UrlHelper.getMainUrl('nbn/check-address')}>Check your address for availability</NavLink>
            </div>
            <div className="panel-right bg-purple text-white">
              <h3 className="text-center">Nbn plans</h3>
              {renderPricingTablesNbn}
              <div className="text-center text-white font-size-sm mt-3">
                <p>* <u><a className="text-white" target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/Upoint_NBN_Fair+Use+Policy_NEW_Speed_Guidelines_September2018.pdf">Fair use policy</a></u> applies at 1TB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MobilePacks);

