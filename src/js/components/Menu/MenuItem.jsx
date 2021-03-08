import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MenuItem extends Component {
  isExternal() {
    const { to: url } = this.props;
    const link = url ? url.substring(0, 4) : '';
    return link === 'http';
  }

  render() {
    const { to, className, title, ...item } = this.props;
    return (
      <li>
        {
          this.isExternal() ? (
            <a href={to} className={className}>{title}</a>
          ) : (
            <NavLink {...item} to={to} className={className}>
              {title}
            </NavLink>
          )
        }
      </li>
    );
  }
}

MenuItem.defaultProps = {
  to: '/',
  activeClassName: 'active',
  className: '',
  title: ''
};

export default MenuItem;
