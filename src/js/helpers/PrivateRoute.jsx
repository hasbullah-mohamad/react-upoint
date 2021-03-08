import React from 'react';
import { connect } from 'react-redux';

import {
  // BrowserRouter as Router,
  Route,
  // Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import services from '../services';
import UrlHelper from './UrlHelper';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      services.isLoggedIn()
        ? <Component {...props} />
        : <Redirect to={UrlHelper.getMainUrl('login')} />
    )} />
);


const mapStateToProps = state => ({
  isLoggedIn: state.common.isLoggedIn,
  currentUserExists: state.common.currentUser
});

export default withRouter(connect(
  mapStateToProps, null, null, { pure: false }
)(PrivateRoute));
