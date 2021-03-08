import React, { Component } from 'react';

class SelectCard extends Component {
  handleCheck() {
  }
  render() {
    const { className, image, title, onClick } = this.props;

    return (
      <div className={`card-select ${className}`} onClick={onClick}>
        <div className="text-center">
          <span className="card-icon" dangerouslySetInnerHTML={{ __html: image }} />
          <p>{title}</p>
        </div>
      </div>
    );
  }
}

SelectCard.defaultProps = {
  className: 'card-select',
  onClick: () => {}
};

export default SelectCard;
