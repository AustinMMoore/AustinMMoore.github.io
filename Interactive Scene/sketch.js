
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
let rectMaxSpeed = 40;
let rectMinSpeed = -40;
let xVelocityIncreasing = false;
let yVelocityIncreasing = false;
let xVelocityDecreasing = false;
let yVelocityDecreasing = false;

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
  if (xVelocityDecreasing){
    xVelocity *= 0.9;
    xVelocity = constrain(xVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (xVelocityIncreasing){
    xVelocity *= 1.1;
    xVelocity = constrain(xVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (yVelocityIncreasing){
    yVelocity *= 1.1;
    yVelocity = constrain(yVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (yVelocityDecreasing){
    yVelocity *= 0.9;
    yVelocity = constrain(yVelocity, rectMinSpeed, rectMaxSpeed);
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
  if (key === " ") {
    rectRainbow = true;
  }
  if (key === "c" || key === "C") {
    background(255);
  }
  if (key === "n" || key === "N") {
    rectCurve = false;
  }
  if (key === "u" || key === "U") {
    rectCurve = true;
  }
  if ((key === "w" || key === "W") && rectHeight > rectMinSize) {
    rectHeight -= 5;
  }
  if ((key === "s" || key === "S") && rectHeight < rectMaxSize) {
    rectHeight += 5;
  }
  if ((key === "a" || key === "A") && rectWidth > rectMinSize) {
    rectWidth -= 5;
  }
  if ((key === "d" || key === "D") && rectWidth < rectMaxSize) {
    rectWidth += 5;
  }
  if (keyCode === LEFT_ARROW) {
    xVelocityDecreasing = true;
  }
  if (keyCode === RIGHT_ARROW) {
    xVelocityIncreasing = true;
  }
  if (keyCode === DOWN_ARROW) {
    yVelocityDecreasing = true;
  }
  if (keyCode === UP_ARROW) {
    yVelocityIncreasing = true;
  }
}

function mouseWheel(event) {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
  rectRainbow = false;
}

function keyReleased() {
  xVelocityIncreasing = false;
  yVelocityIncreasing = false;
  xVelocityDecreasing = false;
  yVelocityDecreasing = false;
}