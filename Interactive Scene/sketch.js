
// Super Square!
// Austin Moore
// March 4th 2019
//
// Extra for Experts:
// - Integrated mouse wheel input into code
// - Used updating text to update present values
// - Sketch works when users resize their window and refresh
// - Used the Sin function to create wave-like patterns of movement

//Canvas setup and centering of the rectangle
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  xPosition = width/2;
  yPosition = height/2;
  angleMode(RADIANS);
}

//Variable definitions
let rectColourR = 255;
let rectColourG = 255;
let rectColourB = 255;

let xPosition;
let yPosition;
let xVelocity = 2;
let yVelocity = 2;

let rectWidth = 15;
let rectHeight = 15;

let modeInsanity = false;
let modeRainbow = false;
let modeFirework = false;

let rectMaxSize = 200;
let rectMinSize = 5;
let rectMaxSpeed = 40;
let rectMinSpeed = -40;

let xVelocityIncreasing = false;
let yVelocityIncreasing = false;
let xVelocityDecreasing = false;
let yVelocityDecreasing = false;

let xRectWaveCounter = 1;
let yRectWaveCounter = 1;
let xRectBaseCounter = 1;
let yRectBaseCounter = 1;

//Main drawloop containing the main functions
function draw() {
  drawRectangle();
  bounceAround();
  rainbowMode();
  fireworkMode();
  speedChange();
  insanityMode();
  valueStatus();
  moveRectangle();
}

/*Function containing all of the changes that key inputs have on the rectangle

R = Changes the rectangle colour to red
G = Changes the rectangle colour to green
B = Changes the rectangle colour to blue

SPACEBAR = Enables Rainbow Mode
I = Enables Insanity Mode
F = Enables Firework Mode

C = Clears the canvas
N = Sets the rectangle back to "Normal" (starting values)

W = Decreases rectangle height
S = Increases rectangle height
A = Decreases rectangle width
D = Increases rectangle width

LEFT ARROW = Decreases X velocity of rectangle
RIGHT ARROW = Increases X velocity of rectangle
DOWN ARROW = Decreases Y velocity of rectangle
UP ARROW =  Increases Y velocity of rectangle
*/
function keyPressed() {
  if (key === "r" || key === "R") {
    rectColourR = 255;
    rectColourG = 0;
    rectColourB = 0;
    modeRainbow = false;
  }
  else if (key === "g" || key === "G") {
    rectColourR = 0;
    rectColourG = 255;
    rectColourB = 0;
    modeRainbow = false;
  }
  else if (key === "b" || key === "B") {
    rectColourR = 0;
    rectColourG = 0;
    rectColourB = 255;
    modeRainbow = false;
  }
  if (key === " ") {
    modeRainbow = true;
  }
  if (key === "i" || key === "I"){
    modeInsanity = true;
  }
  if (key === "c" || key === "C") {
    background(255);
  }
  if (key === "n" || key === "N") {
    modeFirework = false;
    modeInsanity = false; 
    modeRainbow = false;
    rectColourR = 255;
    rectColourG = 255;
    rectColourB = 255;
    xVelocity = 2;
    yVelocity = 2;
  }
  if (key === "f" || key === "F") {
    modeFirework = true;
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

//Function that allows the mouse wheel to assign a random colour to the rectangle
function mouseWheel(event) {
  rectColourR = random(0, 255);
  rectColourG = random(0, 255);
  rectColourB = random(0, 255);
  modeRainbow = false;
}

//Function that allows the arrow keys to increase the speed when held then let go
function keyReleased() {
  xVelocityIncreasing = false;
  yVelocityIncreasing = false;
  xVelocityDecreasing = false;
  yVelocityDecreasing = false;
}

//Function that changes moves and colours the rectangle
function drawRectangle() {
  stroke(0);
  fill(rectColourR, rectColourG, rectColourB);
  rect(xPosition, yPosition, rectWidth, rectHeight);
}

//Function that allows the rectangle to bounce around the canvas
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

//Function that causes the rectangle to rapidly change to random colours
function rainbowMode() {
  if (modeRainbow === true) {
    rectColourR = random(0, 255);
    rectColourG = random(0, 255);
    rectColourB = random(0, 255);
  }
}

// Function that causes the rectangle to make a waving pattern as it travels (somewhat)
function fireworkMode() {
  if (modeFirework === true) {
    modeInsanity = false;
    xRectWaveCounter = 4 * sin(xRectBaseCounter);
    yRectWaveCounter = 4 * sin(yRectBaseCounter);
    xRectBaseCounter ++;
    yRectBaseCounter ++;
    if (xVelocity < 0) {
      xVelocity = xVelocity+ xRectWaveCounter;
    } 
    else {
      xVelocity = xVelocity+ xRectWaveCounter;
    }
    if (yVelocity < 0) {
      yVelocity = yVelocity- yRectWaveCounter;
    } 
    else {
      yVelocity = yVelocity- yRectWaveCounter;
    }
  }
}

//Function that allows the speed of the rectangle to be altered from the velocity of each axis
function speedChange() {
  if (xVelocityDecreasing) {
    xVelocity *= 0.9;
    xVelocity = constrain(xVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (xVelocityIncreasing) {
    xVelocity *= 1.1;
    xVelocity = constrain(xVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (yVelocityIncreasing) {
    yVelocity *= 1.1;
    yVelocity = constrain(yVelocity, rectMinSpeed, rectMaxSpeed);
  }
  if (yVelocityDecreasing) {
    yVelocity *= 0.9;
    yVelocity = constrain(yVelocity, rectMinSpeed, rectMaxSpeed);
  }
}

//Function that causes the rectangle to wander around the canvas in somewhat random patterns
function insanityMode() {
  if (modeInsanity === true) {
    modeFirework = false;
    xVelocity = xVelocity + sin(yPosition%360);
    yVelocity = yVelocity + sin(xPosition%360);
    xVelocity *= 0.9;
    xVelocity = constrain(xVelocity, rectMinSpeed, rectMaxSpeed);
    yVelocity *= 0.9;
    yVelocity = constrain(yVelocity, rectMinSpeed, rectMaxSpeed);
  }
}

//Function that updates the X & Y speed in the console and 
function valueStatus() {
  console.log(yVelocity);
  console.log(xVelocity);
  fill(255);
  noStroke();
  rect(0, 0, 55, 30);
  fill(0);
  text("X: " + round(xPosition), 10, 15);
  text("Y: " + round(yPosition), 10, 25);
}

//Function that changes the position of the rectangle at the end of the draw loop
function moveRectangle() {
  xPosition += xVelocity;
  yPosition += yVelocity;
}