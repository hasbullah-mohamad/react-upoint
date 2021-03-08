import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

import CONSTANT from '../../config/constant';
import PricingTableNbn from '../../components/PricingTable/PricingTableNbn';
import UrlHelper from '../../helpers/UrlHelper';


class NbnPacks extends Component {
  handleBuyNow() {
    this.props.history.push(UrlHelper.getMainUrl('register'));
  }

  render() {
    const { PRICING_NBN_PACKS: PRICINGS } = CONSTANT;
    const renderPricingTables = PRICINGS.map((item, index) => (
      <div className={'col-sm-12 col-lg-6 px-2'} key={`${index}`}>
        <PricingTableNbn
          {...item}
          onClick={this.handleBuyNow.bind(this)}
        />
      </div>
    ));

    return (
      <div>
        <div className={'d-flex justify-content-between'}>
          <h3 className={'font-weight-extra-bold mb-4'}>Nbn plans</h3>
        </div>
        <div className={'row px-3 px-xl-5 pricing-table-container section-item'}>
          {renderPricingTables}
        </div>
        <div className="text-center">
          <NavLink className="btn btn-info" to={UrlHelper.getMainUrl('nbn/select-plan')}>Check your address</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(NbnPacks);

