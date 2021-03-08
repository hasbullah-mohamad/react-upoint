import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class Page404 extends Component {
  render() {
    return (
      <div className={'page--404'}>
        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/contact.jpg")',
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}><span className={'text-danger'}>404</span> page not found.</h1>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <div className={'text-center'}>
              We couldn’t find the page you’re looking for. <br />
              If you typed the address in, please check that it’s correct and try again. It’s also possible that you clicked an outdated link.<br />
              Try our <NavLink to={UrlHelper.getMainUrl('')}>homepage</NavLink> to find what you’re after, or use the menu at the top of the page.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
