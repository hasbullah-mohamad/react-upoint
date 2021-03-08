import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';

import Types from '../actions/actionTypes';
import services from '../services';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { tokenStorage } from '../helpers';
import PrivateRoute from '../helpers/PrivateRoute';

import Home from '../views/Home';
import WhyUPoint from '../views/WhyUPoint/WhyUPoint';
import AboutUs from '../views/AboutUs';
// import ActivateSim from '../views/ActivateSim';
import OrderSim from '../views/OrderSim';
import Account from '../views/Account';
import Plans from '../views/Plans';
import Contact from '../views/Contact';
import Privacy from '../views/Privacy';
import Documentation from '../views/Documentation';
import Help from '../views/Help';
import Login from '../views/Login';
import SamlLogin from '../views/Login/SamlLogin';
import ResetPassword from '../views/ResetPassword';
import RequestPasswordReset from '../views/RequestPasswordReset';
import Register from '../views/Register';
import Page404 from '../views/ErrorPage/Page404';
import Partnerships from '../views/Partnerships';
import UPointCards from '../views/UPointCards';
import Cfmeu from '../views/Cfmeu';

// import ElectricityGas from '../views/ElectricityGas';
// import Insurance from '../views/Insurance';
import MemberDiscounts from '../views/MemberDiscounts';

import NbnCheckAddress from '../views/Nbn/NbnCheckAddress';
import NbnSelectPlan from '../views/Nbn/NbnSelectPlan';
import NbnEnterDetails from '../views/Nbn/NbnEnterDetails';
import NbnConfirm from '../views/Nbn/NbnConfirm';
import NbnBilling from '../views/Nbn/NbnBilling';
import NbnSuccess from '../views/Nbn/NbnSuccess';

import ActivateSimStepActivationCode from '../views/ActivateSim/ActivateSimStepActivationCode';
import ActivateSimStepInformation from '../views/ActivateSim/ActivateSimStepInformation';
import ActivateSimStepAddress from '../views/ActivateSim/ActivateSimStepAddress';
import ActivateSimStepPlan from '../views/ActivateSim/ActivateSimStepPlan';
import ActivateSimStepConfirm from '../views/ActivateSim/ActivateSimStepConfirm';
import ActivateSimStepIdentity from '../views/ActivateSim/ActivateSimStepIdentity';
import ActivateSimBilling from '../views/ActivateSim/ActivateSimBilling';
import ActivateSimConfirmation from '../views/ActivateSim/ActivateSimConfirmation';

import OrderServiceStepInformation from '../views/OrderService/OrderServiceStepInformation';
import OrderServiceStepAddress from '../views/OrderService/OrderServiceStepAddress';
import OrderServiceStepPlan from '../views/OrderService/OrderServiceStepPlan';
import OrderServiceStepConfirm from '../views/OrderService/OrderServiceStepConfirm';
import OrderServiceStepIdentity from '../views/OrderService/OrderServiceStepIdentity';
import OrderServiceBilling from '../views/OrderService/OrderServiceBilling';
import OrderServiceConfirmation from '../views/OrderService/OrderServiceConfirmation';

import AddServiceSimBilling from '../views/AddService/AddServiceSimBilling.jsx';
import AddServiceStepConfirm from '../views/AddService/AddServiceStepConfirm.jsx';
import AddServiceStepPlan from '../views/AddService/AddServiceStepPlan.jsx';
import AddServiceStepInformation from '../views/AddService/AddServiceStepInformation.jsx';
import AddServiceConfirmation from '../views/AddService/AddServiceConfirmation.jsx';

import ActivatePendingService from '../views/ActivatePendingService/ActivatePendingService.jsx';
import ActivatePendingServiceConfirmation from '../views/ActivatePendingService/ActivatePendingServiceConfirmation.jsx';

import Mobile from '../views/Mobile';
import Energy from '../views/Energy';


import { store } from '../store';
import UrlHelper from '../helpers/UrlHelper';

const { APP_LOAD, REDIRECT } = Types;

const mapStateToProps = state => ({
  appLoaded: state.common.appLoaded,
  appName: state.common.appName,
  currentUser: state.common.currentUser,
  redirectTo: state.common.redirectTo
});

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});


class Full extends Component {
  componentWillMount() {
    const token = tokenStorage.getToken();
    if (token) {
      services.setToken(token);
    }

    this.props.onLoad(token ? services.Account.current() : null, token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      // this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  render() {
    if (!this.props.appLoaded) {
      // do not return anything while the UI is building
      return '';
    }
    return (
      <div className={'app'}>
        <Header {...this.props} />
        <div className={'site-main'}>
          <Switch>
            <Route exact path={UrlHelper.getMainUrl('')} name={'Home'} component={Home} />
            <Route exact path={UrlHelper.getMainUrl('mobile-nbn-packs')} name={'Home'} component={Home} />
            <Route exact path={UrlHelper.getMainUrl('electricity-gas')} name={'Home'} component={Home} />
            <Route exact path={UrlHelper.getMainUrl('finance-insurance')} name={'Home'} component={Home} />
            <Route exact path={UrlHelper.getMainUrl('other-deals')} name={'Home'} component={Home} />

            <Route path={UrlHelper.getMainUrl('why-upoint')} name={'Why upoint'} component={WhyUPoint} />
            <PrivateRoute path={UrlHelper.getMainUrl('order-a-sim')} name={'OrderSim'} component={OrderSim} />
            <PrivateRoute path={UrlHelper.getMainUrl('account')} name={'Account'} component={Account} />
            <Route path={UrlHelper.getMainUrl('account')} name={'Account'} component={Account} />
            <Route path={UrlHelper.getMainUrl('plans')} name={'Plans'} component={Plans} />
            <Route path={UrlHelper.getMainUrl('about-us')} name={'AboutUs'} component={AboutUs} />
            <Route path={UrlHelper.getMainUrl('contact')} name={'Contact'} component={Contact} />
            <Route path={UrlHelper.getMainUrl('privacy')} name={'Privacy'} component={Privacy} />
            <Route path={UrlHelper.getMainUrl('documentation')} name={'Documentation'} component={Documentation} />
            <Route path={UrlHelper.getMainUrl('help')} name={'Help'} component={Help} />
            <Route path={UrlHelper.getMainUrl('login')} name={'Login'} component={Login} />
            <Route path={UrlHelper.getMainUrl('saml')} name={'SamlLogin'} component={SamlLogin} />
            <Route path={UrlHelper.getMainUrl('password/email')} name={'RequestPasswordReset'} component={RequestPasswordReset} />
            <Route path={UrlHelper.getMainUrl('password/reset/:token')} name={'ResetPassword'} component={ResetPassword} />
            <Route path={UrlHelper.getMainUrl('register')} name={'Register'} component={Register} />
            <Route path={UrlHelper.getMainUrl('partnerships')} name={'Partnerships'} component={Partnerships} />
            <Route path={UrlHelper.getMainUrl('upoint-cards-detail')} name={'UPointCards'} component={UPointCards} />
            <Route path={UrlHelper.getMainUrl('cfmeu')} name={'Cfmeu'} component={Cfmeu} />

            <Route path={UrlHelper.getMainUrl('nbn/check-address')} name={'NbnCheckAddress'} component={NbnCheckAddress} />
            <Route path={UrlHelper.getMainUrl('nbn/select-plan')} name={'NbnSelectPlan'} component={NbnSelectPlan} />
            <PrivateRoute path={UrlHelper.getMainUrl('nbn/enter-details')} name={'NbnEnterDetails'} component={NbnEnterDetails} />
            <PrivateRoute path={UrlHelper.getMainUrl('nbn/confirm')} name={'NbnConfirm'} component={NbnConfirm} />
            <PrivateRoute path={UrlHelper.getMainUrl('nbn/billing')} name={'NbnBilling'} component={NbnBilling} />
            <PrivateRoute path={UrlHelper.getMainUrl('nbn/success')} name={'NbnSuccess'} component={NbnSuccess} />

            <Route path={UrlHelper.getMainUrl('mobile')} name={'Mobile'} component={Mobile} />
            <Route path={UrlHelper.getMainUrl('energy')} name={'Energy'} component={Energy} />

            {/* <Route path={'electricity-gas'} name={'ElectricityGas'} component={ElectricityGas} /> */}
            {/* <Route path={'insurance'} name={'insurance'} component={Insurance} /> */}
            <Route path={UrlHelper.getMainUrl('member-discounts')} name={'member-discounts'} component={MemberDiscounts} />

            <Route path={UrlHelper.getMainUrl('add-service/information')} name={'AddServiceStepInformation'} component={AddServiceStepInformation} />
            <Route path={UrlHelper.getMainUrl('add-service/plan')} name={'AddServiceStepPlan'} component={AddServiceStepPlan} />
            <Route path={UrlHelper.getMainUrl('add-service/confirm')} name={'AddServiceStepConfirm'} component={AddServiceStepConfirm} />
            <Route path={UrlHelper.getMainUrl('add-service/billing')} name={'AddServiceSimBilling'} component={AddServiceSimBilling} />
            <Route path={UrlHelper.getMainUrl('add-service/confirmation')} name={'AddServiceConfirmation'} component={AddServiceConfirmation} />

            <Route path={UrlHelper.getMainUrl('activate/confirmation')} name={'ActivatePendingServiceConfirmation'} component={ActivatePendingServiceConfirmation} />
            <Route path={UrlHelper.getMainUrl('activate')} name={'ActivatePendingService'} component={ActivatePendingService} />

            <Route path={UrlHelper.getMainUrl('order-service/step-information')} name={'OrderServiceStepInformation'} component={OrderServiceStepInformation} />
            <Route path={UrlHelper.getMainUrl('order-service/step-address')} name={'OrderServiceStepAddress'} component={OrderServiceStepAddress} />
            <Route path={UrlHelper.getMainUrl('order-service/step-identity')} name={'OrderServiceStepIdentity'} component={OrderServiceStepIdentity} />
            <Route path={UrlHelper.getMainUrl('order-service/step-plan')} name={'OrderServiceStepPlan'} component={OrderServiceStepPlan} />
            <Route path={UrlHelper.getMainUrl('order-service/step-confirm')} name={'OrderServiceStepConfirm'} component={OrderServiceStepConfirm} />
            <Route path={UrlHelper.getMainUrl('order-service/billing')} name={'OrderServiceBilling'} component={OrderServiceBilling} />
            <Route path={UrlHelper.getMainUrl('order-service/confirmation')} name={'OrderServiceConfirmation'} component={OrderServiceConfirmation} />


            <Route path={UrlHelper.getMainUrl('activate-sim/step-activation-code')} name={'ActivateSimStepActivationCode'} component={ActivateSimStepActivationCode} />
            <Route path={UrlHelper.getMainUrl('activate-sim/step-information')} name={'ActivateSimStepInformation'} component={ActivateSimStepInformation} />
            <Route path={UrlHelper.getMainUrl('activate-sim/step-address')} name={'ActivateSimStepAddress'} component={ActivateSimStepAddress} />
            <Route path={UrlHelper.getMainUrl('activate-sim/step-identity')} name={'ActivateSimStepIdentity'} component={ActivateSimStepIdentity} />
            <Route path={UrlHelper.getMainUrl('activate-sim/step-plan')} name={'ActivateSimStepPlan'} component={ActivateSimStepPlan} />
            <Route path={UrlHelper.getMainUrl('activate-sim/step-confirm')} name={'ActivateSimStepConfirm'} component={ActivateSimStepConfirm} />
            <Route path={UrlHelper.getMainUrl('activate-sim/billing')} name={'ActivateSimBilling'} component={ActivateSimBilling} />
            <Route path={UrlHelper.getMainUrl('activate-sim/confirmation')} name={'ActivateSimConfirmation'} component={ActivateSimConfirmation} />
            { /* <Route path={'/activate-sim'} name={'ActivateSim'} component={ActivateSim} /> */ }

            <Route component={Page404} />
          </Switch>
        </div>
        <Footer {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Full);
