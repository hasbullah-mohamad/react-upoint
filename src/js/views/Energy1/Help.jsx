import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Collapsible from 'react-collapsible';

class Help extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h3 className="font-weight-extra-bold mb-4">Frequently asked questions</h3>
        <Collapsible trigger={'How do I keep my existing number?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
        </Collapsible>
        <Collapsible trigger={'How do I buy a new SIM?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
        </Collapsible>
        <Collapsible trigger={'How do I keep my existing number?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
        </Collapsible>
        <Collapsible trigger={'How do I buy a new SIM?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
        </Collapsible>

        <h3 className="font-weight-extra-bold mt-5 mb-3">Forms</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="title-underlined-success font-weight-bold">Concession</h4>
              <div>
                <button className="btn btn-success btn-sm">Download Form</button>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod euismod lectus, sit amet mollis enim ornare in. Nulla nec imperdiet sapien, eu tempor nisi. Mauris dignissim aliquam quam, ut fringilla leo faucibus vel. Dolor sit amet, consectetur adipiscing elit. 
            </div>
          </div>
        </div>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="d-flex justify-content-between mb-3">
              <h4 className="title-underlined-success font-weight-bold">Life support</h4>
              <div>
                <button className="btn btn-success btn-sm">Download Form</button>
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod euismod lectus, sit amet mollis enim ornare in. Nulla nec imperdiet sapien, eu tempor nisi. Mauris dignissim aliquam quam, ut fringilla leo faucibus vel. Dolor sit amet, consectetur adipiscing elit. 
            </div>
          </div>
        </div>

        <h3 className="font-weight-extra-bold mt-5 mb-3">Payment assistance</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <h4 className="title-underlined-success font-weight-bold mb-4">Having payment difficulties? Call us on 1300 XXX XXX.</h4>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod euismod lectus, sit amet mollis enim ornare in. Nulla nec imperdiet sapien, eu tempor nisi. Mauris dignissim aliquam quam, ut fringilla leo faucibus vel. Dolor sit amet, consectetur adipiscing elit. 
            </div>
          </div>
        </div>

        <h3 className="font-weight-extra-bold mt-5 mb-3">Concession &amp; rebates</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-9">
                The Australian State Governments offer a variety of concessions and rebates to assist with payment of energy bills.
              </div>
              <div className="mt-3 mt-lg-0 col-lg-3 text-right">
                <button className="btn btn-success btn-sm">View rebates</button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-weight-extra-bold mt-5 mb-3">Emergencies and outages</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-9">
                <p>To report a fault or emergency at your property that relates to your poles, wires or meters, please contact your local distributor. The number can be found on your electricity bill. You can also contact us if required.</p>
                <strong>If there is an extreme risk, please call 000 immediately.</strong>
              </div>
              <div className="mt-3 mt-lg-0 col-lg-3 text-right">
                <button className="btn btn-success btn-sm">Contact us</button>
              </div>
            </div>
          </div>
        </div>

        <h3 className="font-weight-extra-bold mt-5 mb-3">Complaints</h3>
        <div className="panel panel--success">
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam euismod euismod lectus, sit amet mollis enim ornare in. Nulla nec imperdiet sapien, eu tempor nisi. Mauris dignissim aliquam quam, ut fringilla leo faucibus vel. Dolor sit amet, consectetur adipiscing elit.
              </div>
              <div className="mt-3 mt-lg-0 col-lg-3 text-right">
                <button className="btn btn-success btn-sm">Support contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Help;
