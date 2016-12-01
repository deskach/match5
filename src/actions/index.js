export const constants = {
  INIT_MATRIX: 'INIT_MATRIX',
  MOVE_BALL: 'MOVE_BALL',
  SET_ACTIVE_BALL: 'SET_ACTIVE_BALL',
  RESET_ACTIVE_BALL: 'RESET_ACTIVE_BALL',
  ADD_BALLS: 'ADD_BALLS',
};

export function doAddBalls(number) {
  return {
    type: constants.ADD_BALLS,
    payload: number
  }
}

export function doInitMatrix(x, y) {
  // console.log(`doInitMatrix(${x}, ${y})`);
  return {
    type: constants.INIT_MATRIX,
    payload: {x, y}
  }
}

export function doMoveBall(x0, y0, x1, y1) {
  return {
    type: constants.MOVE_BALL,
    payload: {x0, y0, x1, y1}
  }
}

export function doSetActiveBall(x, y) {
  return {
    type: constants.SET_ACTIVE_BALL,
    payload: {x, y}
  }
}

export function doResetActiveBall() {
  return {
    type: constants.RESET_ACTIVE_BALL,
    payload: null
  }
}
