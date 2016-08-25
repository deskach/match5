/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";

class Cell extends Component {
  render() {
    return (
      <div></div>
    );
  }
  
  static mapStateToProps({matrix}) {
    return {matrix};
  }
}

export default connect(Cell.mapStateToProps)(Cell);
