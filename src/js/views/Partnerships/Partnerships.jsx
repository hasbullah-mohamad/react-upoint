import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';

class Partnerships extends Component {
  render() {
    return (
      <div className={'page--about'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/partnerships.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>Partnerships</h1>
            <span className={'hero-description'}>uPoint is committed to the delivery of excellent services to both consumer and business Union Members and Affiliates.</span>
          </div>
        </div>

        <div className={'section section--secondary'}>
          <div className={'container'}>
            <div className={'section-item'}>
              <img src={'/img/media/bill_chaser_banner.jpg'} alt="bill chaser" className="w-100" />
            </div>
            <div className={'section-item'}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <p><b>Bill Chaser is Australia’s first dedicated Small Business and Tradies overdue invoice and debt collection agency, they’re also one of the very few in Australia who only employ ALL Australian Live Agent collectors.</b></p>
                  <p>Listening to members and affiliates, cashflow is becoming a major issue and Bill Chaser is dedicated to assisting Union Members and Affiliates to collect their overdue invoices and debt - RISK-FREE!</p>
                </div>
                <div className="col-12 col-md-6">
                  <p>That’s right, Bill Chaser is RISK-FREE for Union Members and Affiliates:</p>
                  <ul className="text-primary">
                    <li>
                      <b>The initial upfront free of $50 per debt has been waived to $0!</b>
                    </li>
                    <li>
                      <b>The RISK-FREE collections rate has been dropped from 20% to 18% - but ONLY of money recovered. No money recovered, no fee!</b>
                    </li>
                  </ul>
                  <p>Whether you’re an Affiliate with overdue membership fees, or a Member with a Small Business - Bill Chaser will help you stay on top of overdue invoices and aged debts.</p>
                </div>
              </div>
            </div>
            <div className={'section-item'}>
              <div className={'promo-box'}>
                <div className={'row align-items-center justify-content-between'}>
                  <div className={'col-12 col-lg-8 text-center text-lg-left'}>
                    To receive your Union discount for Bill Chaser, please use promo code:
                    <h3 className={'text-primary font-weight-extra-bold m-0'}>UNIONPOINT</h3>
                  </div>
                  <div className={'col-12 col-lg-4 text-center text-lg-right mt-lg-0 mt-3'}>
                    <a
                      href="https://billchaser.com.au/clients/signup"
                      className={'btn btn-primary btn-sm'}
                      style={{
                        minWidth: '256px'
                      }}>
                      Get started now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Partnerships;
