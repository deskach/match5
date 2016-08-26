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

export function getFreeSpots(matrix) {
  return matrix.reduce((acc0, row, y) => {
    let freeInRow = row.reduce((acc1, el, x) => {
      return el ? acc1 : acc1.concat([{x, y}]);
    }, []);
    
    return acc0.concat(freeInRow);
  }, [])
}
