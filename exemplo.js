
let points = [];
let particles = [];
let lineColor = 0;
let numParticles = 2;

class Particle {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height));
    this.r = random(4, 10);
    this.v = p5.Vector.random2D().mult(random(5, 10));
  }

  moveParticle() {
    this.pos.add(this.v);
    
    // Verificar colisão com a tela
    if (this.pos.x - this.r < 0 || this.pos.x + this.r > width) {
      this.v.x *= -1;
    }
    if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
      this.v.y *= -1;
    }
  }

  checkCollision(start, end) {
    // Vetor direção da reta
    let lineDir = p5.Vector.sub(end, start);

    // Vetor da partícula até o ponto inicial da reta
    let particleToStart = p5.Vector.sub(this.pos, start);

    // Projeção do vetor da partícula na direção da reta
    let projLength = particleToStart.dot(lineDir) / lineDir.magSq();
    let closestPoint;

    // Verificar se a projeção está dentro do segmento de reta
    if (projLength >= 0 && projLength <= 1) {
      closestPoint = p5.Vector.add(start, p5.Vector.mult(lineDir, projLength));
    } else {
      // A partícula está fora do segmento, encontrar ponto mais próximo nas extremidades do segmento
      let d1 = this.pos.dist(start);
      let d2 = this.pos.dist(end);
      if (d1 < d2) {
        closestPoint = start;
      } else {
        closestPoint = end;
      }
    }

    // Verificar colisão com a partícula
    let distance = this.pos.dist(closestPoint);
    if (distance < this.r) {
      // Calcular vetor normal à reta
      let normal = p5.Vector.sub(this.pos, closestPoint).normalize();

      // Calcular a componente da velocidade na direção normal
      let dot = this.v.dot(normal);
      
      // Refletir a velocidade em relação à normal
      let reflection = p5.Vector.mult(normal, dot * 2);
      this.v.sub(reflection);
    }
  }

  drawParticle() {
    noStroke();
    fill('rgba(236, 20, 20, 0.5)');
    circle(this.pos.x, this.pos.y, this.r);
  }
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < numParticles; i += 1) {
    particles.push(new Particle());
  }
  
}

function draw() {
  background(220);

  for (let i = 0; i < points.length - 1; i += 2) {
    const pi = points[i];
    const pj = points[i + 1];

    stroke(lineColor);
    line(pi.x, pi.y, pj.x, pj.y);
  }

  // Mover e verificar colisões das partículas
  for (let i = 0; i < particles.length; i++) {
    particles[i].drawParticle();
    particles[i].moveParticle();
    for (let j = 0; j < points.length - 1; j += 2) {
      const pi = points[j];
      const pj = points[j + 1];

      particles[i].checkCollision(createVector(pi.x,pi.y), createVector(pj.x,pj.y));  
      
    }
    
  }
}

function mousePressed() {
  const point = createVector(mouseX, mouseY);
  points.push(point);
}

function keyPressed() {
  if (keyCode === ENTER) {
    reset();
  }
}

function reset() {
  points = [];
  particles = [];
}
