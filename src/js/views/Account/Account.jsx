import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import Menu from '../../components/Menu';
import AccountOverview from './AccountOverview';
import AccountDetail from './AccountDetail';
import AccountAddOns from './AccountAddOns';
import AccountEditContactDetail from './AccountEditContactDetail';
import AccountBilling from './AccountBilling';
import AccountPaymentEdit from './AccountPaymentEdit';
import AccountContactSupport from './AccountContactSupport';
import AccountChangePlan from './AccountChangePlan';
import UrlHelper from '../../helpers/UrlHelper';

class Account extends Component {
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div className={'navigation text-center'}>
          <div className={'container'}>
            <Menu
              className={'menu--navigation'}
              data={[
                { to: UrlHelper.getMainUrl('account/overview'), title: 'Account Overview' },
                { to: UrlHelper.getMainUrl('account/edit-contact-detail'), title: 'Edit Contact Details' },
                { to: UrlHelper.getMainUrl('account/billing'), title: 'Billing' },
                { to: UrlHelper.getMainUrl('help'), title: 'Contact Support' }
              ]}
            />
          </div>
        </div>
        <Switch>
          <Route path={UrlHelper.getMainUrl('account/overview')} title={'AccountOverview'} component={AccountOverview} />
          <Route path={UrlHelper.getMainUrl('account/detail/:id')} title={'AccountDetail'} component={AccountDetail} />
          <Route path={UrlHelper.getMainUrl('account/add-ons/:id')} title={'AccountAddOns'} component={AccountAddOns} />
          <Route path={UrlHelper.getMainUrl('account/change-plan/:id')} title={'AccountChangePlan'} component={AccountChangePlan} />
          <Route path={UrlHelper.getMainUrl('account/edit-contact-detail')} title={'AccountEditContactDetail'} component={AccountEditContactDetail} />
          <Route path={UrlHelper.getMainUrl('account/billing')} title={'AccountBilling'} component={AccountBilling} />
          <Route path={UrlHelper.getMainUrl('account/payment-edit')} title={'AccountPaymentEdit'} component={AccountPaymentEdit} />
          <Route path={UrlHelper.getMainUrl('account/contact-support')} title={'AccountContactSupport'} component={AccountContactSupport} />
          <Redirect from={UrlHelper.getMainUrl('account')} to={UrlHelper.getMainUrl('account/overview')} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Account);
