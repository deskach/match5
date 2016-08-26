import {combineReducers} from "redux";
import {constants as actionTypes} from "../actions/index";
import {
  cloneMatrix,
  createMatrix,
  getFreeSpots,
  putBall2Matrix
} from "../domain/utils";
import Ball from "../domain/ball";
import domConstants from "../domain/constants";

function createPayloadReducer(action_names) {
  return (state = null, action) => {
    // console.log(`payloadReducer(${JSON.stringify(action)})`);
    const names = [].concat(action_names);
    
    return (names.indexOf(action.type) > -1) ? action.payload : state;
  }
}

function matrixReducer(state = null, action) {
  // console.log(`matrixReducer(${JSON.stringify(action)})`);
  function addBalls2Matrix(matrix, n) {
    for (let i = 0, freeSpots = getFreeSpots(matrix);
         (i < n) && (freeSpots.length > 0);
         i++, freeSpots = getFreeSpots(matrix)) {
      const idx = Math.floor(Math.random() * freeSpots.length);
      const pos = freeSpots[idx];
      
      putBall2Matrix(matrix, new Ball(), pos.x, pos.y);
    }
  }
  
  let matrix = state;
  
  switch (action.type) {
    case actionTypes.INIT_MATRIX:
      matrix = createMatrix(action.payload.x, action.payload.y);
    
      //FIXME: remove the below debugging code
      putBall2Matrix(matrix, new Ball(Ball.COLORS.green), 4, 3);
      putBall2Matrix(matrix, new Ball(Ball.COLORS.green), 4, 4);
      putBall2Matrix(matrix, new Ball(Ball.COLORS.green), 4, 5);
      putBall2Matrix(matrix, new Ball(Ball.COLORS.green), 4, 6);
      putBall2Matrix(matrix, new Ball(Ball.COLORS.green), 8, 8);
      break;
    case actionTypes.ADD_BALLS:
      matrix = cloneMatrix(state);
  
      addBalls2Matrix(matrix, action.payload);
      break;
    case actionTypes.MOVE_BALL:
      matrix = cloneMatrix(state);
      let ball = matrix[action.payload.y0][action.payload.x0];
      const initialNumOfFreeSpots = getFreeSpots(matrix).length;
  
      matrix[action.payload.y0][action.payload.x0] = null;
      putBall2Matrix(matrix, ball, action.payload.x1, action.payload.y1);
  
      if (getFreeSpots(matrix).length === initialNumOfFreeSpots) {
        addBalls2Matrix(matrix, domConstants.NUMBER_OF_BALLS_2_ADD);
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
