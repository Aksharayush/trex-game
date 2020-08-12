var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud,cloudImage;
var Obs1,Obs2,Obs3,Obs4,Obs5,Obs6;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,restartImage,gameOverImage;
var ObstaclesGroup,CloudsGroup;
var score = 0;
var jump,checkpoint,die;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  Obs1 = loadImage("obstacle1.png")
  Obs2 = loadImage("obstacle2.png")
  Obs3 = loadImage("obstacle3.png")
  Obs4 = loadImage("obstacle4.png")
  Obs5 = loadImage("obstacle5.png")
  Obs6 = loadImage("obstacle6.png")
  restartImage = loadImage("restart.png")
  gameoverImage = loadImage("gameOver.png")
  jump = loadSound("jump.mp3");
  checkPoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3");
}

function setup() {
  createCanvas(800, 300);
  
  trex = createSprite(50,280,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
    ground = createSprite(400,280,800,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  gameOver = createSprite(400,150,30,30);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.5;
  
  restart = createSprite(400,200,30,30);
  restart.addImage(restartImage);
  restart.scale = 0.5
  
  CloudsGroup = new Group();
  ObstaclesGroup = new Group ();
  
  invisibleGround = createSprite(400,290,800,10);
  invisibleGround.visible = false;
}

function draw() {
  background(255);
  text ("score-"+ score,100,100);
  //console.log(trex.y);
  if(gameState === PLAY){
   if(keyDown("space")&&trex.y>=261) {
    trex.velocityY = -15;
     jump.play();
    
  }
     if (score>0 && score%100 === 0){ checkPoint.play(); }
    
    score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);
  gameOver.visible = false; 
  restart.visible = false ; 
    
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
  spawnObstacles();
  spawnClouds();
    
   if(ObstaclesGroup.isTouching(trex)){
      //playSound("jump.mp3");
      gameState = END;
     die.play();
      //playSound("die.mp3");
    }
  }
    
  
   else if (gameState === END){
       gameOver.visible = true;
       restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided);
     
    //change the trex animation
    //trex.setAnimation("trex_collided");
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
       
      if(mousePressedOver(restart)) {
    reset();
  }
            }
  
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(800,320,40,10);
    cloud.y = random(100,150);
    cloud.addImage("cloud", cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    CloudsGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 267;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(800,260,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
     var rand = Math.round(random(1,6));
    console.log (rand);
    switch(rand){
      case 1:  obstacle.addImage("obstacles",Obs1); 
       break;
       case 2:  obstacle.addImage("obstacles",Obs2); 
       break;
       case 3:  obstacle.addImage("obstacles",Obs3); 
       break;
       case 4:  obstacle.addImage("obstacles",Obs4); 
       break;
       case 5:  obstacle.addImage("obstacles",Obs5); 
       break;
       case 6:  obstacle.addImage("obstacles",Obs6); 
       break;
       default:break;
       
    }
     ObstaclesGroup.add(obstacle);
      
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 134;
  }
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score = 0;
  
}