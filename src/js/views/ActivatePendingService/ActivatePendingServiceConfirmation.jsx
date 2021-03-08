import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class ActivatePendingServiceConfirmation extends Component {
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
                  <h3 className={'title panel-title title-underlined-light font-weight-extra-bold text-center'}>Thank you for activating your uPoint SIM card.</h3>
                </div>
                <div className={'col-md-6 panel-body bg-light'}>
                  <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>What happens next?</h3>
                  <ul className={'list-numeric'}>
                    <li>
                      Your new service will normally be active within 4 hours, so please allow time for your new number to be activated.&nbsp;
                      Occasionally, delays do happen and can last 7-10 days, this is rare but you can find out more here.
                    </li>
                    <li>
                      Put your new SIM card into your handset, and when the service is active we will send you an SMS to let you know that your new service is ready to use.
                    </li>
                    <li>
                      Once you receive this SMS, you should turn your phone off for a few minutes and turn it back on,&nbsp;
                      this is important as it will enable your handset to pick up the relevant settings which will need to be installed/downloaded to enable things like MMS and Internet to work.
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
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivatePendingServiceConfirmation));
