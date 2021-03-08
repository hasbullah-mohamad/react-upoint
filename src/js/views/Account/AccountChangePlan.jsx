import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import ServiceListItem from '../../components/ListItems/ServiceListItem';
import PricingTable from '../../components/PricingTable';
import UrlHelper from '../../helpers/UrlHelper';

const SERVICE_ITEMS = [
  {
    id: 1,
    number: '0400 123 456',
    plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', 'standard_mobile_pack'),
    sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', 'nano'),
    activated: false
  },
  {
    id: 2,
    number: '0400 345 248',
    plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', 'super_mobile_pack'),
    sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', 'nano'),
    activated: true
  }
];

class AccountChangePlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      loading: true,
      service: null,
      pack_type: ''
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    const service = ConstantHelper.getItemByField(SERVICE_ITEMS, 'id', parseInt(id, 0));
    this.setState({
      service,
      loading: false
    });
  }

  componentWillReceiveProps(props) {
    const { id } = props.match.params;
    const service = ConstantHelper.getItemByField(SERVICE_ITEMS, 'id', parseInt(id, 0));
    this.setState({
      service,
      loading: false
    });
  }

  changeValue(field, value) {
    this.setState({
      [field]: value
    });
  }

  handleServiceChange(service) {
    this.props.history.push(UrlHelper.getMainUrl(`account/detail/${service.id}`));
  }

  handleSelectPackType(value) {
    this.changeValue('pack_type', value);
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleChangePlan() {
    
  }

  render() {
    const { currentUser } = this.props;
    const { service, pack_type } = this.state;

    const { PRICINGS: packs } = CONSTANT;


    const renderPricingTables = packs.map((item, index) => {
      const className = pack_type ? (pack_type === item.value ? 'pricing-table-selected' : 'pricing-table-disabled') : '';
      return (
        <div className={'col-md-6 col-lg-4'} key={`${index}`}>
          <PricingTable
            key={`${index}`}
            className={className}
            {...item}
            onClick={this.handleSelectPackType.bind(this, item.value)}
            actionTitle={pack_type === item.value ? 'Selected' : 'Select'}
          />
        </div>
      );
    });

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'panel panel--primary panel--no-border panel--padding-large'}>
              {/* PANEL HEADING */}
              <div className={'panel-heading-split'}>
                <div className={'panel-heading-split-left'}>
                  <span className={'mr-4'}>{currentUser.name}</span>
                  <span className={'font-weight-bold'}>4 Services</span>
                </div>
                <div className={'panel-heading-split-right bg-info'}>
                  <span className={'mr-4'}>Account number</span>
                  <span className={'font-weight-bold'}>{currentUser.accountNumber}</span>
                </div>
              </div>
              <div className={'panel-body p-0 m-0'}>
                {
                  service && (
                    <div>
                      <ServiceListItem data={service} list={SERVICE_ITEMS} onItemChange={this.handleServiceChange.bind(this)} />
                      <div className="panel-stack">
                        <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Change your plan</h3>
                        <div className="panel-item mb-5 text-center">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam auctor ligula interdum condimentum. Plan changes happen on your service rollover date (11/04/2018). 
                        </div>
                        <div className={'panel-item mb-5'}>
                          <div className={'row pricing-table-container'}>
                            {renderPricingTables}
                          </div>
                        </div>
                        <div className="panel-item mb-5 text-center">
                          <div className="row">
                            <div className="col-12 col-md-2" />
                            <div className="col-12 col-md-8">
                              These plans are automatically renewed each month. For more information, please see our Critical Information Summary.
                            </div>
                          </div>
                        </div>
                        <div className="panel-item">
                          <div className="row">
                            <div className="col-12 col-sm-5 col-lg-4 col-xl-3">
                              <button className="btn btn-outline-primary mb-3 btn-block" onClick={this.handleBack.bind(this)}>Back</button>
                            </div>
                            <div className="col-12 col-sm-2 col-xl-6 col-lg-4" />
                            <div className="col-12 col-sm-5 col-lg-4 col-xl-3 ">
                              <button className="btn btn-primary mb-3 btn-block" onClick={this.handleChangePlan.bind(this)}>Change plan</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser
});

export default withRouter(connect(mapStateToProps)(AccountChangePlan));
