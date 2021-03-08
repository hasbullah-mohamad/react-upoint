import React, { Component } from 'react';
import LaddaButton, { EXPAND_LEFT } from 'react-ladda';
import classnames from 'classnames';

import AddressInput from './AddressInput';
import services from '../../services';

class AddressCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecking: false,
      address: null,
      status: false
    };
  }

  handleCheckAddress(event) {
    event.preventDefault();
    const { address } = this.state;
    if (address) {
      this.handleChangeAddress(address);
    }
  }

  async handleChangeAddress(value) {
    this.setState({
      address: value,
      isChecking: true,
      status: ''
    });

    const { address, info } = value;
    try {
      const res = await services.Nbn.addressCoverage({
        addressline: address,
        locality: info.Suburb,
        propertynumber: info.NumberFirst,
        state: info.State,
        streetType: info.StreetType,
        postcode: info.Postcode
      });
      this.setState({
        status: res.addressCovered ? 'success' : 'error',
        isChecking: false
      });
      this.props.onCheck(value, res.addressCovered);
    } catch (error) {
      this.setState({
        isChecking: false
      });
    }
  }

  render() {
    const { label, labelType, buttonType, name, id } = this.props;
    const { isChecking, status } = this.state;
    const formClass = {
      'address-check': true
    };
    if (status) {
      formClass[status] = true;
    }
    return (
      <form onSubmit={this.handleCheckAddress.bind(this)} className={classnames(formClass)}>
        { label ? (<label htmlFor={id} className={`text-${labelType}`}>{label}</label>) : null }
        <div className={classnames({ 'form-group': true, 'position-relative': true })}>
          <AddressInput
            className="form-control"
            name={name}
            id={id}
            onChange={this.handleChangeAddress.bind(this)}
            style={{ borderRadius: '0 30px 30px 0', paddingRight: '160px' }}
          />
          <LaddaButton
            data-style={EXPAND_LEFT}
            className={`btn btn-${buttonType} position-absolute`}
            style={{ right: '0', top: '0', height: '48px' }}
            loading={isChecking}
            type="submit">
            { status === 'success' && !isChecking ? 'CHECKED' : 'CHECK' }
          </LaddaButton>
        </div>
      </form>
    );
  }
}

AddressCheck.defaultProps = {
  label: 'Address',
  labelType: 'primary',
  buttonType: 'primary',
  name: 'address',
  id: 'address',
  onCheck: () => {}
};

export default AddressCheck;
