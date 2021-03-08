import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class About extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className={'page--about'}>

        {/* HERO SECTION */}
        <div
          className={'section section--hero'}
          style={{
            backgroundImage: "url('/img/media/about.jpg')"
          }}
        >
          <div className={'container'}>
            <h1 className={'hero-title'}>Why uPoint?</h1>
            <span className={'hero-description'}>Because uPoint means a collective bargain for all of us!</span>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className={'section section--triangle-left'}>
          <div className={'container'}>
            <div className={'row d-flex align-items-center'}>
              <div className={'col-md-8 col-sm-12'}>
                <p><b>uPoint has been created by the union movement for the union movement. Using our collective purchasing power uPoint is able to negotiate great deals for union members for high quality services and products.</b></p>
                <p>Normally when you pay less, you get less, but with uPoint you pay less to get even better quality goods and services than you’re paying for now. uPoint has patnered with leading Australian brands to bring you only the best coverage, prices, and service.</p>
                <p>All you have to do is enter your union membership number to start enjoying great prices for top services. uPoint means a collective bargain for all of us.</p>
              </div>
              <div className={'col-md-4 col-sm-12 text-center'}>
                <img
                  src={'/img/media/people_money.png'}
                  alt={'People money'}
                  style={{
                    maxWidth: '250px'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* GIVING BACK SECTION */}
        <div className={'section section--secondary'}>
          <div className={'container'}>
            <h3 className={'section-item section-title font-weight-extra-bold title-underlined-primary text-center'}>Giving Back</h3>
            <div className="section-item text-center pb-md-4">
              <p>uPoint is not only committed to reducing utility bills and easing the cost of living pressures of members, we're also committed to giving back to the movement with a significant portion of revenue directed to your union or nominated charity. So not only do you get better deal for even better goods and services, you also help create a better society.</p>
              <p><b>When you join uPoint you'll have the option to say where you'd like to see the profits put to good use.</b></p>
            </div>
            <div className="row">
              <div className="col-12 col-md-4">
                <p>
                  To demonstrate the power of uPoint's offering here's a look at what you would receive normally in comparison to using uPoint:
                </p>
              </div>
              <div className="col-12 col-md-8">
                <div className="panel panel--primary">
                  <div className="panel-body p-3">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="border-top-0" />
                          <th className="border-top-0">
                            Other Telco 
                          </th>
                          <th className="border-top-0">
                            <img
                              src={'/img/media/upoint.png'}
                              style={{
                                width: 'auto',
                                height: '24px'
                              }}
                              alt=""
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Plan</strong></td>
                          <td>MX</td>
                          <td className="text-primary"><strong>Max Plan</strong></td>
                        </tr>
                        <tr>
                          <td><strong>Cost</strong></td>
                          <td>$49</td>
                          <td className="text-primary"><strong>$50</strong></td>
                        </tr>
                        <tr>
                          <td><strong>Calls</strong></td>
                          <td>Unlimited</td>
                          <td className="text-primary"><strong>Unlimited</strong></td>
                        </tr>
                        <tr>
                          <td><strong>Texts</strong></td>
                          <td>Unlimited</td>
                          <td className="text-primary"><strong>Unlimited</strong></td>
                        </tr>
                        <tr>
                          <td><strong>Data</strong></td>
                          <td>10gb</td>
                          <td className="text-primary"><strong>20gb</strong></td>
                        </tr>
                        <tr>
                          <td><strong>International Calls</strong></td>
                          <td>None</td>
                          <td className="text-primary"><strong>300 minutes *</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  className="panel panel--primary"
                  style={
                    {
                      borderColor: '#ed6348'
                    }
                  }
                >
                  <div className="panel-body p-4">
                    *Included international call value* - receive 300 minutes every month to call landlines in 26 countries. Unused minutes expires each month and cannot be used while roaming overseas. 
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NETWORK SECTION */}
        <div className="section">
          <div className="container">
            <h3 className={'section-item section-title font-weight-extra-bold title-underlined-primary text-center'}>Network</h3>
            <div className="section-item text-center">
              At uPoint, we know the importance of remaining online and in touch. Our mobile service offering uses parts of a 4G and 3G network, providing the greatest coverage possible for all Australians.
            </div>
            <iframe
              title="Network"
              style={{
                display: 'block',
                minHeight: '860px',
                maxWidth: '770px',
                width: '100%',
                margin: 'auto',
                border: 0
              }}
              src="https://mobilemaps.net.au/maps/mcm/4G.html" />
          </div>
        </div>

        {/* SERVICE SECTION */}
        <div className={'section section--secondary'}>
          <div className={'container'}>
            <div className={'row d-flex'}>
              <div className={'col-lg-4 col-md-6 col-sm-12'}>
                <div className={'panel panel--primary'}>
                  <div className={'panel-body text-center px-4'}>
                    <p
                      style={{
                        lineHeight: 2
                      }}
                    >
                      Using the collective buying power of the entire union movement, you can enjoy reduced costs for superior services, such as 4G mobile, NBN and affordable electricity.
                    </p>
                  </div>
                </div>
              </div>
              <div className={'col-lg-8 col-md-6 col-sm-12 pl-lg-5'}>
                <h3 className={'title-underlined-primary text-center font-weight-bold mb-5'}>What will union members get serious discounts on?</h3>
                <div className={'row align-items-center'}>
                  <div className={'col-sm-12 col-md-6 col-lg-4'}>
                    <div className={'d-flex align-items-center mb-5'}>
                      <img
                        src={'/img/icons/mobile.svg'}
                        alt={'Mobile phone plans'}
                        className={'mr-3'}
                        style={
                          {
                            height: '70px',
                            width: '40px'
                          }
                        }
                      />
                      <h4 className={'text-primary font-weight-bold'}>Mobile phone plans</h4>
                    </div>
                  </div>
                  <div className={'col-sm-12 col-md-6 col-lg-4'}>
                    <div className={'d-flex align-items-center mb-5'}>
                      <img
                        src={'/img/icons/wifi.svg'}
                        alt={'NBN plans'}
                        className={'mr-3'}
                        style={
                          {
                            height: '43px',
                            width: '56px'
                          }
                        }
                      />
                      <h4 className={'text-primary font-weight-bold'}>NBN plans</h4>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JOINT CARD SECTION */}
        <div className={'section section--light'}>
          <div className={'container'}>
            <div className={'join-card'}>
              <div
                className={'join-card-thumbnail'}
                style={{
                  backgroundImage: 'url("/img/media/builder.jpg")'
                }}
              />
              <div className={'join-card-content'}>
                <h2 className={'join-title title-underlined-primary text-center'}>Join uPoint</h2>
                <div className={'join-description'}>
                  Start enjoying cheaper prices on a range of products and services.
                </div>
                <div className={'join-action'}>
                  <NavLink className="btn btn-primary" to={UrlHelper.getMainUrl('register')}>
                    Find out more
                  </NavLink>
                </div>
                <div className={'join-action'}>
                  <NavLink to={UrlHelper.getMainUrl('')}><small>Not a union member?</small></NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COMPANY SECTION */}
        <div className={'section section-default'}>
          <div className={'container'}>
            <div className={'section-item text-center'}>
              <img
                className="mx-4 my-2"
                src={'/img/media/telcoinabox.png'}
                alt={'telcoinabox'}
                style={{
                  width: '265px',
                  height: '75px'
                }}
              />
              <img
                className="mx-4 my-2"
                src={'/img/media/actu.png'}
                alt={'actu'}
                style={{
                  width: '230px',
                  height: '50px'
                }}
              />
              {/* <img
                className="mx-4 my-2"
                src={'/img/media/cfmeu.png'}
                alt={'cfmeu'}
                style={{
                  width: '222px',
                  height: '41px'
                }}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
