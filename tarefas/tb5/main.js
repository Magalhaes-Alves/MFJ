let linhas =[]
let particles =[]

let new_point =[]

class Particles{

  constructor(speed_x,speed_y,factor=1){

    this.p= createVector(random(0, width/2), random(0, height/2))
    this.speed = createVector(speed_x,speed_y)
    this.speed = div(this.speed,this.speed.mag())
    this.factor = factor
  }


  draw(){
    rect(this.p.x,this.p.y,2,2)

  }
}



class Line{

  //Construtor recebe objectos do tivo vec
  constructor(start_i,end_i,start_f,end_f,n){

      if (arguments.length ==2){
          this.start = start_i
          this.end =end_i
      }else if (arguments.length==3){

          this.start= createVector(start_i,end_i)
          this.end = createVector(start_f,end_f)
          this.n =start_f
      }
      else if (arguments.length==4){

        this.start= createVector(start_i,end_i)
        this.end = createVector(start_f,end_f)
      }else if(arguments.length ==5){
        this.start= createVector(start_i,end_i)
        this.end = createVector(start_f,end_f)
        this.n = n
      }

  }

  drawLine(){

      line(this.start.x,this.start.y,this.end.x, this.end.y)
  }

  crosses(l){
    let A = this.start
    let B = this.end
    let C = l.start
    let D = l.end
  
    let AB = p5.Vector.sub(B,A);
    let AC = p5.Vector.sub(C,A);
    let AD = p5.Vector.sub(D,A);
  
    let AB_x_AC = AB.cross(AC);
    let AB_x_AD = AB.cross(AD);
  
    let CD = p5.Vector.sub(D,C);
    let CA = p5.Vector.sub(A,C);
    let CB = p5.Vector.sub(B,C);
  
    let CD_x_CA = CD.cross(CA);
    let CD_x_CB = CD.cross(CB);
  
    //Verifica se não houve colisão
    if ((AB_x_AC.z * AB_x_AD.z > 0) || (CD_x_CA.z * CD_x_CB.z > 0)) {
  
      return false;
    //Se houver, verifica se os dois vetores não são colineares
    }else if(AB.cross(CD).mag()==0){
      return false
  
    }

    return true

  }

  dir(){
    return sub(this.end,this.start)
  }

  normal(){
    let n =this.dir()

    let v =createVector(-n.y,n.x)

    return v.div(v.mag())
  }
}


function add(v1,v2) {return p5.Vector.add(v1,v2)}
function sub(v1,v2) {return p5.Vector.sub(v1,v2)}
function mult(v1,scalar) {return p5.Vector.mult(v1,scalar)}
function dot(v1,v2) {return p5.Vector.dot(v1,v2)}
function div(v1,scalar) {return p5.Vector.div(v1,scalar)}
function cross(v1,v2) {return p5.Vector.cross(v1,v2).z}

function setValidPosiition(v){


  v.x = min(v.x,width/2)
  v.y = min(v.y,height/2)


  v.x = max(v.x,-width/2)
  v.y = max(v.y,-height/2)

  return v
}

function setup() {
    createCanvas(400, 400);

    //Setando as variaveis
    /* v1 = createVector(-190,0)

    speed = createVector(0.56,0.2)

    speed = div(speed,speed.mag())

    factor =10 */

    linhas.push(new Line(width/2,-height/2,width/2,height/2))
    linhas.push(new Line(width/2,height/2,-width/2,height/2))
    linhas.push(new Line(-width/2,height/2,-width/2,-height/2))
    linhas.push(new Line(-width/2,-height/2,width/2,-height/2))
    linhas.push(new Line(-30,50,25,-180))
    linhas.push(new Line(150,150,400,400))



    particles.push(new Particles(0.1,2,1.0))
    particles.push(new Particles(1,1.8,1.0))
    particles.push(new Particles(1.6,3,1.0))


  }

function draw() {
  
  background("#EDF8FA");
  goCartesian()
  
  
  colore(0);

    

  particles.forEach(particle => {
    let v2,n,vp;
    let colisao=false

    
    v2 =add(particle.p,mult(particle.speed,particle.factor))

    for (i=0;i<linhas.length;i++){
      if(linhas[i].crosses(new Line(particle.p,v2))){

        colisao=true
        n= linhas[i].normal()
      }
    

    }


  
    if (colisao){

      let alpha=1.0
      let beta=1.0
      vn = mult(n,dot(n,particle.speed))
      vp = sub(particle.speed,vn)
      
      let l = particle.speed.mag()

      particle.speed = sub(mult(vp,alpha),mult(vn,beta))

      particle.speed = div(particle.speed,particle.speed.mag())
      particle.speed =mult(particle.speed,l)

    }else{
      particle.p=v2
    }
    
    particle.p =setValidPosiition(particle.p)
    
  });
  
  
  colore(0)

  linhas.forEach(element => {
    element.drawLine()
  });

  particles.forEach(element => {
    element.draw()
  });

  function mousePressed() {
    new_point.push(createVector(mouseX, mouseY));

    if (new_point.length==2){

      console.log(new_point)

      linhas.push(new_point[0],new_point[1])
      new_point=[]
    }
  }
    
}


function keyPressed() {
  if (keyCode === ENTER) {
    reset();
  }
}

function reset() {
  points = [];
  particles = [];

  setup()
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