// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - 


function setup() {
  createCanvas(windowWidth, windowHeight);
}

let cardXPosition = 10;
let cardYPosition = 10;
let cardWidth = 60;
let cardHeight = 100;

function draw() {
  background(255);
  drawCard();
  cardMovement();
}

function cardMovement() {
  if (mouseX >= cardXPosition && mouseX <= cardXPosition + cardWidth && mouseY >= cardYPosition && mouseY <= cardYPosition + cardHeight & mouseIsPressed) {
    cardXPosition = mouseX - cardWidth/2;
    cardYPosition = mouseY - cardHeight/2;
  }
}

function mouseClicked() {

}

function drawCard() {
  fill(0);
  rect(cardXPosition, cardYPosition, cardWidth, cardHeight);
}