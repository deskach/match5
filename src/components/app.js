import React, {Component} from "react";
import Board from "../containers/board";

export default class App extends Component {
  render() {
    return <Board maxX={10} maxY={10}/>
  }
}
