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
let gameState = "menu";
let playButtonHeight = 200;
let playButtonWidth = 300;
let buttonColour;
let cardScalar = 1;
let card1, card2, card3, card4, card5, card6, card7;
let playButton;

function draw() {
  background(220);
  if (gameState === "menu") {
    // showPlayButton();
    playButton.show();
    if (check)
  }
  if (gameState === "game") {

    card1.behavior();
    card2.behavior();
    card3.behavior();
    card4.behavior();
    card5.behavior();
    card6.behavior();
    card7.behavior();

    // showCard();
    // cardMovement();
    // zoomOnCard();
  }
}

// function cardMovement() {
//   if (mouseX >= cardXPosition && 
//       mouseX <= cardXPosition + cardWidth &&
//       mouseY >= cardYPosition && 
//       mouseY <= cardYPosition + cardHeight & mouseIsPressed) {
//     cardXPosition = mouseX - cardWidth / 2;
//     cardYPosition = mouseY - cardHeight / 2;
//     cardDragging = true;
//   }
// }

// function showCard() {
//   fill(100);
//   rect(cardXPosition, cardYPosition, cardWidth * cardScalar, cardHeight * cardScalar);
// }

// function showPlayButton() {
//   if (mouseX <= width / 2 + playButtonWidth/2 && 
//       mouseX >= width / 2 - playButtonWidth/2 && 
//       mouseY >= height / 2 - playButtonHeight / 2 - 100 && 
//       mouseY <= height / 2 + playButtonHeight / 2 - 100 ) {
//     buttonColour = 200;
//   }
//   else {
//     buttonColour = 255;
//   }
//   if (gameState === "menu") {
//     fill(buttonColour);
//     rect(width/2, height/2 - 100, playButtonWidth, playButtonHeight);
//   }
// }

// function mouseClicked() {
//   if (mouseX <= width/2 + playButtonWidth/2 && 
//       mouseX >= width/2 - playButtonWidth/2 && 
//       mouseY >= height/2 - playButtonHeight/2 - 100 && 
//       mouseY <= height/2 + playButtonHeight/2 - 100 ) {
//     gameState = "game";
//   }
// }

// function zoomOnCard() {
//   if (mouseX >= cardXPosition && 
//     mouseX <= cardXPosition + cardWidth &&
//     mouseY >= cardYPosition && 
//     mouseY <= cardYPosition + cardHeight &&
//     !mouseIsPressed ) {
//     cardScalar = 3;
//   }
//   else {
//     cardScalar = 1;
//   }
// }

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
    if (mouseX >= this.x - this.width/2 && 
        mouseX <= this.x + this.width/2 &&
        mouseY >= this.y - this.height/2 && 
        mouseY <= this.y + this.height/2 && 
        mouseIsPressed) {
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

card1 = new Card(100, 100);
card2 = new Card(250, 100);
card3 = new Card(400, 100);
card4 = new Card(550, 100);
card5 = new Card(700, 100);
card6 = new Card(850, 100);
card7 = new Card(1000, 100);

class Button {
  constructor(x, y, width, height, text) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    text(text, x, y);
  }

  show() {
    fill(0);
    rect(x, y, width, height);
  }

  checkIfSelected() {
    return mouseX >= this.x - this.width/2 && 
           mouseX <= this.x + this.width/2 &&
           mouseY >= this.y - this.height/2 && 
           mouseY <= this.y + this.height/2;
  }

  checkIfSelected() {
    return checkIfSelected && mouseIsPressed
  }
}

playButton = new Button(width/2, height/2, 300, 200, "PLAY");