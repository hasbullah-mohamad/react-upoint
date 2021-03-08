import React from 'react';
import { NavLink } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import UrlHelper from '../../helpers/UrlHelper';

const General = () => (
  <div>
    <h1 className={'section-item'}>Frequently asked questions</h1>

    <h3 className={'title-underlined-primary font-weight-extra-bold'}>Popular Topics</h3>
    <div className={'section-item mt-4'}>
      <Collapsible trigger={'What is the signup process?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
      </Collapsible>
      <Collapsible trigger={'What is this mobile signup process?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
            Once you’ve established your uPoint account you can signup for your first service, mobile! uPoint leverages a 4G network to deliver the exceptional coverage most Australians are us to.
          </li>
          <li>
              Please be aware that as you’re changing providers you’ll need to be sent out a SIM card - this is whether you’re singing up a NEW number or PORTING a number.
          </li>
          <li>
              uPoint will post the SIM card out to you, with insurrections on how to activate through upoint.com.au, and if at any stage you need to have a chat you can call us on 1300 156 556
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'Can I keep my existing mobile number?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              Of course you can! When proceeding through the sign-up process, just select ‘Port In’ my existing number, and NOT ‘New Number’
          </li>
          <li>
              If you’re wondering how long it takes to cut over your existing number - most take just a few minutes, once your SIM card has been received in the mail, however if there are network issues it can take up to 24-hours.
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'What if my mobile service gets lost or stolen?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              Please contact us immediately by:
          </li>
          <li>
              Email: <a href="mailto:support@upoint.com.au">support@upoint.com.au</a>
          </li>
          <li>
              Phone: <a href="tel+1300156556<">1300 156 556</a>
          </li>
          <li>
              We’ll issue you with a new SIM card immediately and get you back up and running
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'Who is uPoint?'} transitionTime={100}>
          Please visit the <NavLink to={UrlHelper.getMainUrl('about-us')}>About Us</NavLink> page to find out why uPoint is a true revolution, and how we provide value back through to the union movement
      </Collapsible>
      <Collapsible trigger={'I’m having problems with my mobile service?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              Firstly, apologies for this, but fear not we’re here to help.
          </li>
          <li>
              The very first thing we’ll get you to do is to turn your handset off, wait 30-seconds, and then turn the handset back on. Fixed?
          </li>
          <li>
              If not, please email <a href="mailto:support@upoint.com.au">support@upoint.com.au</a> with: Your name, mobile number and the issue you’re experiencing - we’ll get back to you within the hour
          </li>
          <li>
              If your matter is urgent, you can call us on <a href="tel:1300156556">1300 156 556</a> and our team of friendly staff will be able to help
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'What does “zero bill-shock” mean?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              To ensure that all customers only get a bill for the amount they were expecting, we’ve initially turned off:
            <ul className="mb-0 ml-0 pl-3">
              <li>
                  The ability to use more data than has been assigned to your account
              </li>
              <li>
                  Stopped any additional international calls over your capped spend limit
              </li>
              <li>
                  Restricted International Roaming without you first requesting
              </li>
              <li>
                  All summed up - Zero Bill-Shock! You’ll pay what you were expecting to pay
              </li>
            </ul>
          </li>
        </ul>
      </Collapsible>
    </div>

  </div>
);

export default General;
