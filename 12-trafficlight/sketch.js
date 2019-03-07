// Traffic Light Starter Code
// Dan Schellenberg
// Sept 25, 2018

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/

function setup() {
  createCanvas(600, 600);
}

let lightState = 1;
let secondsPassed = 0;
let redLightDuration = 5;
let yellowLightDuration = 3;
let greenLightDuration = 5;
let cycleDuration = 0;

function draw() {
  background(255);
  drawOutlineOfLights();
  convertSeconds();

  findState();
  displayLight();
}

function convertSeconds() {
  secondsPassed = round(millis()/1000);
  console.log(secondsPassed);
}

function lightCycleDuration() {
  if (secondsPassed > cycleDuration) {
    cycleDuration
  }
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function greenLight() {
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(255);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(0, 255, 0);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function yellowLight() {
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(255, 255, 0);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(255);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function redLight() {
  fill(255, 0, 0);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(255);
  ellipse(width/2, height/2, 50, 50); //middle
  fill(255);
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function findState() {
  if (cycleDuration > greenLightDuration) {
    lightState += 1;
  }
  if (cycleDuration > yellowLightDuration + greenLightDuration) {
    lightState += 1;
  }
  if (cycleDuration > redLightDuration + yellowLightDuration + greenLightDuration) {
    lightState += 1;
  }
  if (lightState >= 4) {
    lightState = 1;
  }
}

function displayLight () {
  if (lightState === 1) {
    greenLight();
  }
  if (lightState === 2) {
    yellowLight();
  }
  if (lightState === 3) {
    redLight();
  }
}