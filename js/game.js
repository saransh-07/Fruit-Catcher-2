class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
                form.hide();

                Player.getPlayerInfo();
                 image(back_img, 0, 0, 1000, 800);
                 var x =100;
                 var y=200;
                 var index =0;
                 drawSprites();
                 var refer;
               
                 var refer = 0;
                 for(var plr in allPlayers){
                    
                    
                     index = index+1;
                     x = 500-allPlayers[plr].distance;
                     y=500;
                     
                     players[index -1].x = x;
                     players[index - 1].y = y;
                       
                     if(index === player.index){
                         
                     fill ("black");
                     textSize(25);
                     text(allPlayers[plr].name,x-25,y+25);

                         
                     }
                     if(refer===0){
                         textSize(15);
                        fill("white");
                        text(allPlayers.player1.name+ ":"+allPlayers.player1.score,20,30);
                        text(allPlayers.player2.name+ ":"+allPlayers.player2.score,20,50);                  
                        refer++;
                    }
                    
                 
                 }
                
                
                 

                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance -= 10
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance += 10
                    player.update();
                }
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(100, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitArray.push(fruits);
                     
                 }
                 
                  if (player.index !== null) {
                    for(var i = 0;i <fruitArray.length;i++){
                        if(fruitArray[i].isTouching(players[player.index-1])){
                            fruitArray[i].destroy();
                            player.score+=1;
                            player.update();
                         }
                     }
                   
                  }
    
      
         
        
         

    }
readTimer(){
    var timeRef = database.ref("Timer");
    timeRef.on("value",function (data){
        timerCount = data.val();
    })
}
updateTimer(x){
    if(x>0){
        x--;
    }
   
    database.ref('/').update({
  Timer:x
    })
}
    end(){
        for(var a=0;a<fruitArray.length;a++){
            fruitArray[a].destroy();
        }
       console.log("Game Ended");
       if(timerCount===0&&timerCount!==undefined){
        if(allPlayers!==undefined&&allPlayers.player1.score>allPlayers.player2.score){
                 text(allPlayers.player1.name+" has won",200,300);
        }else if(allPlayers!==undefined&&allPlayers.player2.score>allPlayers.player1.score){
            text(allPlayers.player2.name+" has won",200,300);
        }
    }
    }
}