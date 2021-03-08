import React, { Component } from 'react';
import Slick from 'react-slick';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';

import Pack from '../../components/Pack';
import Menu from '../../components/Menu';

import MobileNbnPacks from './MobileNbnPacks';
import ElectricityGas from './ElectricityGas';
import FinanceInsurance from './FinanceInsurance';
import OtherDeals from './OtherDeals';
import UrlHelper from '../../helpers/UrlHelper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack_type: 'mobile-packs',
      residence_type: 'a' // 'a' or 'b'
    };
  }

  componentDidMount() {
    document.body.classList.add('nav-transparent');
  }

  componentWillUnmount() {
    document.body.classList.remove('nav-transparent');
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className={'page page--home'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/home.jpg")',
            backgroundPosition: '70% 30%'
          }}>
          <Slick
            fade
            className="slick--home-hero"
            slidesToShow={1}
            slidesToScroll={1}
            arrows={false}
            autoplaySpeed={6000}
            autoplay
            dots
          >
            <div>
              <div
                className="slick-item"
                style={{
                  backgroundImage: 'url("/img/media/cfmeu_hero_1.jpg")'
                }} />
            </div>
            <div>
              <div
                className="slick-item"
                style={{
                  backgroundImage: 'url("/img/media/cfmeu_hero_2.jpg")'
                }} />
            </div>
            <div>
              <div
                className="slick-item"
                style={{
                  backgroundImage: 'url("/img/media/cfmeu_hero_3.jpg")'
                }} />
            </div>
            <div>
              <div
                className="slick-item"
                style={{
                  backgroundImage: 'url("/img/media/cfmeu_hero_4.jpg")',
                  backgroundPosition: '70% center'
                }} />
            </div>
          </Slick>
          <div className={'container'}>
            <h1 className={'hero-title'}>Look how you benefit from being in a union!</h1>
            <span className={'hero-description'}>Great deals on mobile plans, NBN internet, and electricity</span>
            <div className={'hero-hint'}>
              <NavLink className={'btn btn-primary'} to={UrlHelper.getMainUrl('register')}>Join Upoint</NavLink>
            </div>
          </div>
          <div className={'cover'} />
        </div>

        {/* PRICING TABLE SECTION */}
        <div className={'section section--top section--secondary section--triangle-right'}>
          <div className={'container'}>
            <Menu
              className={'menu menu--tabs mt-lg-4'}
              data={[
                {
                  to: UrlHelper.getMainUrl(''),
                  exact: true,
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_mobile.svg') }} />
                      <div style={{ flex: 1 }}>
                        Mobile &amp; NBN
                      </div>
                    </div>
                  ),
                  className: 'menu-item--primary'
                },
                {
                  to: UrlHelper.getMainUrl('electricity-gas'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_energy.svg') }} />
                      <div style={{ flex: 1 }}>
                        Electricity
                      </div>
                    </div>
                  ),
                  className: 'menu-item--success'
                },
                {
                  to: UrlHelper.getMainUrl('finance-insurance'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_insurance.svg') }} />
                      <div style={{ flex: 1 }}>
                        Finance &amp; Insurance
                      </div>
                    </div>
                  ),
                  className: 'menu-item--danger'
                },
                {
                  to: UrlHelper.getMainUrl('other-deals'),
                  title: (
                    <div className="d-flex align-items-center">
                      <div className={'menu-icon'} dangerouslySetInnerHTML={{ __html: require('../../../img/icons/upoint_advantage.svg') }} />
                      <div style={{ flex: 1 }}>
                        Other Deals
                      </div>
                    </div>
                  ),
                  className: 'menu-item--cyan'
                }
              ]}
            />
            <Switch>
              <Route exact path={UrlHelper.getMainUrl('')} title={'Mobile & Nbn'} component={MobileNbnPacks} />
              <Route path={UrlHelper.getMainUrl('electricity-gas')} title={'Electricity & Gas'} component={ElectricityGas} />
              <Route path={UrlHelper.getMainUrl('finance-insurance')} title={'Finance &amp; Insurance'} component={FinanceInsurance} />
              <Route path={UrlHelper.getMainUrl('other-deals')} title={'Other Deals'} component={OtherDeals} />
            </Switch>
          </div>
        </div>

        {/* PACK SECTION */}
        <div className={'section section--info'}>
          <div className={'container'}>
            <h1 className={'section-title section-item title-responsive'}>The uPoint difference</h1>
            <div className={'section-item'}>
              <Slick
                dots
                slidesToShow={3}
                slidesToScroll={1}
                arrows={false}
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1
                    }
                  }
                ]}
              >
                <div>
                  <Pack
                    src={'/img/icons/cutting_out.svg'}
                    alt={'Cutting out big business'}
                    title={'Cutting out big business'}
                    description={'uPoint is set up to look after us, not the fat cats. Let’s share with each other, not shareholders!'}
                  />
                </div>
                <div>
                  <Pack
                    src={'/img/icons/giving_back.svg'}
                    alt={'Giving back'}
                    title={'Giving back'}
                    description={'Profits go back into your union to grow the movement and make us stronger.'}
                  />
                </div>
                <div>
                  <Pack
                    src={'/img/icons/australian_support.svg'}
                    alt={'Australian support'}
                    title={'Australian support'}
                    scale={2}
                    description={'Manage your account and services easily with the online portal.'}
                  />
                </div>
              </Slick>
            </div>
            <div className={'section-item text-center'}>
              <NavLink className={'btn btn-outline-primary'} to={UrlHelper.getMainUrl('help')}>Find out More</NavLink>
            </div>
          </div>
        </div>

        {/* COMPANY SECTION */}
        <div className={'section section--default section--triangle-left text-center'}>
          <div className={'container'}>
            <h1 className={'section-title section-item title-responsive'}>uPoint uses our collective power to get you a better deal on the best utilities.</h1>
            <div className={'section-item'}>
              We’ve created our own company to cut out the middle man and get benefits for you instead of paying out huge profits to shareholders. Normally when you pay less, you get less, but with uPoint you pay less to get the best quality goods and services, like the coverage of Australia’s largest mobile network.
            </div>
            <div className={'section-item text-center'}>
              <img src={'/img/media/union_logos.png'} alt={'Logos'} style={{ height: 50, width: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
