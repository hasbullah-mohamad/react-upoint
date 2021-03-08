import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ComingSoon extends Component {
  handleBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={'page--coming-soon'}>
        <div className={'section section--hero'}>
          <div className={'container'}>
            <div className={'section-item text-center'}>
              <img src={'/img/media/clock.svg'} alt={'Coming Soon'} />
            </div>
            <div className={'text-center'}>
              <h3 className={'text-center text-info section-item title-underlined-primary font-weight-extra-bold'}>This feature will be coming soon.</h3>
              <button className="btn btn-secondary" onClick={this.handleBack.bind(this)}>Go back</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ComingSoon);
