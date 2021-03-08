import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { setGlobalActivate } from '../../actions/global';
import { initialState } from '../../reducers/global';

import Menu from '../../components/Menu';

import ActivateSimSplitter from './ActivateSimSplitter';
import UrlHelper from '../../helpers/UrlHelper';

class ActivateSim extends Component {
  componentDidMount() {
    this.props.setGlobalActivate({
      ...initialState.order
    });
  }

  render() {
    return (
      <Switch>
        <div>
          <div className={'navigation text-center'}>
            <div className={'container'}>
              <Menu
                className={'menu--navigation'}
                data={[
                  { to: UrlHelper.getMainUrl('activate-sim/splitter'), title: 'Account Overview' },
                  { to: UrlHelper.getMainUrl('edit-profile'), title: 'Edit Contact Details' },
                  { to: UrlHelper.getMainUrl('payment-history'), title: 'Payment History' },
                  { to: UrlHelper.getMainUrl('contact-support'), title: 'Contact Support' }
                ]}
              />
            </div>
          </div>
          <Route path={UrlHelper.getMainUrl('activate-sim/splitter')} name={'ActivateSimSplitter'} component={ActivateSimSplitter} />
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  data: state.global.activate
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  setGlobalActivate: order => dispatch(setGlobalActivate(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateSim);
