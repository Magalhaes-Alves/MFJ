//Variaveis Globais
var mouseXC, mouseYC = 0


function toRadians(degree){

  return (PI/180)*degree

}

function isVectorNull(v1){
  return v1.mag()==0
}

function to_degree(r){
  
  return (180/PI)*r
}

function cos_vector_2d(v1,v2){
  
  if (isVectorNull(v1) || isVectorNull(v2)){
    console.log("Um dos vetores é nulo.")
    return
  }
  
  return degrees(acos(p5.Vector.dot(v1,v2)/(v1.mag()*v2.mag())))
  
}

function sen_vector_2d(v1,v2,is3d){

  if (isVectorNull(v1) || isVectorNull(v2)){
    console.log("Um dos vetores é nulo.")
    return
  }
   
  let ang = p5.Vector.cross(v1,v2).mag()
  
  return degrees(asin(ang/(v1.mag()*v2.mag())))
    
}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  goCartesian()

  v1 = createVector(mouseXC,mouseYC)
  v2 = createVector(400,0)  
  line(0,0,v1.x,v1.y)
  line(0,0,v2.x,v2.y)


  noFill()
  stroke(0)

  let angle= toRadians((cos_vector_2d(v1,v2)))
  
  stroke(255,0,0)
  if (mouseYC>0) {
    // Se o ângulo for maior que 180 graus, inverta os ângulos inicial e final
    arc(0, 0, 100, 100, angle,0);
    fill(255,0,0)
    arc(0, 0, 
      ((360 -degrees(angle))/360)*100,
      ((360-degrees(angle))/360)*100, 
      angle,0);
    angle=360 -degrees(angle)
  } else {
    // Caso contrário, desenhe o arco normalmente
    arc(0, 0, 100, 100, -angle, 0);
    fill(255,0,0)
    arc(0, 0, 
      (degrees(-angle)/360)*100,
      (degrees(-angle)/360)*100, 
      -angle,0);
    angle= degrees(angle)
  }

  texto(`Angulo é: ${angle}`,200,200)

  console.log(cos_vector_2d(v1,v2))
  

}

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