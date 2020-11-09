var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;

var player, form,game;
var player1,player2;
var players;
var fruits;
var fruitArray;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img, fruit5_img;
var player_img;

var timerCount=10800;
var timer;
var wonPlayer;
// create the variables for the score and displaying scores. and intialize with zero

function preload(){
  back_img = loadImage("images/jungle.jpg");
  player_img = loadImage("images/basket2.png");
  fruit1_img = loadImage("images/apple2.png");
  fruit2_img = loadImage("images/banana2.png");
  fruit3_img = loadImage("images/melon2.png");
  fruit4_img = loadImage("images/orange2.png");
  fruit5_img = loadImage("images/pineapple2.png");

}
function setup() {
  createCanvas(1000, 600);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  fruitArray=[];
}

function draw() {
  background(back_img);
game.readTimer();
   if (playerCount === 2) {
     game.update(1);
   }
   if (gameState === 1) {
     clear(); 
     game.play();
     if(timerCount%60===0&&timerCount!==undefined){
       timer = timerCount/60;
     }
     game.updateTimer(timerCount);
     textSize(15);
     fill("white"); 
     if(timerCount!==undefined){
      text("Time Remaining: "+timer+"s",700,20); 
     }
     if(timerCount===0){
       game.update(2);
     }
   }

   if (gameState === 2) {
    
     game.end();
     textSize(40);
     fill("white");
     text("Game over!!!",200,200);
   }
}