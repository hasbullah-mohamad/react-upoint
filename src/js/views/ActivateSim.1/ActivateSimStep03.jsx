import React, { Component } from 'react';

class ActivateSimStep03 extends Component {
  handleChange(field, event) {
    this.props.onChangeValue(field, event.target.value);
  }

  render() {
    const { data } = this.props;

    return (
      <div className={'panel panel--primary'}>
        <div className={'panel-body'}>
          <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Your address</h3>
          <form>

            <div className={'form-group'}>
              <div className={'row'}>
                <div className={'col-md-3'}>
                  <label htmlFor={'user_street_number'}>Street Number</label>
                  <input
                    type={'text'}
                    className={classnames({ 'form-control': true })}
                    id={'user_street_number'}
                    value={data.user_street_number}
                    onChange={this.handleChange.bind(this, 'user_street_number')}
                  />
                </div>
                <div className={'col-md-5'}>
                  <label htmlFor={'street'}>Street</label>
                  <input
                    type={'text'}
                    className={classnames({ 'form-control': true })}
                    id={'user_street'}
                    value={data.user_street}
                    onChange={this.handleChange.bind(this, 'user_street')}
                  />
                </div>
                <div className={'col-md-4'}>
                  <small className={'form-text text-muted'}>
                    This must be a physical address, we cannot accept Post Office Box addresses. Invalid addresses will be rejected.
                            </small>
                </div>
              </div>
            </div>

            <div className={'row'}>
              <div className={'col-md-2'}>
                <div className={'form-group'}>
                  <label htmlFor={'user_postcode'}>Postcode</label>
                  <input
                    type={'text'}
                    className={classnames({ 'form-control': true })}
                    id={'user_postcode_suburb'}
                    value={data.user_postcode_suburb}
                    onChange={this.handleChange.bind(this, 'user_postcode_suburb')}
                  />
                </div>
              </div>
              <div className={'col-md-3'}>
                <div className={'form-group'}>
                  <label htmlFor={'user_city'}>City</label>
                  <input
                    type={'text'}
                    className={classnames({ 'form-control': true })}
                    id={'user_city'}
                    value={data.user_city}
                    onChange={this.handleChange.bind(this, 'user_city')}
                  />
                </div>
              </div>
              <div className={'col-md-3'}>
                <div className={'form-group'}>
                  <label htmlFor={'state'}>State</label>
                  <select
                    className={classnames({ 'form-control': true, 'custom-select': true })}
                    id={'user_state'}
                    value={data.user_state}
                    onChange={this.handleChange.bind(this, 'user_state')}>
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
                </div>
              </div>
            </div>

            <div className={'row'}>
              <div className={'col-xs-12 col-md-12'}>
                <button className={'btn btn-outline-primary float-left'} type={'button'} onClick={() => { this.props.jumpToStep(1); }}>Back</button>
                <button className={'btn btn-primary float-right'} type={'button'} onClick={() => { this.props.jumpToStep(3); }}>Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ActivateSimStep03.defaultProps = {
  onChangeValue: () => {},
  data: {},
};

export default ActivateSimStep03;
