import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Pack from '../../components/Pack/Pack';
import CONSTANT from '../../config/constant';
import { SCENES } from './ActivateSim';

class ActivateSimSplitter extends Component {
  handleSelectActivateType(value) {
    this.props.onChangeValue('activation_type', value);
  }

  handleContinue() {
    this.props.onChangeValue('scene', SCENES.STEPS);
  }

  handleChangeValue(field, value) {
    this.props.onChangeValue(field, value);
  }

  render() {
    const { CUSTOMERS: packs } = CONSTANT;

    const { data } = this.props;

    const renderPacks = packs.map((item, index) => {
      const className = data.activation_type ? (data.activation_type === item.value ? 'pack--round pack-selected' : 'pack--round pack-disabled') : 'pack--round';
      return (
        <Pack
          key={`${index}`}
          className={className}
          src={item.src}
          title={item.title}
          onClick={this.handleSelectActivateType.bind(this, item.value)}
        />
      );
    });

    return (
      <div className={'panel panel--primary'}>
        {/* PANEL HEADING */}
        <div className={'panel-heading'}>
          <h3 className={'panel-title title text-center title-underlined-light font-weight-extra-bold'}>Choose what you would like to do today</h3>
          <div className={'d-flex flex-column flex-md-row justify-content-center'}>
            {renderPacks}
          </div>
          {
            data.activation_type ? (
              <p className={'text-right d-block d-md-none'}>
                <NavLink to={'#'} onClick={this.handleChangeValue.bind(this, 'activation_type', '')}>Change your activation type</NavLink>
              </p>
            ) : null
          }
          <p className={'text-center font-weight-bold'}>
            If you bought a SIM card online or in store and don&apos;t have an account already, <br />we&apos;ll get you activated in a few easy steps.
          </p>
          <div className={'text-center'}>
            <button
              className={'btn btn-info'}
              disabled={!data.activation_type}
              onClick={this.handleContinue.bind(this)}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ActivateSimSplitter.defaultProps = {
  data: {},
  onChangeValue: () => {},
};

export default ActivateSimSplitter;
