const sketchTest = (sketch) => {
  let width = 500;
  let height = 500;

  // Set up the canvas
  let canvas = document.querySelector(".canvas-test");
  canvas.style.setProperty("width", width + "px");
  canvas.style.setProperty("height", height + "px");

  sketch.setup = () => {
    // Recreate the canvas for p5
    sketch.createCanvas(width, height, (canvas = canvas));
  };

  sketch.draw = () => {
    sketch.background("#f77f00");
  };
};

export { sketchTest };
