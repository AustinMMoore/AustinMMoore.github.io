// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - 


function setup() {
  createCanvas(windowWidth, windowHeight);
}

let cardXPosition = 0;
let cardYPosition = 0;
let cardWidth = 10;
let cardHeight = 40;

function draw() {
  background(255);
  cardMovement();
}

function cardMovement() {
  if (mouseX >= cardXPosition && mouseX <= cardXPosition + cardWidth && mouseY >= cardYPosition && mouseY <= cardYPosition + cardHeight) {
    cardXPosition = mouseX + cardWidth/2;
    cardYPosition = mouseY + cardHeight/2;
  }
}