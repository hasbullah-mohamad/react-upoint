import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';


import { connectComponentToStore } from '../../helpers';
import Types from '../../actions/actionTypes';
import UrlHelper from '../../helpers/UrlHelper';

import Menu from '../Menu';
import Brand from '../Brand';

class Header extends Component {
  componentWillReceiveProps(props) {
    if (this.props.loggedIn !== props.loggedIn && !props.loggedIn) {
      this.props.history.push(UrlHelper.getMainUrl(''));
    }
  }

  topNavigation() {
    if (this.props.location.pathname === UrlHelper.getMainUrl('cfmeu')) {
      const links = [
        { to: UrlHelper.getMainUrl('about-us'), title: 'About' },
        { to: UrlHelper.getMainUrl('contact'), title: 'Contact' },
        { to: UrlHelper.getMainUrl('help'), title: 'Help' }
      ];
      const { loggedIn } = this.props;

      if (loggedIn) {
        links.push({ to: UrlHelper.getMainUrl('account'), title: 'My Account' });
        links.push({ onClick: this.handleLogout.bind(this), title: 'Logout', className: 'menu-item-highlight' });
      } else {
        links.push({ to: UrlHelper.getMainUrl('login'), title: 'Log In to the Portal', className: 'menu-item-highlight' });
      }

      return links;
    }
    const links = [
      { to: UrlHelper.getMainUrl('help'), title: 'Help' }
    ];

    const { loggedIn } = this.props;

    if (loggedIn) {
      links.push({ to: UrlHelper.getMainUrl('account'), title: 'My Account' });
      links.push({ onClick: this.handleLogout.bind(this), title: 'Logout', className: 'menu-item-highlight' });
    } else {
      links.push({ to: UrlHelper.getMainUrl('login'), title: 'Log In to the Portal', className: 'menu-item-highlight' });
    }

    return links;
  }

  handleToggle() {
    document.body.classList.toggle('sidebar-opened');
  }
  handleClose() {
    document.body.classList.remove('sidebar-opened');
  }
  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  renderNavigation() {
    return (
      <ul className="menu menu--main">
        <li className="has--submenu">
          <NavLink to={'#'}>Mobile &amp; NBN</NavLink>
          <ul className="submenu">
            <li>
              <NavLink to={UrlHelper.getMainUrl('mobile/plans')} exact>Mobile<span className="badge text-success">Available now</span></NavLink>
            </li>
            <li>
              <NavLink to={UrlHelper.getMainUrl('nbn/check-address')} exact>NBN<span className="badge text-success">Available now</span></NavLink>
            </li>
          </ul>
        </li>
        <li className="has--submenu">
          <NavLink to={'#'}>Electricity &amp; Gas</NavLink>
          <ul className="submenu">
            <li>
              <NavLink to={UrlHelper.getMainUrl('energy')} exact>Electricity<span className="badge text-success">Available now</span></NavLink>
            </li>
            <li>
              <NavLink to={'#'} exact>Gas<span className="badge text-warning">Coming soon</span></NavLink>
              {/* <NavLink to={UrlHelper.getAbsoluteUrl('coming-soon')} exact>Gas<span className="badge text-warning">Coming</span></NavLink> */}
            </li>
          </ul>
        </li>
        <li className="has--submenu">
          <NavLink to={'#'}>Finance &amp; Insurance</NavLink>
          <ul className="submenu">
            <li>
              <div to={'#'} className={'text-warning text-center px-5 font-weight-bold'}>Coming soon</div>
            </li>
            {/* <li>
              <NavLink to={'#'} exact>Credit card<span className="badge text-warning">Coming</span></NavLink>
              <NavLink to={UrlHelper.getMainUrl('upoint-cards-detail')} exact>Credit card<span className="badge text-warning">Coming</span></NavLink>
            </li>
            <li>
              <NavLink to={'#'} exact>Insurance<span className="badge text-warning">Coming</span></NavLink>
              <NavLink to={UrlHelper.getAbsoluteUrl('coming-soon')} exact>Insurance<span className="badge text-warning">Coming</span></NavLink>
            </li> */}
          </ul>
        </li>
        <li className="has--submenu">
          <NavLink to={'#'}>Other Deals</NavLink>
          <ul className="submenu">
            <li>
              <NavLink to={UrlHelper.getMainUrl('member-discounts')} exact>Member Advantage<span className="badge text-success">Available now</span></NavLink>
            </li>
            {/* <li>
              <NavLink to={'#'} exact>Cars<span className="badge text-warning">Coming</span></NavLink>
              <NavLink to={UrlHelper.getAbsoluteUrl('coming-soon')} exact>Cars<span className="badge text-warning">Coming</span></NavLink>
            </li> */}
          </ul>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <div className={'site-header'}>
        <div className={'header'}>
          <div className={'top-nav'}>
            <Menu
              className={'menu menu--top'}
              onClick={this.handleClose.bind(this)}
              data={this.topNavigation()}
            />
          </div>
          <div className={'main-nav'}>
            <Brand
              className={this.props.location.pathname === UrlHelper.getMainUrl('cfmeu') ? 'brand-cfmeu' : 'brand'}
              onClick={this.handleClose.bind(this)}
              to={UrlHelper.getMainUrl('')}
              toSecondary={'https://www.cfmmeu.org.au'}
              src={this.props.location.pathname === UrlHelper.getMainUrl('cfmeu') ? '/img/icons/logo-lockup.svg' : '/img/icons/logo.svg'}
            />
            {this.props.location.pathname === UrlHelper.getMainUrl('cfmeu') ? null : this.renderNavigation()}
            <Menu
              className={'menu menu--social'}
              onClick={this.handleClose.bind(this)}
              data={[
                // { to: 'https://www.facebook.com', title: <i className={'fa fa-facebook'} />, className: 'menu-item-circle' },
                // { to: 'https://twitter.com', title: <i className={'fa fa-twitter'} /> },
                // { to: 'https://instagram.com', title: <i className={'fa fa-instagram'} /> }
              ]}
            />
          </div>
        </div>
        <div className={'sidebar'}>
          <div className={'main-nav'}>
            <Brand
              onClick={this.handleClose.bind(this)}
              to={UrlHelper.getMainUrl('')}
              src={'/img/icons/logo.svg'}
            />
            {
              this.props.loggedIn ? (
                <Menu
                  className={'menu menu--login'}
                  data={[
                    { to: UrlHelper.getMainUrl('account'), title: <span>My Account</span>, onClick: this.handleClose.bind(this) }
                  ]}
                />
              ) : (
                <Menu
                  className={'menu menu--login'}
                  data={[
                    { to: UrlHelper.getMainUrl('login'), title: <span>Login<img src={'/img/icons/login.svg'} alt={'Login'} /></span>, onClick: this.handleClose.bind(this) }
                  ]}
                />
              )
            }
            <ul className="menu menu--main">
              <li className="has--submenu">
                <NavLink to={'#'}>Mobile &amp; NBN</NavLink>
                <ul className="submenu">
                  <li>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getMainUrl('mobile/plans')} exact>Mobile<span className="badge text-info">Available</span></NavLink>
                  </li>
                  <li>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getMainUrl('nbn/select-plan')} exact>NBN<span className="badge text-info">Available</span></NavLink>
                  </li>
                </ul>
              </li>
              <li className="has--submenu">
                <NavLink to={'#'}>Electricity &amp; Gas</NavLink>
                <ul className="submenu">
                  <li>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getMainUrl('energy')} exact>Electricity<span className="badge text-info">Available</span></NavLink>
                  </li>
                  <li>
                    <NavLink to={'#'} exact>Gas<span className="badge text-warning">Coming soon</span></NavLink>
                    {/* <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getAbsoluteUrl('coming-soon')} exact>Gas<span className="badge text-warning">Coming</span></NavLink> */}
                  </li>
                </ul>
              </li>
              <li className="has--submenu">
                <NavLink to={'#'}>Finance &amp; Insurance</NavLink>
                {/* <ul className="submenu">
                  <li>
                    <NavLink to={'#'} exact>Credit<span className="badge text-warning">Coming soon</span></NavLink>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getMainUrl('#')} exact>Credit card<span className="badge text-warning">Coming</span></NavLink>
                  </li>
                  <li>
                    <NavLink to={'#'} exact>Insurance<span className="badge text-warning">Coming</span></NavLink>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getAbsoluteUrl('#')} exact>Insurance<span className="badge text-warning">Coming</span></NavLink>
                  </li>
                </ul> */}
              </li>
              <li className="has--submenu">
                <NavLink to={'#'}>Other Deals</NavLink>
                <ul className="submenu">
                  <li>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getMainUrl('member-discounts')} exact>Member Advantage<span className="badge text-info">Available</span></NavLink>
                  </li>
                  {/* <li>
                    <NavLink to={'#'} exact>Cars<span className="badge text-warning">Coming</span></NavLink>
                    <NavLink onClick={this.handleClose.bind(this)} to={UrlHelper.getAbsoluteUrl('#')} exact>Cars<span className="badge text-warning">Coming</span></NavLink>
                  </li> */}
                </ul>
              </li>
            </ul>
          </div>
          <div className={'top-nav'}>
            <Menu
              className={'menu menu--top'}
              data={[
                { to: UrlHelper.getMainUrl('why-upoint'), title: 'Why uPoint?', onClick: this.handleClose.bind(this) },
                { to: UrlHelper.getMainUrl('about-us'), title: 'About Us', onClick: this.handleClose.bind(this) },
                { to: UrlHelper.getMainUrl('help'), title: 'Help', onClick: this.handleClose.bind(this) },
                { to: UrlHelper.getMainUrl('contact'), title: 'Contact', onClick: this.handleClose.bind(this) }
              ]}
            />
            {/* <Menu
              className={'menu menu--social'}
              data={[
                { to: 'https://www.facebook.com', title: <i className={'fa fa-facebook'} />, className: 'menu-item-circle', onClick: this.handleClose.bind(this) },
                { to: 'https://twitter.com', title: <i className={'fa fa-twitter'} />, onClick: this.handleClose.bind(this) },
                { to: 'https://instagram.com', title: <i className={'fa fa-instagram'} />, onClick: this.handleClose.bind(this) }
              ]}
            /> */}
          </div>
        </div>
        <button className={'nav-btn'} onClick={this.handleToggle.bind(this)}>
          <span />
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  logout: () => dispatch({ type: Types.LOGOUT })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
