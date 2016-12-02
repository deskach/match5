/** * Created by Dzianis on 27/08/2016.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Board from '../components/board'
import { getFreeSpots } from '../domain/utils'
import { doSetActiveBall, doMoveBall, doResetActiveBall, doInitMatrix, doAddBalls } from '../actions/index'

class Game extends Component {
  static propTypes = {
    maxX: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired,
    numOfBalls2Add: PropTypes.number.isRequired,
  };

  state = { score: 0 };
  _ballCount = 0;

  componentWillMount() {
    this.props.doInitMatrix(this.props.maxX, this.props.maxY);
    this.props.doAddBalls(this.props.numOfBalls2Add);
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
    return (
      <div>
        <h1>Score: {this.state.score}</h1>
        <Board maxX={this.props.maxX} maxY={this.props.maxY}
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
