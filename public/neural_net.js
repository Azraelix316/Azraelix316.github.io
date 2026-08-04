// public/neural_net.js

window.initNeuralNet = function (containerEl) {
  return new p5((p) => {
    let layers = [];
    const layerSizes = [4, 6, 6, 3]; // Input (4), Hidden (6, 6), Output (3)
    let pulses = [];

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 7;
        this.activation = 0; // Glowing pulse effect on node
      }

      update() {
        if (this.activation > 0) {
          this.activation -= 0.03; // Fade out activation glow
        }
      }

      draw() {
        // Node halo when activated
        if (this.activation > 0) {
          p.noStroke();
          p.fill(0, this.activation * 100);
          p.circle(this.x, this.y, this.radius * 3.5);
        }

        // Base Node
        p.stroke(0);
        p.strokeWeight(1.5);
        p.fill(255);
        p.circle(this.x, this.y, this.radius * 2);
      }
    }

    class SignalPulse {
      constructor(startNode, endNode) {
        this.start = startNode;
        this.end = endNode;
        this.progress = 0;
        this.speed = p.random(0.015, 0.03);
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.end.activation = 1; // Trigger destination node glow
        }
      }

      draw() {
        let currentX = p.lerp(this.start.x, this.end.x, this.progress);
        let currentY = p.lerp(this.start.y, this.end.y, this.progress);

        p.noStroke();
        p.fill(0);
        p.circle(currentX, currentY, 5);
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

      buildNetwork(w, h);
    };

    function buildNetwork(w, h) {
      layers = [];
      let paddingX = w * 0.15;
      let layerSpacing = (w - paddingX * 2) / (layerSizes.length - 1);

      // Create structured network layers
      for (let i = 0; i < layerSizes.length; i++) {
        let currentLayer = [];
        let count = layerSizes[i];
        let x = paddingX + i * layerSpacing;
        let paddingY = h * 0.2;
        let nodeSpacing = (h - paddingY * 2) / (count > 1 ? count - 1 : 1);

        for (let j = 0; j < count; j++) {
          let y = count === 1 ? h / 2 : paddingY + j * nodeSpacing;
          currentLayer.push(new Node(x, y));
        }
        layers.push(currentLayer);
      }
    }

    p.draw = () => {
      p.clear();

      // 1. Draw Synapses (Connections between adjacent layers)
      for (let l = 0; l < layers.length - 1; l++) {
        let currentLayer = layers[l];
        let nextLayer = layers[l + 1];

        for (let nodeA of currentLayer) {
          for (let nodeB of nextLayer) {
            p.stroke(0, 30); // Thin dark lines
            p.strokeWeight(1);
            p.line(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
          }
        }
      }

      // 2. Randomly Fire Pulses from Layer to Layer
      if (p.random() < 0.08) {
        let randomLayerIdx = p.floor(p.random(layers.length - 1));
        let startNode = p.random(layers[randomLayerIdx]);
        let endNode = p.random(layers[randomLayerIdx + 1]);

        startNode.activation = 0.8; // Trigger origin node glow
        pulses.push(new SignalPulse(startNode, endNode));
      }

      // 3. Update & Draw Active Signal Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].update();
        pulses[i].draw();

        if (pulses[i].progress >= 1) {
          pulses.splice(i, 1);
        }
      }

      // 4. Update & Draw Layer Nodes
      for (let layer of layers) {
        for (let node of layer) {
          node.update();
          node.draw();
        }
      }
    };

    p.windowResized = () => {
      if (containerEl) {
        let w = containerEl.clientWidth;
        let h = containerEl.clientHeight;
        p.resizeCanvas(w, h);
        buildNetwork(w, h);
      }
    };
  }, containerEl);
};