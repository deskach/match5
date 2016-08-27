/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {getRandomKey} from "../domain/utils";
import Cell from "./cell";

export default class Board extends Component {
  render() {
    if (!this.props.matrix) {
      return <div>Loading...</div>
    }
    
    return (
      <div className="m5-mat"> {
        this.props.matrix.map((el, y) => (
          <div className="m5-mat-row" key={getRandomKey()}> {
            el.map((el1, x) => (
              <div className="m5-mat-cell" key={getRandomKey()}>
                <Cell ball={this.props.matrix[y][x]}
                      x={x} y={y}
                      onClick={this.props.onCellClick}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
