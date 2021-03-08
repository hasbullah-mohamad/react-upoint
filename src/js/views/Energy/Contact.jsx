import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import Menu from '../../components/Menu';
import UrlHelper from '../../helpers/UrlHelper';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_address: '',
      phone_number: '',
      message: ''
    };
  }

  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    return (
      <div className={'row'}>
        <div className="col-xl-12 mb-4">
          If you can’t find the answer to your query on our <NavLink to={UrlHelper.getMainUrl('energy/help')}>help page</NavLink>, get in touch via one of our contact methods below.
        </div>
        <div className={'col-xl-5'}>
          <h3 className={'title-underlined-primary font-weight-extra-bold mb-4'}>Phone</h3>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Member sign ups</h5>
            <a href="tel:+611300667637">1300 667 637</a><br />
            (Monday to Thursday 11am-7pm and Friday 9.30am-5.30pm AEST)
          </p>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Member support</h5>
            <a href="tel:611300365205">1300 365 205</a><br />
            (Monday to Friday 8.30am-6pm AEST)
          </p>

          <h3 className={'mt-5 title-underlined-primary font-weight-extra-bold mb-4'}>Write to us</h3>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Email</h5>
            <a href="mailto:sales@upointenergy.com.au">sales@upointenergy.com.au</a><br />
            or<br />
            <a href="mailto:support@upointenergy.com.au">support@upointenergy.com.au</a>
          </p>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Post</h5>
            uPoint Energy, <br />
            132 Cremorne Street, <br />
            Cremorne, <br />
            VIC, 3121
          </p>
        </div>
        <div className={'col-xl-7'}>
          <div className={'panel panel--primary'}>
            <div className={'panel-body'}>
              <h3 className={'panel-title title-underlined-primary text-center font-weight-extra-bold'}>Get in touch now</h3>
              <form>
                <div className={'form-group'}>
                  <label htmlFor={'contact_name'}>Name*</label>
                  <input
                    className={'form-control'}
                    type={'text'}
                    name={'name'}
                    id={'contact_name'}
                    onChange={this.handleChange.bind(this, 'name')}
                  />
                </div>
                <div className={'form-group'}>
                  <label htmlFor={'contact_email'}>Email*</label>
                  <input
                    className={'form-control'}
                    type={'email'}
                    name={'email'}
                    id={'contact_email'}
                    value={this.state.email}
                    onChange={this.handleChange.bind(this, 'email')}
                  />
                </div>
                <div className={'form-group'}>
                  <label htmlFor={'contact_phone_number'}>Phone number</label>
                  <input
                    className={'form-control'}
                    type={'text'}
                    name={'phone_number'}
                    id={'contact_phone_number'}
                    value={this.state.phone_number}
                    onChange={this.handleChange.bind(this, 'phone_number')}
                  />
                </div>
                <div className={'form-group'}>
                  <label htmlFor={'contact_message'}>Message</label>
                  <textarea
                    className={'form-control'}
                    name={'message'}
                    rows={5}
                    id={'contact_message'}
                    value={this.state.message}
                    onChange={this.handleChange.bind(this, 'message')}
                  />
                </div>
                <div className={'form-group text-center mt-5'}>
                  <button
                    className={'btn btn-primary'}
                    type={'button'}
                    onClick={() => {}}>
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
