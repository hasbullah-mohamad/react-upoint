import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import Full from './js/containers/Full';
import ScrollToTop from './js/components/ScrollToTop';

import { store, history } from './js/store';

import { env } from './js/config';
import ComingSoon from './js/views/ComingSoon/ComingSoon';
// import ComingSoonFront from './js/views/ComingSoon/ComingSoonFront';
import UrlHelper from './js/helpers/UrlHelper';

if (env.environment && env.environment !== 'development') {
  window.Raven.config('https://451410563d1f4a91be15c8e798bca687@sentry.io/1215662', {
    environment: env.environment
  }).install();
}

class App extends React.Component {
  componentDidMount() {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M5T5PVR');

    (function(e,t,s){var n=window.zE=window.zEmbed=function(){n._.push(arguments)}, a=n.s=e.createElement(t),r=e.getElementsByTagName(t)[0];n.set=function(e){ n.set._.push(e)},n._=[],n.set._=[],a.async=true,a.setAttribute("charset","utf-8"), a.src="https://static.zdassets.com/ekr/asset_composer.js?key="+s, n.t=+new Date,a.type="text/javascript",r.parentNode.insertBefore(a,r)})(document,"script","62b03b37-17ee-45f4-bf8d-7c78ac7c1d61");
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history} onUpdate={() => { window.scrollTo(0, 0); }}>
          <ScrollToTop>
            <Switch>
              <Route path={'/coming-soon'} name={'ComingSoon'} component={ComingSoon} />
              <Route path={UrlHelper.getMainUrl('')} name={'Main'} component={Full} />
              {/* <Route path={'/'} name={'ComingSoonFront'} component={ComingSoonFront} /> */}
            </Switch>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render((
  <App />
), document.getElementById('root'));
