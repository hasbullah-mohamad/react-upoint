import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';


import Menu from '../../components/Menu';
import UrlHelper from '../../helpers/UrlHelper';

import General from './General';
import Mobile from './Mobile';
import Nbn from './Nbn';
import Electricity from './Electricity';

class Help extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className={'page page--help'}>
        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/help.jpg")'
          }}>
          <div className={'container'}>
            <h1 className={'hero-title'}>Help</h1>
            <span className={'hero-description'}>We’re here to help answer any questions you have.</span>
          </div>
        </div>

        {/* PRICING TABLE SECTION */}
        <div className={'section section--top section--secondary section--triangle-right'}>
          <div className={'container'}>
            <Menu
              className={'menu menu--tabs mt-lg-4'}
              data={[
                {
                  to: UrlHelper.getMainUrl('help'),
                  exact: true,
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/sim1.svg') }} />
                      <div style={{ flex: 1 }}>
                        General
                      </div>
                    </div>
                  ),
                  className: 'menu-item--primary'
                },
                {
                  to: UrlHelper.getMainUrl('help/mobile'),
                  exact: true,
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_mobile.svg') }} />
                      <div style={{ flex: 1 }}>
                        Mobile
                      </div>
                    </div>
                  ),
                  className: 'menu-item--success'
                },
                {
                  to: UrlHelper.getMainUrl('help/nbn'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_nbn.svg') }} />
                      <div style={{ flex: 1 }}>
                        NBN
                      </div>
                    </div>
                  ),
                  className: 'menu-item--danger'
                },
                {
                  to: UrlHelper.getMainUrl('help/electricity'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_energy.svg') }} />
                      <div style={{ flex: 1 }}>
                        Electricity
                      </div>
                    </div>
                  ),
                  className: 'menu-item--success'
                }
              ]}
            />
            <div className="mt-5">
              <Switch>
                <Route exact path={UrlHelper.getMainUrl('help')} title={'General'} component={General} />
                <Route path={UrlHelper.getMainUrl('help/mobile')} title={'Mobile'} component={Mobile} />
                <Route path={UrlHelper.getMainUrl('help/nbn')} title={'Nbn'} component={Nbn} />
                <Route path={UrlHelper.getMainUrl('help/electricity')} title={'Electricity'} component={Electricity} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
