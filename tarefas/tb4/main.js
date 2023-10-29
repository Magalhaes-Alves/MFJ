

function angle_vector_2d(v1,v2){

  return acos(p5.Vector.dot(v1,v2)/(v1.mag()*v2.mag()))


}


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {


  v1 = createVector(200,150)
  v2 = createVector(100,300)


  angle_vector_2d(v1,v2)



}
