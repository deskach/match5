/**
 * Created by Dzianis on 25/08/2016.
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {getRandomKey, getFreeSpots} from "../domain/utils";
import {
  doInitMatrix,
  doResetActiveBall,
  doAddBalls,
  doSetActiveBall,
  doMoveBall
} from "../actions/index";
import Cell from "../components/cell";

class Board extends Component {
  constructor(props) {
    super(props);
    
    this.state = {score: 0};
    this._ballCount = 0;
  }
  
  componentWillMount() {
    this.props.doInitMatrix(this.props.maxX, this.props.maxY);
    this.props.doAddBalls();
    this.props.doResetActiveBall();
  }
  
  componentDidUpdate() {
    const matSize = this.props.maxX * this.props.maxY;
    const newBallCount = matSize - getFreeSpots(this.props.matrix).length;
    
    if (this._ballCount > newBallCount) {
      const newScore = this.state.score + 2 * (this._ballCount - newBallCount);
      
      this.setState({score: newScore});
    }
    
    this._ballCount = newBallCount;
  }
  
  render() {
    console.log("Score: " + this.state.score);
    
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
                      onClick={() => this.onCellClick(x, y)}/>
              </div>
            ))}
          </div>
        ))}
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

export default connect(Board.mapStateToProps, {
  doInitMatrix,
  doResetActiveBall,
  doAddBalls,
  doSetActiveBall,
  doMoveBall,
})(Board);
