/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {getRandomKey} from "../domain/utils";
import {doInitMatrix} from "../actions/index";
import Cell from "./cell";

class Board extends Component {
  componentWillMount() {
    this.props.doInitMatrix(this.props.maxX, this.props.maxY);
  }
  
  render() {
    if (this.props.matrix) {
      return (
        <div className="m5-mat">{this._renderCell()}</div>
      );
    }
  
    return <div>Loading...</div>
  }
  
  _renderCell() {
    return this.props.matrix.map((el, y) => {
      return (
        <div className="m5-mat-row" key={getRandomKey()}>
          {el.map((el1, x) => (
            <div className="m5-mat-cell" key={getRandomKey()}>
              <Cell x={x} y={y}/>
            </div>
          ))}
        </div>
      );
    })
  }
  
  static mapStateToProps({matrix}) {
    return {matrix};
  }
}

export default connect(Board.mapStateToProps, {doInitMatrix})(Board);
