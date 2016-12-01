import React, {Component} from "react";
import Game from "../containers/game";
import domConstants from "../domain/constants";

export default class App extends Component {
  render() {
    return (
      <div className="m5-mat-wrapper">
        <Game maxX={10} maxY={10} numOfBalls2Add={domConstants.NUMBER_OF_BALLS_2_ADD}/>
      </div>
    )
  }
}
