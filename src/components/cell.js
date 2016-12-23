/**
 * Created by Dzianis on 25/08/2016.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Cell extends Component {
  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    ball: PropTypes.any,
    onClick: PropTypes.func.isRequired
  };

  static mapStateToProps ({ activeBall }) {
    return { activeBall };
  }

  render () {
    let css = "m5-cell-content ";
    let color = {};

    if (this.props.ball) {
      css += "m5-ball ";
      color = {
        backgroundColor: this.props.ball.color,
      };

      if(this.props.activeBall &&
          this.props.activeBall.x === this.props.x &&
          this.props.activeBall.y === this.props.y) {
        css += "m5-active-ball";
      }
    }

    return <div className={css}
                onClick={() => this.props.onClick(this.props.x, this.props.y)}
                style={color}></div>
  }
}

export default connect(Cell.mapStateToProps, null)(Cell);
