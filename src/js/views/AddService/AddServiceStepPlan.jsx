import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { setGlobalAddService } from '../../actions/global';
import Step from '../../components/Step';
import PricingTable from '../../components/PricingTable';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class AddServiceStepPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agree_terms: false
    };
  }

  changeValue(field, value) {
    this.props.setGlobalAddService({
      ...this.props.data,
      [field]: value
    });
  }

  handleChange(field, event) {
    this.changeValue(field, event.target.value);
  }

  handleChangeValue(field, value) {
    this.changeValue(field, value);
  }

  handleSelectPackType(value) {
    this.changeValue('pack_type', value);
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleNext() {
    this.props.history.push(UrlHelper.getMainUrl('add-service/confirm'));
  }

  render() {
    const { PRICINGS: packs, PRICING_DETAILS: details } = CONSTANT;

    const { data } = this.props;

    const renderPricingTables = packs.map((item, index) => {
      const className = data.pack_type ? (data.pack_type === item.value ? 'pricing-table-selected' : 'pricing-table-disabled') : '';
      let packDetails = null;
      for (var i = 0; i < details.length; i++) {
        if (details[i].value == item.value) {
          packDetails = details[i];
          break;
        }
      }
      return (
        <div className={'col-md-6 col-lg-4'} key={`${index}`}>
          <PricingTable
            key={`${index}`}
            className={className}
            {...item}
            details={packDetails}
            onClick={this.handleSelectPackType.bind(this, item.value)}
            actionTitle={data.pack_type === item.value ? 'Selected' : 'Select'}
          />
        </div>
      );
    });

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <Step steps={['Order information', 'Select plan', 'Confirm & Pay']} index={1} />
            <div className={'panel panel--primary'}>
              <div className={'panel-body'}>
                <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Select your plan</h3>
                <div className={'panel-item'}>
                  <div className={'row pricing-table-container'}>
                    {renderPricingTables}
                  </div>
                </div>
                <p className={'text-center'}>
                  All of our plans are 12 month SIM Only. For more information, please refer to the <NavLink to={UrlHelper.getMainUrl('')}>Critical Summary Information</NavLink>.
                </p>
                <div className={'row'}>
                  <div className={'col-md-12 mt-5'}>
                    <button
                      className={'btn btn-outline-primary float-left'}
                      type={'button'}
                      onClick={this.handleBack.bind(this)}>
                      Back
                    </button>
                    <button
                      className={'btn btn-primary float-right'}
                      type={'button'}
                      disabled={!this.props.data.pack_type}
                      onClick={this.handleNext.bind(this)}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.addService
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalAddService: order => dispatch(setGlobalAddService(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddServiceStepPlan));
