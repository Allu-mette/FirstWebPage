const sketchBack = (sketch) => {
  // Get canvas and size
  let canvas = document.querySelector(".canvas-background");
  var main = document.querySelector("main");
  let width = main.offsetWidth;
  let height = main.offsetHeight;
  // Set up the canvas
  canvas.style.setProperty("width", width + "px");
  canvas.style.setProperty("height", height + "px");
  // Max Ray
  const maxRay = 128;

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
      var vel = form[i][2];
      var len = pointDistance(xx, yy, sketch.mouseX, sketch.mouseY);

      if (len < 2 * maxRay && sketch.mouseIsPressed) {
        vel = normalize(
          [xx - sketch.mouseX, yy - sketch.mouseY],
          (2 * maxRay) / len
        );
      }
      // Move
      xx += vel[0];
      yy += vel[1];
      xx = xx % (width + maxRay);
      yy = yy % (height + maxRay);
      xx = xx < -maxRay ? xx + width + maxRay : xx;
      yy = yy < -maxRay ? yy + height + maxRay : yy;

      // Update form array
      form[i][0] = xx;
      form[i][1] = yy;
      form[i][2] = vel;

      // Draw the lines
      for (let j = 0; j < N; j++) {
        var dist = pointDistance(xx, yy, form[j][0], form[j][1]);
        if (dist < maxRay && dist !== 0) {
          var c = color;
          c.setAlpha((maxRay - dist) / (2 * maxRay));
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
