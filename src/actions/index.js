export const constants = {
  INIT_MATRIX: 'INIT_MATRIX',
};

export function doInitMatrix(maxX, maxY) {
  console.log(`doInitMatrix()`);
  
  const tempArray = (new Array(maxX)).fill(null);
  let matrix = new Array(maxY).fill(Array.from(tempArray));
  
  return {
    type: constants.INIT_MATRIX,
    payload: matrix
  }
}
 