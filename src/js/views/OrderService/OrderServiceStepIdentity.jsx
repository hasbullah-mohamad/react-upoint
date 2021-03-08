import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalBody } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import MaskedInput from 'react-text-mask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import classnames from 'classnames';

import { setGlobalActivate } from '../../actions/global';
import Step from '../../components/Step';
import Pack from '../../components/Pack';
import CONSTANT from '../../config/constant';
import Validation from '../../helpers/ValidationHelper';
import UrlHelper from '../../helpers/UrlHelper';

const autoCorrectedDatePipe = createAutoCorrectedDatePipe('mm/yyyy');

class OrderServiceStepIdentity extends Component {
  constructor(props) {
    super(props);
    this.validationRulesGroup = {
      medicare_card: {
        identification_medicare_number: 'required|numeric',
        identification_medicare_individual_name_no: 'required',
        identification_medicare_middle_name: 'required',
        identification_medicare_card_color: 'required',
        identification_medicare_card_expiry_date: 'required|date_format:MM/YYYY'
      },
      driver_licence: {
        identification_driver_licence_state: 'required',
        identification_driver_licence_number: 'required|numeric'
      },
      passport: {
        identification_passport_number: 'required|numeric',
        identification_passport_nationality: 'required'
      }
    };

    this.validators = {
      medicare_card: new Validation(this.validationRulesGroup.medicare_card),
      driver_licence: new Validation(this.validationRulesGroup.driver_licence),
      passport: new Validation(this.validationRulesGroup.passport)
    };

    const { identification_type } = this.props.data;
    this.validator = identification_type ? this.validators[identification_type] : null;
    this.validationRules = null;

    this.state = {
      modal: true,
      errors: null
    };
  }

  get validationData() {
    const {
      identification_type,
      identification_medicare_number, identification_medicare_individual_name_no, identification_medicare_middle_name, identification_medicare_card_color, identification_medicare_card_expiry_date,
      identification_driver_licence_state, identification_driver_licence_number,
      identification_passport_number, identification_passport_nationality
    } = this.props.data;

    switch (identification_type) {
      case 'medicare_card': {
        return {
          identification_medicare_number,
          identification_medicare_individual_name_no,
          identification_medicare_middle_name,
          identification_medicare_card_color,
          identification_medicare_card_expiry_date
        };
      }
      case 'driver_licence': {
        return {
          identification_driver_licence_state,
          identification_driver_licence_number
        };
      }
      case 'passport': {
        return {
          identification_passport_number,
          identification_passport_nationality
        };
      }
      default: {
        return {};
      }
    }
  }

  changeValue(field, value) {
    this.props.setGlobalActivate({
      ...this.props.data,
      [field]: value
    });
  }

  handleToggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleSelectIdentificationType(value) {
    this.validationRules = this.validationRulesGroup[value];
    this.validator = this.validators[value];
    this.setState({
      errors: this.validator.errors
    });

    this.changeValue('identification_type', value);
  }

  handleChange(name, event) {
    this.handleChangeValue(name, event.target.value);
  }

  handleChangeValue(name, value) {
    this.changeValue(name, value);
    if (this.validationRules && typeof this.validationRules[name] !== 'undefined') {
      const { errors } = this.validator;
      errors.remove(name);
      console.log(errors);
      this.validator.validate(name, value).then(() => {
        this.setState({
          errors
        });
      });
    }
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleNext() {
    event.preventDefault();
    this.validator.validateAll(this.validationData).then(
      (success) => {
        if (success) {
          this.props.history.push(UrlHelper.getMainUrl('order-service/step-plan'));
        } else {
          this.setState({
            errors: this.validator.errors
          });
        }
      }
    );
  }

  renderHelperBlock(name) {
    const { errors } = this.state;
    return (errors && errors.has(name)) ? (
      <span className="invalid-feedback d-block">
        { errors.first(name) }
      </span>
    ) : null;
  }

  renderModal() {
    return (
      <Modal
        className={'modal-lg modal--primary'}
        isOpen={this.state.modal}
        toggle={this.handleToggleModal.bind(this)}>
        <div className={'modal-header'}>
          <h3 className={'text-center title-underlined-primary font-weight-extra-bold'}>ID Verification</h3>
        </div>
        <ModalBody>
          <p>
            <strong className={'font-weight-black'}>Important!</strong> If your name does not match exactly what is shown on your ID, you should go back and edit the details you entered.
            For example, if you did not include a middle name, or if you shortened Christopher to Chris this is likely to cause your ID verification check to fail
            and will cause delays to the activation of your service.
          </p>
          <p>
            As per the Telecommunications (Service Provider — Identity Checks for Prepaid Mobile Carriage Services)
            Determination 2017 we are legally obliged to verify the identity of anyone who wants to activate a Prepaid SIM card.
            You can refer to our Identity Verification Policy on our <NavLink to={UrlHelper.getMainUrl('')}>legals page</NavLink>.
          </p>
          <p>
            You&apos;ll need to provide either your driver&apos;s licence details or your Medicare information (or your passport details if you are not a resident).
            We will check this information along with the name you provided earlier against a Government database
            and this will determine if your identity is successfully verified.
          </p>
          <p>
            By providing this information you are confirming that you are authorised to provide these details to us.
            You are also confirming that you consent to us using this information to carry out an identity check verification.
          </p>
          <div>
            We will attempt to verify your identity electronically by checking the details
            that you provide match against details held in an approved Government online verification service;
            this electronic check uses 3rd party systems and services and information provided by you in or from Australia will be transmitted to New Zealand.
          </div>
        </ModalBody>
        <div className={'modal-footer text-center'}>
          <button className={'btn btn-primary'} onClick={this.handleToggleModal.bind(this)}>I Understand</button>
        </div>
      </Modal>
    );
  }

  renderMedicareCard() {
    const { data } = this.props;
    const { errors } = this.state;
    return (
      <div className={'panel-body'}>
        <form>

          <div className={'row'}>
            <div className={'col-md-8'}>
              <div className={'form-group'}>
                <label className={'d-block'} htmlFor={'identification_medicare_number'}>
                  <span>Medicare number</span>
                  <NavLink to={UrlHelper.getMainUrl('login')} className={'float-right'}><small>Where is this?</small></NavLink>
                </label>
                <input
                  type={'text'}
                  className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_medicare_number')) })}
                  id={'identification_medicare_number'}
                  value={data.identification_medicare_number}
                  onChange={this.handleChange.bind(this, 'identification_medicare_number')}
                />
                {this.renderHelperBlock('identification_medicare_number')}
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-8'}>
              <div className={'row'}>
                <div className={'col-md-4'}>
                  <div className={'form-group'}>
                    <label className={'d-block'} htmlFor={'identification_medicare_individual_name_no'}>Individual name no.</label>
                    <input
                      type={'text'}
                      className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_medicare_individual_name_no')) })}
                      id={'identification_medicare_individual_name_no'}
                      value={data.identification_medicare_individual_name_no}
                      onChange={this.handleChange.bind(this, 'identification_medicare_individual_name_no')}
                    />
                    {this.renderHelperBlock('identification_medicare_individual_name_no')}
                  </div>
                </div>
                <div className={'col-md-8'}>
                  <div className={'form-group'}>
                    <label htmlFor={'identification_medicare_middle_name'}>Middle name / initial</label>
                    <input
                      type={'text'}
                      className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_medicare_middle_name')) })}
                      id={'identification_medicare_middle_name'}
                      value={data.identification_medicare_middle_name}
                      onChange={this.handleChange.bind(this, 'identification_medicare_middle_name')}
                    />
                    {this.renderHelperBlock('identification_medicare_middle_name')}
                  </div>
                </div>
              </div>
            </div>
            <div className={'col-md-4'}>
              <div className={'form-group'}>
                <label className={'d-none d-md-block'} htmlFor={'identification_medicare_middle_name'}>&nbsp;</label>
                <small className={'form-text text-muted'}>
                  If your card has a middle initial or middle name, enter it. Otherwise leave it blank.
                </small>
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-8'}>
              <div className={'row'}>
                <div className={'col-md-4'}>
                  <div className={'form-group'}>
                    <label className={'d-block'} htmlFor={'identification_medicare_card_color'}>Card colour</label>
                    <select
                      className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': (errors && errors.has('identification_medicare_card_color')) })}
                      id={'identification_medicare_card_color'}
                      value={data.identification_medicare_card_color}
                      onChange={this.handleChange.bind(this, 'identification_medicare_card_color')}>
                      <option value={''}>Select a colour</option>
                      <option value={'green'}>Green</option>
                    </select>
                    {this.renderHelperBlock('identification_medicare_card_color')}
                  </div>
                </div>
                <div className={'col-md-8'}>
                  <div className={'form-group'}>
                    <label htmlFor={'identification_medicare_card_expiry_date'}>Card expiry date</label>
                    <MaskedInput
                      className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_medicare_card_expiry_date')) })}
                      pipe={autoCorrectedDatePipe}
                      value={data.identification_medicare_card_expiry_date}
                      id={'identification_medicare_card_expiry_date'}
                      placeholder={'MM/YYYY'}
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      onChange={this.handleChange.bind(this, 'identification_medicare_card_expiry_date')}
                    />
                    {this.renderHelperBlock('identification_medicare_card_expiry_date')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-12 mt-5'}>
              <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
              <button className={'btn btn-primary float-right'} type={'button'} onClick={this.handleNext.bind(this)}>Next</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderDriverLicence() {
    const { data } = this.props;
    const { errors } = this.state;
    return (
      <div className={'panel-body'}>
        <form>

          <div className={'row'}>
            <div className={'col-md-4'}>
              <div className={'form-group'}>
                <label className={'d-block'} htmlFor={'identification_driver_licence_state'}>Driver&apos;s licence state</label>
                <select
                  type={'text'}
                  className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': (errors && errors.has('identification_driver_licence_state')) })}
                  id={'identification_driver_licence_state'}
                  value={data.identification_driver_licence_state}
                  onChange={this.handleChange.bind(this, 'identification_driver_licence_state')}
                >
                  <option value={''}>Select a state</option>
                  <option value={'ACT'}>ACT</option>
                  <option value={'NSW'}>NSW</option>
                  <option value={'NT'}>NT</option>
                  <option value={'QLD'}>QLD</option>
                  <option value={'SA'}>SA</option>
                  <option value={'TAS'}>TAS</option>
                  <option value={'VIC'}>VIC</option>
                  <option value={'WA'}>WA</option>
                </select>
                {this.renderHelperBlock('identification_driver_licence_state')}
              </div>
            </div>
            <div className={'col-md-8'}>
              <div className={'form-group'}>
                <label htmlFor={'identification_driver_licence_number'}>Driver&apos;s licence number</label>
                <input
                  type={'text'}
                  className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_driver_licence_number')) })}
                  id={'identification_driver_licence_number'}
                  value={data.identification_driver_licence_number}
                  onChange={this.handleChange.bind(this, 'identification_driver_licence_number')}
                />
                {this.renderHelperBlock('identification_driver_licence_number')}
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-12 mt-5'}>
              <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
              <button className={'btn btn-primary float-right'} type={'button'} onClick={this.handleNext.bind(this)}>Next</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  renderPassport() {
    const { data } = this.props;
    const { errors } = this.state;
    const { COUNTRIES } = CONSTANT;
    const renderOptions = [];
    renderOptions.push(<option value={''} key={`${-1}`}>{'Please select'}</option>);
    Object.keys(COUNTRIES).forEach((key, index) => {
      const value = COUNTRIES[key];
      renderOptions.push(<option value={key} key={`${index}`}>{value}</option>);
    });
    return (
      <div className={'panel-body'}>
        <form>
          <div className={'row'}>
            <div className={'col-md-4'}>
              <div className={'form-group'}>
                <label className={'d-block'} htmlFor={'identification_passport_number'}>Passport number</label>
                <input
                  type={'text'}
                  className={classnames({ 'form-control': true, 'is-invalid': (errors && errors.has('identification_passport_number')) })}
                  id={'identification_passport_number'}
                  value={data.identification_passport_number}
                  onChange={this.handleChange.bind(this, 'identification_passport_number')}
                />
                {this.renderHelperBlock('identification_passport_number')}
              </div>
            </div>
            <div className={'col-md-8'}>
              <div className={'form-group'}>
                <label htmlFor={'identification_passport_nationality'}>Nationality</label>
                <select
                  className={classnames({ 'form-control': true, 'custom-select': true, 'is-invalid': (errors && errors.has('identification_passport_nationality')) })}
                  id={'identification_passport_nationality'}
                  value={data.identification_passport_nationality}
                  onChange={this.handleChange.bind(this, 'identification_passport_nationality')}>
                  {renderOptions}
                </select>
                {this.renderHelperBlock('identification_passport_nationality')}
              </div>
            </div>
          </div>

          <div className={'row'}>
            <div className={'col-md-12 mt-5'}>
              <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={this.handleBack.bind(this)}>Back</button>
              <button className={'btn btn-primary float-right'} type={'button'} onClick={this.handleNext.bind(this)}>Next</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { IDENTIFICATIONS: packs } = CONSTANT;

    const { data } = this.props;

    const renderPacks = packs.map((item, index) => {
      const className = data.identification_type ? (data.identification_type === item.value ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round';
      return (
        <Pack
          key={`${index}`}
          className={className}
          {...item}
          onClick={this.handleSelectIdentificationType.bind(this, item.value)}
        />
      );
    });

    let renderBody = null;
    switch (data.identification_type) {
      case 'medicare_card':
        renderBody = this.renderMedicareCard();
        break;
      case 'driver_licence':
        renderBody = this.renderDriverLicence();
        break;
      case 'passport':
        renderBody = this.renderPassport();
        break;
      default:
        break;
    }

    return (
      <div className={'section'}>
        <div className={'container'}>
          {this.renderModal()}
          <Step steps={['Information', 'Address', 'Identity', 'Select plan', 'Confirm']} index={2} />
          <div className={'panel panel--primary'}>
            <div className={'panel-body'}>
              <h3 className={'title panel-title title-underline--primary text-center font-weight-extra-bold'}>Identity</h3>
              <p className={'text-center'}>
                It is a legal requirement that we verify your identity before we can activate your SIM card.
                Please select how you would like to verify your identity. By providing this information you are confirming
                that you are authorised to provide these details to us. You are also confirming that you consent to us using
                this information to carry out an <br />
                <NavLink to={UrlHelper.getMainUrl('')}>identity check verification.</NavLink>
              </p>
            </div>
            <div className={'panel-heading'}>
              <h3 className={'title panel-title title-underlined-light text-center font-weight-extra-bold'}>Select your ID type</h3>
              <div className={'d-flex flex-column flex-md-row justify-content-center'}>
                {renderPacks}
              </div>
              {
                data.identification_type ? (
                  <p className={'text-right d-block d-md-none'}>
                    <NavLink to={'#'} onClick={this.handleChangeValue.bind(this, 'identification_type', '')}>Change your ID type</NavLink>
                  </p>
                ) : null
              }
            </div>
            <div className="panel-body">
              {renderBody}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.activate
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderServiceStepIdentity));
