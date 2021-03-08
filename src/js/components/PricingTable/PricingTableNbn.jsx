import React, { Component } from 'react';

class PricingTableNbn extends Component {
  render() {
    const { className, type, value, title, data, pack, description, onClick, actionTitle } = this.props;
    const renderItems = data.map((item, index) => <li key={`${index}`}>{item}</li>);

    return (
      <div className={`pricing-table pricing-table--${type} ${className}`}>
        <div className={'pricing'}>
          <span className={'price'}>{title}</span>
        </div>
        <div className={'pricing-content'}>
          <div className={'pricing-title'}>{pack}</div>
          <div className={'pricing-description'}>{description}</div>
          <ul className={'pricing-items'}>
            {renderItems}
          </ul>
          {actionTitle && <button type="button" className={`btn btn-${type}`} onClick={onClick.bind(value)}>{actionTitle}</button>}
        </div>
      </div>
    );
  }
}

PricingTableNbn.defaultProps = {
  className: '',
  type: 'primary',
  onClick: () => {}
};

export default PricingTableNbn;
