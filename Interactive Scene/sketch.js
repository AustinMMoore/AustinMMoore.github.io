// Super Square!
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(255)
	//noStroke()
	xPosition = width/2;
	yPosition = height/2;
  rectWidth = random(10, 50);
	rectHeight = random(10, 50);
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
let rectRainbow = false

function draw() {
  //background(220);
	fill(rectColourR, rectColourG, rectColourB)
	//fill(0, 255, 255);
	rect(xPosition, yPosition, rectWidth, rectHeight)
	
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
  
	xPosition += xVelocity;
	yPosition += yVelocity;

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
  else if (keyCode === LEFT_ARROW){
    yVelocity *= 0.9
  }
  else if (keyCode === RIGHT_ARROW){
    yVelocity *= 1.1
  }
  else if (keyCode === UP_ARROW){
    xVelocity *= 1.1
  }
  else if (keyCode === DOWN_ARROW){
    xVelocity *= 0.9
  }
}

function mouseWheel(event) {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
  rectRainbow = false
}