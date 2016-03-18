import React from 'react';

export default class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: 0,
        height: 0,
        top: 0,
        left: 0
      }
    };
  }
  render() {
    return (
      <div className={this.props.className + '-container'}>
        <img {...this.props}
          onLoad={this.afterLoad.bind(this)}
          style={this.state.style} />
      </div>
    );
  }
  getNaturalDimensions(el) {
    return ({
      ow: el.naturalWidth,
      oh: el.naturalHeight,
      ratio: el.naturalWidth / el.naturalHeight
    });
  }
  getParentDimensions(el) {
    const parent = el.parentNode;
    return ({
      pw: parent.clientWidth,
      ph: parent.clientHeight,
      pratio: parent.clientWidth / parent.clientHeight
    });
  }
  cover(el) {
    const { ow, oh, ratio } = this.getNaturalDimensions(el);
    const { pw, ph, pratio} = this.getParentDimensions(el);
    var width, height, top = 0, left = 0;
    if (ratio > pratio) {
      height = ph;
      width = height * ratio;
      left = (pw - width) / 2;
    } else {
      width = pw;
      height = width / ratio;
      top = (ph - height / 2);
    }
    this.setState({
      style: {
        width,
        height,
        top,
        left
      }
    });
  }
  afterLoad(e) {
    this.cover(e.target);
  }
}