/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Cell extends Component {
  render() {
    if (this.props.matrix) {
      let css = "m5-cell-content ";
    
      css += this.props.matrix[this.props.y][this.props.x] ? "m5-ball " : "";
    
      return <div className={css} onClick={() => this.handleClick()}></div>
    }
  }
  
  handleClick() {
    console.log(`cell[${this.props.y}][${this.props.x}] was clicked`);
  }
  
  static mapStateToProps({matrix}) {
    return {matrix};
  }
}

export default connect(Cell.mapStateToProps)(Cell);
