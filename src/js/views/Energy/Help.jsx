/* eslint-disable global-require */
import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
// import UrlHelper from '../../helpers/UrlHelper';

class Help extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Terms and Conditions</h3>
          </div>

          <div className="panel panel--success">
            <div className="panel-body">
              <p>View the Terms and Conditions for uPoint Energy products and services.</p>
              <Collapsible trigger={<strong>VICTORIA</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold mt-3 mb-3">Victorian Market Terms and Conditions</h4>
                <p>If you have an active account with uPoint Energy in Victoria, these Terms and Conditions apply to you.</p>
                <p><a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/uPoint+Energy+VIC+Market+Terms.pdf">Victorian Market Contract Terms and Conditions</a></p>

                <h4 className="title-underlined-success font-weight-bold mt-4x mb-3">Victorian Standard Terms and Conditions</h4>
                <p>If you are currently receiving bills and communication from uPoint Energy but you are not signed up to a Market contract in Victoria, these Terms and Conditions apply.</p>
                <p><a rel="noopener noreferrer" target="_blank" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Energy+478+Standar+VIC.pdf">Victorian Standard Terms and Conditions</a></p>
              </Collapsible>
              <Collapsible trigger={<strong>NSW</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold mt-3 mb-3">NSW Market Terms and Conditions</h4>
                <p>If you have an active account with uPoint Energy in NSW, these Terms and Conditions apply to you.</p>
                <p>
                  <a target="_blank" rel="noopener noreferrer" href={require('../../../docs/uPoint_Energy_NECF_Market_Terms_FINAL.pdf')}>
                    NSW Market Contract Terms and Conditions
                  </a>
                </p>

                <h4 className="title-underlined-success font-weight-bold mt-4x mb-3">NSW Standard Terms and Conditions</h4>
                <p>If you are currently receiving bills and communication from uPoint Energy but you are not signed up to a Market contract in NSW, these Terms and Conditions apply.</p>
                <p>
                  <a rel="noopener noreferrer" target="_blank" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Energy+478+Standar+VIC.pdf">
                    NSW Standard Terms and Conditions
                  </a>
                </p>
              </Collapsible>
            </div>
          </div>
        </div>

        <div className="mb-5" id="fees">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Fees</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <p>
                At uPoint Energy, we’re all about keeping your energy bills down, therefore we don’t charge exit fees, paper bill fees or administration fees. In some instances, we may pass on fees charged to us by your distributor when you make a special request.<br />
                The most common fees your distributor may charge are outlined below.
              </p>
              <Collapsible className="Collapsible__dropdown" openedClassName="Collapsible__dropdown" trigger={<strong>VICTORIA</strong>} transitionTime={100}>
                <Collapsible trigger={<strong>Jemena</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (At meter, Business Hours)</td>
                        <td>$40.07</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Remote, Business Hours)</td>
                        <td>$10.84</td>
                      </tr>
                      <tr>
                        <td>Disconnection (At meter, Business Hours)</td>
                        <td>$61.84</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Remote, Business Hours)</td>
                        <td>$10.84</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read (At meter, Business Hours)</td>
                        <td>$35.81</td>
                      </tr>
                      <tr>
                        <td>Solar Meter Installation (Normal)</td>
                        <td>$56.66</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          {/* (Disclaimer, small print)<br /> */}
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>Powercor</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (At meter, Business Hours)</td>
                        <td>$58.30</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Remote, Business Hours)</td>
                        <td>$11.44</td>
                      </tr>
                      <tr>
                        <td>Disconnection (At meter, Business Hours)</td>
                        <td>$61.97</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Remote, Business Hours)</td>
                        <td>$11.44</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read (At meter, Business Hours)</td>
                        <td>$51.19</td>
                      </tr>
                      <tr>
                        <td>Solar Meter Installation (Normal)</td>
                        <td>$60.68</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          {/* (Disclaimer, small print)<br /> */}
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>Citipower</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (At meter, Business Hours)</td>
                        <td>$39.51</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Remote, Business Hours)</td>
                        <td>$11.39</td>
                      </tr>
                      <tr>
                        <td>Disconnection (At meter, Business Hours)</td>
                        <td>$40.11</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Remote, Business Hours)</td>
                        <td>$11.39</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read (At meter, Business Hours)</td>
                        <td>$32.49</td>
                      </tr>
                      <tr>
                        <td>Solar Meter Installation (Normal)</td>
                        <td>$60.39</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          {/* (Disclaimer, small print)<br /> */}
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>AusNet Services</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (At meter, Business Hours)</td>
                        <td>$20.86</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Remote, Business Hours)</td>
                        <td>$7.14</td>
                      </tr>
                      <tr>
                        <td>Disconnection (At meter, Business Hours)</td>
                        <td>$20.86</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Remote, Business Hours)</td>
                        <td>$7.14</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read (At meter, Business Hours)</td>
                        <td>$20.86</td>
                      </tr>
                      <tr>
                        <td>Solar Meter Installation (Normal)</td>
                        <td>$378.85</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          {/* (Disclaimer, small print)<br /> */}
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>United Energy</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (At meter, Business Hours)</td>
                        <td>$51.55</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Remote, Business Hours)</td>
                        <td>$11.61</td>
                      </tr>
                      <tr>
                        <td>Disconnection (At meter, Business Hours)</td>
                        <td>$51.55</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Remote, Business Hours)</td>
                        <td>$11.61</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read (At meter, Business Hours)</td>
                        <td>$24.20</td>
                      </tr>
                      <tr>
                        <td>Solar Meter Installation (Normal)</td>
                        <td>$68.73</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          {/* (Disclaimer, small print)<br /> */}
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
              </Collapsible>
              <Collapsible className="Collapsible__dropdown" openedClassName="Collapsible__dropdown" trigger={<strong>NSW</strong>} transitionTime={100}>
                <Collapsible trigger={<strong>Ausgrid</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (Business Hours)</td>
                        <td>$11.96</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Business Hours)</td>
                        <td>$166.02</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read</td>
                        <td>$11.96</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>Endeavour</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (Business Hours)</td>
                        <td>$41.25</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Insert Fuse)</td>
                        <td>$67.87</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Business Hours)</td>
                        <td>$204.27</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read</td>
                        <td>$41.25</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
                <Collapsible trigger={<strong>Essential</strong>} transitionTime={100}>
                  <table className="table table-borderless">
                    <thead>
                      <tr>
                        <th>Charge</th>
                        <th>Rate (inc GST)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Reconnection (Business Hours)</td>
                        <td>$96.06</td>
                      </tr>
                      <tr>
                        <td>Reconnection (Insert Fuse)</td>
                        <td>$109.04</td>
                      </tr>
                      <tr>
                        <td>Disconnection (Business Hours)</td>
                        <td>$109.04</td>
                      </tr>
                      <tr>
                        <td>Special Meter Read</td>
                        <td>$96.06</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-center">
                          <small>*Additional after-hours charges may apply.</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Collapsible>
              </Collapsible>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Customer Hardship Policy </h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Hardship Policy</h4>
              <p>
                uPoint Energy is dedicated to supporting Union members, especially when times are tough. If you’re experiencing payment difficulties, we’ve set up a Hardship Program to help. Hardship can arise from a number of reasons including loss of income or health reasons and can be a short term situation or ongoing.
                Whatever your situation, take a look at our Customer Hardship Policy and give us a call to have a confidential chat about how we can help you to manage your energy usage and bill payments.
              </p>
              <p><a href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/energy-locals-hardship-policy.pdf" rel="noopener noreferrer" target="_blank">Hardship Policy</a></p>
            </div>
          </div>
        </div>

        <div className="mb-5" id="consession-and-rebates">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Concessions and rebates</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <Collapsible trigger={<strong>VICTORIA</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold my-3">Energy Concessions and Grants</h4>
                <p>
                  uPoint Energy offers Union members various concessions and grants to assist with payment of energy bills. You may be eligible for a concession if you hold one of the following;
                </p>
                <ul>
                  <li>Pensioner Concession Card</li>
                  <li>Health Care Card</li>
                  <li>DVA Gold Card</li>
                </ul>
                <p>
                  Take a look at the benefits you may qualify for below.
                </p>

                <h5 className="font-weight-bold">Annual Electricity Concession</h5>
                <p>Eligible members receive 17.5% off their electricity usage and daily supply charges for residential electricity bills from 1 December to 30 November each year.</p>

                <h5 className="font-weight-bold">Controlled Load Electricity Concession</h5>
                <p>Eligible members receive 13% off controlled load costs for residential electricity bills that have separately metered electric hot water or slab heating.</p>

                <h5 className="font-weight-bold">Service to Property Charge Concession</h5>
                <p>Eligible members receive a deduction on the supply charge if the electricity use on a bill is lower than the supply charge.</p>

                <h5 className="font-weight-bold">Transfer Fee Waiver</h5>
                <p>uPoint Energy will waive the cost of the Transfer Fee on a standard electricity connection for eligible members.</p>

                <h5 className="font-weight-bold">Medical Cooling Concession</h5>
                <p>Eligible members receive 17.5% off their electricity usage and daily supply charges for residential electricity bills between 1 November and 30 April each year to cover the cost of cooling their home for medical reasons.</p>

                <p>To be eligible for this concession, electricity account holders must hold a relevant concession card and;</p>
                <ul>
                  <li>have a medical condition that affects their body’s ability to self-regulate temperature or</li>
                  <li>have a household member with such a medical condition.</li>
                </ul>

                <p>Conditions eligible under the concession include (but are not limited to):</p>
                <ul>
                  <li>multiple sclerosis</li>
                  <li>Lymphoedema</li>
                  <li>Parkinson’s disease</li>
                  <li>Fibromyalgia</li>
                  <li>post-polio syndrome/poliomyelitis</li>
                  <li>motor neurone disease.</li>
                </ul>

                <p>Applications for other conditions must be approved by the Department of Health and Human Services. </p>
                <p>All eligible customers must complete the <a href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Medical-Cooling-Concession-application-form+(Generic).pdf" target="_blank" rel="noopener noreferrer">Medical Cooling Concession Application form</a> issued by the Department of Human Services. To apply for this concession please download and fill in the application form and return it to:</p>
                <p className="ml-4x">
                  Department of Human Services, <br />
                  Concessions Unit, <br />
                  GPO Box 4057, <br />
                  Melbourne VIC 3001
                </p>

                <h5 className="font-weight-bold">Life Support Concession</h5>
                <p>Eligible members receive a discount equal to a quarter of their electricity bill. The electricity discount is the cost of 1,880 kilowatt hours (470 kilowatt hours per quarter) of electricity each year, calculated using the general domestic tariff of your retailer.</p>

                <p>To be eligible for this concession, electricity account holders must hold a relevant concession card and;</p>
                <ul>
                  <li>use an eligible life support machine or</li>
                  <li>have a household member who uses an eligible life support machine.</li>
                </ul>

                <p>Approved machines are those that use at least 1,880 kilowatt hours of electricity annually. Machines already approved are:</p>
                <ul>
                  <li>intermittent peritoneal dialysis machines</li>
                  <li>oxygen concentrators</li>
                  <li>haemodialysis machines</li>
                </ul>

                <p>Applications for other machines must be approved by the Department of Health and Human Services. Most continuous positive airways pressure (CPAP) machines do not meet the 1,880 kilowatt hour threshold.</p>
                <p>To apply for this concession, please call us.</p>
                {/* <p className="ml-4x">
                  uPoint Energy<br />
                  132 Cremorne Street<br />
                  Richmond<br />
                  VIC, 3121
                </p> */}

                <h5 className="font-weight-bold">Utility Relief Grant Scheme</h5>
                <p>The Utility Relief Grant Scheme provides help to eligible members to pay an overdue electricity bill due to temporary financial hardship. The amount of the grant is based on the amount you owe at the time of application. It is capped at six months’ worth of utility use up to a maximum of $650 (from 1 July 2018). A grant can only be given once every two years per utility type.</p>
                <p>You must show that you have no way of paying the account without assistance and you must meet one of the five following criteria:</p>
                <ul>
                  <li>you have had a substantial increase in utility use</li>
                  <li>you have had a recent decrease in income, for example, lost your job</li>
                  <li>you have had high unexpected costs for essential items</li>
                  <li>the cost of shelter is more than 30% of your household income</li>
                  <li>the cost of utility use is more than 10% of your household income.</li>
                </ul>
                <p>
                  If you would like to apply for a Utility Relief Grant, give us a call on <a href="tel:1300365205">1300 365 205</a>.
                  For further information on the Utility Relief Grant Scheme, contact the Victorian Government Concessions Information Line on <a href="tel:+1800658521">1800 658 521</a> or visit <a href="https://www.dhhs.vic.gov.au" target="blank">www.dhhs.vic.gov.au</a>.
                </p>
              </Collapsible>
              <Collapsible trigger={<strong>NSW</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold my-3">Family Energy Rebate</h4>
                <p>
                  The Family Energy Rebate helps NSW family households with dependent children cover the costs of their energy bills. Members must be NSW residents and must have received the Family Tax Benefit from the Commonwealth Department of Human Services for the previous financial year. Eligible members will receive $180 (ex GST) per year. If you receive the Low Income Household Rebate, the Family Energy Rebate is capped at $20 (ex. GST).
                </p>
                <p>
                  To apply for this rebate, complete the form below and post to us or jump onto the Service NSW website and complete your application online at
                  {' '}
                  <a href="https://www.service.nsw.gov.au/transaction/apply-family-energy-rebate-retail-customers" target="blank">www.service.nsw.gov.au/transaction/apply-family-energy-rebate-retail-customers</a>.
                  <br />
                  <a href={require('../../../docs/Family_energy_rebate.pdf')} target="blank">Family Energy Rebate Application Form</a>
                </p>
                <h5 className="font-weight-bold">Low Income Household Rebate</h5>
                <p>The Low Income Household Rebate helps eligible low income NSW households cover the cost of their energy bills. Eligible members will receive $285 (ex GST) once per financial year. To apply for this rebate, give us a call and have your concession card or healthcare card details handy.</p>
                <p>
                  For more information or to check if you’re eligible, visit
                  {' '}
                  <a href="https://www.service.nsw.gov.au/transaction/apply-low-income-household-rebate-retail-customers" target="blank">www.service.nsw.gov.au/transaction/apply-low-income-household-rebate-retail-customers</a>
                </p>
                <h5 className="font-weight-bold">Life Support Rebate</h5>
                <p>The Life Support Rebate helps members pay their electricity bills where they are required or have someone living with them who is required to use approved Life Support equipment at home. The rebate amount varies depending on the type of equipment used.</p>
                <p>
                  For more information or to check if you’re eligible, visit
                  {' '}
                  <a href="https://www.service.nsw.gov.au/transaction/apply-life-support-energy-rebate-retail-customers" target="blank">www.service.nsw.gov.au/transaction/apply-life-support-energy-rebate-retail-customers</a>
                </p>
                <p>
                  To apply for this rebate, print the below form and ask your medical practitioner (GP or specialist) to complete the relevant section and sign the declaration then return to us.
                  {' '}
                  <a href={require('../../../docs/Life_support_rebate.pdf')} target="blank">Life Support Rebate Application Form</a>
                </p>
                <h5 className="font-weight-bold">Medical Energy Rebate</h5>
                <p>The Medical Energy rebate is for NSW customers who have an inability to self-regulate body temperature when exposed to extreme hot or cold environmental temperatures. To be eligible for the rebate, you’ll need to have a diagnosis that you’re unable to self-regulate your body temperature. Eligible members will receive a rebate of up to $285 per year. This will appear as a credit on each quarterly energy bill of approximately $71. The amount is calculated daily from the day you apply.</p>
                <p>
                  For more information and to check if you’re eligible, visit
                  {' '}
                  <a href="https://www.service.nsw.gov.au/transaction/apply-medical-energy-rebate-retail-customers" target="blank">www.service.nsw.gov.au/transaction/apply-medical-energy-rebate-retail-customers</a>
                </p>
                <p>
                  To apply for this rebate, print the below form and ask your medical practitioner (GP or specialist) to complete the relevant section and sign the declaration then return to us.
                  {' '}
                  <a href={require('../../../docs/Medical_energy_rebate.pdf')}>Medical Energy Rebate Application Form</a>
                </p>
                <h5 className="font-weight-bold">Energy Accounts Payment Assistance (EAPA)</h5>
                <p>The Energy Accounts Payment Assistance (EAPA) Scheme helps people experiencing a short-term financial crisis or emergency to pay their electricity or natural gas bill. This scheme is only for short term assistance. Eligible members will receive a voucher to the value of $50. These vouchers are distributed to energy consumers by various welfare organisations to assist with paying for energy consumption. EAPA providers include: St Vincent de Paul Society, Salvation Army, Anglicare, Lifeline, Mission Australia, Local Land Councils. To apply for this rebate, give us a call and mention the EAPA Scheme.</p>
                <p>
                  For more information or for a full list of EAPA providers, visit
                  {' '}
                  <a href="https://)www.service.nsw.gov.au/transaction/energy-accounts-payment-assistance-eapa-scheme" target="blank">www.service.nsw.gov.au/transaction/energy-accounts-payment-assistance-eapa-scheme</a>
                </p>
                <p>All forms should be completed in full and returned to:</p>
                <p className="ml-4x">
                  uPoint Energy,<br />
                  132 Cremorne Street,<br />
                  Cremorne,<br />
                  VIC, 3121
                </p>
              </Collapsible>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Complaints and disputes resolution procedure</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Complaints procedure</h4>
              <p>At uPoint Energy we take pride in ensuring our members receive impeccable service. If you feel we haven’t met this standard or would like to provide feedback, please get in touch. We’ll work with you to resolve any concerns you might have in line with our Dispute Resolution Policy. If you would like to view a copy of this policy, you can do so <a target="_blank" rel="noopener noreferrer" href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/energy-locals-complaint-procedure.pdf">here</a>. We’ll aim to resolve your complaint as soon as possible, but within 15 business days.</p>
              <p>To get in touch, you can write to us at uPoint Energy, 132 Cremorne Street, Cremorne, VIC 3121 or by email at <a href="mailto:support@upointenergy.com.au">support@upointenergy.com.au</a> or phone <a href="tel:1300365205">1300 365 205</a> to speak to one of our uPoint Energy representatives.</p>
              <p>If after escalating the matter in line with uPoint Energys complaint handling process, you feel your complaint remains unresolved, you can contact your State Energy Ombudsman. This is available to you as a last resort only where uPoint Energy is unable to resolve the matter.</p>
              <p className="ml-4x">
                Energy and Water Ombudsman Victoria <br />
                Freecall: <a href="tel:+1800500509">1800 500 509</a> <br />
                Freefax: <a href="fax:1800500549">1800 500 549</a> <br />
                Interpreter:131 450 <br />
                NRS: 133 677 <br />
                Email: <a href="mailto:ewovinfo@ewov.com.au">ewovinfo@ewov.com.au</a> <br />
              </p>
              <p className="ml-4x">
                Energy and Water Ombudsman NSW <br />
                Reply Paid 86550, Sydney South NSW 1234<br />
                Freecall: <a href="tel:+1800246545">1800 246 545</a> <br />
                Email: <a href="mailto:complaints@ewon.com.au">complaints@ewon.com.au</a>
              </p>
              <p>*Before you contact the Energy and Water Ombudsman in your state, you must first log your complaint with your retailer.</p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">No contact list</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Do Not Contact</h4>
              <p>If you would prefer not to be contacted by uPoint Energy regarding sales and marketing, give us a call on 1300 365 205 or email support@upointenergy.com.au and we will add you to our Do Not Contact list. Note that this will not remove you from any other contact lists held by the Union and it’s affiliates.</p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Faults and Emergencies</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <Collapsible trigger={<strong>VICTORIA</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold mb-3">Faults and Emergencies</h4>
                <p>
                  If there is an immediate risk to life or property, dial 000. <br />
                  If you’re experiencing an outage or any type of electrical emergency that is not life threatening, your distributor is the best office to contact.
                </p>

                <p>Contact details for your distributor can be found below. If you’re not sure who your distributor is you can find this on your uPoint Energy electricity bill.</p>
                <div className="ml-4x">
                  <p>
                    Ausnet Services <br />
                    131799 <br />
                    <a href="https://www.ausnetservices.com.au" target="blank">www.ausnetservices.com.au</a>
                  </p>

                  <p>
                    Citipower<br />
                    131280 <br />
                    <a href="https://www.citipower.com.au/home" target="blank">www.citipower.com.au/home</a>
                  </p>

                  <p>
                    Jemena<br />
                    131626 <br />
                    <a href="https://www.jemena.com.au" target="blank">www.jemena.com.au</a>
                  </p>

                  <p>
                    Powercor<br />
                    132412<br />
                    <a href="https://www.powercor.com.au" target="blank">www.powercor.com.au</a>
                  </p>

                  <p>
                    United Energy<br />
                    132 099 <br />
                    <a href="https://www.unitedenergy.com.au" target="blank">www.unitedenergy.com.au</a>
                  </p>
                </div>
              </Collapsible>
              <Collapsible trigger={<strong>NSW</strong>} transitionTime={100}>
                <h4 className="title-underlined-success font-weight-bold mb-3">Faults and Emergencies</h4>
                <p>
                  If there is an immediate risk to life or property, dial 000. <br />
                  If you’re experiencing an outage or any type of electrical emergency that is not life threatening, your distributor is the best office to contact.
                </p>

                <p>Contact details for your distributor can be found below. If you’re not sure who your distributor is you can find this on your uPoint Energy electricity bill.</p>
                <div className="ml-4x">
                  <p>
                    Ausgrid <br />
                    131388 <br />
                    <a href="https://www.ausgrid.com.au" target="blank">www.ausgrid.com.au</a>
                  </p>

                  <p>
                    Endeavour Energy<br />
                    131003 <br />
                    <a href="https://www.endeavourenergy.com.au" target="blank">www.endeavourenergy.com.au</a>
                  </p>

                  <p>
                    Essential Energy<br />
                    132080 <br />
                    <a href="https://www.essentialenergy.com.au" target="blank">www.essentialenergy.com.au</a>
                  </p>
                </div>
              </Collapsible>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Privacy Policy</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Privacy Policy</h4>
              <p>To view the Privacy Policy governing uPoint Energy’s privacy procedures in accordance with Privacy Act 1988, Credit Reporting Privacy Code and any applicable privacy laws and regulation, click <a href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Privacy%2BPolicy%2BDec%2B17.pdf" target="_blank" rel="noopener noreferrer">here</a></p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Credit Reporting</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Credit Management Policy</h4>
              <p>To understand more about how uPoint Energy manages your credit related personal information including entities we may disclose your credit information to, view our Credit Management Policy <a href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Energy_Locals_Credit_Management_Policy_v.01.pdf">here</a></p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">Terms of Use</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <h4 className="title-underlined-success font-weight-bold mb-3">Terms of Use</h4>
              <p>By using the uPoint Energy website, you agree to the website Terms of Use. To view the Terms of Use applicable to the uPoint Energy website, click <a href="https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/documents/Terms+and+Conditions+of+Website+Use.pdf" target="_blank" rel="noopener noreferrer">  here</a></p>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <div className="d-md-flex justify-content-between">
            <h3 className="font-weight-extra-bold mb-3">SmoothPay</h3>
          </div>
          <div className="panel panel--success">
            <div className="panel-body">
              <p>We offer a bill smoothing service (SmoothPay) to eligible members in Victoria where the meter is due to be read only quarterly. Under bill smoothing plans, monthly instalments are due at the start of each month of energy usage. This will mean you pay the same amount each month, and the amount will be based on your average expected monthly spend. Contact us for full details or to register for this service.</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Help;
