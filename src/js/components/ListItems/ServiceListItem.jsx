import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';

class ServiceListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: this.selectData(props.data, props.list)
    };
  }
  componentWillReceiveProps(props) {
    this.setState({
      selectedData: this.selectData(props.data, props.list)
    });
  }
  selectData(data, list) {
    if (!data || !list) {
      return {};
    }

    for (let i = 0, ni = list.length; i < ni; i++) {
      if (list[i].id === data.id) {
        return list[i];
      }
    }
    return {};
  }
  calculatePercent(current, total) {
    return Math.ceil((current / total) * 100);
  }

  buildNumber(item) {
    const number = item.service_number || item.number;
    return number || 'INACTIVE';
  }

  buildLabel(item) {
    return item.label ? `${item.plan.name} • ${item.label}` : item.plan.name;
  }

  renderItem() {
    const { data, list, onItemChange } = this.props;
    const {
      selectedData
    } = this.state;
    
    let { onClick } = this.props;
    if (!data.activated && !selectedData.activated) {
      onClick = () => {};
    }
    const classnameTitle = type => (`font-weight-bold text-${type}`);
    if (list && list.length > 0) {
      return (
        <UncontrolledDropdown className="mx-md-4 my-3 dropdown--service">
          <DropdownToggle
            caret
            className="d-flex px-3 py-2 align-items-center border"
          >
            <div className={'mr-3'}>
              {/* <img src={data.sim.src} style={{ width: '54px', height: 'auto' }} alt={'sim'} /> */}
              <img src={'/img/icons/mobile.svg'} style={{ width: '32px', height: '53px' }} alt={'sim'} />
            </div>
            <div className="text-left">
              <h3 className={'text-info font-weight-extra-bold mb-0'}>{this.buildNumber(data)}</h3>
              <span className={classnameTitle(data.plan.type)}>{this.buildLabel(data)}</span>
            </div>
          </DropdownToggle>
          <DropdownMenu className="w-100 p-0">
            {
              list.map((item, index) => (
                <DropdownItem className="d-flex px-3 px-2 align-items-center border-top" key={index} onClick={() => { onItemChange(item); }}>
                  <div className={'mr-3'}>
                    {/* <img src={item.sim.src} style={{ width: '54px', height: 'auto' }} alt={'sim'} /> */}
                    <img src={'/img/icons/mobile.svg'} style={{ width: '32px', height: '53px' }} alt={'sim'} />
                  </div>
                  <div>
                    <h3 className={'text-info font-weight-extra-bold mb-0'}>{this.buildNumber(item)}</h3>
                    <span className={classnameTitle(item.plan.type)}>{this.buildLabel(item)}</span>
                  </div>
                </DropdownItem>
              ))
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }
    return (
      <div className="mx-md-4 my-3 align-items-center dropdown--service dropdown dropdown--caret-left" onClick={onClick}>
        <div className="d-flex d-flex px-3 py-2 dropdown-toggle border">
          <div className={'mr-3'}>
            {/* <img src={data.sim.src} style={{ width: '54px', height: 'auto' }} alt={'sim'} /> */}
            <img src={'/img/icons/mobile.svg'} style={{ width: '32px', height: '53px' }} alt={'sim'} />
          </div>
          <div>
            <h3 className={'text-info font-weight-extra-bold mb-0'}>{this.buildNumber(data)}</h3>
            <span className={'text-primary font-weight-bold'}>{this.buildLabel(data)}</span>
          </div>
        </div>
      </div>
    );
  }

  renderRightSidebar() {
    const { data } = this.props;
    const { selectedData } = this.state;

    // hide usage for the time being
    let resultData = data;
    if (selectedData.activated) {
      resultData = selectedData;
    }

    let unusedBandwith = resultData.usage.total_bandwidth_mb;

    if (unusedBandwith > 1000) {
      unusedBandwith = `${unusedBandwith / 1000}GB`;
    } else {
      unusedBandwith += 'MB';
    }

    if (data.activating || selectedData.activating) {
      return (
        <div className="d-flex px-3 px-md-5 py-2 py-md-3 align-items-center">
          <span className={'text-primary'}>Activation in progress</span>
        </div>
      );
    }

    if (data.failed || selectedData.failed) {
      return (
        <div className="d-flex px-3 px-md-5 py-2 py-md-3 align-items-center">
          <span className={'text-danger'}>Activation failed</span>
          <div className={'position-relative ml-3'}>
            <button className={'btn btn-primary'} onClick={this.props.onActivate}>Retry</button>
          </div>
        </div>
      );
    }

    if (!data.activated && !selectedData.activated) {
      return (
        <div className="d-flex px-3 px-md-5 py-2 py-md-3 align-items-center">
          { <button className={'btn btn-primary'} onClick={this.props.onActivate}>Activate</button> }
        </div>
      );
    }

    return (
      <div className="d-flex px-3 px-md-5 py-2 py-md-3 align-items-center">
        <h4 className={'text-info'}>${resultData.plan.price} per month</h4>
        <div
          className={'position-relative ml-3'}
          style={{
            width: '100px',
            height: '100px'
          }}
        >
          <CircularProgressbar
            percentage={this.calculatePercent(resultData.usage.used_monthly_mb, resultData.usage.total_bandwidth_mb)}
            strokeWidth={10}
            textForPercentage={() => {}}
          />
          <div className={'position-absolute fixed-top h-100 w-100 d-flex justify-content-center align-items-center'}>
            <span className={'text-center font-size-sm font-weight-bold'}>{ unusedBandwith }<br /></span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div
        className={'d-flex flex-column flex-md-row bg-white justify-content-between align-items-center'}>
        {this.renderItem()}
        {this.renderRightSidebar()}
      </div>
    );
  }
}

ServiceListItem.defaultProps = {
  data: {},
  list: [],
  onClick: () => {},
  onActivate: () => {},
  onItemChange: () => {}
};

export default ServiceListItem;
