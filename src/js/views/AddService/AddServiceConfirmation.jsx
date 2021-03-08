import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setGlobalAddService } from '../../actions/global';

class AddServiceConfirmation extends Component {
  render() {
    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'panel panel--primary'}>
              <div className={'d-flex flex-column flex-md-row bg-primary'}>
                <div className={'col-md-6 panel-heading'}>
                  <p className={'icon-105 text-center'}>
                    <img src={'/img/icons/customer_new.svg'} alt={'Thank you'} />
                  </p>
                  <h3 className={'title panel-title title-underlined-light font-weight-extra-bold text-center'}>Thank you for ordering a service through uPoint.</h3>
                </div>
                <div className={'col-md-6 panel-body bg-light'}>
                  <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>What happens next?</h3>
                  <ul className={'list-numeric'}>
                    <li>
                      Your new SIM will arrive to your nominated delivery address over the next few days. Occasionally, delays do happen and can last 7-10 days, this is rare but you can find out more here.
                    </li>
                    <li>
                      To start making and receiving calls or using data, you must activate your new uPoint SIM. You can activate your SIM by logging in to the Portal.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.addSerivce
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalAddService: order => dispatch(setGlobalAddService(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddServiceConfirmation));
