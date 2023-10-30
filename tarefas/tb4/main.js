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


  v1 = createVector(200,150)
  v2 = createVector(100,300)


  console.log(cos_vector_2d(v1,v2))
  console.log(sen_vector_2d(v1,v2))

}
