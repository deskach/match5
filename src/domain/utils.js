import Ball from './ball'

const MIN_LINE_LEN = 5;

export function addBalls2Matrix(matrix, n) {
  for (let i = 0, freeSpots = getFreeSpotsInMatrix(matrix);
       (i < n) && (freeSpots.length > 0);
       i++, freeSpots = getFreeSpotsInMatrix(matrix)) {
    const idx = Math.floor(Math.random() * freeSpots.length);
    const pos = freeSpots[idx];
    
    putBall2Matrix(matrix, new Ball(), pos.x, pos.y);
  }
}

export function putBall2Matrix(matrix, ball, x, y) {
  if (!matrix[y][x]) {
    matrix[y][x] = ball;
  
    //Checking if there is a line of 5+
    function isSameBallAt(x, y) {
      return matrix[y][x] && (matrix[y][x].color === ball.color);
    }
  
    function clearBalls(positions) {
      for (let p in positions) {
        matrix[positions[p].y][positions[p].x] = null;
      }
    }
  
    // -
    let positions = [{x, y}];
    for (let i = x - 1; i >= 0 && isSameBallAt(i, y); i--) {
      positions.push({x: i, y});
    }
    for (let i = x + 1; i < matrix[y].length && isSameBallAt(i, y); i++) {
      positions.push({x: i, y});
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);
  
      return;
    }
  
    // |
    positions = [{x, y}];
    for (let i = y - 1; i >= 0 && isSameBallAt(x, i); i--) {
      positions.push({y: i, x});
    }
    for (let i = y + 1; i < matrix[y].length && isSameBallAt(x, i); i++) {
      positions.push({y: i, x});
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);
  
      return;
    }
  
    // \
    positions = [{x, y}];
    for (let i = y - 1, j = x - 1;
         i >= 0 && j >= 0 && isSameBallAt(j, i);
         i--, j--) {
      positions.push({y: i, x: j});
    }
    for (let i = y + 1, j = x + 1;
         i < matrix.length && j < matrix[i].length && isSameBallAt(j, i);
         i++, j++) {
      positions.push({y: i, x: j});
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);
      
      return;
    }
  
    // /
    positions = [{x, y}];
    for (let i = y - 1, j = x + 1;
         i >= 0 && j < matrix[i].length && isSameBallAt(j, i);
         i--, j++) {
      positions.push({y: i, x: j});
    }
    for (let i = y + 1, j = x - 1;
         i < matrix.length && j >= 0 && isSameBallAt(j, i);
         i++, j--) {
      positions.push({y: i, x: j});
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);
    
      return;
    }
  }
}

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

export function getFreeSpotsInMatrix (matrix) {
  return matrix.reduce((acc0, row, y) => {
    let freeInRow = row.reduce((acc1, el, x) => {
      return el ? acc1 : acc1.concat([{x, y}]);
    }, []);
    
    return acc0.concat(freeInRow);
  }, [])
}
