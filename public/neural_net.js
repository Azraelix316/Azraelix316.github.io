// public/neural_net.js

let nodes = [];
const NUM_NODES = 35;
const MAX_DISTANCE = 120;

class Node {
  constructor(w, h) {
    this.x = random(w);
    this.y = random(h);
    this.vx = random(-0.6, 0.6);
    this.vy = random(-0.6, 0.6);
    this.radius = random(3, 5);
  }

  update(w, h) {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > w) this.vx *= -1;
    if (this.y < 0 || this.y > h) this.vy *= -1;
  }

  draw() {
    noStroke();
    fill(0); // Pure black nodes
    circle(this.x, this.y, this.radius * 2);
  }
}

class Signal {
  constructor(startNode, endNode) {
    this.start = startNode;
    this.end = endNode;
    this.progress = 0;
    this.speed = random(0.01, 0.03);
  }

  update() {
    this.progress += this.speed;
  }

  draw() {
    let currentX = lerp(this.start.x, this.end.x, this.progress);
    let currentY = lerp(this.start.y, this.end.y, this.progress);

    noStroke();
    fill(0);
    circle(currentX, currentY, 4);
  }
}

let signals = [];

function setup() {
  let parentEl = window.p5TargetContainer || document.body;
  let w = parentEl.clientWidth || 500;
  let h = parentEl.clientHeight || 400;

  let canvas = createCanvas(w, h);

  // Safely nest the canvas inside the React container
  if (parentEl) {
    parentEl.appendChild(canvas.elt);
  }

  // Force canvas styling to fit local parent element
  canvas.style('position', 'relative');
  canvas.style('display', 'block');
  canvas.style('width', '100%');
  canvas.style('height', '100%');

  // Initialize Nodes
  nodes = [];
  for (let i = 0; i < NUM_NODES; i++) {
    nodes.push(new Node(w, h));
  }
}

function draw() {
  clear(); // Keep background transparent

  let parentEl = window.p5TargetContainer;
  let w = parentEl ? parentEl.clientWidth : width;
  let h = parentEl ? parentEl.clientHeight : height;

  // Update & Draw Nodes
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].update(w, h);
    nodes[i].draw();

    // Connect close nodes with lines (synapses)
    for (let j = i + 1; j < nodes.length; j++) {
      let d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);

      if (d < MAX_DISTANCE) {
        // Map line opacity based on proximity
        let alpha = map(d, 0, MAX_DISTANCE, 200, 0);
        stroke(0, alpha);
        strokeWeight(1);
        line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);

        // Randomly spawn a neural signal pulse between connected nodes
        if (random() < 0.001) {
          signals.push(new Signal(nodes[i], nodes[j]));
        }
      }
    }
  }

  // Update & Draw Signals
  for (let i = signals.length - 1; i >= 0; i--) {
    signals[i].update();
    signals[i].draw();

    if (signals[i].progress >= 1) {
      signals.splice(i, 1);
    }
  }
}

function windowResized() {
  let parentEl = window.p5TargetContainer;
  if (parentEl) {
    resizeCanvas(parentEl.clientWidth, parentEl.clientHeight);
  }
}

// Instantiate p5 instance safely
if (typeof p5 !== 'undefined') {
  new p5();
}