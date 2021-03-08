import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';
import QueryString from 'qs';

import CONSTANT from '../../config/constant';
import SelectCard from '../../components/SelectCard/SelectCard';
import UrlHelper from '../../helpers/UrlHelper';

class PlansAndPricing extends Component {
  constructor(props) {
    super(props);

    const query = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true })
    this.state = {
      postcode: query.postcode ? query.postcode : '',
      energy_bill: '',
      solar: '',
      tariff: '',
      water: '',
      peak: '',
      days: ''
    };
  }
  handleChange(key, event) {
    this.handleChangeValue(key, event.target.value);
  }

  handleChangeValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleNext(event) {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('upoint-energy/pay-your-bill'));
        }
      }
    );
  }

  render() {
    const { SELECT_ENERGY_BILL, SELECT_SOLAR, SELECT_TARIFF, SELECT_WATER } = CONSTANT;

    const renderEnergyBill = SELECT_ENERGY_BILL.map((item) => {
      const className = this.state.energy_bill ? (this.state.energy_bill === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'energy_bill', item.value)}
        />
      );
    });

    const renderSolarType = SELECT_SOLAR.map((item) => {
      const className = this.state.solar ? (this.state.solar === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'solar', item.value)}
        />
      );
    });

    const renderTariffType = SELECT_TARIFF.map((item) => {
      const className = this.state.tariff ? (this.state.tariff === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'tariff', item.value)}
        />
      );
    });
    const renderHotWater = SELECT_WATER.map((item) => {
      const className = this.state.water ? (this.state.water === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'water', item.value)}
        />
      );
    });
    return (
      <div className="page--upoint-energy">
        <h3 className="font-weight-extra-bold mb-5">Enter your details to compare your electricity bill</h3>
        <div className="panel panel--success py-7 px-8">
          <div className="panel-body">
            <form onSubmit={this.handleNext.bind(this)}>
              <div className="row align-items-center mb-7">
                <div className="col-lg-7">
                  <div className="form-group form-group-select form-icon">
                    <label className={'text-info'} htmlFor={'postcode'}>What is your postcode?</label>
                    <input
                      type={'text'}
                      className={classnames({ 'form-control': true })}
                      id={'postcode'}
                      value={this.state.postcode}
                      onChange={this.handleChange.bind(this, 'postcode')}
                    />
                    <img src={'/img/icons/tick.svg'} alt={'Tick'} />
                  </div>
                </div>
                <div className="col-lg-5 pl-lg-4">
                  <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Your energy provider is Origin Energy.</p>
                </div>
              </div>
              <div className="energy-bill mb-4">
                <label className={'text-info'} htmlFor={'bill_type'}>What type of energy bill is it?</label>
                <div className="select-cards" id="bill_type">
                  {renderEnergyBill}
                </div>
              </div>
              <div className="energy-solar mb-4">
                <label className={'text-info'} htmlFor={'solar_type'}>Do you have solar?</label>
                <div className="select-cards" id="solar-type">
                  {renderSolarType}
                </div>
              </div>
              <div className="electricity-tariff mb-4">
                <label className={'text-info d-flex justify-content-between flex-wrap'} htmlFor={'tariff_type'}>
                  <span>What is your electricity tariff type?</span>
                  <NavLink to={UrlHelper.getMainUrl('')} className="text-success font-weight-bold pr-6">How do I find my tariff type?</NavLink>
                </label>
                <div className="select-cards" id="tariff_type">
                  {renderTariffType}
                </div>
              </div>
              <div className="water-control mb-4">
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <label className={'text-info'} htmlFor={'water_type'}>Do you have controlled load for your hot water?</label>
                    <div className="select-cards select-water" id="water_type">
                      {renderHotWater}
                    </div>
                  </div>
                  <div className="col-lg-5 pl-lg-4">
                    <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex sit amet nisi congue aliquam. Donec mollis lacus ipsum, sit amet sagittis ex vestibulum non.</p>
                  </div>
                </div>
              </div>
              <div className="peak-usage mb-4">
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'peak_usage'}>What is your peak usage?</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'peak_usage'}
                        value={this.value}
                        onChange={this.handleChange.bind(this, 'peak')}
                      />
                      <span className="font-size-lg">kWh</span>
                    </div>
                  </div>
                  <div className="col-lg-5 pl-lg-4">
                    <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ex sit amet nisi congue aliquam. Donec mollis lacus ipsum, sit amet sagittis ex vestibulum non.</p>
                  </div>
                </div>
              </div>
              <div className="days-energy-bill mb-7">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'days_energy_bill'}>Number of days on energy bill</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'days_energy_bill'}
                        value={this.value}
                        onChange={this.handleChange.bind(this, 'days')}
                      />
                      <span className="font-size-lg">days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group form-group-select">
                <LaddaButton
                  className={'btn btn-success'}
                  loading={this.props.submitting}
                  type={'submit'}>
                  COMPARE YOUR CURRENT BILL
                </LaddaButton>
              </div>
            </form>
          </div>
        </div>
        <div className="bottom-plans text-center mt-6">
          <h5 className="mb-5">We’ve compared your bill based on the information you’ve provided us. With uPoint, you will pay:</h5>
          <div className={'pricing-table-detail pricing-table-detail--success'}>
            <div className={'pricing-body'}>
              <div className={'pricing-top pb-0'}>
                <div className={'pricing'}>
                  <span className={'price'}>$218.87*</span>
                </div>
                <div className={'pricing-period'}></div>
                <div className={'pricing-details'}>
                  For the same bill (excl. GST)
                </div>
                <div className="pricing-content pt-0">
                  <ul className={'pricing-items shadow-none'}>
                    <li><span className="font-weight-bold">32% off </span>electricity usage charges for 12 months when you pay on time</li>
                    <li><span className="font-weight-bold">Monthly billing</span></li>
                  </ul>
                  <button className={'btn btn-success'}>
                    Sign up for uPoint Energy now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-link text-center">
            <a className="text-success font-weight-bold font-size-sm" href="">EPFS Bill Comparison</a>
          </div>
          <div className="text-center text-grey">
            <p>*This is an estimate based on the selected products. The information you have provided about your bill, and selected distributor and meter type. Where different prices apply at different times of day, we assume your pattern of electricity usage throughout the day and week is the same as that of the average household. </p>
          </div>
        </div>
      </div>
    );
  }
}

PlansAndPricing.defaultProps = {
};

const mapStateToProps = state => ({
  data: state.global.order
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlansAndPricing));
