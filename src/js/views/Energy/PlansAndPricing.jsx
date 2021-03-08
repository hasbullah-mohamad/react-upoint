/* eslint-disable one-var */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LaddaButton from 'react-ladda';
import QueryString from 'qs';

import CONSTANT from '../../config/constant';
import SelectCard from '../../components/SelectCard/SelectCard';
import UrlHelper from '../../helpers/UrlHelper';
import services from '../../services';
import Types from '../../actions/actionTypes';
import { setGlobalEnergyPlansPricing } from '../../actions/global';

class PlansAndPricing extends Component {
  constructor(props) {
    super(props);

    const defaultValues = {
      energy_bill: '1',
      postcode: '',
      solar: '',
      tariff: '',
      water: '',
      peak: '',
      days: '',
      name: '',
      phone: '',
      email: '',
      meterTypes: [],
      marketSegments: [],
      postcodeFound: false,
      compare: null,
      offer: null,
      error: null
    };

    const query = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
    console.log(query.postcode);
    const applyValues = query.postcode ? defaultValues : props.data;
    console.log(applyValues);
    this.state = {
      isSubmitting: false,
      ...applyValues,
      postcode: query.postcode ? query.postcode : applyValues.postcode
    };
    this.requestTimeout = null;
    this.defaultValues = defaultValues;
    console.log(props);
  }

  componentDidMount() {
    const { postcode } = this.state;
    if (postcode) {
      this.handleChangeValue('postcode', postcode);
    }
  }

  componentWillReceiveProps(props) {
    // const query = QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true });
    // const applyValues = query.postcode ? props.data : this.defaultValues;
    // this.setState({
    //   isSubmitting: false,
    //   ...applyValues,
    //   postcode: query.postcode ? query.postcode : applyValues.postcode
    // });
  }

  handleChange(key, event) {
    this.handleChangeValue(key, event.target.value);
  }

  handleChangePeak(event) {
    let peak = Math.round(event.target.value);
    if (isNaN(peak)) {
      peak = 0;
    }
    this.setState({
      peak
    });
  }

  arrayKeyBy(array, key) {
    const keyedArray = [];
    for (const i in array) {
      const item = array[i];
      keyedArray[item[key]] = item;
    }
    return keyedArray;
  }

  resetValueObjectAfterKey(key) {
    const fields = ['postcode', 'postcodeFound', 'energy_bill', 'solar', 'tariff', 'water', 'peak', 'days', 'compare', 'offer'];
    const currentFieldIndex = fields.indexOf(key);
    if (currentFieldIndex !== -1) {
      const nextFields = fields.slice(currentFieldIndex + 1);
      const reset = {};
      for (let i = nextFields.length - 1; i >= 0; i--) {
        const fieldName = nextFields[i];
        const defaultValue = this.defaultValues[fieldName] || '';
        reset[fieldName] = defaultValue;
      }
      return reset;
    }
    return {};
  }

  handleChangeValue(key, value) {
    this.setState({
      [key]: value
      // ...this.resetValueObjectAfterKey(key)
    });

    // console.log(key, value);

    if (this.valueChangeTriggersSubmit(key, value)) {
      const {
        postcode, energy_bill, solar, tariff, water, peak, days, name, phone, email
      } = this.state;
      const submitData = {
        postcode,
        energy_bill,
        solar,
        tariff,
        water,
        peak,
        days,
        name,
        phone,
        email,
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
          error: null
        });
        services.Electricity.compare(formData).then((data) => {
          const { SELECT_ENERGY_BILL, SELECT_TARIFF } = CONSTANT;

          const meterTypes = [];
          const keyedTariffConstants = this.arrayKeyBy(SELECT_TARIFF, 'value');
          for (const meterCode in data.meterTypesAvailable) {
            const meterType = data.meterTypesAvailable[meterCode],
              tariff = keyedTariffConstants[meterCode] || {};
            const item = {
              ...tariff,
              value: meterType.id,
              title: tariff.title || meterType.description
            };

            if (meterCode !== 'SINGLE') continue;

            // set default selected
            meterTypes.push(item);
            if (item.selected && !this.state.tariff) {
              this.setState({
                tariff: item.value
              });
              this.defaultValues.tariff = item.value;
            }
          }

          const marketSegments = [];
          for (const i in SELECT_ENERGY_BILL) {
            const marketSegment = SELECT_ENERGY_BILL[i],
              serverMarketSegment = data.marketSegments[marketSegment.value];
            if (serverMarketSegment && marketSegment.value === 'Residential') {
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
            postcodeFound: !!data.postcode,
            compare: data.compare,
            offer: data.offer,
            error: data.error || (data.postcode ? null : 'No available offers.')
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

  signUpForEnergy() {
    const { dispatch } = this.props;
    dispatch({ type: Types.ENERGY_SIGNUP });
    this.props.history.push(UrlHelper.getMainUrl('register'));
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
      postcode, energy_bill, solar, tariff, water, peak, days,
      name, phone, email, meterTypes, marketSegments, postcodeFound, compare, offer, error
    } = this.state;

    this.props.setGlobalEnergyPlansPricing({
      energy_bill,
      postcode,
      solar,
      tariff,
      water,
      peak,
      days,
      name,
      phone,
      email,
      meterTypes,
      marketSegments,
      postcodeFound,
      compare,
      offer,
      error
    });

    const formData = {
      postcode, energy_bill, solar, tariff, water, peak, days, name, phone, email
    };

    services.Electricity.order(formData);
    // services.Nbn.createOrder(formData);
    this.submitToEndpoint(formData);
  }

  renderOffer() {
    const {
      compare, offer, isSubmitting
    } = this.state;

    if (isSubmitting) {
      return null;
    }

    if (!compare && !offer) {
      return null;
    }

    if (compare && !offer) {
      return (<div className="bottom-plans text-center mt-6">
        <h5 className="mb-5">We could not find any applicable offers based on the information you’ve provided us.</h5>
      </div>);
    }

    return (
      <div className="bottom-plans text-center mt-6">
        <h5 className="mb-5">We’ve compared your bill based on the information you’ve provided us. With uPoint Energy, you will pay:</h5>
        <div className={'pricing-table-detail pricing-table-detail--success'}>
          <div className={'pricing-body'}>
            <div className={'pricing-top pb-0'}>
              <div className={'pricing'}>
                <span className={'price'}>${offer.charge}*</span>
              </div>
              <div className={'pricing-period'} />
              <div className={'pricing-details'}>
                For the same bill (excl. GST)
              </div>
              <div className="pricing-content pt-0">
                <ul className={'pricing-items shadow-none'}>
                  <li><span className="font-weight-bold">{offer.title}</span></li>
                  <li><span dangerouslySetInnerHTML={{ __html: offer.description }} className="font-weight-bold" /></li>
                  <li><span className="font-weight-bold">Monthly billing available</span></li>
                </ul>
                <button className={'btn btn-success'} onClick={this.signUpForEnergy.bind(this)}>
                  Sign up for uPoint Energy now
                </button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h5 className="mb-0">
          <p>
            Our estimate is based on the single rate tariff for your postcode and the information you have provided about your bill, including your Peak usage and billing period. If there are multiple distributors for the postcode you have provided, we have assumed your distributor. Please call us for an accurate estimate.
          </p>
          <p>
            To view all rates for your distributor, take a look at our Energy Price Fact Sheets below.
          </p>
        </h5>
        <div className="text-link text-center">
          <div><a className="text-success font-weight-bold font-size-sm" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/epfs/Feb+Union+Saver+-+AusNet.pdf">Union Saver - AusNet (PDF)</a></div>
          <div><a className="text-success font-weight-bold font-size-sm" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/epfs/Feb+Union+Saver+-+Citipower.pdf">Union Saver - Citipower (PDF)</a></div>
          <div><a className="text-success font-weight-bold font-size-sm" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/epfs/Feb+Union+Saver+-+Jemena.pdf">Union Saver - Jemena (PDF)</a></div>
          <div><a className="text-success font-weight-bold font-size-sm" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/epfs/Feb+Union+Saver+-+Powercor.pdf">Union Saver - Powercor (PDF)</a></div>
          <div><a className="text-success font-weight-bold font-size-sm" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/epfs/Feb+Union+Saver+-+UE.pdf">Union Saver - United Energy (PDF)</a></div>
        </div>
        <div className="text-center text-grey">
          <p>We have excluded any additional charges that might apply. To ensure an accurate comparison please check that your bill has your retailers current prices.</p>
        </div>
      </div>
    );
  }

  renderError() {
    const { error } = this.state;
    if (!error) return null;
    return (
      <p className="invalid-feedback d-block font-size-lg">
        {error}
      </p>
    );
  }

  render() {
    const { SELECT_ENERGY_BILL, SELECT_SOLAR, SELECT_TARIFF, SELECT_WATER } = CONSTANT;
    const {
      postcode, energy_bill, solar, tariff, water, peak, days,
      name, phone, email,
      meterTypes, marketSegments, postcodeFound, isSubmitting
    } = this.state;

    const postcodeLongEnough = postcode && postcode.length === 4;

    const renderEnergyBill = marketSegments.map((item) => {
      const selected = item.selected || (energy_bill && energy_bill === item.value);
      const className = selected ? 'active' : 'inactive';
      const clickHandler = item.disabled ? () => {} : this.handleChangeValue.bind(this, 'energy_bill', item.value);
      return (
        <SelectCard
          className={className}
          {...item}
          onClick={clickHandler}
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
      const selected = (!tariff && item.selected) || (tariff && tariff === item.value);
      const className = selected ? 'active' : 'inactive';
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
          <p>As a Union member, our promise to you is to ensure you are getting an affordable offer to power your home. That’s why we only have one market offer with no confusing discounts or hidden costs. What you see is what you get.</p>
          <p>Grab a recent bill then enter your postcode below to get started.</p>
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
                  {/* <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Your energy provider is Origin Energy.</p> */}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !postcodeFound || !postcodeLongEnough })}>
                <label className={'text-info'} htmlFor={'bill_type'}>What type of energy bill is it?</label>
                <div className="select-cards" id="bill_type">
                  {renderEnergyBill}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !postcodeFound })}>
                <label className={'text-info'} htmlFor={'solar_type'}>Do you have solar?</label>
                <div className="select-cards" id="solar-type">
                  {renderSolarType}
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !solar })}>
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <label className={'text-info d-flex justify-content-between flex-wrap'} htmlFor={'tariff_type'}>
                      <span>Electricity Tariff</span>
                      {/* <NavLink to={UrlHelper.getMainUrl('')} className="text-success font-weight-bold pr-6">How do I find my tariff type?</NavLink> */}
                    </label>
                    <div className="select-cards" id="tariff_type">
                      {renderTariffType}
                    </div>
                  </div>
                  <div className="col-lg-5 pl-lg-4">
                    <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">
                      We use the single rate tariff for your postcode to provide you with an estimate that’s easy to understand.
                    </p>
                  </div>
                </div>
              </div>
              <div className={classnames({ 'mb-4': true, 'd-none': !postcode || !energy_bill || !solar || !tariff })}>
                <div className="row align-items-center">
                  <div className="col-lg-7">
                    <label className={'text-info'} htmlFor={'water_type'}>Do you have controlled load?</label>
                    <div className="select-cards select-water" id="water_type">
                      {renderHotWater}
                    </div>
                  </div>
                  <div className="col-lg-5 pl-lg-4">
                    <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Controlled load’ is electricity supplied to specific appliances, such as electric hot water systems or slab or underfloor heating, which are often separately metered.</p>
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
                        onChange={this.handleChangePeak.bind(this)}
                      />
                      <span className="font-size-lg">kWh</span>
                    </div>
                  </div>
                  <div className="col-lg-5 pl-lg-4">
                    <p className="text-grey font-size-sm font-weight-semi-bold mb-lg-0">Referring to your bill, enter the total peak kWh. </p>
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
              <div className={classnames({ 'mb-7': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water || !peak })}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'name'}>Your name</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'name'}
                        value={name}
                        onChange={this.handleChange.bind(this, 'name')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classnames({ 'mb-7': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water || !peak })}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'name'}>Your phone number</label>
                      <input
                        type={'text'}
                        className={classnames({ 'form-control': true })}
                        id={'phone'}
                        value={phone}
                        onChange={this.handleChange.bind(this, 'phone')}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={classnames({ 'mb-7': true, 'd-none': !postcode || !energy_bill || !solar || !tariff || !water || !peak })}>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="form-group form-group-select form-span">
                      <label className={'text-info'} htmlFor={'name'}>Your email</label>
                      <input
                        type={'email'}
                        className={classnames({ 'form-control': true })}
                        id={'email'}
                        value={email}
                        onChange={this.handleChange.bind(this, 'email')}
                      />
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
              {this.renderError()}
            </form>
          </div>
        </div>
        {this.renderOffer()}
      </div>
    );
  }
}

PlansAndPricing.defaultProps = {
};

const mapStateToProps = state => ({
  data: state.global.energyPlansPricing
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalEnergyPlansPricing: order => dispatch(setGlobalEnergyPlansPricing(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlansAndPricing));
