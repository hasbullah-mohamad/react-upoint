/* eslint-disable global-require */
import React, { Component } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';

import Menu from '../../components/Menu';
import UrlHelper from '../../helpers/UrlHelper';

import MobileNbn from './MobileNbn';
import Electricity from './Electricity';
import FinanceInsurance from './FinanceInsurance';
import OtherDeals from './OtherDeals';

class Contact extends Component {
  render() {
    return (
      <div className={'page--about-us'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero section--hero-mini'}
          style={{
            backgroundImage: 'url("/img/media/contact.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>Contact Us</h1>
            <span className={'hero-description'}>If you can’t find the answer to your query on our <NavLink to={UrlHelper.getMainUrl('help')} >help page</NavLink>, get in touch via one of our contact methods below.</span>
          </div>
        </div>

        {/* PACK SECTION */}
        <div className={'section section--top section--secondary section--triangle-left'}>
          <div className={'container'}>
            <Menu
              className={'menu menu--tabs mt-lg-4'}
              data={[
                {
                  to: UrlHelper.getMainUrl('contact'),
                  exact: true,
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_mobile.svg') }} />
                      <div style={{ flex: 1 }}>
                        Mobile &amp; NBN
                      </div>
                    </div>
                  ),
                  className: 'menu-item--primary'
                },
                {
                  to: UrlHelper.getMainUrl('contact/electricity'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_energy.svg') }} />
                      <div style={{ flex: 1 }}>
                        Electricity
                      </div>
                    </div>
                  ),
                  className: 'menu-item--success'
                },
                {
                  to: UrlHelper.getMainUrl('contact/finance-insurance'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_insurance.svg') }} />
                      <div style={{ flex: 1 }}>
                        Finance &amp; Insurance
                      </div>
                    </div>
                  ),
                  className: 'menu-item--danger'
                },
                {
                  to: UrlHelper.getMainUrl('contact/other-deals'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_advantage.svg') }} />
                      <div style={{ flex: 1 }}>
                        Other Deals
                      </div>
                    </div>
                  ),
                  className: 'menu-item--cyan'
                }
              ]}
            />
            <div className="mt-5">
              <Switch>
                <Route exact path={UrlHelper.getMainUrl('contact')} title={'Mobile & Nbn'} component={MobileNbn} />
                <Route path={UrlHelper.getMainUrl('contact/electricity')} title={'Electricity'} component={Electricity} />
                <Route path={UrlHelper.getMainUrl('contact/finance-insurance')} title={'Finance &amp; Insurance'} component={FinanceInsurance} />
                <Route path={UrlHelper.getMainUrl('contact/other-deals')} title={'Other Deals'} component={OtherDeals} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
