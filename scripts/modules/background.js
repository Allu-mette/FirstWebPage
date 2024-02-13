const sketchBack = (sketch) => {
  // Get canvas and size
  let canvas = document.querySelector(".canvas-background");
  var main = document.querySelector("main");
  let width = main.offsetWidth;
  let height = main.offsetHeight;
  // Set up the canvas
  canvas.style.setProperty("width", width + "px");
  canvas.style.setProperty("height", height + "px");

  let N = 150;
  let color;
  let form = new Array(N);

  sketch.setup = () => {
    // Recreate the canvas for p5
    sketch.createCanvas(width, height, (canvas = canvas));
    sketch.colorMode(sketch.RGB, 255, 255, 255, 1);
    color = sketch.color("#f77f00");
    sketch.strokeWeight(2);

    for (let i = 0; i < N; i++) {
      form[i] = [
        Math.random() * width,
        Math.random() * height,
        normalize([Math.random() - 0.5, Math.random() - 0.5], Math.random()),
      ];
    }
  };

  sketch.draw = () => {
    // Clear the background
    sketch.clear();

    for (let i = 0; i < N; i++) {
      var xx = form[i][0];
      var yy = form[i][1];
      var vect = form[i][2];
      var len = pointDistance(xx, yy, sketch.mouseX, sketch.mouseY);

      if (len < 256 && sketch.mouseIsPressed) {
        vect = normalize([xx - sketch.mouseX, yy - sketch.mouseY], 256 / len);
      }
      // Move
      xx += vect[0];
      yy += vect[1];
      xx = xx % width;
      yy = yy % height;
      xx = xx < 0 ? xx + width : xx;
      yy = yy < 0 ? yy + height : yy;

      // Update form array
      form[i][0] = xx;
      form[i][1] = yy;
      form[i][2] = vect;

      // Draw the lines
      for (let j = 0; j < N; j++) {
        var dist = pointDistance(xx, yy, form[j][0], form[j][1]);
        if (dist < 128 && dist !== 0) {
          var c = color;
          c.setAlpha((128 - dist) / 256);
          sketch.stroke(c);
          sketch.line(xx, yy, form[j][0], form[j][1], 4);
        }
      }
    }
  };
  function pointDistance(x1, y1, x2, y2) {
    var hspd = Math.abs(x1 - x2);
    var vspd = Math.abs(y1 - y2);

    return Math.sqrt(hspd * hspd + vspd * vspd);
  }

  function normalize(vect, norm = 1) {
    var len = pointDistance(0, 0, vect[0], vect[1]);
    return [(norm * vect[0]) / len, (norm * vect[1]) / len];
  }

  //sketch.noStroke();
  //sketch.square(20, 70, 50);
  /*for (let i = 0; i < N; i++) {
      form[i];
    }*/
};

export { sketchBack };
