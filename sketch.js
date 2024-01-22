//variáveis do jogo
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

//imagens e sons carregados
function preload()
{
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup()
{
  createCanvas(600,600); //tela do jogo
  
  //torre
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  //grupo de portas
  doorsGroup = new Group(); 
  //grupo de grades → climbersGroup
climbersGroup = new Group();
  //grupo de blocos invisíveis que ficará junto às portas e grades das portas → invisibleBlockGroup
  invisibleBlockGroup = new Group();
  //sprite ghost (fantasma) com x:200, y: 200, largura: 50, altura:50
  ghost = createSprite (200 , 200 , 50 , 50)
  //Tamanho de ghost (scale) será de 0.3
  ghost.scale = 0.3
  //adicionar a imagem ghostImg para ghost
  ghost.addImage ("ghost",ghostImg)
}

function draw()
{
  background(0);
  
  //condição para gameState igual a "play"
  if (gameState === "play") 
  {
    // tocar spookySound em loop
  spookySound.loop ();
    //se a seta para a esquerda (left_arrow) for pressionada (keyDown)
    if(keyDown("left_arrow"))
    {
      //ghost desloca 3 pixels para a esquerda
      ghost.x = ghost.x - 3;
    }
    
    //condição para seta direita ser pressionada, fazendo ghost deslocar 3 pixels para a direita
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    



    //condição para se a tecla de espaço (space) for pressionada
    if(keyDown("space"))
    {
      //velocityY de ghost é -10;
    ghost.velocityY = -10;
    }
    
    // aumentar ghost.velocityY em 0.8
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400)
    {
      tower.y = 300;
    }

    //chamar a função spawnDoors();
    spawnDoors ();
    
    //condição para quando climberGroup tocar ghost
    if(climbersGroup.isTouching(ghost))
    {
      //velocityY de ghost será 0
    ghost.velocityY = 0
    }

    //condição para quando invisibleBlockGroup tocar ghost OU a posição Y de ghost for maior que 600
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      //destrui sprite ghost
    ghost.destroy ();
      //gameState muda para o estado "end"
      gameState = "end"
    }
    
    drawSprites();
  }
  
  //condição para gameState igual a "end"
  if (gameState === "end")
  {
    //parar spookySound
  spookySound.stop ();

    //exibir borda de mensagem de fim de jogo em amarelo
  stroke ("yellow")
    //definir a cor da mensagem de fim de jogo para amarela
  fill ("yellow")
    //definir tamanho do texto da mensagem de fim de jogo para 30
  textSize (30)  
    //exibir o texto "Fim de Jogo" na posição x: 230, y: 250
   text ("Fim de jogo", 230 , 250) 
  }

}

//função para criar portas (spawnDoors)
function spawnDoors() 
{
  //código para gerar as portas na torre a cada 240 frames
  if (frameCount % 240 === 0) 
  {
    //sprite door (porta)
    var door = createSprite(200, -50);
    //sprite climber (grade) na posição x: 200 e y: 10
    var climber = createSprite (200 , 10);
    //sprite invisibleBlock (bloco invisível) na posição x: 200 e y: 15
    var invisibleBlock = createSprite (200 , 15);

    //largura e altura de invisibleBlock
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    //define uma posição x aleatória para portas, grades e blocos invisívei, com base no valor de door
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    //adiciona a imagem doorImg à door
    door.addImage(doorImg);
    //adiciona climberImg à climber
    climber.addImage(climberImg);
    
    //velocidade no eixo Y de door, climber e invisibleBlock é 1
    door.velocityY = 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    
    //profundidade de ghost é igualada à de door
    ghost.depth = door.depth 
    //ghost fica à frente de todos os sprites (depth aumenta em 1)
    ghost.depth = ghost.depth + 1
   
    //designa tempo de vida a variável door para 800
    door.lifetime = 800
    //designa tempo de vida a variável climber para 800
    climber.lifetime = 800
    //designa tempo de vida a variável invisibleBlock para 800
    invisibleBlock.lifetime = 800
    
    //adiciona cada door (porta) ao grupo
    doorsGroup.add(door);
    //adiciona cada climber (grade) ao grupo
    climbersGroup.add(climber);
    //adiciona cada invisibleBlock (bloco invisível) ao grupo
    invisibleBlockGroup.add(invisbleBlock);
    invisibleBlock.debug = true;
  }
}

