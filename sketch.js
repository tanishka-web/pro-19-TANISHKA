var PLAY = 1;
var END = 0;
var gameState = PLAY;
var sun,sun_1
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score1=0
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart;
var sound,sound1
var score=0;
var bet,batt



function preload(){
  trex_running =   loadAnimation("motu-eating.png","motu-eating-samosa.png");
  trex_collided = loadAnimation("Screenshot (850).png");
  sun_1=loadImage("sunn.png")
  batt=loadImage("Screenshot (851).png")
  groundImage = loadImage("background.png");
  sound=loadSound("Ding-sound-effect.mp3")
  sound1=loadSound("mixkit-retro-arcade-lose-2027.wav")
  cloudImage = loadImage("samosa-2.png");
  
  obstacle1 = loadImage("spike.png");
  obstacle2 = loadImage("spike.png");
  obstacle3 = loadImage("spike.png");
  obstacle4 = loadImage("spike.png");
  obstacle5 = loadImage("spike.png");
  obstacle6 = loadImage("spike.png");
  
  gameOverImg = loadImage("overr.png");
  restartImg = loadImage("restart-256.png");
}

function setup() {
  createCanvas(700,700);
  
  ground = createSprite(100,420,400,20);
ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(5 + 3*score/100);
  ground.scale=1.2
  trex = createSprite(50,660,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.2;
  
  sun=createSprite(550,50)
  sun.scale=0.04;
  sun.addImage("sun",sun_1)
   
   
  gameOver = createSprite(300,260);
  gameOver.addImage(gameOverImg);
  
  bet = createSprite(230,150);
  bet.addImage(batt);
  bet.scale=0.4
  bet.visible=false
  
  restart = createSprite(300,340);
  restart.addImage(restartImg);
  
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,680,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("lightblue");
  
   textSize(30)
  fill("green");
  stroke("blue")
  text("*Score*: "+ score, 10,30);
 
   textSize(30)
  fill("brown");
  stroke("blue")
  text("*Samosa Eaten*: "+ score1, 220,30);
  
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
   
  
    if(touches.length>0||keyDown("space") && trex.y >=  600) {
      trex.velocityY = -17;
      sound.play();
      touches=[]
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    bet.visible=false
    
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      score1=0
      sound1.play()
    }
    if(cloudsGroup.isTouching(trex)){
        cloudsGroup[0].destroy();
      score1=score1+5
    }
    
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    bet.visible=true;
   
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
   
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(600,600,40,10);
    cloud.y = Math.round(random(470,510));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -5;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,660,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.04 ;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}




