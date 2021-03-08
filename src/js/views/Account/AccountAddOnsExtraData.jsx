import React, { Component } from 'react';

class AccountAddOnsExtraData extends Component {
  constructor(props) {
    super(props);
    this.data = [
      {
        title: '1GB Additional Data',
        amount: 5
      },
      {
        title: '2GB Additional Data',
        amount: 10
      },
      {
        title: '4GB Additional Data',
        amount: 15
      },
      {
        title: '6GB Additional Data',
        amount: 20
      }
    ];
  }

  renderItem(item, index) {
    return (
      <tr key={`${index}`}>
        <td style={{ width: '80%' }} nowrap="nowrap">
          <span className="h4 font-weight-extra-bold">{item.title}</span>
        </td>
        <td className="text-right">${item.amount.toFixed(2)}</td>
        <td className="text-right">
          <button className="btn btn-primary btn-sm">Buy now</button>
        </td>
      </tr>
    );
  }

  renderFooter() {
    return (
      <tr>
        <td colSpan="4" className="text-center py-4 font-size-md">
          These additional data packs expire at the end of each cycle. <br />
          For more information, please see our <a href="#">Critical Information Summary.</a>
        </td>
      </tr>
    );
  }

  render() {
    const { data } = this;

    return (
      <div className="panel panel--primary">
        <table className="table table--transaction">
          <tbody>
            {
              data.map((item, index) => this.renderItem(item, index))
            }
            {
              this.renderFooter()
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default AccountAddOnsExtraData;
