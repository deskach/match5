import Ball from './ball'

const MIN_LINE_LEN = 5;

export function addBalls2Matrix (matrix, n) {
  for (let i = 0, freeSpots = getFreeSpotsInMatrix(matrix);
       (i < n) && (freeSpots.length > 0);
       i++, freeSpots = getFreeSpotsInMatrix(matrix)) {
    const idx = Math.floor(Math.random() * freeSpots.length);
    const pos = freeSpots[ idx ];

    putBall2Matrix(matrix, new Ball(), pos.x, pos.y);
  }
}

export function putBall2Matrix (matrix, ball, x, y) {
  if (!matrix[ y ][ x ]) {
    matrix[ y ][ x ] = ball;

    //Checking if there is a line of 5+
    function isSameBallAt (x, y) {
      return matrix[ y ][ x ] && (matrix[ y ][ x ].color === ball.color);
    }

    function clearBalls (positions) {
      for (let p in positions) {
        matrix[ positions[ p ].y ][ positions[ p ].x ] = null;
      }
    }

    // -
    let positions = [ { x, y } ];
    for (let i = x - 1; i >= 0 && isSameBallAt(i, y); i--) {
      positions.push({ x: i, y });
    }
    for (let i = x + 1; i < matrix[ y ].length && isSameBallAt(i, y); i++) {
      positions.push({ x: i, y });
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);

      return;
    }

    // |
    positions = [ { x, y } ];
    for (let i = y - 1; i >= 0 && isSameBallAt(x, i); i--) {
      positions.push({ y: i, x });
    }
    for (let i = y + 1; i < matrix[ y ].length && isSameBallAt(x, i); i++) {
      positions.push({ y: i, x });
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);

      return;
    }

    // \
    positions = [ { x, y } ];
    for (let i = y - 1, j = x - 1;
         i >= 0 && j >= 0 && isSameBallAt(j, i);
         i--, j--) {
      positions.push({ y: i, x: j });
    }
    for (let i = y + 1, j = x + 1;
         i < matrix.length && j < matrix[ i ].length && isSameBallAt(j, i);
         i++, j++) {
      positions.push({ y: i, x: j });
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);

      return;
    }

    // /
    positions = [ { x, y } ];
    for (let i = y - 1, j = x + 1;
         i >= 0 && j < matrix[ i ].length && isSameBallAt(j, i);
         i--, j++) {
      positions.push({ y: i, x: j });
    }
    for (let i = y + 1, j = x - 1;
         i < matrix.length && j >= 0 && isSameBallAt(j, i);
         i++, j--) {
      positions.push({ y: i, x: j });
    }
    if (positions.length >= MIN_LINE_LEN) {
      clearBalls(positions);

      return;
    }
  }
}

export function getRandomKey () {
  return Math.ceil(Math.random() * 10E15);
}

export function createMatrix (maxX, maxY) {
  let matrix = [];

  for (let i = 0; i < maxY; i++) {
    matrix.push([]);
    for (let j = 0; j < maxX; j++) {
      matrix[ i ].push(null);
    }
  }

  return matrix;
}

export function cloneMatrix (sample = null) {
  let matrix = [];

  for (let i = 0; i < sample.length; i++) {
    matrix.push([]);
    for (let j = 0; j < sample[ i ].length; j++) {
      matrix[ i ].push(sample[ i ][ j ]);
    }
  }

  return matrix;
}

export function getFreeSpotsInMatrix (matrix) {
  return matrix.reduce((acc0, row, y) => {
    let freeInRow = row.reduce((acc1, el, x) => {
      return el ? acc1 : acc1.concat([ { x, y } ]);
    }, []);

    return acc0.concat(freeInRow);
  }, [])
}

export function findPathInMatrix (matrix, x0, y0, x1, y1) {
  function dijkstra (mat, x, y) { //TODO: optimize me
    function createInitialIdxMatrix (matrix, x, y) {
      let idxMatrix = cloneMatrix(matrix);

      for (let i = 0; i < idxMatrix.length; i++) {
        for (let j = 0; j < idxMatrix[ i ].length; j++) {
          if (idxMatrix[ i ][ j ] !== null) {
            idxMatrix[ i ][ j ] = Number.MAX_SAFE_INTEGER;
          }
        }
      }
      idxMatrix[ y ][ x ] = 0;

      return idxMatrix;
    }

    function processItem (mat, items2process, item) {
      const { x, y } = item;

      if (x > 0 && mat[ y ][ x - 1 ] === null) {
        mat[ y ][ x - 1 ] = mat[ y ][ x ] + 1;
        items2process.push({ x: x - 1, y: y })
      }
      if ((x < mat[ y ].length - 1) && mat[ y ][ x + 1 ] === null) {
        mat[ y ][ x + 1 ] = mat[ y ][ x ] + 1;
        items2process.push({ x: x + 1, y: y })
      }
      if (y > 0 && mat[ y - 1 ][ x ] === null) {
        mat[ y - 1 ][ x ] = mat[ y ][ x ] + 1;
        items2process.push({ x: x, y: y - 1 })
      }
      if ((y < mat.length - 1) && mat[ y + 1 ][ x ] === null) {
        mat[ y + 1 ][ x ] = mat[ y ][ x ] + 1;
        items2process.push({ x: x, y: y + 1 })
      }
    }

    let idxMat = createInitialIdxMatrix(mat, x, y);
    let items2process = [ { x, y } ];

    while (items2process.length > 0) {
      let item = items2process[ 0 ];

      items2process = items2process.slice(1, items2process.length);
      processItem(idxMat, items2process, item);
    }

    return idxMat;
  }

  function findPath2XY (idxMat, x, y) {
    function findPath (mat, path) {
      const { x, y } = path[ path.length - 1 ];

      if (mat[ y ][ x ] === 0) {
        return path;
      } else if (x > 0 && mat[ y ][ x - 1 ] < mat[ y ][ x ]) {
        return findPath(mat, [ ...path, { x: x - 1, y } ]);
      } else if ((x < mat[ y ].length - 1) && mat[ y ][ x + 1 ] < mat[ y ][ x ]) {
        return findPath(mat, [ ...path, { x: x + 1, y } ]);
      } else if (y > 0 && mat[ y - 1 ][ x ] < mat[ y ][ x ]) {
        return findPath(mat, [ ...path, { x, y: y - 1 } ]);
      } else if ((y < mat.length - 1) && mat[ y + 1 ][ x ] < mat[ y ][ x ]) {
        return findPath(mat, [ ...path, { x, y: y + 1 } ]);
      }

      return [];
    }

    return findPath(idxMat, [ { x, y } ]);
  }

  let idxMatrix = dijkstra(matrix, x0, y0);
  let path = findPath2XY(idxMatrix, x1, y1);

  return path.reverse();
}