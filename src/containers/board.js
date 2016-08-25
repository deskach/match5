/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {getRandomKey} from "../domain/utils";

export default class Board extends Component {
  constructor(props) {
    super(props);
    
    const tempArray = (new Array(this.props.maxX)).fill('a');
    
    this.state = {
      matrix: new Array(this.props.maxY).fill(tempArray)
    };
  }
  
  render() {
    return (
      <div className="m5-mat">{this.renderMatrix()}</div>
    );
  }
  
  renderMatrix() {
    return this.state.matrix.map(el => {
      return (
        <div className="m5-mat-row" key={getRandomKey()}>
          {el.map((el1, idx) => (
            <div className="m5-mat-item" key={getRandomKey()}>{idx}</div>
          ))}
        </div>
      );
    })
  }
}
