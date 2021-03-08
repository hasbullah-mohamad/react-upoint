import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { Modal, ModalBody } from 'reactstrap';

import { setGlobalAddService } from '../../actions/global';
import Step from '../../components/Step';
import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import UrlHelper from '../../helpers/UrlHelper';

class AddServiceStepConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agree_terms: false,
      modal: false
    };
  }

  changeValue(field, value) {
    this.props.setGlobalAddService({
      ...this.props.data,
      [field]: value
    });
  }

  handleToggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(field, event) {
    this.changeValue(field, event.target.value);
  }

  handleChangeValue(field, value) {
    this.changeValue(field, value);
  }

  handleSelectPackType(value) {
    this.changeValue('pack_type', value);
  }

  handleGotoStepInformation() {
    this.props.history.push(UrlHelper.getMainUrl('add-service/information'));
  }
  handleGotoStepAddress() {
    this.props.history.push(UrlHelper.getMainUrl('add-service/information'));
  }
  handleSubmit() {
    this.props.history.push(UrlHelper.getMainUrl('add-service/billing'));
  }
  renderModal() {
    return (
      <Modal
        className={'modal-lg modal--primary'}
        isOpen={this.state.modal}
        toggle={this.handleToggleModal.bind(this)}>
        <div className={'modal-header'}>
          <h3 className={'text-center title-underlined-primary font-weight-extra-bold'}>Terms of activation</h3>
        </div>
        <ModalBody>
          <p>
            This is a summary of the Terms and Conditions on which UPOINT Australia Pty Limited (ABN 58 106 611 330)&nbsp;
            NO supply the UPOINT mobile service for the prepaid service branded uPoint to you and is not intended to&nbsp;
            replace our full Terms and Conditions which are available on our website or by calling us on 2534 (uPoint) from your uPoint.&nbsp;
          </p>
          <p>
            We supply the service to you.
            By activating your SIM card, you are agreeing to the Terms and Conditions outlined in the full version on our website,&nbsp;
            you are also agreeing to abide by the Acceptable Use Policy which applies to all uPoint mobile plans and services.&nbsp;
            To activate your SIM card you will need to provide valid identification this is a requirement by law. You will need to provide:&nbsp;
            Your name, address, date of birth and your driver&apos;s license, Medicare card or passport number.&nbsp;
            The service must not be used for any illegal or anti-social purposes, including obscene, abusive, fraudulent,&nbsp;
            threatening or otherwise unacceptable messages or usage.
          </p>
          <p><strong className={'font-weight-extra-bold'}>Your number</strong></p>
          You can request to receive a new number, or you can choose to bring your own number to uPoint (transfer or port your number to uPoint).&nbsp;
          By selecting to transfer a number to uPoint, you:
          <ul>
            <li>
              confirm that you are the account holder of the service selected to be transferred (port.) to uPoint,&nbsp;
              or are an Authorised Representative of the account holder
            </li>
            <li>
              acknowledge that there may be costs and obligations (such as early termination fees and port-out fees)&nbsp;
              associated with the port that may result in the finalisation of your current account with the losing service provider
            </li>
            <li>
              understand that by porting the telephone number to uPoint mobile, the service associat.
              with that number will be disconnected from your current service provider, and may result in the finalisation of your account for the service
            </li>
            <li>certify that all information provided during the activation process is true, correct and complete</li>
            <li>
              are responsible for any fees that may apply as a result of a failed or delayed transfer due to incorrect or incomplete&nbsp;
              information provided during the activation process.
            </li>
          </ul>
          <p><strong className={'font-weight-extra-bold'}>The service and network coverage</strong></p>
          <p>
            We do not guarantee that the service is not available in all areas of Australia.&nbsp;
            Before purchasing or activating your SIM card, you should review coverage maps showing where the service is available in Australia by clicking here.&nbsp;
            You are responsible for enquiring as to whether coverage is available in the area in which you would normally use the service.&nbsp;
            We will always aim to provide the best and most reliable service possible, but cannot be responsible for any loss of service, regardless of the party at fault.
          </p>
          <p><strong className={'font-weight-extra-bold'}>Your plan and balance</strong></p>
          <p>
            You should check the full details of the plan you select so that you are informed about the credit, inclusions and expiry period of your plan.&nbsp;
            Full details can be found on our website at uPoint.com.au. Once your plan or credit has expired, we will hold your number for you for up to 90 days.&nbsp;
            If you do not recharge within this time, your number may be allocated to someone else in line with ACMA&apos;s numbering regulations.&nbsp;
            You may transfer your existing mobile phone number to uPoint if you have one, or you can receive a new mobile phone number.&nbsp;
            If your cr.it is zero, you can receive calls and SMS&apos;s, however you will be unable to use any services that incur further charges.&nbsp;
            You will not be able to access your voicemail or make any calls, except to 2534 (uPoint) or SMS 590 to recharge your account and calls to emerge, services.
          </p>
          <p><strong className={'font-weight-extra-bold'}>Your mobile phone</strong></p>
          <p>
            Your device must be compatible with UNITS 850 to take full advantage of part of Telstra&apos;s 3G mobile network and data speeds.
          </p>
        </ModalBody>
        <div className={'modal-footer text-center'}>
          <button className={'btn btn-primary'} onClick={this.handleToggleModal.bind(this)}>I Understand</button>
        </div>
      </Modal>
    );
  }

  render() {
    const { data } = this.props;
    const pricingData = ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', data.pack_type);

    return (
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <Step steps={['Order information', 'Select plan', 'Confirm & Pay']} index={2} />
            {this.renderModal()}
            <div className={'row'}>
              <div className={'col-md-6'}>
                <div className={'panel panel--primary'}>

                  {/* YOUR INFORMATION */}
                  <div className={'panel-stack'}>
                    <div className={'row'}>
                      <div className={'col-xs-12 col-sm-12 text-right'}>
                        <button
                          className={'btn btn-sm btn-outline-primary'}
                          onClick={this.handleGotoStepInformation.bind(this)}>
                          Edit
                        </button>
                        <h3 className={'panel-title title-underlined-primary float-left'}>Your information</h3>
                      </div>
                    </div>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group text-primary'}><strong>Name</strong></div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group'}><strong>{data.user_title} {data.user_firstname} {data.user_lastname}</strong></div>
                      </div>
                    </div>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group text-primary'}><strong>Phone</strong></div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group'}><strong>{data.user_contact_number}</strong></div>
                      </div>
                    </div>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group text-primary'}><strong>Email</strong></div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group'}><strong>{data.user_email}</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* YOUR ADDRESS */}
                  <div className={'panel-stack'}>
                    <div className={'row'}>
                      <div className={'col-xs-12 col-sm-12 text-right'}>
                        <button
                          className={'btn btn-sm btn-outline-primary'}
                          onClick={this.handleGotoStepAddress.bind(this)}>
                          Edit
                        </button>
                        <h3 className={'panel-title title-underlined-primary float-left'}>Address</h3>
                      </div>
                    </div>
                    <div className={'row'}>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group text-primary'}><strong>Address</strong></div>
                      </div>
                      <div className={'col-xs-6 col-sm-6'}>
                        <div className={'form-group'}><strong>{data.user_street_number}, {data.user_street}, {data.user_city}, {data.user_state}, {data.user_postcode}</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* AGREE */}
                  <div className={'panel-stack d-none d-md-block'}>
                    <div className={'form-group'}>
                      <span className={'switch'}>
                        <input
                          type={'checkbox'}
                          id={'switch_agree_terms'}
                          checked={this.state.agree_terms}
                          onChange={(event) => {
                            this.setState({
                              agree_terms: event.target.checked
                            });
                          }}
                        />
                        <label htmlFor={'switch_agree_terms'}>
                          <span className={'text-muted text-center'}>
                            I have read and agree to the&nbsp;
                            <NavLink to={'#'} onClick={this.handleToggleModal.bind(this)}>Terms and Conditions.</NavLink>
                          </span>
                        </label>
                      </span>
                    </div>
                    <div className={'form-group'}>
                      <button
                        className={'btn btn-primary form-control'}
                        onClick={this.handleSubmit.bind(this)}
                        disabled={!this.state.agree_terms}>
                        Submit Order
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              <div className={'col-md-6'}>
                <div className={'panel panel--primary'}>
                  <div className={'panel-body'}>
                    <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Order summary</h3>
                    <div className={'d-flex justify-content-between align-items-center'}>
                      <div className={'form-group text-primary'}>
                        <strong>SIM Card</strong>
                      </div>
                      <div className={'form-group'}>
                        <strong>Free</strong>
                      </div>
                    </div>
                    <div className={'d-flex justify-content-between align-items-center'}>
                      <div className={'form-group text-primary'}>
                        <strong>Shipping</strong>
                      </div>
                      <div className={'form-group'}>
                        <strong>$5.00</strong>
                      </div>
                    </div>
                  </div>
                  <div className={'panel-footer'}>
                  <div className={'d-flex justify-content-between align-items-center'}>
                      <div><strong>Total up front</strong></div>
                      <div className={'text-right'}><strong>$5.00</strong></div>
                    </div>
                    <div className={'d-flex justify-content-between align-items-center'}>
                      <div><strong>Total on-going</strong></div>
                      <div className={'text-right'}><strong>${pricingData ? pricingData.price : '0.00'} per month</strong></div>
                    </div>
                  </div>
                  <div className={'panel-stack d-block d-md-none'}>
                    <div className={'form-group'}>
                      <span className={'switch'}>
                        <input
                          type={'checkbox'}
                          id={'switch_agree_terms_sm'}
                          checked={this.state.read_terms}
                          onChange={(event) => {
                            this.setState({
                              read_terms: event.target.checked
                            });
                          }}
                        />
                        <label htmlFor={'switch_agree_terms_sm'}>
                          <span className={'text-muted text-center'}>
                            I have read and agree to the&nbsp;
                            <NavLink to={'#'} onClick={this.handleToggleModal.bind(this)}>Terms and Conditions</NavLink>.
                          </span>
                        </label>
                      </span>
                    </div>
                    <div className={'form-group'}>
                      <button
                        className={'btn btn-primary form-control'}
                        onClick={this.handleSubmit.bind(this)}
                        disabled={!this.state.agree_terms}>
                        Submit Order
                      </button>
                    </div>
                  </div>
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
  data: state.global.addService
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalAddService: order => dispatch(setGlobalAddService(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddServiceStepConfirm));
