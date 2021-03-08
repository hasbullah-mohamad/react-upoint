import React, { Component } from 'react';
import Slick from 'react-slick';
import { withRouter, NavLink } from 'react-router-dom';

import Pack from '../../components/Pack/Pack';
import PricingTableDetail from '../../components/PricingTable/PricingTableDetail';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class Plans extends Component {
  render() {
    const { PRICING_DETAILS } = CONSTANT;
    const renderPricingTables = PRICING_DETAILS.map((item, index) => (
      <div className={'col-sm-12 col-md-12 col-lg-4'} key={`${index}`}>
        <PricingTableDetail
          {...item}
          actionTitle={false}
        />
      </div>
    ));

    return (
      <div>
        <div>
          <p>Zero Shock bill means you will never be charged for more than the value of your plan. To assist you:</p>
          <ul className="mb-0 ml-0 pl-3">
            <li>
                You will be notified before you reach your included Data cap.
            </li>
            <li>
                You will be notified before you reach your included International Calls cap.
            </li>
            <li>
                International Roaming is turned off. You may activate it, if you wish.
            </li>
          </ul>
        </div>
        <div className={'row pricing-table-container section-item'}>
          {renderPricingTables}
          <div className="col-12 text-center mt-4">
            <NavLink className="btn btn-primary" to={UrlHelper.getMainUrl('register')}>
              <span className="d-none d-lg-block">Register for uPoint here to order a SIM now</span>
              <span className="d-block d-lg-none">Register for uPoint</span>
            </NavLink>
          </div>
        </div>

        {/* PACK SECTION */}
        <div className="section section--mobile">
          <h2 className={'text-center section-item title-underlined-primary title-responsive font-weight-extra-bold'}>All plans include:</h2>
          <div className={'section-item'}>
            <Slick
              dots
              slidesToShow={4}
              slidesToScroll={1}
              arrows={false}
              responsive={[
                {
                  breakpoint: 1440,
                  settings: {
                    slidesToShow: 3
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2
                  }
                },
                {
                  breakpoint: 998,
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
    );
  }
}

export default withRouter(Plans);

