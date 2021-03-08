import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';
import QueryString from 'qs';

import CONSTANT from '../../config/constant';
import SelectCard from '../../components/SelectCard/SelectCard';
import UrlHelper from '../../helpers/UrlHelper';
import services from '../../services';

class PlansAndPricing extends Component {
  constructor(props) {
    super(props);

    const query = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
    this.state = {
      isSubmitting: false,
      postcode: query.postcode ? query.postcode : '',
      energy_bill: '',
      solar: '',
      tariff: '',
      water: '',
      peak: '',
      days: '',
      meterTypes: [],
      marketSegments: [],
      postcodeFound: false,
      compare: null,
      offer: null,
      error: null,
    };
    this.requestTimeout = null;
  }
  handleChange(key, event) {
    this.handleChangeValue(key, event.target.value);
  }

  arrayKeyBy(array, key) {
    let keyedArray = [];
    for (let i in array) {
      let item = array[i];
      keyedArray[item[key]] = item;
    }
    return keyedArray;
  }

  resetValueObjectAfterKey(key) {
    const fields = ['postcode', 'postcodeFound', 'energy_bill', 'solar', 'tariff', 'water', 'peak', 'days', 'compare', 'offer'];
    const currentFieldIndex = fields.indexOf(key);
    if (currentFieldIndex !== -1) {
      const nextFields = fields.slice(currentFieldIndex+1);
      let reset = {};
      for (var i = nextFields.length - 1; i >= 0; i--) {
        reset[nextFields[i]] = '';
      }
      return reset;
    }
    return {};
  }

  handleChangeValue(key, value) {
    this.setState({
      [key]: value,
      ...this.resetValueObjectAfterKey(key)
    });

    // console.log(key, value);

    if (this.valueChangeTriggersSubmit(key, value)) {
      const {
        postcode, energy_bill, solar, tariff, water, peak, days
      } = this.state;
      const submitData = {
        postcode, energy_bill, solar, tariff, water, peak, days,
        [key]: value
      };

      this.submitToEndpoint(submitData);
    }
  }

  valueChangeTriggersSubmit(key, value) {
    return ['postcode', 'energy_bill'].indexOf(key) !== -1;
  }

  submitToEndpoint(formData) {
    const postcodeLongEnough = formData.postcode && formData.postcode.length === 4;

    if (this.requestTimeout) {
      window.clearTimeout(this.requestTimeout);
      this.requestTimeout = null;
    }

    if (postcodeLongEnough) {
      this.requestTimeout = window.setTimeout(() => {

        this.setState({
          isSubmitting: true,
          error: null,
        });
        services.Electricity.compare(formData).then((data) => {
          const { SELECT_ENERGY_BILL, SELECT_TARIFF } = CONSTANT;

          let meterTypes = [];
          const keyedTariffConstants = this.arrayKeyBy(SELECT_TARIFF, 'value');
          for (let meterCode in data.meterTypesAvailable) {
            let meterType = data.meterTypesAvailable[meterCode],
              tariff = keyedTariffConstants[meterCode] || {};
            meterTypes.push({
              ...tariff,
              value: meterType.id,
              title: tariff.title || meterType.description
            });
          }

          let marketSegments = [];
          for (let i in SELECT_ENERGY_BILL) {
            let marketSegment = SELECT_ENERGY_BILL[i],
              serverMarketSegment = data.marketSegments[marketSegment.value];
            if (serverMarketSegment) {
              marketSegments.push({
                ...marketSegment,
                ...serverMarketSegment,
                value: serverMarketSegment.id
              });
            }
          }

          this.setState({
            isSubmitting: false,
            meterTypes,
            marketSegments,
            postcodeFound: !! data.postcode,
            compare: data.compare,
            offer: data.offer,
            error: data.error
          });
        }).catch((error) => {
          const jsonError = JSON.parse(error.response.text);
          this.setState({
            isSubmitting: false,
            error: jsonError.error.message
          });
        });

      }, 350);
    }
  }

  async handleNext(event) {
    event.preventDefault();
    // this.validator.validateAll(this.validationData).then(
    //   (success) => {
    //     if (success) {
    //       this.props.history.push(UrlHelper.getMainUrl('upoint-energy/pay-your-bill'));
    //     }
    //   }
    // );
    const {
      postcode, energy_bill, solar, tariff, water, peak, days
    } = this.state;

    this.submitToEndpoint({
      postcode, energy_bill, solar, tariff, water, peak, days
    });
  }

  renderOffer(){
    const {
      compare, offer, isSubmitting
    } = this.state;

    if (isSubmitting) {
      return null;
    }

    if (! compare && ! offer) {
      return null;
    }

    if (compare && ! offer) {
      return <div className="bottom-plans text-center mt-6">
        <h5 className="mb-5">We could not find any applicable offers based on the information you've provided us.</h5>
      </div>;
    }

    return <div className="bottom-plans text-center mt-6">
      <h5 className="mb-5">We’ve compared your bill based on the information you’ve provided us. With uPoint Energy, you will pay:</h5>
      <div className={'pricing-table-detail pricing-table-detail--success'}>
        <div className={'pricing-body'}>
          <div className={'pricing-top pb-0'}>
            <div className={'pricing'}>
              <span className={'price'}>${offer.charge}*</span>
            </div>
            <div className={'pricing-period'}></div>
            <div className={'pricing-details'}>
              For the same bill (excl. GST)
            </div>
            <div className="pricing-content pt-0">
              <ul className={'pricing-items shadow-none'}>
                <li><span className="font-weight-bold">{offer.title}</span></li>
                <li><span dangerouslySetInnerHTML={{__html: offer.description}} className="font-weight-bold" /></li>
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
        <p>*This is an estimate based on the selected products. The information you have provided about your bill, and selected distributor and meter type. Where different prices apply at different times of day, we assume your pattern of electricity usage throughout the day and week is the same as that of the average household. If there are multiple distributors for the postcode you have provided, we have assumed your distributor. Please call us for an accurate estimate. We have excluded any additional charges that might apply. To ensure an accurate comparison please check that your bill has your retailers current prices.</p>  
      </div>
    </div>;
  }

  renderError() {
    const { error } = this.state;
    if (! error) return;
    return <p className="invalid-feedback" style={{'display': 'block'}}>
      {error}
    </p>;
  }

  render() {
    const { SELECT_ENERGY_BILL, SELECT_SOLAR, SELECT_TARIFF, SELECT_WATER } = CONSTANT;
    const {
      postcode, energy_bill, solar, tariff, water, peak, days, meterTypes, marketSegments, postcodeFound, isSubmitting
    } = this.state;

    const postcodeLongEnough = postcode && postcode.length === 4;

    const renderEnergyBill = marketSegments.map((item) => {
      const className = energy_bill ? (energy_bill === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'energy_bill', item.value)}
        />
      );
    });

    const renderSolarType = SELECT_SOLAR.map((item) => {
      const className = solar ? (solar === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'solar', item.value)}
        />
      );
    });

    const renderTariffType = meterTypes.map((item) => {
      const className = tariff ? (tariff === item.value ? 'active' : 'inactive') : '';
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={this.handleChangeValue.bind(this, 'tariff', item.value)}
        />
      );
    });

    const renderHotWater = SELECT_WATER.map((item) => {
      const className = water ? (water === item.value ? 'active' : 'inactive') : '';
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
        <div className="mb-3">
          <h3 className="font-weight-extra-bold">Enter your details to compare your electricity bill</h3>
          <p>As a Union member, our promise to you is to ensure you are getting an affordable offer to power your home. That’s why we only have one market offer with no confusing discounts or hidden costs. What you see is what you get. Enter your postcode below to get started. </p>
        </div>
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
                      value={postcode}
                      onChange={this.handleChange.bind(this, 'postcode')}
                    />
                    {postcodeFound && postcodeLongEnough && <img src={'/img/icons/tick.svg'} alt={'Tick'} />}
                    {(!postcodeFound || !postcodeLongEnough) && isSubmitting && <img src={'/img/icons/ajax-loader.gif'} alt={'Tick'} />}
                  </div>
                </div>
                <div className="col-lg-5 pl-lg-4">
                  {/*<p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Your energy provider is Origin Energy.</p>*/}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !postcodeFound || !postcodeLongEnough })}>
                <label className={'text-info'} htmlFor={'bill_type'}>What type of energy bill is it?</label>
                <div className="select-cards" id="bill_type">
                  {renderEnergyBill}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill })}>
                <label className={'text-info'} htmlFor={'solar_type'}>Do you have solar?</label>
                <div className="select-cards" id="solar-type">
                  {renderSolarType}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !solar })}>
                <label className={'text-info d-flex justify-content-between flex-wrap'} htmlFor={'tariff_type'}>
                  <span>What is your electricity tariff type?</span>
                  <NavLink to={UrlHelper.getMainUrl('')} className="text-success font-weight-bold pr-6">How do I find my tariff type?</NavLink>
                </label>
                <div className="select-cards" id="tariff_type">
                  {renderTariffType}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !solar || !tariff })}>
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
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water })}>
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'peak'}>What is your peak usage?</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'peak'}
                        value={peak}
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
              <div className={classnames({ 'mb-7': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water || !peak })}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'days'}>Number of days on energy bill</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'days'}
                        value={days}
                        onChange={this.handleChange.bind(this, 'days')}
                      />
                      <span className="font-size-lg">days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classnames({ 'form-group': true, 'form-group-select': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water || !peak || !days })}>
                <LaddaButton
                  className={'btn btn-success'}
                  loading={this.state.isSubmitting}
                  type={'submit'}>
                  COMPARE YOUR CURRENT BILL
                </LaddaButton>
              </div>
            </form>
          </div>
        </div>
        {this.renderError()}
        {this.renderOffer()}
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
