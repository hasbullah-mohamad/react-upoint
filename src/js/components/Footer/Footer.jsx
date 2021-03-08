import React, { Component } from 'react';

import Menu from '../Menu';
import Brand from '../Brand';
import Credit from './Credit';
import UrlHelper from '../../helpers/UrlHelper';

class Footer extends Component {
  render() {
    return (
      <div className={'site-footer'}>
        <div className={'footer-top'}>
          <div className={'container'}>
            <div className={'d-flex flex-md-row flex-column-reverse justify-content-between'}>
              <div className={'p-2 d-md-block d-none'}>
                <Menu
                  className={'menu menu--main'}
                  data={[
                    { to: UrlHelper.getMainUrl('mobile/plans'), title: 'Mobile' },
                    { to: UrlHelper.getMainUrl('nbn/select-plan'), title: 'NBN' },
                    { to: UrlHelper.getAbsoluteUrl('energy'), title: 'Electricity' },
                    { to: UrlHelper.getMainUrl('contact'), title: 'Contact' }
                  ]}
                />
              </div>
              <div className={'p-2 d-md-block d-none'}>
                <Menu
                  className={'menu menu--main'}
                  data={[
                    { to: UrlHelper.getMainUrl('why-upoint'), title: 'Why uPoint?' },
                    { to: UrlHelper.getMainUrl('about-us'), title: 'About Us' },
                    { to: UrlHelper.getMainUrl('help'), title: 'Help' },
                    { to: UrlHelper.getMainUrl('login'), title: 'Portal' }
                  ]}
                />
              </div>
              <div className={'p-2 d-md-block d-none'}>
                <Menu
                  className={'menu menu--main'}
                  data={[
                    { to: UrlHelper.getMainUrl('documentation'), title: 'Documentation' },
                    { to: UrlHelper.getMainUrl('privacy'), title: 'Privacy' }
                  ]}
                />
              </div>
              <div className={'p-2'}>
                <Brand src={'/img/icons/logo_footer.svg'} />
                {/* <Menu
                  className={'menu menu--social'}
                  data={[
                    {
                      to: 'https://www.facebook.com',
                      title: <i className={'fa fa-facebook'} />,
                      className: 'menu-item-circle'
                    },
                    {
                      to: 'https://twitter.com',
                      title: <i className={'fa fa-twitter'} />
                    },
                    {
                      to: 'https://instagram.com',
                      title: <i className={'fa fa-instagram'} />
                    }
                  ]}
                /> */}
                <Credit className={'credit'}>@2018 UPOINT Pty Limited</Credit>
              </div>
            </div>
          </div>
        </div>
        <div className={'footer-bottom'}>
          <div className={'container'}>
            <Menu
              className={'menu'}
              data={[
                { to: UrlHelper.getMainUrl('documentation'), title: 'Documentation' },
                { to: UrlHelper.getMainUrl('privacy'), title: 'Privacy' },
                { to: UrlHelper.getMainUrl('account'), title: 'Your Information' }
              ]}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;

