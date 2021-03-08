import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import moment from 'moment';

import { setGlobalOrder } from '../../actions/global';
import { initialState } from '../../reducers/global';
import OrderSimStep01 from './OrderSimStep01';
import OrderSimStep02 from './OrderSimStep02';
import OrderSimStep03 from './OrderSimStep03';
import OrderSimBilling from './OrderSimBilling';
import OrderSimConfirmation from './OrderSimConfirmation';
import UrlHelper from '../../helpers/UrlHelper';

const mapStateToProps = state => ({
  data: state.global.order,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalOrder: order => dispatch(setGlobalOrder(order))
});

class OrderSim extends Component {
  componentDidMount() {
    const user = this.props.currentUser || {};
    const address = user.homeAddress || {};
    const deliveryAddress = user.deliveryAddress || {};
    const hasDeliveryAddress = !!user.deliveryAddress;

    const initialOrderData = {
      sim: initialState.order.sim,
      title: user.title || '',
      firstname: user.first_name || '',
      lastname: user.last_name || '',
      contact_number: user.contact_number || '',
      email: user.email || '',
      birth_date: user.birth_date || '',

      union_name: user.union_name || '',
      union_number: user.union_number || '',

      street_number: address.street_number || '',
      street: address.street || '',
      postcode: address.postcode || '',
      city: address.suburb || '',
      state: address.state || '',
      unit: address.unit || null,

      same_address: !hasDeliveryAddress,

      delivery_street_number: deliveryAddress.street_number || (address.street_number || ''),
      delivery_street: deliveryAddress.street || (address.street || ''),
      delivery_postcode: deliveryAddress.postcode || (address.postcode || ''),
      delivery_city: deliveryAddress.suburb || (address.suburb || ''),
      delivery_state: deliveryAddress.state || (address.state || ''),
      delivery_unit: deliveryAddress.unit || (address.unit || ''),

      card_number: '',
      card_expiry_date: '',
      card_cvv: '',
      card_name: ''
    };

    this.props.setGlobalOrder({
      ...initialOrderData
    });
  }

  handleChangeValue(field, value) {
    this.setState({
      [field]: value
    });
  }

  render() {
    return (
      <div className={'page page--order-sim page--panel'}>
        {/* HERO SECTION */}
        <div className={'section'}>
          <div className={'container'}>
            <Switch>
              <Route exact path={UrlHelper.getMainUrl('order-a-sim/step-2')} component={OrderSimStep02} />
              <Route exact path={UrlHelper.getMainUrl('order-a-sim/step-3')} component={OrderSimStep03} />
              <Route exact path={UrlHelper.getMainUrl('order-a-sim/billing')} component={OrderSimBilling} />
              <Route exact path={UrlHelper.getMainUrl('order-a-sim/confirmation')} component={OrderSimConfirmation} />
              <Route path={UrlHelper.getMainUrl('')} component={OrderSimStep01} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSim);
