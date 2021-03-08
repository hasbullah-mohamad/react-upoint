import React, { Component } from 'react';
import classnames from 'classnames';

class TransactionsPanel extends Component {
  renderItem(item, index) {
    return (
      <tr key={`${index}`}>
        <td
          className={classnames({
            'vertical-line': true,
            'vertical-line--danger': item.transaction_status === 'pending',
            'vertical-line--primary': item.transaction_status === 'shipped'
          })}
        >
          <span className="h4 font-weight-extra-bold">{item.transaction}</span>
        </td>
        <td className="text-center">{item.order_date}</td>
        <td className="text-center">{item.order_id}</td>
        <td className="text-right">${item.order_amount}</td>
      </tr>
    );
  }

  render() {
    const {
      title, data, emptyText
    } = this.props;

    let listHtml = data.map((item, index) => this.renderItem(item, index));

    if (data.length === 0) {
      listHtml = (
        <tr>
          <td colSpan="4" className="text-center">{emptyText}</td>
        </tr>
      );
    }

    return (
      <div className="panel panel--primary">
        <div className="panel-heading text-center py-4">
          {title}
        </div>
        <table className="table table--transaction">
          <thead>
            <tr>
              <th style={{ width: '50%' }} />
              <th className="text-center">Order date</th>
              <th className="text-center">Order ID</th>
              <th className="text-center">Order amount</th>
            </tr>
          </thead>
          <tbody>
            {
              listHtml
            }
          </tbody>
        </table>
      </div>
    );
  }
}

TransactionsPanel.defaultProps = {
  title: 'Track your orders from the last 30 days',
  emptyText: 'No orders',
  list: [],
  onItemClick: () => {}
};

export default TransactionsPanel;
