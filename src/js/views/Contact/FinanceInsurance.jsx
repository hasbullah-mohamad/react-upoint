import React, { Component } from 'react';

class MobileNbn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_address: '',
      phone_number: '',
      message: ''
    };
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h2 className="font-weight-extra-bold text-center">Coming soon</h2>
      </div>
    );
  }
}

export default MobileNbn;
