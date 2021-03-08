import React, { Component } from 'react';
import { HashLink as NavLink } from 'react-router-hash-link';
import Collapsible from 'react-collapsible';
import UrlHelper from '../../helpers/UrlHelper';

class Help extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h3 className="font-weight-extra-bold mb-4">Frequently asked questions</h3>
        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">uPoint Energy Info</h4>
          <Collapsible trigger={'Who is uPoint Energy?'} transitionTime={100}>
            uPoint Energy is a union backed energy provider built to give union members the option of affordable energy with all profits going back to unions and the movement. We are 100% Australian owned and operated and fully support creating more local union jobs. We strongly believe in the power of our movement and strength in numbers so the more members that join us, the better price we’ll be able to pass on to our members.
          </Collapsible>
          <Collapsible trigger={'Where do you operate?'} transitionTime={100}>
          We have just launched with electricity for residential customers in Victoria and New South Wales with a view to expand into South Australia and Queensland within the next year.
          </Collapsible>
          <Collapsible trigger={'What do you do with the profits?'} transitionTime={100}>
            All profits made from the sale of electricity go back into your union and the movement.
          </Collapsible>
          <Collapsible trigger={'How do I contact you?'} transitionTime={100}>
            <p>
              For new enquiries, call us on <a href="tel:1300667637">1300 667 637</a> (Monday to Thursday 11am-7pm and Friday 9.30am-5.30pm AEST) or email us at <a href="mailto:sales@upointenergy.com.au">sales@upointenergy.com.au</a>.<br />
              For support related enquires, call <a href="tel:1300365205">1300 365 205</a> (Monday to Friday 8:30am - 6pm AEST) or email us at <a href="mailto:support@upointenergy.com.au">support@upointenergy.com.au</a>. Alternatively, you can write to us at:
            </p>
            <p>
              uPoint Energy, <br />
              132 Cremorne Street, <br />
              Cremorne, <br />
              VIC, 3121
            </p>
          </Collapsible>
          <Collapsible trigger={'How do I join?'} transitionTime={100}>
            <p>Give us a call to get started. We’ll collect some details and, provided you’re eligible, we’ll sign you up on the spot. We’ll then send you a Welcome Pack outlining your offer, rates and Terms and Conditions. You’re entitled to a 10 day cooling off period so, unless you’re moving into a new property, we’ll wait for this to pass before we get the transfer started. When this is complete, we’ll contact your current retailer advising them of the transfer. Your current retailer will then likely try to get in touch. Politely decline (or ignore) their invitation and we’ll have you transferred after your next scheduled meter read. A final read must be based on an actual reading taken by your metering provider so we’re obligated to wait until this is complete.</p>
            <p>Want to move a little faster? Take a look at our “How can I speed up the transfer?” section below.</p>
          </Collapsible>
        </div>

        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">Signing Up</h4>
          <Collapsible trigger={'How can I speed up the transfer?'} transitionTime={100}>
            Depending on when your meter is due to be read next, it may take up to three months to transfer you from your old retailer. If you’re keen to make the switch sooner you can request a special meter read by giving us a call. Bear in mind there may be a distributor fee involved. We’ll be able to tell you this over the phone. If you’re moving into a new property we’ll make sure your local network company connects the power when you need them to.
          </Collapsible>
          <Collapsible trigger={'How will I know when the switch is complete?'} transitionTime={100}>
            Once we have successfully transferred you to uPoint Energy, we’ll notify you in writing of your actual transfer date. You’ll receive a final bill from your previous retailer up to your transfer date.
          </Collapsible>
          <Collapsible trigger={'Do you have any joining fees, exit fees or lock in contracts?'} transitionTime={100}>
            No, no and no. We believe in uPoint Energy and we trust you will too so we will never lock you into a contract or charge you to leave. Your distributor may charge us a fee for special services and these will be passed on to you. See the Distributor Fees section below for a list of fees that may apply in your area.
          </Collapsible>
          <Collapsible trigger={'Will I receive the same concessions as my last retailer?'} transitionTime={100}>
            Yes. Concessions aren’t something that retailers create themselves, they’re defined and governed by federal and local governments and government departments such as Centrelink. Give us a call to check your eligibility or head over to our
            {' '}<NavLink to={UrlHelper.getMainUrl('energy/help#consession-and-rebates')} scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>concessions</NavLink>{' '}
            section on our website for more details.
          </Collapsible>
          <Collapsible trigger={"I'm moving into a new property- how fast can I get connected?"} transitionTime={100}>
            If you’re moving into a new property and need to get connected quickly, we can liaise with your local network company to get it connected for you. Give us a call and we’ll get it connected in less than 3 business days.
          </Collapsible>
          <Collapsible trigger={"Do I need to tell my old retailer that I'm leaving?"} transitionTime={100}>
            No, we handle to whole process.
          </Collapsible>
        </div>

        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">Prices and Billing</h4>
          <Collapsible trigger={'Can you change my tariff?'} transitionTime={100}>
            Yes we can, provided you have given your consent to the change. If you’re better off on a different tariff we can arrange the switch by liaising with your local network company on your behalf. They’ll need to make a change at their end. If there is a fee involved we’ll let you know when you request the change.
          </Collapsible>
          <Collapsible trigger={'How often will I receive my bill?'} transitionTime={100}>
            You’ll receive your bill either quarterly (every 3 months) or monthly, depending on your meter type. If you don’t have a Smart mater installed, your meter is read quarterly so you’ll receive your bill quarterly. If you’d prefer to pay a fixed amount on a monthly basis, take a look at our SmoothPay option. If you do have a Smart meter, we receive this data much more frequently so we’ll send your bills on a monthly basis.
          </Collapsible>
          <Collapsible trigger={'How can I pay my bill?'} transitionTime={100}>
            <p>We have a few payment options, outlined below. We highly recommend direct debit as your primary payment option. Direct debit allows you to set and forget your bill payments and doesn’t come with any associated fees. Give us a call to set this up.</p>
            <p>If you’d prefer to pay via other means we offer the below payment options:</p>
            <p>
              Credit or debit card - 1% fee applies<br />
              BPAY - Biller code: 260364<br />
              Your unique BPAY reference details will be on the bottom of your bill.<br />
            </p>
          </Collapsible>
          <Collapsible trigger={'Can I add a secondary account holder?'} transitionTime={100}>
            Yes. The easiest way is to give us a call or flick us an email with the additional person’s name and date of birth and we’ll get them added to your account.
          </Collapsible>
        </div>

        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">Tariffs and Metering</h4>
          <Collapsible trigger={'How do you determine my tariff?'} transitionTime={100}>
            <p>
              Your tariff is determined by your meter configuration. The core residential tariffs are:<br />
              Single rate- this tariff is also known as a flat rate, anytime or peak only. This is one rate, regardless of the time of day or day of the week that you consume electricity. <br />
              Time of use- this is sometimes referred to as peak and off-peak which is two rates depending on the time of day. <br />
              Flexible pricing- this tariff is comprised of 3 or more rates for different times of the day and days of the week. It will include at least one peak, off-peak and shoulder rate. Flexible tariffs are only available to sites with Smart meters installed.
            </p>
            <p>
              Then there’s ancillary tariffs- if you have underfloor heating or your distributor incorporates a demand component into their tariffs, you might see these on your bill.
            </p>
            <p>
              As you can see it can be a little complex. If you’d like some help understanding all of this or want tariff details specific to your property, give us a call.
            </p>
          </Collapsible>
          <Collapsible trigger={'How do I find my NMI?'} transitionTime={100}>
            Your NMI is you National Metering Identifier and it’s used to record data about your electricity connection point. Your NMI is a 10 or 11 digit number. You can find this on your bill, usually just above the meter read data.
          </Collapsible>
          <Collapsible trigger={'What are the different types of meter?'} transitionTime={100}>
            <p>There are three main types of meters for residential customers. The most common in Victoria is a Smart meter. These meters communicate meter readings directly to your electricity distributors every 30 minutes, virtually ending the requirement for estimated bills. Smart meters enable you to access accurate real-time information about your electricity consumption so you can make an informed decision about when you consume electricity.</p>
            <p>The two other types of meters are Accumulation meters and Interval meters. Accumulation meters are the older style meters with dials or digits that rotate rather than storing the data. These meters only measure the total amount of electricity used so you’ll be charged one rate, regardless of the time of day. These meters are commonly known as flat rate or single rate meters. Interval meters measure the data every 30 minutes meaning you can have different rates depending on the time of day. For this reason, these meters are known as time of use meters. Both Accumulation and Interval meters are read every three months.</p>
          </Collapsible>
        </div>

        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">Solar VICTORIA</h4>
          <Collapsible trigger={'What feed-in tariff will I receive?'} transitionTime={100}>
            In Victoria, we offer the current single rate feed-in tariff of 9.9c per kilowatt hour. We also honour the Premium feed-in tariff of 60c per kilowatt hour. Note the Premium feed-in tariff is no longer open to new applicants.
          </Collapsible>
          <Collapsible trigger={'Do you refund credit balances?'} transitionTime={100}>
            If you have built up a credit balance of $200 or more, give us a call and we can arrange to have this refunded into your bank account.
          </Collapsible>
        </div>

        <div className="mb-5">
          <h4 className="font-weight-extra-bold mb-4">Solar NEW SOUTH WALES</h4>
          <Collapsible trigger={'What feed-in tariff will I receive?'} transitionTime={100}>
            In NSW, we offer the current single rate feed-in tariff of X.Xc per kilowatt hour. We also honour the Premium feed-in tariff of 60c per kilowatt hour. Note the Premium feed-in tariff is no longer open to new applicants.
          </Collapsible>
          <Collapsible trigger={'Do you refund credit balances?'} transitionTime={100}>
            If you have built up a credit balance of $200 or more, give us a call and we can arrange to have this refunded into your bank account.
          </Collapsible>
        </div>
      </div>
    );
  }
}

export default Help;
