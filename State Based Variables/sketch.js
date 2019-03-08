// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let xPosition = 75;
let rectWidth = 50;
let rectHeight = 50;
let xVelocity = 5;
let yPosition = 75;
let yVelocity = 5;
let gameState = "menu";
let buttonWidth = 200;
let buttonHeight = 150;
let color;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  color = 255;
}

function draw() {
  background(220);
  drawButton();
  if (gameState === "game") {
    rectMode(CORNER);
    bounceAround();
    drawRectangle();
  }
}

function bounceAround() {

  if (xPosition >= width - rectWidth) {
    xVelocity *= -1;
    xPosition = width - rectWidth;
  }
  if (xPosition <= 0) {
    xVelocity *= -1;
    xPosition = 0;
  }
  if (yPosition >= height - rectHeight) {
    yVelocity *= -1;
    yPosition = height - rectHeight;
  }
  if (yPosition <= 0) {
    yVelocity *= -1;
    yPosition = 0;
  }
}

function drawRectangle() {
  stroke(0);
  fill(0);
  xPosition += xVelocity;
  yPosition += yVelocity;
  rect(xPosition, yPosition, rectWidth, rectHeight);
}

function drawButton() {
  if (mouseX <= width/2 + buttonWidth/2 && mouseX >= width/2 - buttonWidth/2 && mouseY >= height/2 - buttonHeight / 2 && mouseY <= height/2 + buttonHeight / 2) {
    color = 200;
  }
  else {
    color = 255;
  }
  if (gameState === "menu") {
    fill(color);
    rect(width/2, height/2, buttonWidth, buttonHeight);
  }
}

function mouseClicked() {
  if (mouseX <= width/2 + buttonWidth/2 && mouseX >= width/2 - buttonWidth/2 && mouseY >= height/2 - buttonHeight / 2 && mouseY <= height/2 + buttonHeight / 2) {
    gameState = "game";
  }
}