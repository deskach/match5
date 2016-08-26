import {combineReducers} from "redux";
import {constants as actionTypes} from "../actions/index";
import {
  cloneMatrix,
  createMatrix,
  getFreeSpots,
  putBall2Matrix
} from "../domain/utils";
import Ball from "../domain/ball";

function createPayloadReducer(action_names) {
  return (state = null, action) => {
    // console.log(`payloadReducer(${JSON.stringify(action)})`);
    const names = [].concat(action_names);
    
    return (names.indexOf(action.type) > -1) ? action.payload : state;
  }
}

function matrixReducer(state = null, action) {
  // console.log(`matrixReducer(${JSON.stringify(action)})`);
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
  
      for (let i = 0, freeSpots = getFreeSpots(matrix);
           (i < action.payload) && (freeSpots.length > 0);
           i++, freeSpots = getFreeSpots(matrix)) {
        const idx = Math.floor(Math.random() * freeSpots.length);
        const pos = freeSpots[idx];
    
        putBall2Matrix(matrix, new Ball(), pos.x, pos.y);
      }
      break;
    case actionTypes.MOVE_BALL:
      matrix = cloneMatrix(state);
      let ball = matrix[action.payload.y0][action.payload.x0];
  
      matrix[action.payload.y0][action.payload.x0] = null;
      putBall2Matrix(matrix, ball, action.payload.x1, action.payload.y1);
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
