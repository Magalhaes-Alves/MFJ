function setup() {
  createCanvas(400, 400);
}


function draw_seg(p1,p2){
  let [xi,yi]=p1
  let [xf,yf]=p2
    
  line(xi,yi,xf,yf)
  
}

function show_coord(vetor) {
  textSize(16);
  text(`Coordenadas do Vetor: (${vetor.x}, ${vetor.y})`, 20, height - 20);
}



function verify_colision(p1,p2,p3,p4){
  
  
  var A = createVector(p1[0], p1[1]);
  var B = createVector(p2[0], p2[1]);
  var C = createVector(p3[0], p3[1]);
  var D = createVector(p4[0], p4[1]);

  var AB = p5.Vector.sub(B,A);
  var AC = p5.Vector.sub(C,A);
  var AD = p5.Vector.sub(D,A);

  var AB_x_AC = AB.cross(AC);
  var AB_x_AD = AB.cross(AD);

  var CD = p5.Vector.sub(D,C);
  var CA = p5.Vector.sub(A,C);
  var CB = p5.Vector.sub(B,C);

  var CD_x_CA = CD.cross(CA);
  var CD_x_CB = CD.cross(CB);

  //Verifica se não houve colisão
  if ((AB_x_AC.z * AB_x_AD.z > 0) || (CD_x_CA.z * CD_x_CB.z > 0)) {
    stroke(255,0,0)
    draw_seg(p1, p2);
    draw_seg(p3, p4);

    return null;
  //Se houver, verifica se os dois vetores não são colineares
  }else if(AB.cross(CD).mag()==0){
    stroke(0,0,255)
    draw_seg(p1, p2);
    draw_seg(p3, p4);
    return

  }

  stroke(0,255,0)

  draw_seg(p1, p2);
  draw_seg(p3, p4);

  noStroke();

  // Cálculo de 't'
  var v_d = p5.Vector.sub(D, C);
  var n = createVector(v_d.y, -v_d.x);
  var t = p5.Vector.dot(p5.Vector.sub(C, A), n) / p5.Vector.dot(AB, n); 
  
  p = p5.Vector.add(A, p5.Vector.mult(AB, t))

  fill(200,1,150)
  ellipse(p.x,p.y,8,8)

  fill(255)
  ellipse(p.x,p.y,3,3)
  
  fill(0)
  textSize(10)
  
  text(`(${round(p.x,2)}, ${round(p.y,2)})`, p.x+10, p.y+2);
  fill(0)
  
  point
  
}

function draw_segment(xi,xf,yi,yf){
  
  line(xi,xf,yi,yf)
  
}


function draw() {
  
  background("#EDF8FA");
  
  //verify_colision([1,8],[150,300],[200,300],[0,150])
  verify_colision([0,0],[200,200],[150,150],[400,400])
  
  
}