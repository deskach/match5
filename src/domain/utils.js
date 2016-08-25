export function getRandomKey() {
  return Math.ceil(Math.random() * 10E15);
}

export function createMatrix(maxX, maxY) {
  let matrix = [];
  
  for (let i = 0; i < maxY; i++) {
    matrix.push([]);
    for (let j = 0; j < maxX; j++) {
      matrix[i].push(null);
    }
  }
  
  return matrix;
}

export function cloneMatrix(sample = null) {
  let matrix = [];
  
  for (let i = 0; i < sample.length; i++) {
    matrix.push([]);
    for (let j = 0; j < sample[i].length; j++) {
      matrix[i].push(sample[i][j]);
    }
  }
  
  return matrix;
}
