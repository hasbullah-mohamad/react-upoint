/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class WhoWeAre extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h3 className="font-weight-extra-bold mb-4x">How to pay your energy bill</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="title-underlined-success font-weight-bold">Payment methods</h4>
              {/* <div>
                <div className="btn btn-success btn-sm">Visit website</div>
              </div> */}
            </div>
            <div>
              We offer our members a number of different convenient ways to pay, outlined below. You can also find these payment methods at the bottom of your bill.
            </div>
          </div>
        </div>

        <div className="panel panel--success">
          <div className="panel-body">
            <h4 className="title-underlined-success font-weight-bold mb-4">Direct Debit</h4>
            <div>
              Set and forget. Sign up for direct debit and we’ll deduct the total amount of your energy bill from the account provided by you on the due date. Give us a call to set this up.
            </div>
          </div>
        </div>

        <div className="panel panel--success">
          <div className="panel-body">
            <h4 className="title-underlined-success font-weight-bold mb-4">Credit or Debit Card</h4>
            <div>
              Pay your energy bill quickly and securely using our secure Westpac payment portal.
              Please note that credit card payments will incur a 1% fee to cover the fees charged by relevant financial institutions.
            </div>
          </div>
        </div>

        <div className="panel panel--success">
          <div className="panel-body">
            <h4 className="title-underlined-success font-weight-bold mb-4">BPAY</h4>
            <div>
              Use our convenient BPAY option. Contact your bank or financial institution to make this payment from your cheque, savings, debit, credit card or transaction account. More info at 
              <br />
              <a href="https://www.bpay.com.au" target="_blank">www.bpay.com.au</a>
              <br />
              Biller code: 260364
              <br />
              Reference Number: Refer to the BPAY section your bill
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhoWeAre;
