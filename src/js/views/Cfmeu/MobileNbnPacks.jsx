import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import PricingTableMini from '../../components/PricingTable/PricingTableMini';
import AddressInput from '../../components/AddressInput/AddressInput';
import AddressCheck from '../../components/AddressInput/AddressCheck';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class MobilePacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: '',
      showNbnAvailability: false,
      showElectricityAvailibility: false
    };
  }
  handleBuyNow() {
    this.props.history.push(UrlHelper.getMainUrl('register'));
  }
  handleGotoNbn(address) {
    this.props.history.push(UrlHelper.getMainUrl('nbn/select-plan'));
  }
  handleChange(key, event) {
    this.handleValueChange(key, event.target.value);
  }

  handleValueChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleShowNbnAvailibility() {
    this.setState({
      showNbnAvailability: true
    });
  }

  handleShowElectricityAvailibility() {
    this.setState({
      showElectricityAvailibility: true
    });
  }

  handleSubmitElectricityPostcode(event) {
    event.preventDefault();
    const { postcode } = this.state;
    if (!postcode) {
      return;
    }
    this.props.history.push(UrlHelper.getMainUrl(`energy/plans-pricing?postcode=${postcode}`));
  }

  renderNbnAvailibility() {
    return (
      <AddressCheck label={'Check your address for availability'} buttonType="purple" onCheck={this.handleGotoNbn.bind(this)} />
    );
  }

  renderElectricityAvailability() {
    return (
      <form onSubmit={this.handleSubmitElectricityPostcode.bind(this)}>
        <label htmlFor="postcode" className="text-info">Check your postcode for more information and pricing</label>
        <div className="form-group position-relative mb-3">
          <input
            className="form-control"
            type="text"
            name="postcode"
            id="postcode"
            value={this.state.postcode}
            onChange={this.handleChange.bind(this, 'postcode')}
            style={{ borderRadius: '0 30px 30px 0', paddingRight: '160px' }}
          />
          <LaddaButton
            className="btn btn-success position-absolute"
            style={{ right: '0', top: '0', height: '48px' }}
            type="submit">
            CHECK
          </LaddaButton>
        </div>
      </form>
    );
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
        <div className="mt-4x panel panel--upoint" id="mobile">
          <div className="panel-heading bg-primary">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_mobile.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img className="panel-heading-logo" src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-primary font-weight-bold">MOBILE</span>
              <img className="panel-heading-right-logo" src="/img/icons/cfmeu-logo.svg" alt="cfmeu-logo" />
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">Need a great deal? We have plans starting at $29.</h3>
              <div className="row">
                <div className="col-lg-6 mb-6">
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
                <div className="col-lg-6 mb-6">
                  <div className="d-flex">
                    <div className="pr-4">
                      <img src="/img/icons/mobile.svg" style={{ width: '51px', height: '51px' }} alt="mobile" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <span className="font-weight-bold">BYO Phone</span>
                      <p>BYO phone and get all the benefits of a plan wrapped into a SIM.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mb-6">
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
                <div className="col-lg-6 mb-6">
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
              </div>
              <div className="form-group">
                <NavLink className="btn btn-primary" to={UrlHelper.getMainUrl('register')}>Join Now</NavLink>
                <NavLink className="btn text-info font-weight-bold pl-4" to={UrlHelper.getMainUrl('mobile/plans')}>Choose a plan</NavLink>
              </div>
            </div>
            <div className="panel-right bg-primary text-white">
              <h3 className="text-center">Mobile plans</h3>
              {renderPricingTablesMobile}
            </div>
          </div>
        </div>

        <div className="mt-4x panel panel--upoint" id="nbn">
          <div className="panel-heading bg-purple">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_nbn.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img className="panel-heading-logo" src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-purple font-weight-bold">NBN</span>
              <img className="panel-heading-right-logo" src="/img/icons/cfmeu-logo.svg" alt="cfmeu-logo" />
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">Unlimited data plans at super fast speeds!</h3>
              <div className="row">
                <div className="col-lg-6 mb-6">
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
                <div className="col-lg-6 mb-6">
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
                <div className="col-lg-6 mb-6">
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
                <div className="col-lg-6 mb-6">
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
              {
                !this.state.showNbnAvailability ? (
                  <div className="form-group position-relative">
                    <NavLink className="btn btn-purple" to={UrlHelper.getMainUrl('register')}>Join Now</NavLink>
                    <button className="btn text-info font-weight-bold pl-3 pl-md-5" onClick={this.handleShowNbnAvailibility.bind(this)}>Check availability</button>
                  </div>
                ) : (
                  <div className="address-checker">
                    {this.renderNbnAvailibility()}
                  </div>
                )
              }
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
        <div className="mt-4x panel panel--upoint" id="energy">
          <div className="panel-heading bg-success">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_energy_heading.svg" alt="uPoint mobile" />
            </div>
            <div className="panel-heading-content">
              <img className="panel-heading-logo" src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-success font-weight-bold">ENERGY</span>
              <img className="panel-heading-right-logo" src="/img/icons/cfmeu-logo.svg" alt="cfmeu-logo" />
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <h3 className="mb-4">It’s time to take the power back!</h3>
              <p>uPoint Energy is 100% Australian and provides you affordable electricity with no misleading discounts and no price gouging, ever. We are union, just like you and we support local jobs so you know when you’re speaking with us, you’re speaking to one of your own. We are all about strength in numbers so the more members that join us, the better price we can deliver.</p>
              {
                !this.state.showElectricityAvailibility ? (
                  <div className="form-group mt-6">
                    <NavLink to={UrlHelper.getMainUrl('register')} className="btn btn-success">Join Now</NavLink>
                    <button className="btn text-info font-weight-bold pl-3 pl-md-5" onClick={this.handleShowElectricityAvailibility.bind(this)}>Check availability</button>
                  </div>
                ) : (
                  <div className="postcode-checker">
                    {this.renderElectricityAvailability()}
                  </div>
                )
              }
            </div>
            <div className="panel-right bg-success text-white">
              <h3 className="text-center">Union Saver</h3>
              <div className="card text-info shadow-sm border-rounded">
                <div className="card-body">
                  <div className="d-flex justicy-content-between">
                    <div className="electricity-energy pt-1 pr-3">
                      <img src="/img/icons/upoint_energy.svg" alt="uPoint energy" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="font-weight-extra-bold mb-2">Cut big business profits out of your bill</div>
                      <div>No misleading discounts – just the best price. Check your postcode for more information and pricing!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4x panel panel--upoint" id="member-advantage">
          <div className="panel-heading bg-red">
            <div className="panel-heading-icon">
              <img src="/img/icons/upoint_advantage.svg" alt="uPoint advantage" />
            </div>
            <div className="panel-heading-content">
              <img className="panel-heading-logo" src="/img/icons/logo.svg" alt="uPoint" />
              <span className="ml-2 text-red font-weight-bold d-block d-md-inline">MEMBER ADVANTAGE</span>
              <img className="panel-heading-right-logo" src="/img/icons/cfmeu-logo.svg" alt="cfmeu-logo" />
            </div>
          </div>
          <div className="panel-body">
            <div className="panel-left">
              <p>uPoint has recently partnered with Member Advantage, a leading provider of member benefit programs, to expand on the range of benefits you can access as one of our valued members. With this new program, uPoint members can enjoy exclusive discounts on a great range of lifestyle, leisure and financial services all year round.</p>
              <div className="member-advantage bg-red mb-5">
                <div className="text-white">
                  <p>David Jones:</p>
                  <span>8% discount</span>
                </div>
                <div className="text-white">
                  <p>Supercheap Auto:</p>
                  <span>7.5% discount</span>
                </div>
                <div className="text-white">
                  <p>Woolworths:</p>
                  <span>5% discount</span>
                </div>
                <div className="text-white">
                  <p>Movie tickets:</p>
                  <span>huge savings</span>
                </div>
                <div className="text-white">
                  <p>Coles:</p>
                  <span>5% discount</span>
                </div>
                <div className="text-white">
                  <p>Qantas and Virgin:</p>
                  <span>Huge lounge membership discount</span>
                </div>
              </div>
              <p className="font-weight-bold">Plus more shopping, travel, entertainment and financial discounts!</p>
              <div className="mt-5">
                <NavLink to={UrlHelper.getMainUrl('register')} className="btn btn-red">Join Now</NavLink>
                <NavLink className="btn text-info font-weight-bold pl-3 pl-md-5" to={UrlHelper.getMainUrl('member-discounts')}>See all the benefits</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MobilePacks);

