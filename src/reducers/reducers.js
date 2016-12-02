/**
 * Created by deskach on 2/12/16.
 */
import { combineReducers } from 'redux'
import { constants as actionTypes } from '../actions/index'
import { cloneMatrix, createMatrix, getFreeSpotsInMatrix, putBall2Matrix, addBalls2Matrix } from '../domain/utils'

function createPayloadReducer (action_names) {
  return (state = null, action) => {
    // console.log(`payloadReducer(${JSON.stringify(action)})`);
    const names = [].concat(action_names);

    return (names.indexOf(action.type) > -1) ? action.payload : state;
  }
}

function matrixReducer (state = [], action) {
  // console.log(`matrixReducer(${JSON.stringify(action)})`);
  let matrix = state;

  switch (action.type) {
    case actionTypes.INIT_MATRIX:
      matrix = createMatrix(action.payload.x, action.payload.y);
      break;
    case actionTypes.ADD_BALLS:
      matrix = cloneMatrix(state);

      addBalls2Matrix(matrix, action.payload);
      break;
    case actionTypes.MOVE_BALL:
      matrix = cloneMatrix(state);
      let ball = matrix[ action.payload.y0 ][ action.payload.x0 ];
      const initialNumOfFreeSpots = getFreeSpotsInMatrix(matrix).length;

      matrix[ action.payload.y0 ][ action.payload.x0 ] = null;
      putBall2Matrix(matrix, ball, action.payload.x1, action.payload.y1);

      if (getFreeSpotsInMatrix(matrix).length === initialNumOfFreeSpots) {
        addBalls2Matrix(matrix, action.payload.balls2Add);
      }
      break;
  }

  return matrix;
}

const rootReducer = combineReducers({
  matrix: matrixReducer,
  activeBall: createPayloadReducer([
    actionTypes.SET_ACTIVE_BALL,
    actionTypes.RESET_ACTIVE_BALL
  ]),
});

export default rootReducer;
