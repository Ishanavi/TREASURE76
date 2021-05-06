class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(0,100);
    car1.addImage("car1",car1_img);
    
    car2 = createSprite(0,300);
    car2.addImage("car2",car2_img);

    car3 = createSprite(0,500);
    car3.addImage("car3",car3_img);

    car4 = createSprite(0,700);
    car4.addImage("car4",car4_img);

    treasure1 = createSprite(5380,300);
    //redFish = createSprite(5200,350);
    treasure1.addImage("t1",t1);
    //redFish.addImage("rf",rf);
    treasure2=createSprite(5380,400)
    treasure3=createSprite(5380,200)
    treasure4=createSprite(5380,100)
    treasure2.addImage("t2",t5);
    treasure3.addImage("t3",t1);
    treasure4.addImage("t4",t5);
   // redFish.velocityX= -
    
   // redFish.velocityY= 1;

    
    
    //r2.addImage("rf",rf);
    //redFish.scale=0.7;
    //redFish.velocityX=1;
    treasure1.scale=0.2;
    treasure2.scale=0.05;
    treasure3.scale=0.2;
    treasure4.scale=0.05;

    //tFish =[treasure1,redFish,t3,r2]
    cars = [car1, car2, car3, car4];
    car1.scale=0.6;
    car2.scale=0.6;
    car3.scale=0.6;
    car4.scale=0.6;

   
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(track);
      image(track, -displayWidth,displayHeight,displayWidth*5, displayHeight);
      
      //var display_position = 100;

      


      //index of the array
      var index = 0;
      
      //x and y position of the cars
      var x;
      var y = 25 ;
      //var x1;
      //var y1 = 25;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
      
        //position the cars a little away from each other in x direction
        //You can change the 100 and set accordingly.
        y = y + 150;
       // y1=y1+150;
        //use data form the database to display the cars in y direction
       // y = displayHeight - allPlayers[plr].distance;
        x = displayWidth + allPlayers[plr].distance;
        //x1= Math.round(random(0,100));
        cars[index-1].x = x;
        cars[index-1].y = y;
        //tFish[index-1].x =x1+250;
        //tFish[index-1].y =y1+60;
      


      
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          //game.obstacles();
         // camera.position.x = displayWidth/2;
         // camera.position.y = cars[index-1].y;
          camera.position.y = displayHeight/2;
          camera.position.x = cars[index-1].x;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    /*if(keyIsDown(UP_ARROW) && player.index !== null){
      player.y -=2
     // player.update();
    }

    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.y +=2
     // player.update();
    }
*/
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
      console.log(player.distance);
    }


    
    drawSprites();

  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
    
  }


obstacles()
{
  if(frameCount%60===0)
  {
    var ob1 = createSprite(random(100,500),random(40,180),10,10);
    ob1.addImage(rf);
  }
}



}


