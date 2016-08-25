import {combineReducers} from "redux";
import {constants as actionTypes} from "../actions/index";
import {cloneMatrix, createMatrix} from "../domain/utils";

function gameReducer(state = null, action) {
  switch (action.type) {
    case actionTypes.INIT_MATRIX:
      return {
        activeBallPos: null,
        matrix: createMatrix(action.payload.y, action.payload.x)
      };
    case actionTypes.SET_ACTIVE_BALL:
      return {...state, activeBallPos: action.payload};
    case actionTypes.MOVE_ACTIVE_BALL_2:
      if (state.activeBallPos) {
        let matrix = cloneMatrix(state.matrix);
        
        matrix[action.payload.y][action.payload.x] =
          matrix[state.activeBallPos.y][state.activeBallPos.x];
        matrix[state.activeBallPos.y][state.activeBallPos.x] = null;
        
        return {matrix, activeBallPos: null};
      }
  }
  
  return state;
}

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;
