import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Main from './Main';
import WhoWeAre from './WhoWeAre';
import PlansAndPricing from './PlansAndPricing';
import PayMyBill from './PayMyBill';
import Help from './Help';
import FAQs from './FAQs';
import Contact from './Contact';

import Menu from '../../components/Menu/Menu';
import UrlHelper from '../../helpers/UrlHelper';

class Energy extends Component {
  render() {
    return (
      <div className={'page--energy'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero section--hero-mini'}
          style={{
            backgroundImage: "url('/img/media/about.jpg')"
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>
              <img src="/img/icons/upoint_energy_heading.svg" alt="Upoint Energy" className="hero-icon" />
              uPoint Energy
            </h1>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left bg-secondary pb-0'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-lg-3 col-md-4 col-sm-12 pr-md-6 mb-4x mb-md-0'}>
                <Menu
                  className={'menu menu--side menu--side-success'}
                  data={[
                    { to: UrlHelper.getMainUrl('energy'), title: 'Electricity', exact: true },
                    { to: UrlHelper.getMainUrl('energy/who-are-we'), title: 'Who are we' },
                    { to: UrlHelper.getMainUrl('energy/plans-pricing'), title: 'Plans & Pricing' },
                    { to: UrlHelper.getMainUrl('energy/pay-my-bill'), title: 'Pay my bill' },
                    { to: UrlHelper.getMainUrl('energy/help'), title: 'Help' },
                    { to: UrlHelper.getMainUrl('energy/faqs'), title: 'FAQs' },
                    { to: UrlHelper.getMainUrl('energy/contact'), title: 'Contact Us' }
                  ]}
                />
              </div>
              <div className={'col-lg-9 col-md-8 pl-md-0'}>
                <Switch>
                  <Route exact path={UrlHelper.getMainUrl('energy')} title={'Electricity'} component={Main} />
                  <Route path={UrlHelper.getMainUrl('energy/who-are-we')} title={'Who are we'} component={WhoWeAre} />
                  <Route path={UrlHelper.getMainUrl('energy/plans-pricing')} title={'Plans & Pricing'} component={PlansAndPricing} />
                  <Route path={UrlHelper.getMainUrl('energy/pay-my-bill')} title={'Pay my bill'} component={PayMyBill} />
                  <Route path={UrlHelper.getMainUrl('energy/help')} title={'Help'} component={Help} />
                  <Route path={UrlHelper.getMainUrl('energy/faqs')} title={'FAQs'} component={FAQs} />
                  <Route path={UrlHelper.getMainUrl('energy/contact')} title={'Contact Us'} component={Contact} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
        <div className="section bg-secondary">
          <div className="container text-center font-size-xs">
            Retail energy provided by uEnergy. uEnergy is a business name of Energy Locals Pty Ltd
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Energy);
