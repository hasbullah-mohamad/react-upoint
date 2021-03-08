import React, { Component } from 'react';

class Pack extends Component {
  render() {
    const { className, src, alt, title, description, scale, onClick } = this.props;
    const imgStyle = {
      transform: `scale(${scale})`
    };
    return (
      <div className={`pack ${className}`} onClick={onClick}>
        {
          src ? (
            <div className={'pack-icon'} style={imgStyle}>
              <img src={src} alt={alt} />
            </div>
          ) : null
        }
        <div className={'pack-content'}>
          {
            title ? (
              <div className={'pack-title'}>{title}</div>
            ) : null
          }
          {
            description ? (
              <div className={'pack-description'}>{description}</div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

Pack.defaultProps = {
  className: '',
  alt: '',
  src: '/img/media/sim1.png',
  title: 'Buy a SIM',
  scale: 1,
  description: '',
  onClick: () => {}
};

export default Pack;
