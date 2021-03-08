import React, { Component } from 'react';
// import { NavLink } from 'react-router-dom';
// import UrlHelper from '../../helpers/UrlHelper';

class Documentation extends Component {
  render() {
    return (
      <div className={'page page--generic'}>

        {/* HERO SECTION */}
        <div className={'section section--hero bg-info'}>
          <div className={'container'}>
            <h1 className={'hero-title'}>Documentation</h1>
          </div>
        </div>

        <div className={'section section--secondary'}>
          <div className={'container'}>
            <div className={'section-item'}>
              <p>
                {/* <NavLink to={UrlHelper.getAbsoluteUrl('coming-soon')}>Terms of Use</NavLink> <br /> */}
                <a href={'/docs/UPoint_International_Call_Rates_May_2018.pdf'} target={'_blank'}>International Call Rates</a> <br />
                <a href={'/docs/UPoint_Invoice_Explainer.pdf'} target={'_blank'}>Invoice Explainer</a> <br />
                <a href={'/docs/Upoint_Product_Sheet_Mobile_May 2018.pdf'} target={'_blank'}>Mobile Product Sheet</a> <br />
                <a href={'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/WL_NBN_Speeds.pdf'} target={'_blank'}>NBN Broadband Speed Tiers</a> <br />
                <a href={'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/WL_NBN_Product+Sheet.pdf'} target={'_blank'}>NBN Product Sheet</a> <br />
                <a href={'https://s3-ap-southeast-2.amazonaws.com/upoint-api-prod/cis/WL_NBN_CIS_NEW_Speed_Guidelines.pdf'} target={'_blank'}>NBN Critical Information Summary</a> <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Documentation;
