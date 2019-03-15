// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - 


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER)
  playButton = new Button(width/2, height/4, 300, 200, "PLAY", 40);
  optionsButton = new Button(width/2, height/2, 250, 150, "OPTIONS", 30)
  card1 = new Card(100, 100);
  card2 = new Card(250, 100);
  card3 = new Card(400, 100);
  card4 = new Card(550, 100);
  card5 = new Card(700, 100);
  card6 = new Card(850, 100);
  card7 = new Card(1000, 100);
}

let cardWidth = 100;
let cardHeight = 160;
let gameState = "menu";
let buttonTextSize;
let cardScalar = 1;
let card1, card2, card3, card4, card5, card6, card7;
let playButton, optionsButton;

function draw() {
  background(240);
  if (gameState === "menu") {
    playButton.show();
    optionsButton.show();
    if (playButton.isClicked()) {
      gameState = "game";
    }
    if (optionsButton.isClicked()) {
      gameState = "options";
    }
  }
  if (gameState === "game") {
    card1.behavior();
    card2.behavior();
    card3.behavior();
    card4.behavior();
    card5.behavior();
    card6.behavior();
    card7.behavior();
  }
  if (gameState === "options") {
    throw
  }
}

class Card {
  constructor(x, y) {
    this.height = cardHeight;
    this.width = cardWidth;
    this.x = x;
    this.y = y;
    this.scalar = cardScalar;
  }

  zoomIn() {
    if (mouseX >= this.x - this.width/2 && 
      mouseX <= this.x + this.width/2 &&
      mouseY >= this.y - this.height/2 && 
      mouseY <= this.y + this.height/2 &&
      !mouseIsPressed ) {
      this.scalar = 2;
    }
    else {
      this.scalar = 1;
    }
  }

  showCard() {
    fill(100);
    rect(this.x, this.y, this.width * this.scalar, this.height * this.scalar);
  }

  moveCard() {
    if (mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 &&mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2 && mouseIsPressed) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  behavior() {
    this.zoomIn();
    this.showCard();
    this.moveCard();
  }
}

class Button {
  constructor(x, y, width, height, text, textSize) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.buttonText = text;
    this.buttonTextSize = textSize
  }

  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 &&mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  show() {
    if (this.isSelected()) {
      fill(200);
    }
    else {
      fill(255);
    }
    rect(this.x, this.y, this.width, this.height);
    fill(0)
    textSize(this.buttonTextSize);
    text(this.buttonText, this.x, this.y + this.buttonTextSize/2);
    return this.buttonText;
  }

  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }
}