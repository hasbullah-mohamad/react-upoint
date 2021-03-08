import React, { Component } from 'react';

let segmentRef = 0;

class Segment extends Component {
  constructor(props) {
    super(props);
    segmentRef++;
    this.segmentId = `segment_${segmentRef}`;
    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
    this.props.onChange(event);
  }

  render() {
    const { type, data, name } = this.props;
    const renderItems = data.map(
      (item, index) => {
        const segmentItemId = `${this.segmentId}_${index}`;
        return (
          <li key={`${index}`}>
            <input
              type={'radio'}
              name={name}
              value={item.value}
              checked={this.state.value === item.value}
              id={segmentItemId}
              onChange={this.handleChange.bind(this)}
            />
            <label htmlFor={segmentItemId}>
              {item.title}
            </label>
          </li>
        );
      },
    );

    return (
      <ul className={`segment segment--${type}`}>
        {renderItems}
      </ul>
    );
  }
}

Segment.defaultProps = {
  type: 'primary',
  data: [],
  value: '',
  name: 'segment',
  onChange: () => {},
};

export default Segment;
