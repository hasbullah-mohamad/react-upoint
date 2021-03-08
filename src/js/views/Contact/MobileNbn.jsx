import React, { Component } from 'react';

class MobileNbn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email_address: '',
      phone_number: '',
      message: ''
    };
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    return (
      <div className={'row'}>
        <div className={'col-md-5 pr-lg-5'}>
          <h3 className={'title-underlined-primary font-weight-extra-bold mb-4'}>Phone</h3>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Mobile &amp; NBN - Sales</h5>
            <a href="tel:+611300156556">1300 156 556</a><br />
            (Monday to Thursday 9am-6pm and Friday 9am-5pm AEST)
          </p>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Mobile &amp; NBN - Accounts &amp; Billing</h5>
            <a href="tel:+611300156556">1300 156 556</a><br />
            (Monday to Thursday 9am-6pm and Friday 9am-5pm AEST)
          </p>

          <h3 className={'mt-5 title-underlined-primary font-weight-extra-bold mb-4'}>Write to us</h3>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Email</h5>
            <a href="mailto:support@upoint.com.au">support@upoint.com.au</a>
          </p>
          <p className={'font-size-base'}>
            <h5 className={'font-weight-extra-bold'}>Post</h5>
            TBC
            {/* uPoint Energy, <br />
            132 Cremorne Street, <br />
            Cremorne, <br />
            VIC, 3121 */}
          </p>
        </div>
        <div className={'col-md-7'}>
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

export default MobileNbn;
