// public/obsidian_network.js - FRC 2026 Championship Interactive Network

window.initObsidianNetwork = function (containerEl) {
  return new p5((p) => {
    let nodes = [];
    let connections = [];
    let hoveredNode = null;
    let dataLoaded = false;
    let loadingMessage = "Loading FRC 2026 Championship data...";

    class Team {
      constructor(teamKey, teamNumber, x, y) {
        this.teamKey = teamKey;
        this.teamNumber = teamNumber;
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.vx = 0;
        this.vy = 0;
        this.wins = 0;
        this.losses = 0;
        this.ties = 0;
        this.radius = 8;
        this.targetRadius = 8;
        this.strength = 0; // Win rate
      }

      calculateRadius() {
        // Size based on wins (minimum 6, maximum 20)
        this.targetRadius = p.map(this.wins, 0, 12, 6, 20);
      }

      calculateStrength() {
        // 0 to 1, based on win rate
        const total = this.wins + this.losses + this.ties;
        if (total === 0) return 0;
        return this.wins / total;
      }

      update(w, h) {
        // Smooth movement towards target position
        this.vx += (this.targetX - this.x) * 0.05;
        this.vy += (this.targetY - this.y) * 0.05;
        
        // Damping
        this.vx *= 0.85;
        this.vy *= 0.85;
        
        this.x += this.vx;
        this.y += this.vy;

        // Smooth radius changes
        this.radius += (this.targetRadius - this.radius) * 0.1;

        // Keep within bounds
        this.x = p.constrain(this.x, this.radius, w - this.radius);
        this.y = p.constrain(this.y, this.radius, h - this.radius);
      }

      draw(isHovered) {
        // Glow for hovered node
        if (isHovered) {
          p.noStroke();
          p.fill(0, 100, 200, 60);
          p.circle(this.x, this.y, this.radius * 3);
        }

        // Node body - size represents wins
        p.stroke(30, 40, 50);
        p.strokeWeight(1.0);
        
        // Color based on win rate (strength)
        let fillColor = p.lerpColor(
          p.color(180, 180, 180), 
          p.color(50, 150, 100), 
          this.strength
        );
        p.fill(fillColor);
        p.circle(this.x, this.y, this.radius * 2);

        // Inner highlight
        p.noStroke();
        p.fill(255, 255, 255, 100);
        p.circle(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.5);

        // Show team number on hover or for larger nodes
        if (isHovered || this.radius > 12) {
          p.fill(0);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(10);
          p.text(this.teamNumber, this.x, this.y + this.radius * 2 + 12);
        }
      }

      distanceTo(other) {
        let dx = this.x - other.x;
        let dy = this.y - other.y;
        return p.sqrt(dx * dx + dy * dy);
      }

      isMouseOver(mx, my) {
        let d = p.dist(mx, my, this.x, this.y);
        return d < this.radius;
      }
    }

    class Connection {
      constructor(winner, loser) {
        this.winner = winner;
        this.loser = loser;
      }

      draw(isHighlighted) {
        let dist = this.winner.distanceTo(this.loser);
        let alpha = p.map(dist, 0, 300, 100, 20);
        
        if (isHighlighted) {
          alpha = 120;
          p.strokeWeight(2);
          p.stroke(50, 100, 200, alpha);
        } else {
          p.strokeWeight(1);
          p.stroke(100, 120, 140, alpha);
        }

        p.line(this.winner.x, this.winner.y, this.loser.x, this.loser.y);

        // Draw arrow pointing from loser to winner
        if (isHighlighted) {
          let angle = p.atan2(this.winner.y - this.loser.y, this.winner.x - this.loser.x);
          let arrowSize = 6;
          let midX = p.lerp(this.loser.x, this.winner.x, 0.5);
          let midY = p.lerp(this.loser.y, this.winner.y, 0.5);

          p.push();
          p.translate(midX, midY);
          p.rotate(angle);
          p.fill(0, 0, 0, alpha);
          p.noStroke();
          p.triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
          p.pop();
        }
      }
    }

    async function fetchChampionshipData() {
      try {
        // Fetch from preloaded CSV
        const response = await fetch('/frc_2026_data.csv');
        
        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.status}`);
        }

        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        
        if (lines.length < 2) {
          loadingMessage = "No FRC data available. Using demo data...";
          createDemoData();
          return;
        }

        let w = containerEl.clientWidth || 500;
        let h = containerEl.clientHeight || 400;
        let centerX = w / 2;
        let centerY = h / 2;

        // Parse CSV and create nodes
        for (let i = 1; i < lines.length; i++) {
          const [teamKey, teamNumber, wins, losses, ties] = lines[i].split(',');
          
          let team = new Team(teamKey, teamNumber, centerX, centerY);
          team.wins = parseInt(wins) || 0;
          team.losses = parseInt(losses) || 0;
          team.ties = parseInt(ties) || 0;
          team.calculateRadius();
          team.strength = team.calculateStrength();
          
          nodes.push(team);
        }

        if (nodes.length === 0) {
          createDemoData();
          return;
        }

        // Position nodes: strongest in center, weakest at edges
        // Sort by strength (win rate)
        const sortedNodes = [...nodes].sort((a, b) => b.strength - a.strength);
        
        // Use spiral positioning from center outward
        sortedNodes.forEach((node, index) => {
          // Normalize index to 0-1
          const normalized = index / (sortedNodes.length - 1 || 1);
          
          // Create spiral pattern: strong teams near center, weak at edges
          const distance = normalized * Math.min(w, h) * 0.4; // Max radius 40% of smallest dimension
          const angle = (index * 2.4) % (Math.PI * 2); // Golden angle spiral
          
          node.targetX = centerX + distance * Math.cos(angle);
          node.targetY = centerY + distance * Math.sin(angle);
          node.x = node.targetX;
          node.y = node.targetY;
        });

        dataLoaded = true;
        loadingMessage = "";

      } catch (error) {
        console.error('Error fetching FRC data:', error);
        loadingMessage = "Using demo data...";
        createDemoData();
      }
    }

    function createDemoData() {
      // Demo data if CSV not available
      let w = containerEl.clientWidth || 500;
      let h = containerEl.clientHeight || 400;
      let centerX = w / 2;
      let centerY = h / 2;
      
      for (let i = 0; i < 30; i++) {
        let team = new Team(`frc${1000 + i}`, `${1000 + i}`, centerX, centerY);
        team.wins = p.floor(p.random(0, 12));
        team.losses = p.floor(p.random(0, 12));
        team.ties = 0;
        team.calculateRadius();
        team.strength = team.calculateStrength();
        nodes.push(team);
      }

      // Position with spiral
      nodes.sort((a, b) => b.strength - a.strength);
      nodes.forEach((node, index) => {
        const normalized = index / (nodes.length - 1 || 1);
        const distance = normalized * Math.min(w, h) * 0.4;
        const angle = (index * 2.4) % (Math.PI * 2);
        
        node.targetX = centerX + distance * Math.cos(angle);
        node.targetY = centerY + distance * Math.sin(angle);
        node.x = node.targetX;
        node.y = node.targetY;
      });
      
      dataLoaded = true;
    }

    p.setup = () => {
      let w = containerEl.clientWidth || 500;
      let h = containerEl.clientHeight || 400;

      let canvas = p.createCanvas(w, h);
      canvas.style('position', 'relative');
      canvas.style('display', 'block');
      canvas.style('width', '100%');
      canvas.style('height', '100%');

      // Fetch data from CSV
      fetchChampionshipData();
    };

    p.draw = () => {
      p.background(255);

      if (!dataLoaded) {
        // Show loading message
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(14);
        p.text(loadingMessage, p.width / 2, p.height / 2);
        return;
      }

      // Check for hovered node
      hoveredNode = null;
      for (let node of nodes) {
        if (node.isMouseOver(p.mouseX, p.mouseY)) {
          hoveredNode = node;
          break;
        }
      }

      // Update nodes
      for (let node of nodes) {
        node.update(p.width, p.height);
      }

      // Draw connections
      for (let connection of connections) {
        let isHighlighted = hoveredNode && 
          (connection.winner === hoveredNode || connection.loser === hoveredNode);
        connection.draw(isHighlighted);
      }

      // Draw nodes
      for (let node of nodes) {
        node.draw(node === hoveredNode);
      }

      // Draw info panel for hovered node
      if (hoveredNode) {
        drawInfoPanel(hoveredNode);
      }
    };

    function drawInfoPanel(node) {
      let panelX = 10;
      let panelY = 10;
      let panelW = 180;
      let panelH = 100;

      // Background
      p.fill(255, 255, 255, 240);
      p.stroke(0, 0, 0, 100);
      p.strokeWeight(1);
      p.rect(panelX, panelY, panelW, panelH);

      // Text
      p.fill(0);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      p.textSize(14);
      p.text(`Team ${node.teamNumber}`, panelX + 10, panelY + 10);
      p.textSize(12);
      p.text(`Wins: ${node.wins}`, panelX + 10, panelY + 30);
      p.text(`Losses: ${node.losses}`, panelX + 10, panelY + 48);
      p.text(`Ties: ${node.ties}`, panelX + 10, panelY + 66);
      
      let winRate = (node.strength * 100).toFixed(1);
      p.text(`Win Rate: ${winRate}%`, panelX + 10, panelY + 84);
    }

    p.windowResized = () => {
      if (containerEl) {
        let w = containerEl.clientWidth;
        let h = containerEl.clientHeight;
        p.resizeCanvas(w, h);
      }
    };
  }, containerEl);
};
