
var mouseXC, mouseYC = 0


function psedo_angle_cos(v1,v2){
  return 1- ((v1.dot(v2))/(v1.mag()+v2.mag()))
}

//Calcula o pseudo angulo de um vetor com coordenadas x e y
function pseudo_angle(x,y){

    if (y >= 0) {
      if (x >= 0) {
          //Primeiro octante
          if (x >= y) {
              return y / x;
          }
          //Segundo octante
          return 2 - x / y;
      }
      //Terceiro octante
      if (-x <= y) {
          return 2 + (-x) / y;
      }
      //Quarto octante
      return 4 - y / (-x);
  }
  if (x < 0) {
      //Quinto octante
      if (-x >= -y) {
          return 4 + (-y) / (-x);
      }
      //Sexto octante
      return 6 - (-x) / (-y);
  }
  //Setimo octante
  if (x <= -y) {
      return 6 + x / (-y);
  }
  //Oitavo octante
  return 8 - (-y) / x;
}

// Calcula o angulo entre dois vetores em [0,8)
function two_vec_angle(v1,v2){

  let v1_ang = pseudo_angle(v1.x,v1.y)
  let v2_ang = pseudo_angle(v2.x,v2.y)


  let diff = abs(v1_ang-v2_ang)

  if (diff>4){
    diff= 8-diff
  }
  return diff
}

function create_cartesian(){

  
  line(-windowWidth,0,windowWidth,0)
  line(0,-windowHeight,0,windowHeight)
  
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  goCartesian()
  create_cartesian()


  v1 = createVector(mouseXC,mouseYC)
  v2 = createVector(200,50)
  line(0,0,v1.x,v1.y)
  line(0,0,v2.x,v2.y)


  
  texto(`Pseudoangulo ${v1.x} ${v1.y}`,150,120)
  texto(`Pseudoangulo ${pseudo_angle(v1.x,v1.y)}`,150,150)
  texto(`Angulo entre vetores ${two_vec_angle(v1,v2)}`,150,170)
}


//Funções Auxiliares
function goCartesian()
{
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
    
  translate(width/2,height/2)
  scale(1,-1,1)  
}

function grabMouse()
{
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
}

function texto(str,x,y)
{
  push()
    translate( x, y)
    scale(1,-1)
    translate(-x,-y)
  
    // desenha o texto normalmente
    text(str,x,y)
  pop()
}

function colore(c1,c2,c3,c4)
{
  if(c4 != null)
  {
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
  if(c3 != null)
  {
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null )
  {
    fill(c1)
    stroke(c1)
  }
  else
  {
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}