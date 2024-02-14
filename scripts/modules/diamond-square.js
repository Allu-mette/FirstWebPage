// Create a new Empty grid
var createNewGrid = (N) => {
  var grid = new Array(N);
  for (let i = 0; i < N; i++) {
    grid[i] = new Array(N);
    for (let j = 0; j < N; j++) {
      grid[i][j] = null;
      if (i === 0 || i === N - 1) {
        if (j === 0 || j === N - 1) {
          grid[i][j] = Math.floor((Math.random() - 0.5) * 2 * N);
        }
      }
    }
  }
  return grid;
};

// Generate the grid with the Diamond Square Algotithm
function generateGrid(N = 6) {
  var N = Math.pow(2, N) + 1; // 3, 5, 9, 17, 33, 65, ...
  var grid = createNewGrid(N);
  var step = N - 1; // Distance between two points
  while (step > 1) {
    var ind = step / 2;
    // Diamond
    for (let xx = ind; xx < N; xx += step) {
      for (let yy = ind; yy < N; yy += step) {
        var moyenne =
          (grid[xx + ind][yy + ind] +
            grid[xx - ind][yy + ind] +
            grid[xx + ind][yy - ind] +
            grid[xx - ind][yy - ind]) /
            4 +
          Math.floor((Math.random() - 0.5) * 2 * ind);
        grid[xx][yy] = moyenne;
      }
    }
    // Square
    var voff = 0;
    for (let xx = 0; xx < N; xx += ind) {
      voff = voff === 0 ? ind : 0;
      for (let yy = voff; yy < N; yy += step) {
        var moyenne = 0;
        var n = 0;
        if (xx - ind >= 0) {
          moyenne += grid[xx - ind][yy];
          n += 1;
        }
        if (xx + ind < N) {
          moyenne += grid[xx + ind][yy];
          n += 1;
        }
        if (yy - ind >= 0) {
          moyenne += grid[xx][yy - ind];
          n += 1;
        }
        if (yy + ind < N) {
          moyenne += grid[xx][yy + ind];
          n += 1;
        }
        moyenne = moyenne / n + Math.floor((Math.random() - 0.5) * 2 * ind);
        grid[xx][yy] = moyenne;
      }
    }
    step = ind;
  }
  return grid;
}

const mySketch = (sketch) => {
  let canvasSize = 500;
  let img = sketch.createGraphics(canvasSize, canvasSize);

  // Set up the canvas
  let canvas = document.querySelector(".canvas-simulation");
  canvas.style.setProperty("width", canvasSize + "px");
  canvas.style.setProperty("height", canvasSize + "px");

  sketch.setup = () => {
    sketch.createCanvas(canvasSize, canvasSize, (canvas = canvas));
  };

  sketch.draw = () => {
    sketch.image(img, 0, 0);
  };

  sketch.getCanvasSize = () => {
    return canvasSize;
  };

  sketch.setImg = (grid) => {
    var image = sketch.createGraphics(canvasSize, canvasSize);
    var N = grid.length;
    var w = canvasSize / N;

    image.noStroke();
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        let value = grid[i][j];
        value = value === null ? 255 : ((value + N) / (2 * N)) * 255;

        image.fill(value, value, value);
        image.rect(i * w, j * w, w + 1);
      }
    }
    img = image;
  };
};

export { mySketch, generateGrid };
