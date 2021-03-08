import React from 'react';
import { NavLink } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import UrlHelper from '../../helpers/UrlHelper';

const Nbn = () => (
  <div>
    <h1 className={'section-item'}>Frequently asked questions</h1>

    {/* <h3 className={'title-underlined-primary font-weight-extra-bold'}>Popular Topics</h3>
    <div className={'section-item mt-4'}>
      <Collapsible trigger={'What is the signup process?'} transitionTime={100}>
          Simply visit our signup page and follow the prompts. From here you’ll be asked to enter your details and create a uPoint Account. In the future this uPoint will get you immediate access to other services like NBN, Electricity and Gas, Insurance, Fuel and Grocery discounts.
      </Collapsible>
      <Collapsible trigger={'What is this mobile signup process?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              Once you’ve established your uPoint account you can signup for your first service, mobile! uPoint leverages the Telstra 4G network to deliver the exceptional coverage most Australians are us to.
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
    </div> */}

    <h3 className={'title-underlined-primary font-weight-extra-bold'}>Billing</h3>
    <div className={'section-item mt-4'}>
      <Collapsible trigger={'Your first bill may be a little higher than you expect - why you ask?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              uPoint will include a month in advance, plus a pro-rata amount for the remaining portion of the month you signed up
          </li>
          <li>
              For example: If you signed up on the 15th of December, we would charge you a month in advance, plus the difference between the 15th of December and the bill end date (1st of January)
          </li>
          <li>
              If you have questions, always feel free to email <a href="mailto:billing@upoint.com.au">billing@upoint.com.au</a>
          </li>
          <li>
              If for some reason you think there is an issue with your bill, please email ALL billing enquiries to: billing@upoint.com.au
          </li>
          <li>
              Once investigated a Support Team Member will call you back to assist you
          </li>
          <li>
              Your invoices will be sent on the 1st of each month, and payment is typically due 10 - 12 days after your bill is issued
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'Which carrier has uPoint chosen?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              uPoint wanted to provide members and customers with the very best experience and coverage possible, that’s why uPoint uses parts of Telstra’s 4G and 3G network, covering over 23 million Australians
          </li>
          <li>
              Why shouldn’t we just go to Telstra?
          </li>
          <li>
              Great question, and the answer is simple. uPoint offers the same great service and coverage, but at a lower price and profits are being distributed back to the union movement! I don’t think Telstra donates back to the movement…?
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'Understanding my bill.'} transitionTime={100}>
        <p>Your bill will be sent to you electronically, usually on the first of every month. You will receive an SMS notification one day prior. In your bill you will find the due amount for the monthly period, any applicable excess charges, overdue amounts, and a detailed report on every call you made. For more details please click <a href="" target="_blank">here</a></p>
      </Collapsible>
      <Collapsible trigger={'There are charges on my bill which I did not authorise.'} transitionTime={100}>
        <p>UPoint only charges you for the set amount for your Plan. However, certain numbers incur a toll which is not included in your plan, as well as surcharges for certain methods of payment. Please consult the detailed information about your plan for more info.</p>
      </Collapsible>
      <Collapsible trigger={'What happens if I forget to pay my bill?'} transitionTime={100}>
        <p>If you forget to pay your bill by the due date, there is no reason for alarm. We will send you a reminder to pay your bill, and you will have up 7 days to make the payment. If you are experiencing financial hardship, please contact our Team of Representatives on <a href="tel:+611300156556">1300 156 556</a>.</p>
      </Collapsible>
      <Collapsible trigger={'How can I pay my bill?'} transitionTime={100}>
        <p>At UPoint, we offer a range of options for payment to suit every need. You can find more detailed instructions on the front page of your monthly bill.</p>
      </Collapsible>
      <Collapsible trigger={'I need a payment extension. How can I request one?'} transitionTime={100}>
        <p>If you cannot make your payment within the 7 days past the due date, and would like to arrange a payment plan, please contact our Team of Representatives on <a href="tel:+611300156556">1300 156 556</a>.</p>
      </Collapsible>
    </div>

    <h3 className={'title-underlined-primary font-weight-extra-bold'}>Managing my account</h3>
    <div className={'section-item mt-4'}>
      <Collapsible trigger={'How can I access the portal?'} transitionTime={100}>
        <p>Go to <NavLink to={UrlHelper.getMainUrl('login')}>upoint.com.au/login</NavLink> and follow the prompts. You will need the username and password which were provided to you in your welcome letter.</p>
      </Collapsible>
      <Collapsible trigger={'What can I find in the portal?'} transitionTime={100}>
        <p>Your personalised portal will show your number, desired plan, current charges, and your billing cycle. You will also be able to check your previous bills and sign up to other services.</p>
      </Collapsible>
      <Collapsible trigger={'Is there an app for my smartphone?'} transitionTime={100}>
        <p>At present, U Point does not have an app for your phone. However, how Portal is fully integrated for the best mobile experience and you should be able to use it on your phone with the same ease as an app.</p>
      </Collapsible>
      <Collapsible trigger={'How to setup Direct debit?'} transitionTime={100}>
        <p>Upon registration you were required to provide your bank or card details. These will be used automatically to deduct your monthly fee. If you would like to change this information access the Portal and click on Billing.</p>
      </Collapsible>
      <Collapsible trigger={'My credit card details have changed. How do I update them?'} transitionTime={100}>
        <p>If you would like to change any of the financial information you have previously provided, simply access the Portal and click on Billing.</p>
      </Collapsible>
    </div>

    <h3 className={'title-underlined-primary font-weight-extra-bold'}>Troubleshooting</h3>
    <div className={'section-item mt-4'}>
      <Collapsible trigger={'How do I contact uPoint?'} transitionTime={100}>
        <ul className="mb-0 ml-0 pl-3">
          <li>
              While we’re located in the ACTU Head Office, we’d really prefer you email or call us initially
          </li>
          <li>
              Email: <a href="mailto:support@upoint.com.au">support@upoint.com.au</a>
          </li>
          <li>
              Call: <a href="tel:1300156556">1300156556</a>
          </li>
          <li>
              Great question, and the answer is simple. uPoint offers the same great service and coverage, but at a lower price and profits are being distributed back to the union movement! I don’t think Telstra donates back to the movement…?
          </li>
        </ul>
      </Collapsible>
      <Collapsible trigger={'Any other questions?'} transitionTime={100}>
        <p>We’ve tried our best to cover the obvious and most common questions, but if you have something more specific please email <a href="mailto:support@upoint.com.au">support@upoint.com.au</a> and we’ll get back to you asap!</p>
      </Collapsible>
      <Collapsible trigger={'My modem isn’t working.'} transitionTime={100}>
        <p>Several reasons can affect your service. Please ensure your modem is connected correctly. Attempt to restart your modem by disconnecting it from the current for 10 minutes. If the problem persists, please call our Team of Representatives on <a href="tel:+611300156556">1300 156 556</a>.</p>
      </Collapsible>
      <Collapsible trigger={'I have activated my service, but my modem does not connect to the network.'} transitionTime={100}>
        <p>Once the modem is connected, is it necessary to login with your uPoint details. Please refer to the installation guide for detailed information. If the problem persists, please call our Team of Representatives on <a href="tel:+611300156556">1300 156 556</a>.</p>
      </Collapsible>
      <Collapsible trigger={'My payment was late but now my service has not been reinstated.'} transitionTime={100}>
        <p>If your service has been suspended, it may take up to 2 business days for your payment to be processed and the suspension to be lifted. If the problem persists, please call our Team of Representatives on <a href="tel:+611300156556">1300 156 556</a>.</p>
      </Collapsible>
    </div>
  </div>
);

export default Nbn;
