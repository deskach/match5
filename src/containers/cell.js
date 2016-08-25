/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {doMoveActiveBall2, doSetActiveBall} from "../actions/index";

class Cell extends Component {
  constructor(props) {
    super(props);
    
    this._el = this.props.matrix[this.props.y][this.props.x];
  }
  
  render() {
    let css = "m5-cell-content " + (this._el ? "m5-ball " : "");
  
    return <div className={css} onClick={() => this.handleClick()}></div>
  }
  
  handleClick() {
    console.log(`cell[${this.props.y}][${this.props.x}] was clicked`);
  
    if (this._el) {
      this.props.doSetActiveBall(this.props.x, this.props.y);
    } else {
      this.props.doMoveActiveBall2(this.props.x, this.props.y);
    }
  }
  
  static mapStateToProps(state) {
    return {matrix: state.game && state.game.matrix};
  }
}

export default connect(Cell.mapStateToProps, {
  doMoveActiveBall2,
  doSetActiveBall
})(Cell);
