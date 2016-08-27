/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";

export default class Cell extends Component {
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
                onClick={() => this.props.onClick()}
                style={color}></div>
  }
}
