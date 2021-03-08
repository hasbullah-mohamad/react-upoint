import React, { Component } from 'react';
import Slick from 'react-slick';
import { withRouter } from 'react-router-dom';

import Pack from '../../components/Pack/Pack';
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
      <div>
        <h3 className={'section-item section-title font-weight-extra-bold title-underlined-primary text-center'}>Network</h3>
        <div className="section-item text-center">
          At uPoint, we know the importance of always being connected. Our mobile service offering uses a network reaching over 23 Million Australians, providing a combined 4G and 3G coverage footprint of more than 98.8% of the Australian population.
        </div>
        <iframe
          title="Network"
          style={{
            display: 'block',
            minHeight: '860px',
            maxWidth: '770px',
            width: '100%',
            margin: 'auto',
            border: 0
          }}
          src="https://mobilemaps.net.au/maps/mcm/4G.html" />
      </div>
    );
  }
}

export default withRouter(Plans);

