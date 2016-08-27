import React, {Component} from "react";
import Game from "../containers/game";

export default class App extends Component {
  render() {
    return (
      <div className="m5-mat-wrapper">
        <Game />
      </div>
    )
  }
}
