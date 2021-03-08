import React, { Component } from 'react';
import Numeral from 'numeral';

class PricingTableDetail extends Component {
  render() {
    const { className, type, title, period, currency, price, priceDetails, value, summary, resource, data, onClick, actionTitle } = this.props;
    const renderItems = data.map((item, index) => (
      <li key={`${index}`}>
        <div className={'pricing-item-title'}>{item.title}</div>
        <div className={'pricing-item-description'}>{item.description}</div>
      </li>
    ));

    const renderPricingDetails = priceDetails.map((item, index) => (
      <div key={`${index}`}>{item}</div>
    ));

    return (
      <div className={`pricing-table-detail pricing-table-detail--${type} ${className}`}>
        <div className={'pricing-heading'}>{title}</div>
        <div className={'pricing-body'}>
          <div className={'pricing-top'}>
            <div className={'pricing'}>
              <span className={'symbol'}>{currency.symbol}</span>
              <span className={'price'}>{Numeral(price).format('0,0[.]00')}</span>
            </div>
            <div className={'pricing-period'}>{period}</div>
            <div className={'pricing-details'}>
              {renderPricingDetails}
            </div>
            <div className={'pricing-summary'}>
              <u><a href={summary.src} className={'text-info'} target={'_blank'}>{summary.description}</a></u>
            </div>
          </div>
          <div className={'pricing-content'}>
            <div className={'pricing-resource-amount'}>{resource.amount}</div>
            <div className={'pricing-resource-unit'}>{resource.unit}</div>
            <ul className={'pricing-items'}>
              {renderItems}
            </ul>
            {actionTitle && <button className={`btn btn-${type}`} onClick={onClick.bind(value)}>{actionTitle}</button>}
          </div>
        </div>
      </div>
    );
  }
}

PricingTableDetail.defaultProps = {
  className: '',
  type: 'primary',
  onClick: () => {},
  actionTitle: 'Buy Now',
  currency: {
    symbol: '$',
    name: 'US Dollar',
    symbol_native: '$',
    decimal_digits: 2,
    rounding: 0,
    code: 'USD',
    name_plural: 'US dollars'
  }
};

export default PricingTableDetail;
