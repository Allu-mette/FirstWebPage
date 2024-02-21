import { sketchBack } from "./modules/background.js";
import { mySketch, generateGrid } from "./modules/diamond-square.js";

let N = 5;
let sketch = new p5(mySketch);
// Generate the First grid
let grid = generateGrid(N);
// Set the img of sketch
sketch.setImg(grid);

let resetButton = document.querySelector("#input-reset");
let sizeRange = document.querySelector("#input-range");
let labelRange = document.querySelector("#label-range");
labelRange.textContent = "SIZE: " + N;

resetButton.addEventListener("click", () => {
  // New Grid
  grid = generateGrid(N);
  sketch.setImg(grid);
});

sizeRange.addEventListener("input", () => {
  // Change the N value
  N = parseInt(sizeRange.value);
  labelRange.textContent = "SIZE: " + N;
  // New Grid
  grid = generateGrid(N);
  sketch.setImg(grid);
});

// Create the background
const back = new p5(sketchBack);
