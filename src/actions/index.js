export const constants = {
  INIT_MATRIX: 'INIT_MATRIX',
};

export function doInitMatrix(maxX, maxY) {
  console.log(`doInitMatrix()`);
  
  let matrix = [];
  
  for (let i = 0; i < maxY; i++) {
    matrix.push([]);
    for (let j = 0; j < maxX; j++) {
      matrix[i].push(null);
    }
  }
  
  return {
    type: constants.INIT_MATRIX,
    payload: matrix
  }
}
 