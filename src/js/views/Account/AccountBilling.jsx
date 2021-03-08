import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FlashMessage from 'react-flash-message';

import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import ServiceListItem from '../../components/ListItems/ServiceListItem';

import services from '../../services';
import Types from '../../actions/actionTypes';
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

class AccountBilling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      loading: true,
      service: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    const query = this.props.location.search;
    let detailsUpdated = false;
    if (query) {
      const params = new URLSearchParams(query);
      const updated = params.get('updated');
      detailsUpdated = updated == 'true';
    }

    const service = ConstantHelper.getItemByField(SERVICE_ITEMS, 'id', parseInt(id, 0));
    this.setState({
      service,
      loading: false,
      detailsUpdated
    });
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      services.Account.services(),
      services.Bills.bills(),
      services.Bills.paymentsInfo()
    ]));
  }

  componentWillReceiveProps(props) {
    const { id } = props.match.params;

    const service = ConstantHelper.getItemByField(SERVICE_ITEMS, 'id', parseInt(id, 0));
    this.setState({
      service,
      loading: false
    });
  }

  fileDownload(data, filename) {
    const blob = new Blob([data]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  downloadStatement(statement) {
    if (statement) {
      services.Bills.billPdf(statement.stmtNo).then((res) => {
        this.fileDownload(res.xhr.response, `${statement.stmtNo}_statement.pdf`);
      });
    }
  }

  handleServiceChange(service) {
    this.props.history.push(UrlHelper.getMainUrl(`account/detail/${service.id}`));
  }

  renderSuccessBanner() {
    if (this.state.detailsUpdated) {
      return (<FlashMessage duration={5000}>
        <div className="alert alert-success">
                Saved.
        </div>
      </FlashMessage>);
    }
    return null;
  }

  renderMainPanel() {
    const { currentUser, currentInvoice } = this.props;
    const totalServices = this.props.services ? this.props.services.length : 0;

    const servicesLabel = totalServices === 0 ? 'No Service' : totalServices === 1 ? '1 Service' : `${totalServices} Services`;

    return (
      <div className={'panel panel--primary panel--no-border'}>
        {/* PANEL HEADING */}
        <div className={'panel-heading-split'}>
          <div className={'panel-heading-split-left'}>
            <span className={'mr-4'}>{currentUser.name}</span>
            <span className={'font-weight-bold'}>{servicesLabel}</span>
          </div>
          <div className={'panel-heading-split-right bg-info'}>
            <span className={'mr-4'}>Account number</span>
            <span className={'font-weight-bold'}>{currentUser.number}</span>
          </div>
        </div>
        <div className={'panel-body'}>
          {/* GREEN BANNER IF UPDATED SUCCESS */}
          {this.renderSuccessBanner()}

          <div className="row">
            <div className="col-12 col-md-6">
              <h3 className={'panel-title title-underlined-primary font-weight-extra-bold'}>Your current bill</h3>
            </div>
            <div className="col-12 col-md-6">
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div className={'text-primary'}><strong>Bill issue date</strong></div>
                </div>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div><strong>{ currentInvoice ? currentInvoice.dateIssued : '-' }</strong></div>
                </div>
                {/* <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div className={'text-primary'}><strong>Contract start</strong></div>
                </div>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div><strong>-</strong></div>
                </div>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div className={'text-primary'}><strong>Bill method</strong></div>
                </div>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div><strong>Automatic</strong></div>
                </div> */}
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div className={'text-primary'}><strong>Total amount</strong></div>
                </div>
                <div className={'col-xs-6 col-sm-6 mb-2'}>
                  <div>
                    <div className="font-weight-extra-bold">${ currentInvoice ? currentInvoice.currBalance : 0 }</div>
                    <div><small>due on { currentInvoice ? currentInvoice.dateDue : '-' }</small></div>
                  </div>
                </div>
              </div>
              <div className="border-top border-primary my-4" />
              <div className="d-flex justify-content-between">
                <NavLink className="btn btn-info btn-sm" to={UrlHelper.getMainUrl('account/payment-edit')}>Update payment details</NavLink>
                <a onClick={this.downloadStatement.bind(this, currentInvoice)} target="_blank" className="btn btn-outline-primary btn-sm">View bill</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderPaymentHistoryPanel() {
    const { olderInvoices } = this.props;
    if (!olderInvoices || !olderInvoices.length) {
      return null;
    }

    return (
      <div className="panel panel--primary">
        <div className="panel-heading py-4">
          Billing history
        </div>
        <table className="table table--transaction">
          <thead>
            <tr>
              <th style={{ width: '50%' }}><span className="ml-3 ml-md-5">Date</span></th>
              <th className="text-center">Bill number</th>
              <th className="text-center">Bill amount</th>
              <th className="text-center" />
            </tr>
          </thead>
          <tbody>
            {
              olderInvoices.map((item, index) => (
                <tr key={`${index}`}>
                  <td>
                    <span className="ml-3 ml-md-5 h4 font-weight-extra-bold">{item.dateIssued}</span>
                  </td>
                  <td className="text-center">{item.stmtNo}</td>
                  <td className="text-center">${item.currCharges.toFixed(2)}</td>
                  <td className="text-center">
                    <a onClick={this.downloadStatement.bind(this, item)} className="btn btn-sm btn-outline-primary">View PDF</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});
    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
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
            {this.renderMainPanel()}
            {this.renderPaymentHistoryPanel()}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: Types.PAYMENT_HISTORY_PAGE_LOADED, payload })
});

const mapStateToProps = state => ({
  currentUser: state.common.currentUser,
  accountNumber: state.common.currentUser.number,
  services: state.account.services,
  currentInvoice: state.bills.currentInvoice,
  olderInvoices: state.bills.olderInvoices,
  paymentsInfo: state.bills.paymentsInfo
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountBilling));
