// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - Full use of class system in buttons and cards


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  cardClassSetup();
}

let cardWidth = 100;
let cardHeight = 160;
let gameState = "menu";
let buttonTextSize;
let cardScalar = 1;
let cardIsDragging = false;
let soundMute = false;
let backgroundColour = "white";
let buttonColour = "grey";
let textColour = "black";

let card1, card2, card3, card4, card5, card6, card7;
let playButton, optionsButton, quitButton, darkOptionButton, lightOptionButton, soundOptionButton, backOptionButton, backPlayButton;

function buttonClassSetup() {
  playButton = new Button(width/2, height/4, 300, 200, "Play", 40);
  optionsButton = new Button(width/2, height/2, 250, 150, "Options", 30);
  quitButton = new Button(width/2, height * (14/20), 200, 100, "Quit", 30);
  darkOptionButton = new Button(width/2, height * (1/5), 250, 150, "Dark Theme", 30);
  lightOptionButton = new Button(width/2, height * (2/5), 250, 150, "Light Theme", 30);
  soundOptionButton = new Button(width/2, height * (3/5), 250, 150, "Toggle Sound", 30);
  backOptionButton = new Button(width/2, height * (4/5), 250, 150, "Back", 30);
  backPlayButton = new Button(width* (19/20), height * (1/10), 150, 150, "Back", 30);
}

function cardClassSetup() {
  card1 = new Card(width * (1/15), height * (5/6));
  card2 = new Card(width * (2/15), height * (5/6));
  card3 = new Card(width * (3/15), height * (5/6));
  card4 = new Card(width * (4/15), height * (5/6));
  card5 = new Card(width * (5/15), height * (5/6));
  card6 = new Card(width * (6/15), height * (5/6));
  card7 = new Card(width * (7/15), height * (5/6));
}

function draw() {
  background(backgroundColour);
  buttonClassSetup();
  if (gameState === "menu") {
    playButton.show();
    optionsButton.show();
    quitButton.show();
    if (playButton.isClicked()) {
      gameState = "game";
    }
    if (optionsButton.isClicked()) {
      gameState = "options";
    }
    if (quitButton.isClicked()) {
      // window.close();
    }
  }
  if (gameState === "game") {
    cardBehavior();
    console.log(card1.x);
    backPlayButton.show();
    if (backPlayButton.isClicked()) {
      gameState = "menu";
    }
  }
  if (gameState === "options") {
    lightOptionButton.show();
    darkOptionButton.show();
    soundOptionButton.show();
    backOptionButton.show();

    if (darkOptionButton.isClicked()) {
      backgroundColour = "grey";
    }
    if (lightOptionButton.isClicked()) {
      backgroundColour = "white";
    }
    if (soundOptionButton.isClicked()) {
      soundMute = true;
    }
    if (backOptionButton.isClicked()) {
      gameState = "menu";
    }
  }
}

function cardBehavior() {
  card1.behavior();
  card2.behavior();
  card3.behavior();
  card4.behavior();
  card5.behavior();
  card6.behavior();
  card7.behavior();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Card {
  constructor(x, y) {
    this.height = cardHeight;
    this.width = cardWidth;
    this.x = x;
    this.y = y;
    this.scalar = cardScalar;
    this.isDragging = false;
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
    if (this.isClicked() && !cardIsDragging) {
      cardIsDragging = true;
      this.x = mouseX;
      this.y = mouseY;
    }
    else {
      cardIsDragging = false;
    }
  }

  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }

  behavior() {
    this.moveCard();
    this.zoomIn();
    this.showCard();
  }
}

class Button {
  constructor(x, y, width, height, text, textSize) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.buttonText = text;
    this.buttonTextSize = textSize;
  }

  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 &&mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  show() {
    if (this.isSelected()) {
      if (backgroundColour === "white") {
        buttonColour = 80;
      }
      if (backgroundColour === "grey") {
        buttonColour = 180;
      }
    }
    else {
      if (backgroundColour === "white") {
        buttonColour = "grey";
      }
      if (backgroundColour === "grey") {
        buttonColour = "white";
      }
    }
    fill(buttonColour);
    rect(this.x, this.y, this.width, this.height);
    fill(textColour);
    textSize(this.buttonTextSize);
    text(this.buttonText, this.x, this.y + this.buttonTextSize/2);
    return this.buttonText;
  }

  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }
}