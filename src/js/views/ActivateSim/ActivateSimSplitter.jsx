import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { setGlobalActivate } from '../../actions/global';
import Pack from '../../components/Pack/Pack';
import CONSTANT from '../../config/constant';
import UrlHelper from '../../helpers/UrlHelper';

class ActivateSimSplitter extends Component {
  changeValue(field, value) {
    this.props.setGlobalActivate({
      ...this.props.data,
      [field]: value
    });
  }

  handleChange(field, event) {
    this.changeValue(field, event.target.value);
  }

  handleChangeValue(field, value) {
    this.changeValue(field, value);
  }

  handleSelectActivateType(value) {
    this.changeValue('activation_type', value);
  }

  handleContinue() {
    this.props.history.push(UrlHelper.getMainUrl('activate-sim/step-activation-code'));
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
      <div className={'page page--activate-sim page--panel'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'panel panel--primary panel--no-border'}>
              {/* PANEL HEADING */}
              <div className={'panel-heading-split'}>
                <div className={'panel-heading-split-left'}>
                  <span className={'mr-4'}>Katch Haris</span>
                  <span className={'font-weight-bold'}>4 Services</span>
                </div>
                <div className={'panel-heading-split-right bg-info'}>
                  <span className={'mr-4'}>Account number</span>
                  <span className={'font-weight-bold'}>87289049</span>
                </div>
              </div>
              <div className={'panel-body'}>
                <div className={'panel-item'}>
                  <p className={'mt-5 text-center'}>
                    You have no active services yet.
                  </p>
                </div>
              </div>
              <div className={'panel-footer bg-primary'}>
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
                <div className={'text-center mt-5'}>
                  <button
                    className={'btn btn-info'}
                    disabled={!data.activation_type}
                    onClick={this.handleContinue.bind(this)}>
                    Continue
                  </button>
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
  data: state.global.activate
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActivateSimSplitter));
