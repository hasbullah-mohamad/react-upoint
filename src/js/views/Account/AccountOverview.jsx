import React, { Component, Fragment } from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';

import Pack from '../../components/Pack/Pack';
import ServiceListItem from '../../components/ListItems/ServiceListItem';
import OrderListItem from '../../components/ListItems/OrderListItem';
import TransactionsPanel from '../../components/Panels/TransactionsPanel';

import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import services from '../../services';
import Types from '../../actions/actionTypes';
import OrderSimPanel from '../../components/Panels/OrderSimPanel';
import UrlHelper from '../../helpers/UrlHelper';


// const SERVICE_ITEMS = [
//   {
//     number: '0400 123 456',
//     plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', 'standard_mobile_pack'),
//     sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', 'micro_standard'),
//     activated: false,
//   },
// ];

const mapStateToProps = state => ({
  user: state.common.currentUser,
  accountNumber: state.common.currentUser.number,
  services: state.account.services,
  orders: state.account.orders,
  isLoading: state.common.isLoading,
  paymentsInfo: state.bills.paymentsInfo
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: Types.DASHBOARD_PAGE_LOADED, payload })
});

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activation_type: '',
      modal: this.shouldDisplayModal(props)
    };
  }

  componentWillMount() {
    this.props.onLoad(Promise.all([
      services.Account.services(),
      services.Account.orders(),
      services.Bills.paymentsInfo()
    ]));
  }

  componentWillReceiveProps(props) {
    this.setState({
      modal: this.shouldDisplayModal(props)
    });
  }

  changeValue(field, value) {
    this.setState({
      activation_type: value
    });
  }

  shouldDisplayModal(props) {
    return !props.isLoading && (!props.orders || props.orders.length === 0);
  }

  handleToggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleGoOrderSim() {
    this.props.history.push(UrlHelper.getMainUrl('order-a-sim'));
  }

  showServiceDetails(id) {
    this.props.history.push(UrlHelper.getMainUrl(`account/detail/${id}`));
  }

  showServiceActivation(code) {
    this.props.history.push(UrlHelper.getMainUrl(`activate?code=${code}`));
  }

  handleChange(field, event) {
    this.changeValue(field, event.target.value);
  }

  handleChangeValue(field, value) {
    this.changeValue(field, value);
  }

  handleSelectActivateType(value) {
    this.changeValue('activation_type', value);
  }

  handleActivateSim() {
    this.props.history.push(UrlHelper.getMainUrl('order-service/step-information'));
  }

  handleAddService() {
    this.props.history.push(UrlHelper.getMainUrl('add-service/information'));
  }

  handleContinue() {
    if (this.state.activation_type === 'new_customer') {
      // activate existing sim
      this.handleActivateSim();
    } else if (this.state.activation_type === 'existing_customer') {
      // order another sim
      this.handleGoOrderSim();
    } else if (this.state.activation_type === 'replace_sim') {
    }
  }

  renderModal() {
    return (
      <Modal
        toggle={this.handleToggleModal.bind(this)}
        className={'modal-lg modal--primary'}
        isOpen={this.state.modal}>
        <div className={'modal-header'}>
          <h3 className={'text-center title-underlined-primary font-weight-extra-bold'}>
            It looks like this is your first time logging in
          </h3>
        </div>
        <ModalBody>
          <p className={'text-center mt-4'}>
            <img
              src={'/img/icons/customer_new_dark.svg'}
              style={{
                width: '134px',
                height: '105px'
              }}
              alt={'Add a service'}
            />
          </p>
          <h1 className={'text-center mt-4 mb-4'}>Order your first SIM</h1>
          <p className={'text-center'}>
            It’s quick and easy to order a uPoint SIM. Simply click below<br />
            and then fill in the form to order a SIM for your first service.
          </p>
        </ModalBody>
        <div className={'modal-footer text-center'}>
          <button className={'btn btn-info'} onClick={this.handleActivateSim.bind(this)}>Add a service</button>
        </div>
      </Modal>
    );
  }

  renderOrdersServices() {
    if (this.props.services && this.props.services.length) {
      const serviceObjects = this.props.services.map((item, index) => ({
        ...item,
        plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', item.plan_key),
        sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', item.sim_type)
      }));

      return (
        <div className={'panel-body p-0 bg-silver'}>
          {
            serviceObjects.map((item, index) => (
              <div className={'mb-2'} key={index}>
                <ServiceListItem data={item} onActivate={this.showServiceActivation.bind(this, item.activation_code)} onClick={this.showServiceDetails.bind(this, item.id)} />
              </div>
            ))
          }
        </div>
      );
    }
    if (this.props.orders && this.props.orders.length) {
      const orderObjects = this.props.orders.map((item, index) => ({
        ...item,
        account: this.props.accountNumber,
        plan: ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', item.plan_key),
        sim: ConstantHelper.getItemByField(CONSTANT.SIMS, 'value', item.sim_type)
      }));

      const ordersLength = orderObjects.length;

      return (
        <div className={'panel-body p-0 bg-silver'}>
          {
            orderObjects.map((item, index) => (
              ordersLength === index + 1 ?
                <div className={'mb-2'} key={index}>
                  <OrderListItem data={item} />
                </div>
                : null
            ))
          }
        </div>
      );
    }

    const servicesMessage = this.props.isLoading ? 'Loading services information...' : 'You have no active services yet.';

    return (
      <div className={'panel-body'}>
        <div className={'panel-item'}>
          <p className={'mt-5 text-center'}>
            {servicesMessage}
          </p>
        </div>
      </div>
    );
  }

  renderFooter() {
    const { activation_type } = this.state;
    const data = { activation_type };
    const hasAnyServices = this.props.services && this.props.services.length;

    const renderPacks = (
      <div className={'d-flex flex-column flex-md-row justify-content-center'}>
        <Pack
          key={'1'}
          className={data.activation_type ? (data.activation_type === 'new_customer' ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round'}
          src={'/img/icons/customer_new.svg'}
          title={<span>Activate a <br />new SIM</span>}
          onClick={this.handleSelectActivateType.bind(this, 'new_customer')}
        />
        <Pack
          key={'2'}
          className={data.activation_type ? (data.activation_type === 'existing_customer' ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round'}
          src={'/img/icons/customer_existing.svg'}
          title={<span>Order another<br />SIM</span>}
          onClick={this.handleSelectActivateType.bind(this, 'existing_customer')}
        />
        {
          hasAnyServices ?
            <Pack
              key={'3'}
              className={data.activation_type ? (data.activation_type === 'replace_sim' ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round'}
              src={'/img/icons/customer_replace.svg'}
              title={<span>I need to replace<br />my SIM</span>}
              onClick={this.handleSelectActivateType.bind(this, 'replace_sim')}
            />
            : null
        }
      </div>
    );

    return (
      <div className={'panel-footer bg-primary'}>
        {renderPacks}
        {
          data.activation_type ? (
            <p className={'text-right d-block d-md-none'}>
              <NavLink to={'#'} onClick={this.handleChangeValue.bind(this, 'activation_type', '')}>Change your activation type</NavLink>
            </p>
          ) : null
        }
        <div className={'text-center mt-5'}>
          <button
            className={'btn btn-info'}
            disabled={!data.activation_type}
            onClick={this.handleContinue.bind(this)}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  renderLast30DaysOrders() {
    const data = [];

    if (this.props.orders) {
      this.props.orders.forEach((order) => {
        const simOrder = order.order_item_types.includes('tiab_sim_card');
        if (simOrder) {
          data.push({
            transaction_status: order.status,
            transaction: order.statusLabel,
            order_date: order.order_date,
            order_id: order.number,
            order_amount: order.order_items[0].cost
          });
        }
      });

      return (
        <TransactionsPanel
          title="Track your orders from the last 30 days"
          emptyText="No orders"
          data={data}
        />
      );
    }
  }

  render() {
    const { name, validated } = this.props.user;
    const { hasOverdueCharges, overdueCharges } = (this.props.paymentsInfo || {});
    const hasOrders = !!this.props.orders;
    const totalServices = this.props.services ? this.props.services.length : 0;
    const servicesLabel = totalServices === 0 ? 'No Service' : totalServices === 1 ? '1 Service' : `${totalServices} Services`;

    if (validated === 0) {
      return (
        <div className="page page-active-sim page--panel">
          <div className="section">
            <div className="container">
              <div className="text-center">
                <h1>Account pending review</h1>
                <p>
                  Thanks for registering with uPoint. Your account was not able to be automatically verified and is pending review. For further questions, please contact your union. An email will be sent to you when your account has been activated
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/*{this.renderModal()}*/}
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
              <div className={'panel panel--primary panel--no-border'}>
                {
                  true || (!hasOrders || totalServices > 0) ? (
                    /* PANEL HEADING */
                    <div className={'panel-heading-split'}>
                      <div className={'panel-heading-split-left'}>
                        <span className={'mr-4'}>{name}</span>
                        <span className={'font-weight-bold'}>{servicesLabel}</span>
                      </div>
                      <div className={'panel-heading-split-right bg-info'}>
                        <span className={'mr-4'}>Account number</span>
                        <span className={'font-weight-bold'}>{this.props.accountNumber}</span>
                      </div>
                    </div>
                  ) : null
                }
                {this.renderOrdersServices()}
              </div>
              { this.renderLast30DaysOrders() }
              <OrderSimPanel showFirstServiceButton={totalServices == 0} onOrderClick={this.handleGoOrderSim.bind(this)} onActivateClick={this.handleActivateSim.bind(this)} onAddServiceClick={this.handleAddService.bind(this)} showAnotherServiceButton={totalServices > 0} />
              <div className="mt-4x panel panel--upoint">
                <div className="panel-heading bg-red">
                  <div className="panel-heading-icon">
                    <img src="/img/icons/upoint_advantage.svg" alt="uPoint mobile" />
                  </div>
                  <div className="panel-heading-content">
                    <img src="/img/icons/logo.svg" alt="uPoint" />
                    <span className="ml-2 text-red font-weight-bold">MEMBER ADVANTAGE</span>
                  </div>
                </div>
                <div className="panel-body">
                  <div className="panel-left">
                    <img className="mb-5" src="/img/media/member_advantage.png" style={{ width: '289px', height: '81px' }} alt="member advantage" />
                    <p>uPoint has recently partnered with Member Advantage, a leading provider of member benefit programs, to expand on the range of benefits you can access as one of our valued members.</p>
                    <p>
                      <a href="https://upoint.memberadvantage.com.au/saml/sso" className="btn btn-red" target="_blank" rel="noreferrer noopener">
                        <span className="d-none d-md-block">Click here to login to Member Advantage now</span>
                        <span className="d-block d-md-none">Member Advantage</span>
                      </a>
                    </p>
                  </div>
                  <div className="panel-right bg-secondary">
                    <ul className="advantage-list">
                      <li><span>✓</span>Dining</li>
                      <li><span>✓</span>Movie tickets</li>
                      <li><span>✓</span>Airline lounge memberships</li>
                      <li><span>✓</span>Hotel accommodation</li>
                      <li><span>✓</span>Leisure activities</li>
                      <li><span>✓</span>Credit cards</li>
                      <li><span>✓</span>Car rental</li>
                      <li><span>✓</span>Electronics</li>
                      <li><span>✓</span>Whitegoods</li>
                    </ul>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
