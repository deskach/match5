import {combineReducers} from "redux";
import {constants as actionTypes} from "../actions/index";
import {cloneMatrix, createMatrix} from "../domain/utils";

function createPayloadReducer(action_names) {
  return (state = null, action) => {
    const names = [].concat(action_names);
    
    return (names.indexOf(action.type) > -1) ? action.payload : state;
  }
}

function matrixReducer(state = null, action) {
  let matrix = state;
  
  switch (action.type) {
    case actionTypes.INIT_MATRIX:
      matrix = createMatrix(action.payload.x, action.payload.y);
      matrix[3][4] = 1; //FIXME: this is a debugging code
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
