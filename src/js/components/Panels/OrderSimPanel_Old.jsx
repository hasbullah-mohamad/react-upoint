import React, { Component } from 'react';

class OrderSimPanel extends Component {
  renderAdditionalServiceButton() {
    const { onAddServiceClick, showAnotherServiceButton } = this.props;
    if (!showAnotherServiceButton) return null;
    return (
      <div className="col-12 col-lg-6 px-2">
        <div className="promo-box">
          <div className="d-flex justify-content-between align-items-center">
            <div className="position-relative">
              <img
                src="/img/icons/sim4.svg"
                alt="order"
                style={{
                  width: '38px',
                  height: '49px'
                }}
              />
              <span
                className="position-absolute"
                style={{
                  top: '-12px',
                  left: '34px'
                }}
              >
                +
              </span>
              <span className="ml-3 font-size-h4">Add another service?</span>
            </div>
            <div>
              <button className="btn btn-primary btn-sm" onClick={onAddServiceClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderOrderSimButton() {
    const { onOrderClick } = this.props;
    return (
      <div className="col-12 col-lg-6 px-2">
        <div className="promo-box">
          <div className="d-flex justify-content-between align-items-center">
            <div className="position-relative">
              <img
                src="/img/icons/sim4.svg"
                alt="order"
                style={{
                  width: '38px',
                  height: '49px'
                }}
              />
              <span
                className="position-absolute"
                style={{
                  top: '-12px',
                  left: '34px'
                }}
              >
                +
              </span>
              <span className="ml-3 font-size-h4">Need a SIM?</span>
            </div>
            <div>
              <button className="btn btn-primary btn-sm" onClick={onOrderClick}>
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderActivateServiceButton() {
    const { onActivateClick, showFirstServiceButton } = this.props;
    if (!showFirstServiceButton) {
      return null;
    }
    return (
      <div className="col-12 col-lg-6 px-2 mb-4 mb-lg-0">
        <div className="promo-box">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                src="/img/icons/sim4.svg"
                alt="order"
                style={{
                  width: '38px',
                  height: '49px'
                }}
              />
              <span className="ml-3 font-size-h4">Need a service?</span>
            </div>
            <div>
              <button className="btn btn-primary btn-sm" onClick={onActivateClick}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body bg-info text-white p-4">
          <div className="row px-1">
            {this.renderActivateServiceButton()}

            {this.renderAdditionalServiceButton()}

            {this.renderOrderSimButton()}
          </div>
        </div>
      </div>
    );
  }
}

OrderSimPanel.defaultProps = {

};

export default OrderSimPanel;

