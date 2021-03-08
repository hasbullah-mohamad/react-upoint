import React, { Component } from 'react';
import Slick from 'react-slick';
import { Switch, Route, withRouter } from 'react-router-dom';
import { NavHashLink as NavLink } from 'react-router-hash-link';

import Pack from '../../components/Pack';
import { Tooltip } from '../../components/Tooltip';

import MobileNbnPacks from './MobileNbnPacks';
import UrlHelper from '../../helpers/UrlHelper';

class Cfmeu extends Component {
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
      <div className={'page page--cfmeu'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: 'url("/img/media/cfmeu-hero.jpg")'
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
            <h1 className={'hero-title'}>Cut out big business from your bills. Join uPoint.</h1>
            <span className={'hero-description'}>The CFMEU has partnered with uPoint to bring our members collective bargains.</span>
          </div>
          <div className={'cover'} />
        </div>

        {/* PRICING TABLE SECTION */}
        <div className={'section section--secondary section--triangle-right'}>
          <div className={'container'}>
            <div className={'cfmeu mx-md-6 pb-md-5'}>
              <div className={'text-center mx-md-6 mb-4'}>
                <h3 className={'font-weight-semi-bold'}>uPoint uses our collective power to get you a better deal on the electricity, mobile and NBN – and it’s only for union members.</h3>
              </div>
              <div className={'cfmeu-content text-center mx-md-5 mb-5'}>
                <h5 className={'font-weight-normal'}>
                  CFMEU has started our own company to cut out the middleman and get the benefits for you instead of paying out huge profits to big business. Normally when you pay less, you get less, but with uPoint you pay less to get the same quality services like the coverage of Australia’s largest mobile network. To start saving you just need your&nbsp;
                  <span className={'tooltip--text font-weight-bold'}>CFMEU member number</span>.
                  <Tooltip text="Your CFMEU member number to access uPoint has been sent to you by email, SMS and in the post. If you haven’t got your member number call your CFMEU branch/district office and ask for it." />
                </h5>
              </div>
              <div className={'text-center mb-6'}>
                <NavLink className={'btn btn-primary'} to={UrlHelper.getMainUrl('register')}>Join Now</NavLink>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-3 mb-4">
                <div className="card-cfmeu">
                  <div className="card-header bg-primary">
                    <div className="card-header-icon">
                      <img src="/img/icons/upoint_mobile.svg" alt="upoint-mobile" />
                    </div>
                    <h5 className="text-white font-weight-semi-bold">uPoint Mobile</h5>
                  </div>
                  <div className="card-bottom bg-white">
                    <NavLink
                      className={'btn btn-primary'}
                      to={UrlHelper.getMainUrl('cfmeu#mobile')}
                      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Find out more</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 mb-4">
                <div className="card-cfmeu">
                  <div className="card-header bg-success">
                    <div className="card-header-icon">
                      <img src="/img/icons/upoint_energy_heading.svg" alt="upoint-mobile" />
                    </div>
                    <h5 className="text-white font-weight-semi-bold">uPoint Energy</h5>
                  </div>
                  <div className="card-bottom bg-white">
                    <NavLink
                      className={'btn btn-success'}
                      to={UrlHelper.getMainUrl('cfmeu#energy')}
                      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Find out more</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 mb-4">
                <div className="card-cfmeu">
                  <div className="card-header bg-purple">
                    <div className="card-header-icon">
                      <img src="/img/icons/upoint_nbn.svg" alt="upoint-mobile" />
                    </div>
                    <h5 className="text-white font-weight-semi-bold">uPoint NBN</h5>
                  </div>
                  <div className="card-bottom bg-white">
                    <NavLink
                      className={'btn btn-purple'}
                      to={UrlHelper.getMainUrl('cfmeu#nbn')}
                      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Find out more</NavLink>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3 mb-4">
                <div className="card-cfmeu">
                  <div className="card-header bg-red">
                    <div className="card-header-icon">
                      <img src="/img/icons/upoint_advantage.svg" alt="upoint-mobile" />
                    </div>
                    <h5 className="text-white font-weight-semi-bold">Member Advantage</h5>
                  </div>
                  <div className="card-bottom bg-white">
                    <NavLink
                      className={'btn btn-red'}
                      to={UrlHelper.getMainUrl('cfmeu#member-advantage')}
                      scroll={el => el.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Find out more</NavLink>
                  </div>
                </div>
              </div>
            </div>
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
                    alt={'Giving Back'}
                    title={'Giving Back'}
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
        <div className={'section section-secondary'}>
          <div className={'container'}>
            <Switch>
              <Route exact path={UrlHelper.getMainUrl('cfmeu')} title={'Mobile & NBN'} component={MobileNbnPacks} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Cfmeu);
