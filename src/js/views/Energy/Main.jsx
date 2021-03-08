import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class WhoWeAre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: ''
    };
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmitPostcode(event) {
    event.preventDefault();
    const { postcode } = this.state;
    if (!postcode) {
      return;
    }
    this.props.history.push(UrlHelper.getMainUrl(`energy/plans-pricing?postcode=${postcode}`));
  }

  render() {
    return (
      <div>
        {/* Power of the movement */}
        <h3 className="font-weight-extra-bold">It’s time to take the power back!</h3>
        <p>We’ve decided to change the rules and use the power of the movement to keep your electricity prices down. We believe union members deserve affordable energy without the misleading discounts, price gouging and hidden fees so we have developed a member only electricity offer to deliver just that. It’s called Union Saver and it’s available now to our union members.</p>

        {/* We want compare */}
        <div className="card--compare text-center mb-4">
          <h4 className="mb-4x">
            Want to compare your current energy plan?<br />Start by entering your <strong className="font-weight-extra-bold">postcode</strong>.
          </h4>
          <div className="d-block d-lg-inline-block">
            <form onSubmit={this.handleSubmitPostcode.bind(this)}>
              <div className="form-group form-group-compare">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.postcode}
                  onChange={this.handleChange.bind(this, 'postcode')} />
                <button
                  className={'btn btn-success btn-sm'}
                  type={'submit'}>
                  COMPARE YOUR BILL
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Benefits of using uPoint Energy */}
        {/* <h3 className="mb-3">Union Server</h3>
        <div className="panel panel--success mb-4">
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="d-flex">
                  <div className="mr-4">
                    <img src="/img/icons/upoint_energy.svg" alt="Best Price" style={{ width: '46px', height: '46px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h6>Cut big business profits out of your bill</h6>
                    Check your postcode for offer details and pricing. Offer available to all households with a card-carrying member of the union movement.
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="d-flex">
                  <div className="mr-4">
                    <img src="/img/icons/icon_australia.svg" alt="Australia" style={{ width: '46px', height: '46px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h6>100% Australian owned</h6>
                    We are located in Australia and dealing with a local company with local employees.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Goto pack panel */}
        <div className="row">
          <div className="col-lg-6 mt-3 d-flex">
            <NavLink className="card--contact w-100" to={UrlHelper.getMainUrl('energy/help')}>
              <div>
                <img className="card-icon" src="/img/icons/icon_emergency.svg" alt="Emergency" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="card-content">
                  For emergencies, please dial 000. For faults, please visit our <span className="font-weight-extra-bold" to={UrlHelper.getMainUrl('energy/help')}>help page</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-6 mt-3 d-flex">
            <a className="card--contact w-100" href="tel:+611300667637">
              <div>
                <img className="card-icon" src="/img/icons/icon_sales_team.svg" alt="Emergency" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="card-content">
                  Want to talk to our sales team? <span className="text-white font-weight-extra-bold">1300 667 637</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(WhoWeAre);
