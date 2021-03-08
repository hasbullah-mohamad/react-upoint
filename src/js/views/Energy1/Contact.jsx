import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class WhoWeAre extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div>
        <h3 className="font-weight-extra-bold">Power of the movement means cheaper energy.</h3>
        <p>uPoint Energy provides you with affordable electricity that supports local union jobs. We’re 100% Australian owned and operated, and we’re using the power of the movement to keep your energy prices down. </p>
      </div>
    );
  }
}

export default WhoWeAre;
