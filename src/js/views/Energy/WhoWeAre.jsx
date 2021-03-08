import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import UrlHelper from '../../helpers/UrlHelper';

class WhoWeAre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postcode: ''
    };
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  handleSubmitPostcode(event) {
    event.preventDefault();
    const { postcode } = this.state;
    if (!postcode) {
      return;
    }
    this.props.history.push(UrlHelper.getMainUrl(`energy/plans-pricing?postcode=${postcode}`));
  }

  render() {
    return (
      <div>
        {/* Power of the movement */}
        <div className="mb-5">
          <h3 className="font-weight-extra-bold">We’re taking on the big energy companies</h3>
          <p>We are union, just like you, and we’re tired of paying huge energy bills to line the pockets of big business. So we came up with a way to change the rules around energy and cut big business profits out of our energy bills; we created our own energy provider.</p>
          <p>We believe union members deserve affordable energy without the misleading discounts, price gouging and hidden fees so we have developed a member only electricity offer to deliver just that. It’s called Union Saver and it’s available to all households with a card-carrying member of the union movement.</p>
        </div>

        <div className="mb-5">
          <h3 className="font-weight-extra-bold">We’re using the power of the movement to keep your energy prices down</h3>
          <p>Some energy providers resell an existing retailers’ product, meaning much of what you pay is going towards retailer profits. But at uPoint Energy, we’re using the unions collective purchasing power to negotiate great wholesale electricity rates for union members. You’ll be getting the same high-quality electricity supply, just at an affordable price.</p>
          <p>Better yet, all profits from the sale of electricity are returned to our unions and the movement so you’ll reap the benefits and help grow the movement just by switching energy providers.</p>
        </div>

        <div className="mb-5">
          <h3 className="font-weight-extra-bold">We’re all about strength in numbers</h3>
          <p>As our uPoint Energy member base grows, we’ll need to buy more energy to meet demand. And as we buy in bulk from the wholesale market, the more we buy, the better price we’ll be able to pass on to our members.</p>
          <p>We’re 100% Australian owned and operated and we strongly support creating more local union jobs so you know when you’re speaking with us, you’re speaking to one of your own.</p>
          <p>We have just launched with electricity for residential customers in Victoria and New South Wales with a view to expand into South Australia and Queensland within the next year.</p>
          <p>We strongly believe in what we’re doing here, and we hope you do too.</p>
          <p>Give us a call on <a href="tel:+1300667637">1300 667 637</a> to sign up today.</p>
        </div>
      </div>
    );
  }
}

export default withRouter(WhoWeAre);
