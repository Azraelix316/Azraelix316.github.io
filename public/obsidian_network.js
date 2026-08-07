// public/obsidian_network.js - FRC 2026 Flow Field Visualization

window.initObsidianNetwork = function (containerEl) {
  return new p5((p) => {
    p5.disableFriendlyErrors = true;
    let teams = [];
    let particles = [];
    let dataLoaded = false;
    let hoveredTeam = null;
    
    // Pre-computed vector field
    let vectorField = [];
    const fieldResolution = 20; // Grid spacing
    let fieldWidth, fieldHeight;
    
    // Graphics buffer for flow field trails
    let flowBuffer;
    
    // Camera
    let camX = 0;
    let camY = 0;
    let camZoom = 1;
    let targetZoom = 1;
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isOverCanvas = false;

    const divisions = ['Archimedes', 'Curie', 'Daly', 'Galileo', 'Hopper', 'Johnson', 'Milstein', 'Newton'];
    
    class Team {
      constructor(data) {
        this.number = data.number;
        this.wins = data.wins;
        this.losses = data.losses;
        this.division = data.division || 'Einstein';
        
        const winRate = this.wins / Math.max(this.wins + this.losses, 1);
        this.score = winRate * (this.wins + this.losses) + this.wins * 2;
        
        // Position based on division
        if (this.division === 'Einstein') {
          this.x = p.random(-80, 80);
          this.y = p.random(-80, 80);
        } else {
          const divIndex = divisions.indexOf(this.division);
          if (divIndex >= 0) {
            const angleStart = (divIndex / divisions.length) * Math.PI * 2;
            const angleEnd = ((divIndex + 1) / divisions.length) * Math.PI * 2;
            const angle = p.random(angleStart, angleEnd);
            const radius = p.random(250, 400);
            
            this.x = Math.cos(angle) * radius;
            this.y = Math.sin(angle) * radius;
          } else {
            this.x = p.random(-300, 300);
            this.y = p.random(-300, 300);
          }
        }
        
        this.size = p.map(this.score, 0, 30, 0.5, 6);
        this.gravity = p.map(this.score, 0, 30, 50, 400); // Reduced force
      }

      draw(isHighlighted, isDimmed) {
        const alpha = isDimmed ? 30 : 255;
        
        if (isHighlighted && !isDimmed) {
          p.noStroke();
          for (let i = 3; i > 0; i--) {
            p.fill(0, 8);
            p.circle(this.x, this.y, this.size * 2 * i * 1.5);
          }
        }
        
        // Pure black node - smaller and subtler
        p.noStroke();
        p.fill(0, alpha);
        p.circle(this.x, this.y, this.size);
        
        // Only show text for larger teams when zoomed or highlighted
        if ((this.size > 5 && camZoom > 0.7) || isHighlighted) {
          p.fill(0, isDimmed ? 50 : 140);
          p.noStroke();
          p.textAlign(p.CENTER, p.CENTER);
          p.textFont('Figtree');
          p.textSize(5.5);
          p.text(this.number, this.x, this.y + this.size * 2.2);
        }
      }

      isMouseOver(mx, my) {
        const worldMouse = screenToWorld(mx, my);
        const d = p.dist(worldMouse.x, worldMouse.y, this.x, this.y);
        return d < Math.max(this.size, 10);
      }
    }

    class FlowParticle {
      constructor() {
        const angle = p.random(Math.PI * 2);
        const radius = p.random(100, 550);
        this.x = Math.cos(angle) * radius;
        this.y = Math.sin(angle) * radius;
        this.prevX = this.x;
        this.prevY = this.y;
        
        this.vx = 0;
        this.vy = 0;
        
        this.alpha = p.random(120, 200); // More visible
      }

      update() {
        this.prevX = this.x;
        this.prevY = this.y;
        
        // Sample from pre-computed vector field
        const fieldX = Math.floor((this.x + 1200) / fieldResolution);
        const fieldY = Math.floor((this.y + 1200) / fieldResolution);
        
        if (fieldX >= 0 && fieldX < fieldWidth && fieldY >= 0 && fieldY < fieldHeight) {
          const index = fieldY * fieldWidth + fieldX;
          if (vectorField[index]) {
            const force = vectorField[index];
            this.vx += force.x * 0.02; // Reduced from 0.05
            this.vy += force.y * 0.02;
          }
        }
        
        // Damping
        this.vx *= 0.98; // Less damping for more fluid motion
        this.vy *= 0.98;
        
        // Speed limit
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 3.5; // Increased from 2.5
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Boundary respawn
        const maxDist = 1000;
        const dist = Math.sqrt(this.x * this.x + this.y * this.y);
        if (dist > maxDist) {
          const angle = p.random(Math.PI * 2);
          const radius = p.random(100, 600);
          this.x = Math.cos(angle) * radius;
          this.y = Math.sin(angle) * radius;
          this.prevX = this.x;
          this.prevY = this.y;
          this.vx = 0;
          this.vy = 0;
        }
      }

      draw(buffer) {
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const alpha = p.map(speed, 0, 3.5, 30, this.alpha);
        
        buffer.stroke(0, alpha);
        buffer.strokeWeight(1.2); // Thicker lines
        buffer.line(this.prevX, this.prevY, this.x, this.y);
      }
    }

    function computeVectorField() {
      // Create static vector field from team positions
      fieldWidth = Math.ceil(2400 / fieldResolution);
      fieldHeight = Math.ceil(2400 / fieldResolution);
      vectorField = new Array(fieldWidth * fieldHeight);
      
      for (let y = 0; y < fieldHeight; y++) {
        for (let x = 0; x < fieldWidth; x++) {
          const worldX = x * fieldResolution - 1200;
          const worldY = y * fieldResolution - 1200;
          
          let forceX = 0;
          let forceY = 0;
          
          for (let team of teams) {
            const dx = team.x - worldX;
            const dy = team.y - worldY;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);
            
            if (dist < 3) continue;
            if (dist > 500) continue;
            
            const force = team.gravity / (distSq + 250); // Reduced from 200
            forceX += (dx / dist) * force;
            forceY += (dy / dist) * force;
          }
          
          const index = y * fieldWidth + x;
          vectorField[index] = { x: forceX, y: forceY };
        }
      }
    }

    function screenToWorld(sx, sy) {
      const wx = (sx - p.width / 2 - camX) / camZoom;
      const wy = (sy - p.height / 2 - camY) / camZoom;
      return { x: wx, y: wy };
    }

    async function fetchChampionshipData() {
      try {
        const response = await fetch('/frc_2026_data.csv');
        if (!response.ok) throw new Error('CSV failed');

        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        
        if (lines.length < 2) {
          createDemoData();
          return;
        }

        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',');
          if (parts.length < 5) continue;
          
          const number = parts[1].trim();
          const wins = parseInt(parts[2]) || 0;
          const losses = parseInt(parts[3]) || 0;
          const total = wins + losses;

          if (total === 0) continue;

          let division;
          if (wins >= 9) {
            division = 'Einstein';
          } else {
            division = divisions[Math.floor(Math.random() * divisions.length)];
          }

          teams.push(new Team({ number, wins, losses, division }));
        }

        teams.sort((a, b) => a.score - b.score);

        // Compute static vector field
        computeVectorField();

        // More particles for denser flow field
        for (let i = 0; i < 2000; i++) {
          particles.push(new FlowParticle());
        }

        dataLoaded = true;

      } catch (error) {
        console.error('Data error:', error);
        createDemoData();
      }
    }


    function drawDivisionSectors(buffer) {
      buffer.noFill();
      buffer.stroke(0, 50); // Much more subtle
      buffer.strokeWeight(0.5);
      
      for (let i = 0; i < divisions.length; i++) {
        const angle = (i / divisions.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * 600;
        const y = Math.sin(angle) * 600;
        buffer.line(0, 0, x, y);
      }
      
      buffer.circle(0, 0, 160);
      buffer.circle(0, 0, 500);
      buffer.circle(0, 0, 800);
      
      // Only show labels at higher zoom
      if (camZoom > 0.6) {
        buffer.fill(0, 40);
        buffer.noStroke();
        buffer.textAlign(p.CENTER, p.CENTER);
        buffer.textFont('Figtree');
        buffer.textSize(7);
        
        for (let i = 0; i < divisions.length; i++) {
          const angle = ((i + 0.5) / divisions.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 350;
          const y = Math.sin(angle) * 350;
          buffer.text(divisions[i].toUpperCase(), x, y);
        }
        
        buffer.textSize(9);
        buffer.fill(0, 60);
        buffer.text('EINSTEIN', 0, 0);
      }
    }

    p.setup = () => {
      let w = containerEl.clientWidth || 500;
      let h = containerEl.clientHeight || 400;

      let canvas = p.createCanvas(w, h, p.P2D); // Use P2D for GPU acceleration
      canvas.parent(containerEl);
      canvas.style('display', 'block');
      
      // Create buffer for flow field
      flowBuffer = p.createGraphics(2400, 2400, p.P2D);
      
      canvas.elt.addEventListener('mouseenter', () => { isOverCanvas = true; });
      canvas.elt.addEventListener('mouseleave', () => { 
        isOverCanvas = false; 
        hoveredTeam = null;
        p.cursor('default');
      });

      p.frameRate(30);
      fetchChampionshipData();
    };

    p.draw = () => {
      p.background(255);

      if (!dataLoaded) {
        p.fill(0);
        p.noStroke();
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('Figtree');
        p.textSize(10);
        p.text('COMPUTING VECTOR FIELD', p.width / 2, p.height / 2);
        return;
      }

      camZoom += (targetZoom - camZoom) * 0.15;

      // Fade flow buffer for trails effect
      flowBuffer.background(255, 255, 255, 5); // Slower fade for longer trails

      // Update particles and draw trails to flow buffer
      flowBuffer.push();
      flowBuffer.translate(flowBuffer.width / 2, flowBuffer.height / 2);
      
      for (let particle of particles) {
        particle.update();
        particle.draw(flowBuffer);
      }
      
      flowBuffer.pop();

      // Composite to screen with camera
      p.push();
      p.translate(p.width / 2 + camX, p.height / 2 + camY);
      p.scale(camZoom);
      
      // Draw flow field trails prominently
      p.imageMode(p.CENTER);
      p.image(flowBuffer, 0, 0);
      
      // Draw subtle division structure
      drawDivisionSectors(p);
      
      // Draw teams subtly - flow field is the star
      for (let team of teams) {
        const isHighlighted = team === hoveredTeam;
        team.draw(isHighlighted, false);
      }
      
      p.pop();

      // Minimal HUD
      p.fill(0, 120);
      p.noStroke();
      p.textAlign(p.LEFT, p.TOP);
      p.textFont('Figtree');
      p.textSize(16);
      p.text('FRC 2026 FLOW FIELD', 12, 12);
      p.textSize(12);
      p.fill(0, 80);
      p.text(`${teams.length} TEAMS • ${particles.length} FLOW LINES`, 12, 36);

      // Team info on hover
      if (hoveredTeam && !isDragging) {
        const px = p.constrain(p.mouseX + 15, 0, p.width - 160);
        const py = p.constrain(p.mouseY - 90, 0, p.height - 95);

        p.fill(255);
        p.stroke(0);
        p.strokeWeight(1);
        p.rect(px, py, 150, 90);

        p.noStroke();
        p.fill(0);
        p.textAlign(p.LEFT, p.TOP);
        p.textFont('Figtree');
        p.textSize(11);
        p.text(`TEAM ${hoveredTeam.number}`, px + 10, py + 10);
        
        p.textSize(8);
        p.fill(0, 180);
        p.text(`DIVISION: ${hoveredTeam.division}`, px + 10, py + 30);
        p.text(`WINS: ${hoveredTeam.wins}`, px + 10, py + 45);
        p.text(`LOSSES: ${hoveredTeam.losses}`, px + 10, py + 60);
        p.text(`GRAVITY: ${Math.round(hoveredTeam.gravity)}`, px + 10, py + 75);
      }
    };

    p.mouseMoved = () => {
      if (!dataLoaded || !isOverCanvas || isDragging) return;

      hoveredTeam = null;
      for (let team of teams) {
        if (team.isMouseOver(p.mouseX, p.mouseY)) {
          hoveredTeam = team;
          p.cursor('pointer');
          return;
        }
      }
      p.cursor('grab');
    };

    p.mousePressed = () => {
      if (!dataLoaded || !isOverCanvas) return;

      isDragging = true;
      lastMouseX = p.mouseX;
      lastMouseY = p.mouseY;
      p.cursor('grabbing');
    };

    p.mouseDragged = () => {
      if (isDragging && isOverCanvas) {
        const dx = p.mouseX - lastMouseX;
        const dy = p.mouseY - lastMouseY;
        camX += dx;
        camY += dy;
        lastMouseX = p.mouseX;
        lastMouseY = p.mouseY;
      }
    };

    p.mouseReleased = () => {
      isDragging = false;
      if (isOverCanvas) {
        p.cursor('grab');
      }
    };

    p.mouseWheel = (event) => {
      if (!dataLoaded || !isOverCanvas) return true;
      
      event.preventDefault();
      
      const zoomFactor = 1 - event.delta * 0.0008;
      targetZoom *= zoomFactor;
      targetZoom = p.constrain(targetZoom, 0.2, 2.5);
      
      return false;
    };

    p.windowResized = () => {
      if (containerEl && containerEl.clientWidth > 0) {
        p.resizeCanvas(containerEl.clientWidth, containerEl.clientHeight);
      }
    };
  }, containerEl);
};
