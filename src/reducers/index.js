import {combineReducers} from "redux";
import {constants as actionNames} from "../actions/index";

function SimplePayloadReducer(action_name) {
  return (state = null, action) => {
    if (action.type === action_name) {
      console.log(`Simple payload reducer processed ${action.type}`);
      
      return action.payload;
    }
    
    return state;
  }
}

const rootReducer = combineReducers({
  matrix: SimplePayloadReducer(actionNames.INIT_MATRIX)
});

export default rootReducer;
