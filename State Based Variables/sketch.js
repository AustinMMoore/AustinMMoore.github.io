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
let buttonWidth = 240;
let buttonHeight = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawButton();
  if (buttonIsPressed) {
    bounceAround();
    drawRectangle();
  }
  
}

function bounceAround() {
  if (gameState === "game") {
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
}

function drawRectangle() {
  if (gameState === "game") {
    stroke(0);
    fill(0);
    xPosition += xVelocity;
    yPosition += yVelocity;
    rect(xPosition, yPosition, rectWidth, rectHeight);
  }
}

function drawButton() {
  rectMode(CENTER);
  if (buttonIsPressed) {
    fill(0);
    rect(width/2, height/2, buttonWidth, buttonHeight);
  }
  else {
    fill(255);
  }
  
}

function buttonIsPressed() {
  return mouseX >= buttonWidth/2 - 75 &&
         mouseX <= buttonWidth/2 + 75 &&
         mouseY >= buttonHeight/2 + 75 &&
         mouseY <= buttonHeight/2 + 75;
}