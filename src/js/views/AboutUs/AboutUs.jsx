import React, { Component } from 'react';

class AboutUs extends Component {
  render() {
    return (
      <div className={'page--about-us'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/woman.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>About Us</h1>
            <span className={'hero-description'}> uPoint has been created by the union movement for the union movement.</span>
          </div>
        </div>

        {/* PACK SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <h1 className={'section-title section-item title-responsive'}>You get the savings and choose where the profits go.</h1>
            <div className={'section-item text-center'}>
              With better value, the best services available, and a substantial portion of gross profits going straight back to your union, uPoint means a collective bargain for us all.
            </div>
            <div className={'text-center'}>
              <h3 className={'text-center section-item title-underlined-primary title-responsive font-weight-extra-bold'}>Enablement Partners:</h3>
              <div className={'section-item d-flex justify-content-center flex-wrap'}>
                <div className="mb-4 mx-md-5">
                  <img
                    src={'/img/media/telcoinabox.png'}
                    alt={'Enablement Partners'}
                    style={{
                      width: '286px',
                      height: '80.32px'
                    }}
                  />
                </div>
              </div>
              <h3 className={'text-center section-item title-underlined-primary title-responsive font-weight-extra-bold'}>UPoint Partners:</h3>
              <div className={'section-item d-flex justify-content-center flex-wrap'}>
                <div className="mb-4 mx-md-5">
                  <img
                    src={'/img/media/actu.png'}
                    alt={'Enablement Partners'}
                    style={{
                      width: '250px',
                      height: 'auto'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
