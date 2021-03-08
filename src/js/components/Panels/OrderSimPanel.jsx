import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class OrderSimPanel extends Component {
  render() {
    return (
      <div className="panel panel-info">
        <div className="panel-body bg-info text-white px-4 py-3">
          <div className="row">
            <div className="col-12 col-xl-4 my-2 px-2 d-flex">
              <div className="promo-box d-flex w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
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
                  </div>
                  <div style={{ flex: 1 }} className="mx-2 font-size-h4">
                    Add a new mobile service
                  </div>
                  <div>
                    <NavLink className="btn btn-primary btn-sm" to={UrlHelper.getMainUrl('order-service/step-information')}>
                      Add
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-4 my-2 px-2 d-flex">
              <div className="promo-box d-flex w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
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
                  </div>
                  <div style={{ flex: 1 }} className="mx-2 font-size-h4">
                    Add a new NBN service
                  </div>
                  <div>
                    <NavLink className="btn btn-primary btn-sm" to={UrlHelper.getMainUrl('nbn/check-address')}>
                      Add
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-4 my-2 px-2 d-flex">
              <div className="promo-box d-flex w-100">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    <img
                      src="/img/icons/sim4.svg"
                      alt="order"
                      style={{
                        width: '38px',
                        height: '49px'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }} className="mx-2 font-size-h4">
                    Register your interest for uPoint Energy
                  </div>
                  <div>
                    <NavLink className="btn btn-primary btn-sm" to={UrlHelper.getAbsoluteUrl('energy')}>
                      More info
                    </NavLink>
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

OrderSimPanel.defaultProps = {

};

export default OrderSimPanel;

