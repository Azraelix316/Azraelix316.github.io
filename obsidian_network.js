// public/obsidian_network.js

window.initObsidianNetwork = function (containerEl) {
  return new p5((p) => {
    let nodes = [];
    let connections = [];
    const nodeCount = 12;
    const connectionRange = 150;
    let time = 0;

    class Node {
      constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = p.random(-0.5, 0.5);
        this.vy = p.random(-0.5, 0.5);
        this.vz = p.random(-0.5, 0.5);
        this.radius = p.random(4, 8);
        this.energy = 0;
        this.pulsePhase = p.random(0, p.TWO_PI);
      }

      update(w, h) {
        // Brownian motion in 3D space
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        // Bounce off boundaries
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        if (this.z < -100 || this.z > 100) this.vz *= -1;

        // Clamp within bounds
        this.x = p.constrain(this.x, 0, w);
        this.y = p.constrain(this.y, 0, h);
        this.z = p.constrain(this.z, -100, 100);

        // Decay energy
        if (this.energy > 0) {
          this.energy -= 0.02;
        }

        // Update pulse phase
        this.pulsePhase += 0.02;
      }

      draw() {
        // Node glow based on energy
        if (this.energy > 0) {
          p.noStroke();
          p.fill(100, 150, 200, this.energy * 40);
          p.circle(this.x, this.y, this.radius * 4);
        }

        // Core node - obsidian dark with metallic edge
        p.stroke(50, 60, 70);
        p.strokeWeight(1.5);
        p.fill(20, 20, 30);
        p.circle(this.x, this.y, this.radius * 2);

        // Subtle specular highlight
        p.noStroke();
        p.fill(100, 120, 140, 80);
        p.circle(this.x - this.radius * 0.4, this.y - this.radius * 0.4, this.radius * 0.6);
      }

      activate() {
        this.energy = 0.8;
      }

      distanceTo(other) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        let dz = this.z - other.z;
        return p.sqrt(dx * dx + dy * dy + dz * dz);
      }
    }

    class Connection {
      constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.flow = 0;
        this.flowDir = 1;
      }

      update() {
        // Animate flow along connection
        this.flow += this.flowDir * 0.015;
        if (this.flow >= 1 || this.flow <= 0) {
          this.flowDir *= -1;
        }
      }

      draw() {
        // Connection line with opacity based on distance
        let dist = this.nodeA.distanceTo(this.nodeB);
        let distFactor = p.map(dist, 0, connectionRange, 1, 0);
        distFactor = p.constrain(distFactor, 0, 1);

        // Base line
        p.stroke(60, 80, 100, distFactor * 50);
        p.strokeWeight(1);
        p.line(this.nodeA.x, this.nodeA.y, this.nodeB.x, this.nodeB.y);

        // Flow particle along line
        let flowX = p.lerp(this.nodeA.x, this.nodeB.x, this.flow);
        let flowY = p.lerp(this.nodeA.y, this.nodeB.y, this.flow);

        p.noStroke();
        p.fill(120, 180, 220, distFactor * 150);
        p.circle(flowX, flowY, 3);
      }
    }

    p.setup = () => {
      let w = containerEl.clientWidth || 500;
      let h = containerEl.clientHeight || 400;

      let canvas = p.createCanvas(w, h);
      canvas.style('position', 'relative');
      canvas.style('display', 'block');
      canvas.style('width', '100%');
      canvas.style('height', '100%');
      canvas.style('background', 'transparent');

      // Initialize nodes in 3D space
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(
          new Node(p.random(w), p.random(h), p.random(-50, 50))
        );
      }

      updateConnections();
    };

    function updateConnections() {
      connections = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          let dist = nodes[i].distanceTo(nodes[j]);

          if (dist < connectionRange) {
            connections.push(new Connection(nodes[i], nodes[j]));
          }
        }
      }
    }

    p.draw = () => {
      p.background(255);

      time += 0.01;

      // Update nodes
      for (let node of nodes) {
        node.update(p.width, p.height);
      }

      // Periodically activate random nodes
      if (p.frameCount % 30 === 0 && p.random() < 0.3) {
        p.random(nodes).activate();
      }

      // Reconstruct connections each frame
      updateConnections();

      // Draw connections
      for (let connection of connections) {
        connection.update();
        connection.draw();
      }

      // Draw nodes
      for (let node of nodes) {
        node.draw();
      }
    };

    p.windowResized = () => {
      if (containerEl) {
        let w = containerEl.clientWidth;
        let h = containerEl.clientHeight;
        p.resizeCanvas(w, h);
      }
    };
  }, containerEl);
};
