import React, { Component } from 'react';

class ElectricityGas extends Component {
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
            <h1 className={'hero-title'}>Electricity/Gas</h1>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <p className="text-center">An exciting Electricity/Gas product is coming soon. Please check back for more information.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ElectricityGas;
