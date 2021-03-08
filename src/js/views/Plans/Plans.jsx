import React, { Component } from 'react';
import Slick from 'react-slick';
import { withRouter } from 'react-router-dom';

import Pack from '../../components/Pack';
import PricingTableDetail from '../../components/PricingTable/PricingTableDetail';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class Plans extends Component {
  render() {
    const { PRICING_DETAILS } = CONSTANT;
    const renderPricingTables = PRICING_DETAILS.map((item, index) => (
      <div className={'col-sm-12 col-md-6 col-lg-4'} key={`${index}`}>
        <PricingTableDetail
          {...item}
          onClick={() => { this.props.history.push(UrlHelper.getMainUrl('register')); }}
        />
      </div>
    ));

    return (
      <div className={'page--plans'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/plans.jpg")'
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>SIM Only Plans</h1>
            <span className={'hero-description'}>Start enjoying great prices for top services today.</span>
          </div>
        </div>

        <div className={'section section--secondary section--triangle-left'}>
          <div className={'container'}>
            <div>
              <p>
                <b>To ensure that all customers only get a bill for the amount they were expecting, we’ve initially turned off:</b>
              </p>
              <p>
                The ability to use more data than has been assigned to your account<br />
                Stopped any additional international calls over your capped spend limit<br />
                Restricted International Roaming without you first requesting<br />
                All summed up - Zero Bill-Shock! You’ll pay what you were expecting to pay *<br />
                <small> * excludes optional add-ons for additional data, international calls, and other optional add-ons able to be purchased above and beyond your plan limitations </small>
              </p>
            </div>
            <div className={'row pricing-table-container section-item'}>
              {renderPricingTables}
            </div>
          </div>
        </div>

        {/* PACK SECTION */}
        <div className={'section'}>
          <div className={'container'}>
            <h2 className={'text-center section-item title-underlined-primary title-responsive font-weight-extra-bold'}>All plans include:</h2>
            <div className={'section-item'}>
              <Slick
                dots
                slidesToShow={4}
                slidesToScroll={1}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]}
              >
                <div>
                  <Pack
                    className={'pack--primary'}
                    src={'/img/icons/wifi.svg'}
                    alt={'Trusted network'}
                    title={'Trusted network'}
                    description={'Enjoy a great mobile experience on a 4G Network. Our service has extensive breadth and depth of coverage and are supported by a quality network.'}
                  />
                </div>
                <div>
                  <Pack
                    className={'pack--primary'}
                    src={'/img/icons/mobile_transfer.svg'}
                    alt={'Keep your number'}
                    title={'Keep your number'}
                    description={'It’s quick and easy to port an existing number or get a new one.'}
                  />
                </div>
                <div>
                  <Pack
                    className={'pack--primary'}
                    src={'/img/icons/mobile.svg'}
                    alt={'BYO phone'}
                    title={'BYO phone'}
                    description={'BYO phone and get all the benefits of a plan wrapped into a SIM'}
                  />
                </div>
                <div>
                  <Pack
                    className={'pack--primary'}
                    src={'/img/icons/sim1.svg'}
                    alt={'Zero Bill-Shock!'}
                    title={'Zero Bill-Shock!'}
                    description={'You’ll pay what you were expecting to pay.'}
                  />
                </div>
              </Slick>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Plans);
