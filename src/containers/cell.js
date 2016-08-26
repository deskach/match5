/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {
  doSetActiveBall,
  doResetActiveBall,
  doMoveBall,
  doAddBalls
} from "../actions/index";

class Cell extends Component {
  constructor(props) {
    super(props);
    
    this._el = this.props.matrix[this.props.y][this.props.x];
  }
  
  render() {
    let css = "m5-cell-content ";
    let color = {};
  
    if (this._el) {
      css += "m5-ball ";
      color = {
        backgroundColor: this._el.color,
      };
    }
  
    return <div className={css}
                onClick={() => this.handleClick()}
                style={color}></div>
  }
  
  handleClick() {
    if (this._el) {
      this.props.doSetActiveBall(this.props.x, this.props.y);
    } else if (this.props.activeBall) {
      this.props.doMoveBall(this.props.activeBall.x, this.props.activeBall.y,
        this.props.x, this.props.y
      );
      this.props.doResetActiveBall();
      this.props.doAddBalls();
    }
  }
  
  static mapStateToProps({matrix, activeBall}) {
    return {matrix, activeBall};
  }
}

export default connect(Cell.mapStateToProps, {
  doResetActiveBall,
  doSetActiveBall,
  doMoveBall,
  doAddBalls,
})(Cell);
