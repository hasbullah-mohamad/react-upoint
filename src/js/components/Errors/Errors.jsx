import React, { Component } from 'react';

class Errors extends Component {
  render() {
    const { validationErrors, errorMessage } = this.props;
    return (
      errorMessage && (
        <div className="alert alert-danger">
          {
            errorMessage && <span>{errorMessage}</span>
          }
          {
            validationErrors && (
              <ul className="m-0 pl-4">
                {
                  Object.entries(validationErrors).map((item, index) => (
                    <li key={index}>{item[1]}</li>
                  ))
                }
              </ul>
            )
          }
        </div>
      )
    );
  }
}

Errors.defaultProps = {
  errorMessage: null,
  validationErrors: null
};

export default Errors;

