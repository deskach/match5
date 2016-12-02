/** * Created by Dzianis on 27/08/2016.
 */
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Board from '../components/board'
import { getFreeSpotsInMatrix, findPathInMatrix } from '../domain/utils'
import { doSetActiveBall, doMoveBall, doPushBall, doResetActiveBall, doInitMatrix, doAddBalls } from '../actions/index'

class Game extends Component {
  static propTypes = {
    maxX: PropTypes.number,
    maxY: PropTypes.number,
    numOfBalls2Add: PropTypes.number,
    jumpDelay: PropTypes.number,
  };
  static defaultProps = {
    maxX: 10,
    maxY: 10,
    numOfBalls2Add: 3,
    jumpDelay: 100,
  };

  state = { score: 0 };
  _ballCount = 0;

  componentWillMount () {
    this.props.doInitMatrix(this.props.maxX, this.props.maxY);
    this.props.doAddBalls(this.props.numOfBalls2Add);
    this.props.doResetActiveBall();
  }

  componentDidUpdate () {
    const matSize = this.props.maxX * this.props.maxY;
    const newBallCount = matSize - getFreeSpotsInMatrix(this.props.matrix).length;

    if (this._ballCount > newBallCount) {
      const newScore = this.state.score + 2 * (this._ballCount - newBallCount);

      this.setState({ score: newScore });
    }
    this._ballCount = newBallCount;

    this._processPath();
  }

  render () {
    return (
        <div>
          <h1>Score: {this.state.score}</h1>
          <Board maxX={this.props.maxX} maxY={this.props.maxY}
                 matrix={this.props.matrix}
                 onCellClick={this.onCellClick.bind(this)}/>
        </div>
    );
  }

  _processPath () {
    if (this._path && this._path.length > 0) {
      const p0 = this._path[ 0 ];
      const p1 = this._path[ 1 ];

      this._path = this._path.slice(1);

      if (this._path.length > 1) {
        this._timeout = setTimeout(() => {
          clearTimeout(this._timeout);
          this.props.doPushBall(p0.x, p0.y, p1.x, p1.y);
        }, this.props.jumpDelay);
      } else {
        this._timeout = setTimeout(() => {
          this._path = null;
          clearTimeout(this._timeout);
          this._timeout = null;

          this.props.doMoveBall(p0.x, p0.y, p1.x, p1.y, this.props.numOfBalls2Add);
          this.props.doResetActiveBall();
        }, this.props.jumpDelay);
      }
    }
  }

  onCellClick (x, y) {
    if (this._timeout) {
      return;
    }

    if (this.props.matrix[ y ][ x ]) {
      if (this.props.activeBall && this.props.activeBall.x === x && this.props.activeBall.y === y) {
        this.props.doResetActiveBall();
      } else {
        this.props.doSetActiveBall(x, y);
      }
    } else if (this.props.activeBall) {
      const [abx, aby] = [ this.props.activeBall.x, this.props.activeBall.y ];

      this._path = findPathInMatrix(this.props.matrix, abx, aby, x, y);
      this._processPath();
    }
  }

  static mapStateToProps ({ matrix, activeBall }) {
    return { matrix, activeBall };
  }
}

export default connect(Game.mapStateToProps, {
  doInitMatrix,
  doResetActiveBall,
  doAddBalls,
  doSetActiveBall,
  doMoveBall,
  doPushBall,
})(Game);
