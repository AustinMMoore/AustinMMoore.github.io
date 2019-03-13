// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - 


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

let cardXPosition = 10;
let cardYPosition = 10;
let cardWidth = 100;
let cardHeight = 160;
let cardDragging = false;
let gameState = "menu";
let playButtonHeight = 200;
let playButtonWidth = 300;
let buttonColour;
let cardScalar = 1;

function draw() {
  background(220);
  if (gameState === "menu") {
    drawPlayButton();
  }
  if (gameState === "game") {
    rectMode(CORNER);
    drawCard();
    cardMovement();
    zoomOnCard();
  }
  console.log(cardScalar);
}

function cardMovement() {
  if (mouseX >= cardXPosition && 
      mouseX <= cardXPosition + cardWidth &&
      mouseY >= cardYPosition && 
      mouseY <= cardYPosition + cardHeight & mouseIsPressed) {
    cardXPosition = mouseX - cardWidth / 2;
    cardYPosition = mouseY - cardHeight / 2;
    cardDragging = true;
  }
}

function drawCard() {
  fill(100);
  rect(cardXPosition, cardYPosition, cardWidth * cardScalar, cardHeight * cardScalar);
}

function drawPlayButton() {
  if (mouseX <= width / 2 + playButtonWidth/2 && 
      mouseX >= width / 2 - playButtonWidth/2 && 
      mouseY >= height / 2 - playButtonHeight / 2 - 100 && 
      mouseY <= height / 2 + playButtonHeight / 2 - 100 ) {
    buttonColour = 200;
  }
  else {
    buttonColour = 255;
  }
  if (gameState === "menu") {
    fill(buttonColour);
    rect(width / 2, height / 2 - 100, playButtonWidth, playButtonHeight);
  }
}

function mouseClicked() {
  if (mouseX <= width / 2 + playButtonWidth / 2 && 
      mouseX >= width / 2 - playButtonWidth / 2 && 
      mouseY >= height / 2 - playButtonHeight / 2 - 100 && 
      mouseY <= height / 2 + playButtonHeight / 2 - 100 ) {
    gameState = "game";
  }
}

function zoomOnCard() {
  if (mouseX >= cardXPosition && 
    mouseX <= cardXPosition + cardWidth &&
    mouseY >= cardYPosition && 
    mouseY <= cardYPosition + cardHeight &&
    !mouseIsPressed ) {
    cardScalar = 3;
  }
  else {
    cardScalar = 1;
  }
}

class Card {
  constructor(cardXPosition, cardYPosition, cardHeight, cardWidth) {
    this.height = cardHeight;
    this.width = cardWidth;
    this.x = 200;
    this.y = 300;
    this.scalar = cardScalar;
  }

  zoomIn() {
    if (mouseX >= this.x && 
      mouseX <= this.x + this.width &&
      mouseY >= this.y && 
      mouseY <= this.y + this.height &&
      !mouseIsPressed ) {
      this.scalar = 3;
    }
    else {
      this.scalar = 1;
    }
  }
}