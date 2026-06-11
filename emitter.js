let particles=[];
let particleCount=30;
let scale=3.0;
function setup() {
  canvas=createCanvas(windowWidth, windowHeight);
  canvas.style('z-index','2');
  canvas.position(0,0);
  canvas.style('pointer-events', 'none');
  canvas.style('background-color', 'transparent');  mX=random(-1,1)
  for (let i=0;i<particleCount;i++){
    particles.push(new Particle(random(windowWidth/2),windowHeight))
  }
  background(255,0)
  strokeWeight(0.75)

}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  clear();
  translate(windowWidth/2,0)
  for (let i=0;i<particles.length;i++){
    particles[i].update()
    particles[i].show()
  }
}


class Particle {
  constructor(x, y) {
    this.maxLifespan = 255;
    this.init(x, y);
  }

  init(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -random(0.6));
    this.acc = createVector(0, 0);
    this.lifespan = this.maxLifespan+random(255);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 0.25;

    // Check if dead, then respawn
    if (this.lifespan <= 0) {
      this.init(random(windowWidth/2), windowHeight); // Reset to origin or desired position
    }
  }

  show() {
    let age = this.maxLifespan - this.lifespan;
    let size, alpha;

    // Growth/Alpha Logic
    if (this.lifespan > this.maxLifespan / 2) {
      // First half: Grow size and alpha to max
      size = map(age, 0, this.maxLifespan / 2, 0, 10);
      alpha = map(age, 0, this.maxLifespan / 2, 0, 150);
    } else if (this.lifespan > this.maxLifespan / 4) {
      // Second half (first half of it): Stay max, start shrinking size
      size = map(this.lifespan, this.maxLifespan / 4, this.maxLifespan / 2, 2, 10);
      alpha = 150;
    } else {
      // Last quarter: Shrink size and decrease alpha
      size = map(this.lifespan, 0, this.maxLifespan / 4, 0, 2);
      alpha = map(this.lifespan, 0, this.maxLifespan / 4, 0, 150);
    }

    stroke(0, alpha);
    strokeWeight(size*scale);
    point(this.pos.x, this.pos.y);
  }
}
