import React, { Component } from 'react';
import { withRouter, Switch, Route, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import ServiceListItem from '../../components/ListItems/ServiceListItem';
import Menu from '../../components/Menu';
import AccountAddOnsExtraData from './AccountAddOnsExtraData';
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

class AccountDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      loading: true,
      service: null
    };
    if (this.props.match.path === '/account/add-ons/:id') {
      this.props.history.push(`${this.props.match.url}/extra-data`);
    }
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

  handleServiceChange(service) {
    this.props.history.push(UrlHelper.getMainUrl(`account/add-ons/${service.id}/extra-data`));
  }

  render() {
    const { currentUser } = this.props;
    const { service } = this.state;
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});

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
                  <span className={'font-weight-bold'}>4 Services</span>
                </div>
                <div className={'panel-heading-split-right bg-info'}>
                  <span className={'mr-4'}>Account number</span>
                  <span className={'font-weight-bold'}>{currentUser.accountNumber}</span>
                </div>
              </div>
              <div className={'body p-0 m-0'}>
                {
                  service && (
                    <div>
                      <ServiceListItem data={service} list={SERVICE_ITEMS} onItemChange={this.handleServiceChange.bind(this)} />
                      <div className={'navigation text-center border-top'}>
                        <Menu
                          className={'menu--navigation'}
                          data={[
                            { to: UrlHelper.getMainUrl(`account/add-ons/${service.id}/extra-data`), title: 'Extra data' },
                            { to: UrlHelper.getMainUrl(`account/add-ons/${service.id}/extra-internal-minutes`), title: 'Extra internal minutes' }
                          ]}
                        />
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="panel panel--primary panel--no-border">
              <Switch>
                <Route path={UrlHelper.getMainUrl('account/add-ons/:id/extra-data')} title={'AccountAddOnsExtraData'} component={AccountAddOnsExtraData} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  paymentsInfo: state.bills.paymentsInfo
});

export default withRouter(connect(mapStateToProps)(AccountDetail));
