import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import ServiceListItem from '../../components/ListItems/ServiceListItem';

import Types from '../../actions/actionTypes';
import Services from '../../services';
import UrlHelper from '../../helpers/UrlHelper';

// const SERVICE_ITEMS = [
//   {
//     id: 1,
//     number: '0400 123 456',
//     plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', 'standard_mobile_pack'),
//     sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', 'nano'),
//     activated: false
//   },
//   {
//     id: 2,
//     number: '0400 345 248',
//     plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', 'super_mobile_pack'),
//     sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', 'nano'),
//     activated: true
//   }
// ];

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  service: state.account.serviceDetails,
  services: state.account.services,
  loading: state.common.isLoading,
  paymentsInfo: state.bills.paymentsInfo
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: Types.SERVICE_OVERVIEW_PAGE_LOADED, payload }),
  onPlanSelect: payload =>
    dispatch({ type: Types.SERVICE_OVERVIEW_PAGE_LOADED, payload }),
  onUpdateServiceLabel: payload =>
    dispatch({ type: Types.SERVICE_OVERVIEW_PAGE_LOADED, payload })
});

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      loading: true,
      service: null,
      isEmptyAddOns: true,
      serviceLabel: ''
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.onLoad(Promise.all([
      Services.Account.service(id),
      Services.Account.services()
    ]));
  }

  componentWillReceiveProps(props) {
    const { id } = props.match.params;
    if (id !== this.props.match.params.id) {
      this.props.onPlanSelect(Promise.all([
        Services.Account.service(id),
        { data: this.props.services }
      ]));
    }

    if (props.service) {
      this.setState({
        serviceLabel: props.service.label
      });
    }
  }

  serviceLabelDirty() {
    return this.props.service ? this.props.service.label !== this.state.serviceLabel : false;
  }

  calculatePercent(current, total) {
    return Math.ceil((current / total) * 100);
  }

  handleServiceChange(service) {
    this.props.history.push(UrlHelper.getMainUrl(`account/detail/${service.id}`));
  }

  handleChange(name, event) {
    this.setState({
      [name]: event.target.value
    });
  }

  handleSaveLabel() {
    // push to backend
    const payload = Services.Services.update(this.props.service.id, { label: this.state.serviceLabel }).then((serviceDetails) => {
      this.props.onUpdateServiceLabel(Promise.all([
        serviceDetails,
        Services.Account.services()
      ]));
    });
  }

  formatDataNumber(numberInMb) {
    let formatted = `${numberInMb}MB`;
    if (numberInMb > 1000) {
      formatted = `${numberInMb / 1000}GB`;
    }
    return formatted;
  }

  render() {
    const { currentUser, service, services } = this.props;
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});

    if (service) {
      console.log(service, 'ccc');
    }
    let serviceItems = [];
    if (services) {
      serviceItems = services.map(serviceItem => ({
        ...serviceItem,
        plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', serviceItem.plan_key),
        sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', serviceItem.sim_type),
        activated: serviceItem.activated
      }));
    }
    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>

            {/* Account Payment Notification */}
            {
              false && (
                <div className="text-center pb-4 pt-4 pt-lg-0">
                  <span className="rounded-circle bg-danger text-white font-weight-semi-bold d-inline-block p-2">
                    <span className="mx-4">Your account is currently ${overdueCharges} in arrears.</span>
                    <NavLink className="btn btn-light btn-sm" to={UrlHelper.getMainUrl('account/payment-edit')}>Pay now</NavLink>
                  </span>
                </div>
              )
            }

            <div className={'panel panel--primary panel--no-border'}>
              {/* PANEL HEADING */}
              <div className={'panel-heading-split'}>
                <div className={'panel-heading-split-left'}>
                  <span className={'mr-4'}>{currentUser.name}</span>
                  <span className={'font-weight-bold'}>
                    { services && `${services.length} Services`}
                    { !services && 'Loading services'}
                  </span>
                </div>
                <div className={'panel-heading-split-right bg-info'}>
                  <span className={'mr-4'}>Account number</span>
                  <span className={'font-weight-bold'}>{currentUser.number}</span>
                </div>
              </div>
              <div className={'panel-body p-0 m-0'}>
                {
                  service && (
                    <div>
                      <ServiceListItem data={service} list={serviceItems} onItemChange={this.handleServiceChange.bind(this)} />
                      <div className={'d-flex flex-column flex-md-row flex-wrap'}>
                        <div className={'col-md-6 p-0'}>
                          <div className={'panel-stack'}>
                            <div className={'row'}>
                              <div className={'col-md-12 text-right'}>
                                <h3 className={'panel-title title-underlined-primary float-left font-weight-extra-bold'}>Your plan</h3>
                              </div>
                            </div>
                            <div className={'row'}>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Plan name</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{service.plan.name}</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Contract start</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{service.usage.month_start}</strong></div>
                              </div>
                            </div>
                            <div className={'row'}>
                              <div className={'col-md-12 text-right'}>
                                <div className={'panel-title title-underlined-primary float-left'}>&nbsp;</div>
                              </div>
                            </div>
                            <div className={'row'}>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Calls/text</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{service.plan.details.calls}</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Data allowance</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{this.formatDataNumber(service.plan.details.data_allowance_mb)}</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>SMS allowance</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{service.plan.details.sms_allowance}</strong></div>
                              </div>
                            </div>
                            <div className={'row mt-5'}>
                              <div className={'col-md-12 text-right'}>
                                <h3 className={'panel-title title-underlined-primary float-left font-weight-extra-bold'}>Your service</h3>
                              </div>
                            </div>
                            <div className={'row'}>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Phone number</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div><strong>{service.service_number}</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className={'text-primary'}><strong>Phone nickname</strong></div>
                              </div>
                              <div className={'col-xs-6 col-sm-6 mb-2'}>
                                <div className="d-flex">
                                  <label htmlFor="nickname" className="text-info mb-0">{'✎'}&nbsp;&nbsp;</label>
                                  <input type="text" id="nickname" className="content-editable font-weight-semi-bold" value={this.state.serviceLabel || 'N/A'} onChange={this.handleChange.bind(this, 'serviceLabel')} />
                                </div>
                              </div>
                            </div>
                            {this.serviceLabelDirty() && (
                              <div className="row">
                                <div className={'col-xs-6 col-sm-6 mb-2'} />
                                <div className={'col-xs-6 col-sm-6 mb-2'}>
                                  <div className="d-flex">
                                    <button onClick={this.handleSaveLabel.bind(this)} className={'btn btn-outline-primary btn-sm'}>Save</button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* YOUR USAGE */}
                        <div className={'col-md-6 p-0 bg-info'}>
                          <div className={'panel-stack bg-secondary'}>
                            <h3 className={'panel-title title-underlined-primary font-weight-extra-bold'}>Your usage</h3>
                            <div className="mb-4">
                              <div className="progress">
                                <div className="progress-bar bg-danger" style={{ width: `${this.calculatePercent(service.usage.days_remaining, 30)}%` }} />
                              </div>
                              <div className="mt-3">
                                <strong className="text-danger">{service.usage.days_remaining} days left</strong> in this cycle
                              </div>
                            </div>
                            <div className="mb-4">
                              <div className="progress">
                                <div className="progress-bar bg-primary" style={{ width: '100%' }} />
                              </div>
                              <div className="mt-3">
                                <strong className="text-primary">{this.formatDataNumber(service.plan.details.data_allowance_mb)}</strong> available with plan
                              </div>
                            </div>
                            {
                              !this.state.isEmptyAddOns && (
                                <div>
                                  <div className={'clearfix'}>
                                    <h3 className={'panel-title title-underlined-primary float-left font-weight-extra-bold'}>Your add-ons</h3>
                                    <button className={'btn btn-outline-primary btn-sm float-right'}>More add-ons</button>
                                  </div>
                                  <div className="mb-5">
                                    <div className="progress">
                                      <div className="progress-bar bg-warning" style={{ width: '18%' }} />
                                    </div>
                                    <div className="mt-3">
                                      <strong className="text-warning">0.18GB</strong> of 1GB extra data used
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                          {
                            this.state.isEmptyAddOns && (
                              <div className="bg-info px-4 py-5 text-white">
                                <div className="d-flex">
                                  <img
                                    alt="sim"
                                    src="/img/icons/sim3.svg"
                                    style={{
                                      width: '100px',
                                      height: '79px'
                                    }}
                                  />
                                  <div className="ml-4">
                                    <h5 className="font-weight-extra-bold">
                                      Get add-ons
                                    </h5>
                                    <p className="font-size-sm">Load up your service with more of what you love. Add extra data, national talk or international talk.</p>
                                    <NavLink className="btn btn-primary btn-sm" to={UrlHelper.getMainUrl(`account/add-ons/${service.id}/extra-data`)}>
                                      Find out more
                                    </NavLink>
                                  </div>
                                </div>
                              </div>
                            )
                          }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountDetail));
