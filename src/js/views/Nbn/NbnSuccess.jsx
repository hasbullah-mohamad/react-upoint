import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class NbnSuccess extends Component {
  render() {
    const orderNumber = this.props.orderNumber;
    const accountNumber = this.props.user.number;

    return (
      <div className={'page page--nbn page--panel'}>
        {/* HERO SECTION */}
        <div className={'section'}>
          <div className={'container pt-md-5'}>
            <div className={'panel panel--primary mt-md-5'}>
              <div className={'d-flex flex-column flex-md-row bg-primary'}>
                <div className={'col-md-6 panel-heading'}>
                  <p className={'icon-105 text-center'}>
                    <img src={'/img/icons/service_new.svg'} alt={'Thank you'} />
                  </p>
                  <h3 className={'title panel-title title-underlined-light font-weight-extra-bold text-center'}>Thank you for ordering your NBN service.</h3>
                  <div className={'mb-4'}>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'h4 font-weight-normal'}>Order Id</div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'h4 font-weight-extra-bold'}>{ orderNumber }</div>
                      </div>
                    </div>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'h4 font-weight-normal'}>Account number</div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'h4 font-weight-extra-bold'}>{ accountNumber }</div>
                      </div>
                    </div>
                  </div>
                  <p>
                    <b>
                      You should also take a note of your account number and password information which is shown here, you'll need this to log into your uPoint account.
                    </b>
                  </p>
                  <p>
                    You should also take a note of your account number and password information which is shown here, you'll need this to log into your uPoint account.
                  </p>
                </div>
                <div className={'col-md-6 panel-body bg-light'}>
                  <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>What happens next?</h3>
                  <ul className={'list-numeric'}>
                    <li>
                      Your request has been lodged with NBN Australia and will soon be processed.
                    </li>
                    <li>
                      Once NBN accepts the request, we will dispatch a modem to your service address. We will let you know via email once this occurs. This process usually takes 5-10 days.
                    </li>
                    <li>
                      Once you have received your modem, you can connect it following the installation guide.
                    </li>
                    <li>
                      Use your uPoint details to login and you will be connected to the uPoint Internet service.
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
  data: state.global.nbnOrder,
  orderNumber: state.nbn.nbnOrderNumber,
  user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NbnSuccess));

