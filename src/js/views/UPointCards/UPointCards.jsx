import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class UPointCard extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className={'page--about'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/upoint_cards.jpg")'
          }}
        >
          <div className={'container'}>
            <span className="btn btn-primary btn-sm">Coming Soon</span>
            <h1 className={'hero-title'}>uPoint Cards</h1>
            <span className={'hero-description'}>Where your shopping benefits every member.</span>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <p className="text-center"><b>Union members know that when we work together, we get a better deal.</b></p>
            <p className="text-center">That principle doesn’t just apply to our working conditions and pay, it also means we can use our collective power to get you discounts on your shopping and services as well as cash-back to your union or nominated charity <b>or super fund</b>. All for the greater benefit of members!</p>
          </div>
        </div>

        {/* GIVING BACK SECTION */}
        <div className={'section section--secondary'}>
          <div className={'container'}>
            <div className="section-item">
              <div className="row">
                <div className="col-12 col-md-5 font-size-base">
                  <h3 className={'section-item font-weight-extra-bold title-underlined-primary'}>Giving Back</h3>
                  <p>We’ve partnered with Me bank to offer you an easy way to cash in on everyday purchases by using an exclusive uPoint Credit/Debit Card.</p>
                  <p>You can save and earn cash-back for your union or nominated charity every time you use your card! You’ll be helping to make the world a better place every time you shop at some of the most well-known and loved brands, from professional services to department stores, supermarkets, petrol stations, travel partners and more.</p>
                  <p>What it means is that you’re helping the movement every time you make a purchase. All you have to do is put in your application and you’re good to go - it’s that simple.</p>
                </div>
                <div className="col-md-1" />
                <div className="col-12 col-md-6 pt-md-5">
                  <img src="/img/media/upoint_card.png" className="w-100" alt="upoint card" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UPointCard;
