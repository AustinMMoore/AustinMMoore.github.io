// Chamber of Echoes
// Austin Moore
// March 5th 2019
//
// Extra for Experts:
// - Full use of class system in buttons and cards
// - Used array to choose card colour randomly
// - Sound implemented (background music and button click)


//Preloads the sound (mp3) and image (png) files used
function preload() {
  soundFormats("mp3");
  backgroundMusic = loadSound("assets/sounds/backgroundMusic.mp3");
  buttonClick = loadSound("assets/sounds/buttonClick.mp3");
  cardPickUp = loadSound("assets/sounds/cardPickUp.mp3");
  cardDraw = loadSound("assets/sounds/cardDraw.mp3");
  deckShuffle = loadSound("assets/sounds/deckShuffle.mp3");

  whiteCard = loadImage("assets/cards/whitecard.png");
  blueCard = loadImage("assets/cards/bluecard.png");
  greenCard = loadImage("assets/cards/greencard.png");
  redCard = loadImage("assets/cards/redcard.png");
  yellowCard = loadImage("assets/cards/yellowcard.png");

  chomperMonsterImage = loadImage("assets/monsters/chomper.png");
  blueBeanMonsterImage = loadImage("assets/monsters/blueBean.png");
  spikySlimeMonsterImage = loadImage("assets/monsters/spikySlime.png");
}

//sets up the canvas, center modes (rect, text, image), playmodes for sounds, and runs the setup for the cards
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  imageMode(CENTER);
  backgroundMusic.playMode("sustain");
  buttonClick.playMode("restart");
  cardPickUp.playMode("restart");
  cardDraw.playMode("restart");
  deckShuffle.playMode("restart");
  backgroundMusic.loop();
  cardClassSetup();
  monsterSetup();
}

//setup all the variables
let cardWidth = 100;
let cardHeight = 160;
let cardScalar = 1;
let cardInHand = false;
let draggingCardID;
let newCardType;

let gameState = "menu";
let buttonTextSize;

let soundMute = false;
let soundVolume = 0.5;
let playingSound = false;
let muteButtonReady = true;

let colourChange = false;
let backgroundColour = "grey";
let buttonColour = "white";
let textColour = "black";
let cardColourList = ["white", "blue", "green", "red", "yellow"];

let backgroundMusic, buttonClick, cardPickUp, cardDraw, deckShuffle;
let whiteCard, blueCard, greenCard, redCard, yellowCard;
let card1, card2, card3, card4, card5, card6, card7;
let playButton, optionsButton, quitButton, darkOptionButton, lightOptionButton, soundOptionButton, backOptionButton, backPlayButton;

let chomperMonster, blueBeanMonster, spikySlimeMonster;
let chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage;
let monsterSpriteList = [chomperMonsterImage, blueBeanMonsterImage, spikySlimeMonsterImage];
let monsterOne, monsterTwo, monsterThree;
let monsterList = [chomperMonster, blueBeanMonster, spikySlimeMonster];
let monsterLocationOne = [1/3, 1/2];
let monsterLocationTwo = [1/2, 1/4];
let monsterLocationThree = [2/3, 1/2];
let monsterLocationList = [monsterLocationOne, monsterLocationTwo, monsterLocationThree];
let monstersSpawned = false;

let heavyAttack, lightAttack;

//main draw loop of the code
function draw() {
  checkMute();
  background(backgroundColour);
  buttonClassSetup();
  displayMenu();
  displayGame();
  displayOptions();
}

//shows the main menu screen where you can go to the Game, Options, or Quit (Check Console XD)
function displayMenu() {
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
      console.log("You'll never escape me!");
      // window.close();
    }
  }
}

//shows the card game (where for now cards can be dragged around individually)
function displayGame() {
  if (gameState === "game") {
    spikySlimeMonster.showMonster();
    cardBehavior();
    backPlayButton.show();
    if (backPlayButton.isClicked()) {
      gameState = "menu";
    }
  }
}

//shows the extra settings including the two themes and mute sound
function displayOptions() {
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
    if (soundOptionButton.isClicked() && muteButtonReady) {
      soundMute = !soundMute;
      muteButtonReady = false;
    }
    if (backOptionButton.isClicked()) {
      gameState = "menu";
    }
  }
}

//the main function to call each card's behavior
function cardBehavior() {
  card1.behavior();
  card2.behavior();
  card3.behavior();
  card4.behavior();
  card5.behavior();
  card6.behavior();
  card7.behavior();
}

//checks if the user ever resizes the window and changes the scaling
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//sets up the buttons used throughout the code in their according classes
function buttonClassSetup() {
  playButton = new Button(width/2, height/4, 300, 200, "Play", 40);
  optionsButton = new Button(width/2, height/2, 250, 150, "Options", 30);
  quitButton = new Button(width/2, height * (14/20), 200, 100, "Quit", 30);
  darkOptionButton = new Button(width/2, height * (1/5), 250, 150, "Dark Theme", 30);
  lightOptionButton = new Button(width/2, height * (2/5), 250, 150, "Light Theme", 30);
  soundOptionButton = new Button(width/2, height * (3/5), 250, 150, "Toggle Sound", 30);
  backOptionButton = new Button(width/2, height * (4/5), 250, 150, "Back", 30);
  backPlayButton = new Button(width - 75, 75, 150, 150, "Back", 30);
}

//sets up the cards used in the game as separate entities
function cardClassSetup() {
  card1 = new Card(width * (1/15), height * (5/6), 1);
  card2 = new Card(width * (2/15), height * (5/6), 2);
  card3 = new Card(width * (3/15), height * (5/6), 3);
  card4 = new Card(width * (4/15), height * (5/6), 4);
  card5 = new Card(width * (5/15), height * (5/6), 5);
  card6 = new Card(width * (6/15), height * (5/6), 6);
  card7 = new Card(width * (7/15), height * (5/6), 7);
}

function cardStatSetup() {
  heavyAttack = new CardInfo("white", 2, "Heavy Attack", "Deal 10 damage.", "base", this.cardDamage(10));
  lightAttack = new CardInfo("white", 1, "Light Attack", "Deal 5 damage.", "base", this.cardDamage(5));
}

function monsterSetup() {
  chomperMonster = new Monster("Chomper", 0, 25, 55, "Bite", "Consume", "Defend");
  blueBeanMonster = new Monster("Blue Bean", 1, 20, 50, "Slap", "Smack", "Defend");
  spikySlimeMonster = new Monster("Spiky Slime", 2, 60, 60, "Slap", "SpikeUp", "Defend");
  chomperMonster.monsterImage = chomperMonsterImage;
  blueBeanMonster.monsterImage = blueBeanMonsterImage;
  spikySlimeMonster.monsterImage = spikySlimeMonsterImage;
}

//checks when the mouse is released
function mouseReleased() {
  cardInHand = false;
  draggingCardID = 0;
  muteButtonReady = true;
  //console.log(mouseX + ", " + mouseY);
}

//checks if the game is or is not sound muted
function checkMute() {
  if (soundMute && muteButtonReady) {
    soundVolume = 0;
    backgroundMusic.pause();
  }
  else {
    soundVolume = 0.5;
    if (!backgroundMusic.isLooping()) {
      backgroundMusic.loop();
    }
  }
  backgroundMusic.setVolume(soundVolume);
  buttonClick.setVolume(soundVolume);
  cardPickUp.setVolume(soundVolume);
  cardDraw.setVolume(soundVolume);
  deckShuffle.setVolume(soundVolume);
}

//changes the suit of the card by using "1, 2, 3, 4, 5" while dragging the card
function keyPressed() {
  if (key === "1") {
    newCardType = cardColourList[0];
    colourChange = true;
  }
  if (key === "2") {
    newCardType = cardColourList[1];
    colourChange = true;
  }
  if (key === "3") {
    newCardType = cardColourList[2];
    colourChange = true;
  }
  if (key === "4") {
    newCardType = cardColourList[3];
    colourChange = true;
  }
  if (key === "5") {
    newCardType = cardColourList[4];
    colourChange = true;
  }
}

//defines the class used for the card's behavior
class Card {

  //sets up the initial values of the card's variables
  constructor(x, y, cardID) {
    this.height = cardHeight;
    this.width = cardWidth;
    this.x = x;
    this.y = y;
    this.cardType = cardColourList[floor(random(5))];
    this.scalar = cardScalar;
    this.cardID = cardID;
    this.newCardType = this.cardType;
  }

  //zooms in on the card when the mouse is hovering over it but not clicked
  zoomIn() {
    if (this.isSelected() && !mouseIsPressed) {
      this.scalar = 2;
    }
    else {
      this.scalar = 1;
    }
  }

  //displays the card in the correct suit, position, and size
  showCard() {
    fill(100);
    if (cardInHand && draggingCardID === this.cardID && colourChange) {
      this.cardType = newCardType;
      colourChange = false;
    }
    if (this.cardType === "white"){
      image(whiteCard, this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
    else if (this.cardType === "blue") {
      image(blueCard, this.x, this.y, this.width * this.scalar, this. height * this.scalar);
    }
    else if (this.cardType === "green") {
      image(greenCard, this.x, this.y, this.width * this.scalar, this. height * this.scalar);
    }
    else if (this.cardType === "red") {
      image(redCard, this.x, this.y, this.width * this.scalar, this. height * this.scalar);
    }
    else if (this.cardType === "yellow") {
      image(yellowCard, this.x, this.y, this.width * this.scalar, this. height * this.scalar);
    }
    else {
      rect(this.x, this.y, this.width * this.scalar, this.height * this.scalar);
    }
  }

  //moves the card when it is dragged with the cursor (avoids creating stacks of cards)
  moveCard() {
    if (this.isClicked() && !cardInHand) {
      cardInHand = true;
      draggingCardID = this.cardID;
    }
    if (cardInHand && draggingCardID === this.cardID) {
      this.x = mouseX;
      this.y = mouseY;
    }
  }

  //funcion that returns if it is moused over and not clicked
  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 && mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  //function that returns if it is clicked
  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }

  //fucntion that calls all of the card's behaviors
  behavior() {
    this.moveCard();
    this.zoomIn();
    this.showCard();
  }
}

//defines the class used for the button's behavior
class Button {

  //sets up the initial values of the button's variables
  constructor(x, y, width, height, text, textSize) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.buttonText = text;
    this.buttonTextSize = textSize;
  }

  //displays the button with the correct colour, text, and size
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
    if (this.isClicked() && !playingSound) {
      playingSound = true;
      buttonClick.play();
      playingSound = false;
    }
    fill(buttonColour);
    rect(this.x, this.y, this.width, this.height);
    fill(textColour);
    textSize(this.buttonTextSize);
    text(this.buttonText, this.x, this.y + this.buttonTextSize/2);
  }
   
  //funcion that returns if it is moused over and not clicked
  isSelected() {
    return mouseX >= this.x - this.width/2 && mouseX <= this.x + this.width/2 &&mouseY >= this.y - this.height/2 && mouseY <= this.y + this.height/2;
  }

  //function that returns if it is clicked
  isClicked() {
    return this.isSelected() && mouseIsPressed;
  }
}

class CardInfo {

  constructor(colour, cost, name, text, rarity, effectOne, effectTwo, effectThree) {
    this.cardColour = colour;
    this.cardCost = cost;
    this.cardName = name;
    this.cardText = text;
    this.cardRarity = rarity;
    this.cardEffectOne = effectOne;
    this.cardEffectTwo = effectTwo;
    this.cardEffectThree = effectThree;
  }

  cardDamage(damageValue) {

  }

}

class Monster {

  constructor(name, imageNumber, health, gold, attackOne, attackTwo, attackThree) {
    this.monsterName = name;
    // this.monsterImage = monsterSpriteList[imageNumber];
    this.monsterHealth = health;
    this.monsterGold = gold;
    this.monsterAttackOne = attackOne;
    this.monsterAttackTwo = attackTwo;
    this.monsterAttackThree = attackThree;
    this.monsterNumber = round(random(1, 3));
  }
  
  spawnMonsters(spawnNumber) {
    if (!monstersSpawned) {
      monstersSpawned = true;
      for(spawnNumber; spawnNumber > 0; spawnNumber--) {
        monsterList[0].monsterNumber = 1;
        monsterList[1].monsterNumber = 1;
        monsterList[2].monsterNumber = 1;
      }
    }
  }

  showMonster() {
    if (this.monsterNumber === 1) {
      this.xPosition = width * monsterLocationOne[0]; 
      this.yPosition = height * monsterLocationOne[1];
      image(this.monsterImage, this.xPosition, this.yPosition);
    }
    else if (this.monsterNumber === 2) {
      this.xPosition = width * monsterLocationTwo[0]; 
      this.yPosition = height * monsterLocationTwo[1];
      image(this.monsterImage, this.xPosition, this.yPosition);
    }
    else if (this.monsterNumber === 3) {
      this.xPosition = width * monsterLocationThree[0]; 
      this.yPosition = height * monsterLocationThree[1];
      image(this.monsterImage, this.xPosition, this.yPosition);
    }
    console.log(this.monsterNumber);
  }
}