p5.disableFriendlyErrors = true;

let Particles=[];
let Angles=[];
let ForcesX=[];
let ForcesY=[];
let precision=10;
let count=1750;
let speed=8;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	strokeWeight(0.2)
	stroke(255,10)
	for (let i=0;i<count;i++) {
  Particles[i]=new particles();
	Particles[i].create();
	}
	blendMode(ADD);
}
let COUNT=0;
function draw() {	
	for (let i=0;i<count;i++) {
	Particles[i].force();
	Particles[i].display();
	}
filter(BLUR,2)

}



class particles {
	create() {
	this.position=createVector(random(width),random(height))
	this.velocity=createVector(0,0)
	this.color=createVector(random(255),random(255),255)
	this.speed=random(1,10)
	this.pastPosition=createVector(this.position.x,this.position.y);

	}
	
	force() {
if (this.position.x > width) {
  this.position.x = 1;
}
if (this.position.x < 0) {
  this.position.x = width-1;
}
if (this.position.y > height) {
  this.position.y = 1;
}
if (this.position.y < 0) {
  this.position.y = height-1;
}
	this.velocity=p5.Vector.fromAngle(noise(this.position.x/100,this.position.y/100,this.speed)*TWO_PI);
	// this.velocity.mult(this.speed);
		this.velocity.mult(speed)
		this.position.add(this.velocity)
	}
	display() {
	stroke(this.color.x,this.color.y,this.color.z,105)
  line(this.position.x-this.velocity.x,this.position.y-this.velocity.y,this.position.x,this.position.y)
	}
}