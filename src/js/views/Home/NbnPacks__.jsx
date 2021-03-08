import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class Electricity extends Component {
  render() {
    return (
      <div className={'row mt-5 pt-4'}>
        <div className={'col-lg-5 text-center'}>
          <img className={'mb-4'} src={'img/media/oval_member_discounts.png'} style={{ width: '232px', height: '232px' }} alt={'oval'} />
        </div>
        <div className={'col-lg-7'}>
          <h2 className={'text-info mb-4'}>An exciting Nbn plans product is coming soon!</h2>
          <p className={'text-info'}>Please check back for more information, or enter your email address below to receive updates.</p>
          <p className={'text-primary mb-1'}>Email address</p>
          <input className={'form-control mb-4'} type={'email'} />
          <NavLink className={'btn btn-primary'} to={'#'}>Register your insert</NavLink>
        </div>
      </div>
    );
  }
}

export default withRouter(Electricity);

