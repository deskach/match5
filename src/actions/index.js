export const constants = {
  INIT_MATRIX: 'INIT_MATRIX',
  MOVE_ACTIVE_BALL_2: 'MOVE_ACTIVE_BALL_2',
  SET_ACTIVE_BALL: 'SET_ACTIVE_BALL',
};

export function doInitGame(maxX, maxY) {
  return {
    type: constants.INIT_MATRIX,
    payload: {x: maxX, y: maxY}
  }
}

export function doMoveActiveBall2(x, y) {
  return {
    type: constants.MOVE_ACTIVE_BALL_2,
    payload: {x, y}
  }
}

export function doSetActiveBall(x, y) {
  return {
    type: constants.SET_ACTIVE_BALL,
    payload: {x, y}
  }
}
