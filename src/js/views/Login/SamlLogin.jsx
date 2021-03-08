import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LaddaButton from 'react-ladda';
import Slick from 'react-slick';
import classnames from 'classnames';
import QueryString from 'qs';

import Pack from '../../components/Pack';
import Errors from '../../components/Errors';
import Validation from '../../helpers/ValidationHelper';

import Types from '../../actions/actionTypes';
import services from '../../services';

const mapStateToProps = state => ({
  samlResponse: state.saml.samlResponse,
});

const mapDispatchToProps = dispatch => ({
  authenticateWithIdentityProvider: (data) =>
    dispatch({ type: Types.LOGIN_SAML, payload: services.Auth.saml(data) })
});

class SamlLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      samlQuery: QueryString.parse(this.props.location.search, { ignoreQueryPrefix: true }),
      samlDestination: null,
      samlResponseData: {
        RelayState: '',
        SAMLResponse: ''
      }
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.props.samlResponse !== props.samlResponse && props.samlResponse) {
      this.setState({
        samlDestination: props.samlResponse.destination,
        samlResponseData: props.samlResponse.data || {}
      });
    }
  }

  componentDidMount() {
    this.handleLogin();
  }

  componentDidUpdate() {
    if (this.samlAuthenticationSuccessful()) {
      this.redirectBackToServiceProvider();
    }
  }

  handleLogin() {
    const { samlQuery } = this.state;
    const { authenticateWithIdentityProvider } = this.props;
    authenticateWithIdentityProvider(samlQuery);
  }

  samlAuthenticationSuccessful() {
    const { samlDestination, samlResponseData } = this.state;
    return !! samlDestination && !! samlResponseData.SAMLResponse;
  }

  redirectBackToServiceProvider() {
    this.refs.serviceProviderForm.submit();
  }

  render() {
    const { samlDestination, samlResponseData } = this.state;

    return (
      <div className={'page--panel page--login'}>
        <div className={'section'}>
          <div className={'container'}>
            <div className={'row'}>
              <div className={'col-xl-1 col-md-1'} />
              <div className={'col-xl-10 col-md-10'}>
                <div className={'panel panel--primary panel--padding-large'}>
                  <div className={'panel-body'}>
                    <Errors errorMessage={this.props.serverError} validationErrors={this.props.validationErrors} />
                    <h3 className={'panel-title--large title-underlined-primary text-center font-weight-extra-bold'}>Authenticating...</h3>
                    <form method='post' action={samlDestination} ref='serviceProviderForm'>

                      <input type="hidden" name='RelayState' value={samlResponseData.RelayState} />
                      <input type="hidden" name='SAMLResponse' value={samlResponseData.SAMLResponse} />

                      <div className={'form-group text-center mt-5'}>
                        Please wait a moment while we authenticate you.
                      </div>
                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(SamlLogin);
