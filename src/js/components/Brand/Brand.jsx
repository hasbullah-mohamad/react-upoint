import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class Brand extends Component {
  render() {
    const { className, alt, to, toSecondary, src, children, onClick } = this.props;
    return (
      <div className={className}>
        {
          toSecondary ? (
            <div>
              <img src={src} alt={alt} />
              <div className={'cover'}>
                <a className={'cfmeu-link'} href={toSecondary} />
                <NavLink className={'upoint-link'} to={to} onClick={onClick} />
              </div>
            </div>
          ) : (
            <NavLink className={'upoint-link'} to={to} onClick={onClick}>
              <img src={src} alt={alt} />
            </NavLink>
          )
        }
        {children ? <span>{children}</span> : null}
      </div>
    );
  }
}

Brand.defaultProps = {
  className: 'brand',
  alt: 'UPoint',
  to: UrlHelper.getMainUrl(''),
  src: '/img/icons/logo.svg',
  onClick: () => {}
};

export default Brand;
