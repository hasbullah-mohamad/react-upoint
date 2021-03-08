import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import DatePicker from 'react-datepicker';

import PricingTableNbn from '../../components/PricingTable/PricingTableNbn';
import CONSTANT from '../../config/constant';
import { setGlobalNbnOrder } from '../../actions/global';
import UrlHelper from '../../helpers/UrlHelper';

class NbnSelectPlan extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.state = {
      current_nbn_status: '',
      have_contract: '',
      contract_expiry_date: ''
    };
  }

  componentDidMount() {
    if (!this.props.data.address) {
      this.props.history.push(UrlHelper.getMainUrl('nbn/check-address'));
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  // handleNext(event) {
  //   event.preventDefault();
  //   this.props.history.push(UrlHelper.getMainUrl('nbn/check-address'));
  // }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleChangeValue(key, value) {
    this.setState({
      [key]: value
    });
  }

  handleNext(event) {
    event.preventDefault();
    this.props.setGlobalNbnOrder({
      ...this.props.data,
      current_nbn_status: this.state.current_nbn_status,
      have_contract: this.state.have_contract,
      contract_expiry_date: this.state.contract_expiry_date
    });
    if (this.props.loggedIn) {
      this.props.history.push(UrlHelper.getMainUrl('nbn/confirm'));
    } else {
      this.props.history.push({
        pathname: UrlHelper.getMainUrl('register'),
        search: `?redirect_to=${UrlHelper.getMainUrl('nbn/confirm')}`
      });
    }
  }

  handleSelectPackType(value) {
    this.props.setGlobalNbnOrder({
      ...this.props.data,
      pack_type: value
    });
  }

  render() {
    const { PRICING_NBN_PACKS: packs } = CONSTANT;
    const { data } = this.props;

    const renderPricingTables = packs.map((item, index) => {
      const className = data.pack_type ? (data.pack_type === item.value ? 'pricing-table-selected' : 'pricing-table-disabled') : '';
      return (
        <div className={'col-md-6'} key={`${index}`}>
          <PricingTableNbn
            key={`${index}`}
            className={className}
            {...item}
            onClick={this.handleSelectPackType.bind(this, item.value)}
            actionTitle={data.pack_type === item.value ? 'Selected' : 'Select'}
          />
        </div>
      );
    });

    return (
      <div className={'page--panel page--login'}>
        <div className={'section'}>
          <div className={'container'}>
            <form onSubmit={this.handleNext}>
              <div className={'row'}>
                <div className={'col-12'}>
                  <div className={'panel panel--primary panel--padding-large'}>
                    <div className={'panel-body'}>
                      <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Select your NBN plan</h3>
                      <p>
                        uPoint offers you two great plans, depending on your Internet needs. Please choose one to proceed:
                      </p>
                      <div className="row">
                        {renderPricingTables}
                      </div>
                      {/* Question Board */}
                      <h3 className={'mt-5 pt-5 panel-title title-underlined-primary text-center font-weight-extra-bold'}>Additional Details</h3>
                      <div className={'panel panel--primary panel--padding-large mt-5'}>
                        <div className={'panel-body shadow'}>
                          <div className={'form-group'}>
                            <h4>Your current internet connection status:</h4>
                            <div>
                              <div className="custom-radio custom-control">
                                <input
                                  type="radio"
                                  id="radio_upgrade_to_fiber"
                                  name="current_nbn_status"
                                  checked={this.state.current_nbn_status === 'upgrade_to_fiber'}
                                  value="upgrade_to_fiber"
                                  className="custom-control-input"
                                  onClick={this.handleChange.bind(this, 'current_nbn_status')}
                                />
                                <label className="custom-control-label" htmlFor="radio_upgrade_to_fiber">I am changing from copper to fiber</label>
                              </div>
                              <div className="custom-radio custom-control">
                                <input
                                  type="radio"
                                  id="radio_moving_house"
                                  name="current_nbn_status"
                                  checked={this.state.current_nbn_status === 'moving_house'}
                                  value="moving_house"
                                  className="custom-control-input"
                                  onClick={this.handleChange.bind(this, 'current_nbn_status')}
                                />
                                <label className="custom-control-label" htmlFor="radio_moving_house">I am moving to a new house / apartment</label>
                              </div>
                              <div className="custom-radio custom-control">
                                <input
                                  type="radio"
                                  id="radio_churn_to_upoint"
                                  name="current_nbn_status"
                                  checked={this.state.current_nbn_status === 'churn_to_upoint'}
                                  value="churn_to_upoint"
                                  className="custom-control-input"
                                  onClick={this.handleChange.bind(this, 'current_nbn_status')}
                                />
                                <label className="custom-control-label" htmlFor="radio_churn_to_upoint">I am moving to a new house / apartment</label>
                              </div>
                            </div>
                          </div>
                          <div className={'form-group'}>
                            <h4>Your current internet contract:</h4>
                            <div>
                              <div className="custom-radio custom-control">
                                <input
                                  type="radio"
                                  id="radio_have_contract_no"
                                  name="have_contract"
                                  checked={this.state.have_contract === 'no'}
                                  value="no"
                                  className="custom-control-input"
                                  onClick={this.handleChange.bind(this, 'have_contract')}
                                />
                                <label className="custom-control-label" htmlFor="radio_have_contract_no">No, I am not under contract</label>
                              </div>
                              <div className="custom-radio custom-control">
                                <input
                                  type="radio"
                                  id="radio_have_contract_yes"
                                  name="have_contract"
                                  checked={this.state.have_contract === 'yes'}
                                  value="yes"
                                  className="custom-control-input"
                                  onClick={this.handleChange.bind(this, 'have_contract')}
                                />
                                <label className="custom-control-label" htmlFor="radio_have_contract_yes">Yes, I have a contract with another provider</label>
                              </div>
                            </div>
                          </div>
                          {
                            this.state.have_contract === 'yes' && (
                              <div className="form-group">
                                <h4>Contract expiry date:</h4>
                                <DatePicker
                                  className={'form-control'}
                                  id={'contract_expiry_date'}
                                  selected={this.state.contract_expiry_date}
                                  placeholderText={'dd/mm/yyyy'}
                                  dateFormat={'DD/MM/YYYY'}
                                  onChange={this.handleChangeValue.bind(this, 'contract_expiry_date')}
                                />
                              </div>
                            )
                          }
                        </div>
                      </div>
                      <div className={'form-group mt-5 d-flex justify-content-between'}>
                        <button
                          type="button"
                          onClick={this.handleBack}
                          className={'btn btn-outline-primary'}>
                          Back
                        </button>
                        <LaddaButton
                          type="submit"
                          disabled={!data.pack_type}
                          className="btn btn-primary">
                          Next
                        </LaddaButton>
                      </div>
                      <small>* <a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/Upoint_NBN_Fair+Use+Policy_NEW_Speed_Guidelines_September2018.pdf">Fair Use policy</a> applies at 1TB</small>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  data: state.global.nbnOrder
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalNbnOrder: order => dispatch(setGlobalNbnOrder(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NbnSelectPlan));
