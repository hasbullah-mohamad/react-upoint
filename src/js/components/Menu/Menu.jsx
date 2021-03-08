import React, { Component } from 'react';
import MenuItem from './MenuItem';

class Menu extends Component {
  render() {
    const { className, data } = this.props;
    const renderItems = data.map((item, index) => <MenuItem {...item} key={`${index}`} />);

    return (
      <ul className={className}>
        {renderItems}
      </ul>
    );
  }
}

Menu.defaultProps = {
  className: 'menu',
  data: []
};

export default Menu;
