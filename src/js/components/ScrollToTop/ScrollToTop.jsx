import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

const exceptRoutes = [
  UrlHelper.getMainUrl('mobile-nbn-packs'),
  UrlHelper.getMainUrl(''),
  UrlHelper.getMainUrl('electricity-gas'),
  UrlHelper.getMainUrl('finance-insurance'),
  UrlHelper.getMainUrl('other-deals')
];
class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    let bPrev = false;
    let bCurrent = false;

    exceptRoutes.forEach((route) => {
      if (this.props.location.pathname === route) {
        bCurrent = true;
      }
      if (prevProps.location.pathname === route) {
        bPrev = true;
      }
    });
    if (bPrev && bCurrent) {
      return;
    }
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
