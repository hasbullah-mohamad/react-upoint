import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ComingSoon extends Component {
  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={'page--coming-soon'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="d-block text-center mx-4 py-5">
                <img
                  src="/img/media/oval_upoint_cards.png"
                  className="rounded-circle bg-white"
                  alt="upoint-card" />
                <span className="font-weight-bold d-block mt-4 text-dark">uPoint cards</span>
              </div>
              <div className="d-block text-center mx-4 py-5">
                <img
                  src="/img/media/oval_gas.png"
                  className="rounded-circle bg-white"
                  alt="upoint-card" />
                <span className="font-weight-bold d-block mt-4 text-dark">Gas</span>
              </div>
              <div className="d-block text-center mx-4 py-5">
                <img
                  src="/img/media/oval_insurance.png"
                  className="rounded-circle bg-white"
                  alt="upoint-card" />
                <span className="font-weight-bold d-block mt-4 text-dark">Insurance</span>
              </div>
              <div className="d-block text-center mx-4 py-5">
                <img
                  src="/img/media/oval_cars.png"
                  className="rounded-circle bg-white"
                  alt="upoint-card" />
                <span className="font-weight-bold d-block mt-4 text-dark">Cars</span>
              </div>
              <div className="d-block text-center mx-4 py-5">
                <img
                  src="/img/media/oval_member_discounts.png"
                  className="rounded-circle bg-white"
                  alt="upoint-card" />
                <span className="font-weight-bold d-block mt-4 text-dark">Member discounts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ComingSoon);
