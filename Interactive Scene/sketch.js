
// Super Square!
// Austin Moore
// February 14th 2019
//
// Extra for Experts:
// - Integrated mouse input into code
// - 

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  xPosition = width/2;
  yPosition = height/2;
  rectColourR = 255;
  rectColourG = 255;
  rectColourB = 255;
}

let rectColourR;
let rectColourG;
let rectColourB;
let xPosition;
let yPosition;
let xVelocity = 2;
let yVelocity = 2;
let rectWidth = 15;
let rectHeight = 15;
let rectRainbow = false;
let rectCurve = false;
let rectMaxSize = 200;
let rectMinSize = 5;
let rectMaxSpeed = 2;

function draw() {
  fill(rectColourR, rectColourG, rectColourB);
  rect(xPosition, yPosition, rectWidth, rectHeight);
	
  if (xPosition >= width - rectWidth || xPosition <= 0) {
    xVelocity *= -1;
  }
		
  if (yPosition >= height - rectHeight || yPosition <= 0) {
    yVelocity *= -1;
  }
  if (rectRainbow === true) {
    rectColourR = random(0, 255);
    rectColourG = random(0, 255);
    rectColourB = random(0, 255);
  }
  if (rectCurve === true) {
    xVelocity = yVelocity^2;
  }
  if (rectCurve === false) {
    xPosition += xVelocity;
    yPosition += yVelocity;
  }
  else if (keyCode === LEFT_ARROW){
    xVelocity *= 0.9;
    xVelocity = constrain(xVelocity, -10, 10);
  }
  else if (keyCode === RIGHT_ARROW){
    xVelocity *= 1.1;
    xVelocity = constrain(xVelocity, -10, 10);
  }
  else if (keyCode === UP_ARROW){
    yVelocity *= 1.1;
    yVelocity = constrain(yVelocity, -10, 10);
  }
  else if (keyCode === DOWN_ARROW){
    yVelocity *= 0.9;
    yVelocity = constrain(yVelocity, -10, 10);
  }
}

function keyPressed() {

  if (key === "r" || key === "R") {
    rectColourR = 255;
    rectColourG = 0;
    rectColourB = 0;
    rectRainbow = false;
  }
  else if (key === "g" || key === "G") {
    rectColourR = 0;
    rectColourG = 255;
    rectColourB = 0;
    rectRainbow = false;
  }
  else if (key === "b" || key === "B") {
    rectColourR = 0;
    rectColourG = 0;
    rectColourB = 255;
    rectRainbow = false;
  }
  else if (key === " ") {
    rectRainbow = true;
  }
  else if (key === "c" || key === "C") {
    background(255);
  }
  else if (key === "n" || key === "N") {
    rectCurve = false;
  }
  else if (key === "u" || key === "U") {
    rectCurve = true;
  }
  else if ((key === "w" || key === "W") && rectHeight > 5) {
    rectHeight -= 5;
  }
  else if ((key === "s" || key === "S") && rectHeight < 200) {
    rectHeight += 5;
  }
  else if ((key === "a" || key === "A") && rectWidth > 5) {
    rectWidth -= 5;
  }
  else if ((key === "d" || key === "D") && rectWidth < 200) {
    rectWidth += 5;
  }
}

function mouseWheel(event) {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
  rectRainbow = false;
}

function keyReleased() {
  key = "noPress";
}