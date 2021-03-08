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
        <h3 className="font-weight-extra-bold">Power of the movement means cheaper energy.</h3>
        <p>uPoint Energy provides you with affordable electricity that supports local union jobs. We’re 100% Australian owned and operated, and we’re using the power of the movement to keep your energy prices down. </p>

        {/* We want compare */}
        <div className="card--compare text-center mb-5">
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
        <h3 className="mb-3">Benefits of using uPoint Energy</h3>
        <div className="panel panel--success mb-4">
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="d-flex">
                  <div className="mr-4">
                    <img src="/img/icons/icon_best_prices.svg" alt="Best Price" style={{ width: '46px', height: '46px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h6>We'll get you the best prices</h6>
                    We strive to get the best energy prices from distributors so we can pass the savings onto you.
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
        </div>

        {/* Goto pack panel */}
        <div className="row">
          <div className="col-lg-6 mt-3">
            <NavLink className="card--contact" to={UrlHelper.getMainUrl('contact')}>
              <div>
                <img className="card-icon" src="/img/icons/icon_emergency.svg" alt="Emergency" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="card-content">
                  For emergencies please visit our <span className="text-white font-weight-extra-bold">contact page</span>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-lg-6 mt-3">
            <a className="card--contact" href="tel:611300123123">
              <div>
                <img className="card-icon" src="/img/icons/icon_sales_team.svg" alt="Emergency" />
              </div>
              <div style={{ flex: 1 }}>
                <div className="card-content">
                  Want to talk to our sales team? <span href="tel:611300123123" className="text-white font-weight-extra-bold">1300 123 123</span>
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
