/**
 * Created by Dzianis on 27/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import Board from "../components/board";
import domConsts from "../domain/constants";
import {getFreeSpots} from "../domain/utils";
import {
  doSetActiveBall,
  doMoveBall,
  doResetActiveBall,
  doInitMatrix,
  doAddBalls
} from "../actions/index";

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {score: 0};
    this._ballCount = 0;
  }
  
  componentWillMount() {
    this.props.doInitMatrix(domConsts.MAX_X, domConsts.MAX_Y);
    this.props.doAddBalls();
    this.props.doResetActiveBall();
  }
  
  componentDidUpdate() {
    const matSize = domConsts.MAX_X * domConsts.MAX_Y;
    const newBallCount = matSize - getFreeSpots(this.props.matrix).length;
    
    if (this._ballCount > newBallCount) {
      const newScore = this.state.score + 2 * (this._ballCount - newBallCount);
      
      this.setState({score: newScore});
    }
    
    this._ballCount = newBallCount;
  }
  
  render() {
    return (
      <div>
        <h1>Score: {this.state.score}</h1>
        <Board maxX={domConsts.MAX_X} maxY={domConsts.MAX_Y}
               matrix={this.props.matrix}
               onCellClick={this.onCellClick.bind(this)}/>
      </div>
    );
  }
  
  onCellClick(x, y) {
    if (this.props.matrix[y][x]) {
      this.props.doSetActiveBall(x, y);
    } else if (this.props.activeBall) {
      const [abx, aby] = [this.props.activeBall.x, this.props.activeBall.y];
      
      this.props.doMoveBall(abx, aby, x, y);
      this.props.doResetActiveBall();
    }
  }
  
  static mapStateToProps({matrix, activeBall}) {
    return {matrix, activeBall};
  }
}

export default connect(Game.mapStateToProps, {
  doInitMatrix,
  doResetActiveBall,
  doAddBalls,
  doSetActiveBall,
  doMoveBall,
})(Game);
