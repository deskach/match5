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
  };
  static defaultProps = {
    maxX: 10,
    maxY: 10,
    numOfBalls2Add: 3
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

  _processPath (path) {
    if (path && path.length > 0) {
      for (let i = 0; i + 2 < path.length; i++) {
        this.props.doPushBall(path[ i ].x, path[ i ].y, path[ i + 1 ].x, path[ i + 1 ].y)
      }

      path = path.slice(-2);
      this.props.doMoveBall(path[ 0 ].x, path[ 0 ].y, path[ 1 ].x, path[ 1 ].y, this.props.numOfBalls2Add);
      this.props.doResetActiveBall();
    }
  }

  onCellClick (x, y) {
    if (this.props.matrix[ y ][ x ]) {
      if (this.props.activeBall && this.props.activeBall.x === x && this.props.activeBall.y === y) {
        this.props.doResetActiveBall();
      } else {
        this.props.doSetActiveBall(x, y);
      }
    } else if (this.props.activeBall) {
      const [abx, aby] = [ this.props.activeBall.x, this.props.activeBall.y ];

      const path = findPathInMatrix(this.props.matrix, abx, aby, x, y);
      this._processPath(path);
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
