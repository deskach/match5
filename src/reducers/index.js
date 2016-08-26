import {combineReducers} from "redux";
import {constants as actionTypes} from "../actions/index";
import {cloneMatrix, createMatrix, getFreeSpots} from "../domain/utils";
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
    case actionTypes.ADD_BALLS:
      matrix = cloneMatrix(state);
      let freeSpots = getFreeSpots(matrix);
    
      for (let i = 0; (i < action.payload) && (freeSpots.length > 0); i++) {
        const idx = Math.floor(Math.random() * freeSpots.length);
        const pos = freeSpots[idx];
  
        matrix[pos.y][pos.x] = new Ball();
        freeSpots.splice(idx, 1);
      }
      break;
    case actionTypes.INIT_MATRIX:
      matrix = createMatrix(action.payload.x, action.payload.y);
      break;
    case actionTypes.MOVE_BALL:
      matrix = cloneMatrix(state);
      matrix[action.payload.y1][action.payload.x1] =
        matrix[action.payload.y0][action.payload.x0];
      matrix[action.payload.y0][action.payload.x0] = null;
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
