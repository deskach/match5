/**
 * Created by Dzianis on 25/08/2016.
 */
import React, { Component, PropTypes } from 'react'

export default class Cell extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    ball: PropTypes.any,
    onClick: PropTypes.func.isRequired
  };

  render() {
    let css = "m5-cell-content ";
    let color = {};
    
    if (this.props.ball) {
      css += "m5-ball ";
      color = {
        backgroundColor: this.props.ball.color,
      };
    }
    
    return <div className={css}
                onClick={() => this.props.onClick(this.props.x, this.props.y)}
                style={color}></div>
  }
}
