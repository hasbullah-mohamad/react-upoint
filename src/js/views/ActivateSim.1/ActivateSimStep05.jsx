import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Card from 'card-react';

import PricingTable from '../../components/PricingTable';
import CONSTANT from '../../config/constant';
import ConstantHelper from '../../helpers/ConstantHelper';
import UrlHelper from '../../helpers/UrlHelper';

const SCENES = {
  PACKS: 'packs',
  BILLING: 'billing',
};

class ActivateSimStep05 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scene: SCENES.PACKS,
      agree_terms: false,
    };
  }

  handleSelectPackType(value) {
    this.props.onChangeValue('pack_type', value);
  }

  handleChange(field, event) {
    this.props.onChangeValue(field, event.target.value);
  }

  renderBilling() {
    const { data } = this.props;
    const priceData = ConstantHelper.getItemByField(CONSTANT.PRICINGS, 'value', data.pack_type);
    return (
      <div className={'panel panel--primary'}>
        <Card
          container={'billing_card_container'}
          formInputsNames={{
            number: 'billing_card_number',
            expiry: 'billing_card_expiry_date',
            cvc: 'billing_card_cvv',
            name: 'billing_card_name',
          }}
          classes={{
            valid: 'valid',
            invalid: 'invalid',
          }}
          initialValues={
            {
              number: data.billing_card_number,
              cvc: data.billing_card_cvv,
              expiry: data.billing_card_expiry_date,
              name: data.billing_card_name,
            }
          }
        >
          <div className={'d-flex flex-column flex-md-row bg-primary'}>
            <div className={'col-md-6 panel-heading align-self-center'}>
              <div id={'billing_card_container'} />
            </div>
            <div className={'col-md-6 panel-body bg-light'}>
              <h3 className={'title panel-title title-underlined-primary text-center font-weight-extra-bold'}>Billing</h3>
              <form>
                <div className={'form-group'}>
                  <label htmlFor={'billing_price'}>Pay Today</label>
                  <span className={'d-block'}>{priceData ? `$${priceData.price}` : null}</span>
                </div>
                <div className={'form-group'}>
                  <label htmlFor={'billing_card_name'}>Name on card</label>
                  <input
                    type={'text'}
                    className={'form-control'}
                    name={'billing_card_name'}
                    id={'billing_card_name'}
                    onChange={this.handleChange.bind(this, 'billing_card_name')}
                  />
                </div>

                <div className={'row'}>
                  <div className={'col-md-9'}>
                    <div className={'form-group'}>
                      <label htmlFor={'billing_card_number'}>Card number</label>
                      <input
                        type={'text'}
                        className={'form-control'}
                        name={'billing_card_number'}
                        id={'billing_card_number'}
                        onChange={this.handleChange.bind(this, 'billing_card_number')}
                      />
                    </div>
                  </div>
                  <div className={'col-md-3'}>
                    <div className={'form-group'}>
                      <label htmlFor={'billing_card_cvv'}>CVV</label>
                      <input
                        type={'text'}
                        className={'form-control'}
                        name={'billing_card_cvv'}
                        id={'billing_card_cvv'}
                        onChange={this.handleChange.bind(this, 'billing_card_cvv')}
                      />
                    </div>
                  </div>
                </div>

                <div className={'form-group'}>
                  <label htmlFor={'billing_card_expiry_date'}>Card expiry date</label>
                  <input
                    type={'text'}
                    className={'form-control'}
                    name={'billing_card_expiry_date'}
                    id={'billing_card_expiry_date'}
                    onChange={this.handleChange.bind(this, 'billing_card_expiry_date')}
                  />
                </div>

                <div className={'form-group'}>
                  <span className={'switch'}>
                    <input
                      type={'checkbox'}
                      id={'switch_agree_terms'}
                      checked={this.state.agree_terms}
                      onChange={(event) => {
                        this.setState({
                          agree_terms: event.target.checked,
                        });
                      }}
                    />
                    <label htmlFor={'switch_agree_terms'}>
                      <span className={'text-muted text-center '}>
                        I understand I will be billed monthly for this pack.
                      </span>
                    </label>
                  </span>
                </div>

                <div className={'row'}>
                  <div className={'col-md-12'}>
                    <button
                      className={'btn btn-outline-primary float-left'}
                      type={'button'}
                      onClick={() => { this.setState({ scene: SCENES.PACKS }); }}>
                      Back
                    </button>
                    <button
                      className={'btn btn-primary float-right'}
                      type={'button'}
                      disabled={!this.state.agree_terms}
                      onClick={() => { this.props.jumpToStep(5); }}>
                      Next
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  renderPacks() {
    const { PRICINGS: packs } = CONSTANT;

    const { data } = this.props;

    const renderPricingTables = packs.map((item, index) => {
      const className = data.pack_type ? (data.pack_type === item.value ? 'pricing-table-selected' : 'pricing-table-disabled') : '';
      return (
        <div className={'col-md-6 col-lg-4'} key={`${index}`}>
          <PricingTable
            key={`${index}`}
            className={className}
            {...item}
            onClick={this.handleSelectPackType.bind(this, item.value)}
            actionTitle={data.pack_type === item.value ? 'Selected' : 'Select'}
          />
        </div>
      );
    });

    return (
      <div className={'panel panel--primary'}>
        <div className={'panel-body'}>
          <h3 className={'title panel-title title-underline--primary text-center font-weight-extra-bold'}>Select your pack</h3>
          <p className={'text-center'}>
            Our SIMs come loaded with $5 credit included, however to ensure you&apos;re getting the best value as soon as you start using your SIM choose a pack below.
          </p>
          <div className={'panel-item'}>
            <div className={'row pricing-table-container'}>
              {renderPricingTables}
            </div>
          </div>
          <p className={'text-center'}>
            These packs are automatically renewed each month. For more information, please see our <NavLink to={UrlHelper.getMainUrl('')}>Terms &amp; Conditions</NavLink>.
          </p>
          <div className={'row'}>
            <div className={'col-md-12'}>
              <button
                className={'btn btn-outline-primary float-left'}
                type={'button'}
                onClick={() => { this.props.jumpToStep(3); }}>
                Back
              </button>
              <button
                className={'btn btn-primary float-right'}
                type={'button'}
                onClick={() => { this.setState({ scene: SCENES.BILLING }); }}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { scene } = this.state;
    switch (scene) {
      case SCENES.BILLING:
        return this.renderBilling();
      case SCENES.PACKS:
      default:
        return this.renderPacks();
    }
  }
}

export default ActivateSimStep05;
