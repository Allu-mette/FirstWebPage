const sketchBack = (sketch) => {
  // Get canvas and size
  let canvas = document.querySelector(".canvas-background");
  var main = document.querySelector("main");
  let width = main.offsetWidth;
  let height = main.offsetHeight;
  // Set up the canvas
  canvas.style.setProperty("width", width + "px");
  canvas.style.setProperty("height", height + "px");

  sketch.setup = () => {
    // Recreate the canvas for p5
    sketch.createCanvas(width, height, (canvas = canvas));
  };

  sketch.draw = () => {};
};

export { sketchBack };
