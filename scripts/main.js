const canvas = document.getElementById("canvas-background");
const ctx = canvas.getContext("2d");
/*
const width = document.documentElement.scrollWidth;
const height = document.documentElement.scrollHeight;
*/

const main = document.body;
const width = main.offsetWidth;
const height = main.offsetHeight;

canvas.width = width;
canvas.height = height;

ctx.fillStyle = "red";
ctx.fillRect(0, 0, width, height);
