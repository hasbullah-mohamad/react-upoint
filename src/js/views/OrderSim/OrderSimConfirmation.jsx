import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class OrderSimConfirmation extends Component {
  render() {
    const orderNumber = this.props.order.number;
    const accountNumber = this.props.user.number;

    return (
      <div className={'panel panel--primary'}>
        <div className={'d-flex flex-column flex-md-row bg-primary'}>
          <div className={'col-md-6 panel-heading'}>
            <p className={'icon-105 text-center'}>
              <img src={'/img/icons/customer_new.svg'} alt={'Thank you'} />
            </p>
            <h3 className={'title panel-title title-underlined-light font-weight-extra-bold text-center'}>Thank you for order your uPoint SIM card.</h3>
            <div className={'mb-4'}>
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6'}>
                  <div className={'h4 font-weight-normal'}>Order Id</div>
                </div>
                <div className={'col-xs-6 col-sm-6'}>
                  <div className={'h4 font-weight-extra-bold'}>{ orderNumber }</div>
                </div>
              </div>
              <div className={'row'}>
                <div className={'col-xs-6 col-sm-6'}>
                  <div className={'h4 font-weight-normal'}>Account number</div>
                </div>
                <div className={'col-xs-6 col-sm-6'}>
                  <div className={'h4 font-weight-extra-bold'}>{ accountNumber }</div>
                </div>
              </div>
            </div>
            <p>
              <small><b>
                Your order has been received; please take a note of your order ID in case you need to contact us about your order.
              </b></small>
            </p>
          </div>
          <div className={'col-md-6 panel-body bg-light'}>
            <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>What happens next?</h3>
            <ul className={'list-numeric'}>
              <li>
                Your new SIM will arrive to your nominated delivery address over the next few days. Occasionally, delays do happen and can last 7-10 days, this is rare but you can find out more here.
              </li>
              <li>
                To start making and receiving calls or using data, you must activate your new uPoint SIM. You can activate your SIM by logging in to the Portal.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  order: state.orders.createdOrder,
  user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderSimConfirmation));

