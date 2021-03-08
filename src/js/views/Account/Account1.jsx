import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  handleChangeValue(field, value) {
    this.setState({
      [field]: value,
    });
  }

  handleToggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  renderModal() {
    return (
      <Modal
        className={'modal-lg modal--primary'}
        isOpen={this.state.modal}
        toggle={this.handleToggleModal.bind(this)}>
        <div className={'modal-header'}>
          <h3 className={'text-center title-underlined-primary font-weight-extra-bold'}>Welcome to your online account</h3>
        </div>
        <ModalBody>
          <p>
            It looks like this is your first time logging in.&nbsp;
            You can change your password to something more memorable and unique to you using the button below.
          </p>
          <p>
            Use the links on the right hand side to find your way around.&nbsp;
            Your account overview page is a good place to start if you want to check your balance.
          </p>
        </ModalBody>
        <div className={'modal-footer text-center'}>
          <button className={'btn btn-primary'} onClick={this.handleToggleModal.bind(this)}>Update Password</button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div>
        {this.renderModal()}
        <div className={'page page--account page--panel'}>
          <div className={'section'}>
            <div className={'container'}>
              <div className={'panel panel--info'}>

                <div className={'panel-heading'}>
                  <div className={'row align-items-top'}>
                    <div className={'col-sm-9'}>
                      <div className={'row align-items-top'}>
                        <div className={'col-lg-5'}>
                          <div className={'d-flex align-items-top'}>
                            <div className={'icon-54 mr-3'}>
                              <img
                                src={'/img/media/sim_nano.png'}
                                alt={'SIM Nano'}
                              />
                            </div>
                            <div>
                              <div><strong>Katch&apos;s iPhone X</strong></div>
                              <h4 className={'font-weight-extra-bold'}>0400 123 456</h4>
                            </div>
                          </div>
                        </div>
                        <div className={'col-lg-3'}>
                          <div><strong>Current balance</strong></div>
                          <h4 className={'font-weight-extra-bold'}>$20.04</h4>
                        </div>
                        <div className={'col-lg-3'}>
                          <div><strong>Days left</strong></div>
                          <h4 className={'font-weight-extra-bold'}>30</h4>
                        </div>
                      </div>
                    </div>
                    <div className={'col-sm-3'}>
                      <button className={'float-right btn btn-primary'}>Edit service</button>
                    </div>
                  </div>
                </div>

                <div className={'d-flex flex-column flex-md-row flex-wrap'}>

                  <div className={'col-md-6 p-0 bg-secondary'}>
                    <div className={'panel-stack'}>
                      <div className={'row'}>
                        <div className={'col-md-12 text-right'}>
                          <h3 className={'panel-title title-underlined-primary float-left'}>Base Plan</h3>
                        </div>
                      </div>
                      <div className={'row'}>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Plan Name</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>uPoint Mobile Plan</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Start Date</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>09/05/2017</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Expire Date</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>09/05/2018</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Days Remaining</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>365</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'col-md-6 p-0'}>
                    <div className={'panel-stack'}>
                      <div className={'row'}>
                        <div className={'col-md-12 text-right'}>
                          <h3 className={'panel-title title-underlined-primary float-left'}>Current plan</h3>
                          <button className={'btn btn-outline-primary btn-sm float-right'}>Edit</button>
                        </div>
                      </div>
                      <div className={'row'}>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Plan Name</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>$15 Basic Mobile Plan</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Start Date</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>09/05/2017</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Expire Date</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>09/05/2018</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Days Remaining</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>365</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Auto Recharge</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>Disabled</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'col-md-6 p-0'}>
                    <div className={'panel-stack'}>
                      <div className={'row'}>
                        <div className={'col-md-12 text-right'}>
                          <h3 className={'panel-title title-underlined-primary float-left'}>Balance</h3>
                        </div>
                      </div>
                      <div className={'row'}>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>PAYG Expiry</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>09/05/2018</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Incl. Value Credit</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>$15.00</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Data Allowance</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>500MB</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>SMS used</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>0</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={'col-md-6 p-0 bg-secondary'}>
                    <div className={'panel-stack'}>
                      <div className={'row'}>
                        <div className={'col-md-12 text-right'}>
                          <h3 className={'panel-title title-underlined-primary float-left'}>Usage last 30 days</h3>
                          <button className={'btn btn-outline-primary btn-sm float-right'}>Seel all</button>
                        </div>
                      </div>
                      <div className={'row'}>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Minutes used</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>5</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>SMS Sent</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>5</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>MMS Sent</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>4</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group text-primary'}><strong>Data Used</strong></div>
                        </div>
                        <div className={'col-xs-6 col-sm-6'}>
                          <div className={'form-group'}><strong>36MB</strong></div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className={'panel-footer bg-primary text-center'}>
                  <p className={'icon-105'}>
                    <img src={'/img/icons/customer_new.svg'} alt={'Get the best value.'} />
                  </p>
                  <h3 className={'title panel-title title-underlined-light text-center'}>Get the best value</h3>
                  <p>
                    You can find our which plan is best suited to you simply by clicking this button.<br />
                    Our online calculator tool will look at your average usage to find the best match for you.
                  </p>
                  <button className={'btn btn-info'}>Find out more</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
