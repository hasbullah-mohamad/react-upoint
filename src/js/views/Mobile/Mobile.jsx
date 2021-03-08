import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import OurNetworks from './OurNetworks';
import Plans from './Plans';

import Menu from '../../components/Menu/Menu';
import UrlHelper from '../../helpers/UrlHelper';

class Mobile extends Component {
  render() {
    return (
      <div className={'page--mobile'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero section--hero-mini'}
          style={{
            backgroundImage: "url('/img/media/plans.jpg')"
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>
              <img src="/img/icons/upoint_mobile.svg" alt="uPoint Mobile" className="hero-icon" />
              uPoint Mobile
            </h1>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left bg-secondary'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-lg-3 col-md-4 col-sm-12 pr-md-6 mb-4x mb-md-0'}>
                <Menu
                  className={'menu menu--side menu--side-primary'}
                  data={[
                    { to: UrlHelper.getMainUrl('mobile/plans'), title: 'Plans' },
                    { to: UrlHelper.getMainUrl('mobile/our-networks'), title: 'Our networks' },
                    { to: UrlHelper.getMainUrl('contact'), title: 'Contact' }
                  ]}
                />
              </div>
              <div className={'col-lg-9 col-md-8 pl-md-0'}>
                <Switch>
                  <Route path={UrlHelper.getMainUrl('mobile/plans')} title={'Plans'} component={Plans} />
                  <Route path={UrlHelper.getMainUrl('mobile/our-networks')} title={'Our networks'} component={OurNetworks} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mobile;
