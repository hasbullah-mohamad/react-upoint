import React, { Component } from 'react';

class Credit extends Component {
  render() {
    const { className, children } = this.props;
    return (
      <div className={className}>{children}</div>
    );
  }
}

Credit.defaultProps = {
  className: 'credit'
};

export default Credit;
