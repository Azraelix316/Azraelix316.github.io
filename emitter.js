let Disk = [];
// --- REAL WORLD VALUES ---
const G_REAL = 6.6743e-11;
const M_REAL = 2.0e31;       // 10 Solar Masses
const C_REAL = 299792458;
//no i'm not about to google all 
const METERS_PER_PIXEL = 600;
const timeToFinish = 0.5;
let G = G_REAL / Math.pow(METERS_PER_PIXEL, 3);
let M = M_REAL;
let c = C_REAL / METERS_PER_PIXEL;
let dt = 0.00005;
const SIGMA = 5.670374e-8; // Real-world SI value works perfectly here!
const MDOT = 1.0e7;       // Accretion rate in kg/s
// This will automatically calculate to exactly ~50 pixels!
let Rs = (2 * G * M) / (c * c);
let speedLines = [];
function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight, WEBGL);
  canvas.style('z-index', '2');
  canvas.position(windowWidth / 2, 0);
  canvas.style('width', '50vw');
  canvas.style('left', '50vw');
  canvas.style('pointer-events', 'none');
  canvas.style('background-color', 'transparent');
  canvas.style('position', 'fixed');
  for (let i = 0; i < 250; i++) {
    let angle = random(TWO_PI);
    let radius = random(235, 350);
    let x = radius * cos(angle);
    let y = radius * sin(angle);
    let z = 0;
    Disk.push(new DiskParticle(x, y, z));
    strokeWeight(0.99);
  }
  background(255);
  fill(0);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let transition = true;
let frameOfTransition;
function draw() {
  if (window.scrollY < 40) {
    if (transition == true) {
      frameOfTransition = frameCount;
    }
    let currTime = (frameCount - frameOfTransition) / 60;
    transition = false;
    let progress = Math.min(currTime / timeToFinish, 1);
    let targetZ = -PI / 180 * 20;
    let targetX = HALF_PI - PI / 180 * 20;
    rotateZ(lerp(0, targetZ, progress));
    rotateX(lerp(0, targetX, progress));
    clear();
    sphere(Rs);
    sphere(Math.max(pow(1.2 - currTime, 3) * 100 + 50, Rs));
    for (let particle of Disk) {
      particle.update();
      particle.display(255 * progress);
    }
  } else {
    if (transition == false) {
      frameOfTransition = frameCount;
    }
    //start automatic transition
    //fix this to become RX logo someday...?
    transition = true;
    let currTime = (frameCount - frameOfTransition) / 60;
    let progress = Math.max(1 - currTime / timeToFinish, 0);
    clear();
    let targetZ = -PI / 180 * 20;
    let targetX = HALF_PI - PI / 180 * 20;
    rotateZ(lerp(0, targetZ, progress));
    rotateX(lerp(0, targetX, progress));
    if (progress > 0) {
      for (let particle of Disk) {
        particle.update();
        particle.display(255 * progress);
      }
      sphere(Rs);
    } else {
      let currTimeInner = (currTime - timeToFinish);
      let maxY = 250;      // Total downward plunge distance
      let startY = 0; // Center of WEBGL screen
      let currentY = 0;
      let currentX = 0;

      if (currTimeInner < 0.5) {
        // 1. VIOLENT DROP & LONG HANG (0.0 to 0.5)
        let progress = currTimeInner * 2;
        let dropFactor = 1 - Math.pow(1 - progress, 5);
        currentY = startY + (dropFactor * maxY);

        // --- LIVE EMITTER: Spawn 2 new lines exactly at the ball's current position every frame ---
        for (let i = 0; i < 2; i++) {
          speedLines.push({
            x: random(-width / 6, width / 6),
            y: currentY,                // EMIT POINT: Stuck right to the ball!
            length: random(30, 70),
            speed: random(15, 25)       // Pixels per frame upward speed
          });
        }

        // --- UPDATE & RENDER ACTIVE LINES ---
        stroke(0);
        strokeWeight(1.5);

        for (let i = speedLines.length - 1; i >= 0; i--) {
          let l = speedLines[i];

          // Move the line upward
          l.y -= l.speed;

          // Draw the line
          line(l.x, l.y, -20, l.x, l.y - l.length, -20);

          // Performance optimization: Delete the line from memory once it shoots off the top
          if (l.y - l.length < -height / 2) {
            speedLines.splice(i, 1);
          }
        }

      } else if (currTimeInner < 1.0) {
        // 2. EASE-IN-OUT RISE (0.5 to 1.0)
        let progress = (currTimeInner * 2) - 1;
        let easeInOut = 3 * Math.pow(progress, 2) - 2 * Math.pow(progress, 3);
        let riseFactor = 1 - easeInOut;
        currentY = startY + (riseFactor * maxY);

        // Clear out remaining lines instantly so the up-phase is completely clean
        if (speedLines.length > 0) {
          speedLines = [];
        }
      }

      // Draw the tracking circle
      fill(0);
      noStroke();
      circle(currentX, currentY, 50);


    }


  }
}

class DiskParticle {
  constructor(x, y, z) {
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);
    let r = this.pos.mag();
    let speed = sqrt((G * M) * r) / (r - Rs);
    this.vel = this.pos.copy().rotate(HALF_PI).setMag(speed);
    this.isSwallowed = false;
    this.blackHole = { pos: createVector(0, 0, 0) };
    this.pointArray = [];
  }
  update() {
    // 1. Calculate vector pointing from particle to black hole
    let force = p5.Vector.sub(this.blackHole.pos, this.pos);
    let r = force.mag();

    // Guard against division by zero if it gets too close
    if (r <= Rs) {
      this.isSwallowed = true;
      return;
    }

    // 2. Calculate Paczyński-Wiita Acceleration
    force.normalize();
    let accelerationMagnitude = (G * M) / Math.pow((r - Rs), 2);
    force.mult(accelerationMagnitude);

    // 3. Apply force to velocity
    this.vel.add(p5.Vector.mult(force, dt));

    // 4. Add a tiny bit of disk friction so they actually accrete over time
    this.vel.mult(0.99999);

    // 5. Update position
    this.pos.add(p5.Vector.mult(this.vel, dt));
    this.pointArray.push(this.pos.copy());
    if (this.pointArray.length > 25) {
      this.pointArray.shift();
    }
  }
  display(alpha) {
    if (!this.isSwallowed) {
      push();
      stroke(kelvinToRGB(ShakuraSunyaevTemp(this.pos.mag()), alpha));
      beginShape();
      noFill();
      for (let point of this.pointArray) {
        vertex(point.x, point.y, point.z);
      }
      endShape();
      pop();
    }
  }
}


function ShakuraSunyaevTemp(r) {
  return pow(3 * G * M * MDOT / (8 * PI * SIGMA * pow(r, 3)) * (1 - sqrt(Rs / r)), 0.25);
}

function StefanBoltzmannIntensity(t) {
  return SIGMA * pow(t, 4);
}
function blackbodyColor(t) {
  let intensity = StefanBoltzmannIntensity(t);
}

function kelvinToRGB(k, alpha) {
  const WIEN_CONSTANT = 2.8977729e-3;
  return wavelengthToRGB(WIEN_CONSTANT / k * 1e10, alpha);
}
function wavelengthToRGB(lambda_nm, alpha) {
  let r = 0, g = 0, b = 0;

  // 1. Map high-energy UV and X-rays to Electric Violet/Blue (False Color)
  if (lambda_nm < 380) {
    // The hotter it gets (smaller wavelength), the more blinding blue-white it becomes
    let intensity = map(lambda_nm, 0, 380, 255, 150);
    return color(intensity, intensity, 255);
  }

  // 2. Real Visible Spectrum Mapping (380nm to 780nm)
  if (lambda_nm >= 380 && lambda_nm < 440) {
    r = -(lambda_nm - 440) / (440 - 380);
    b = 1.0;
  } else if (lambda_nm >= 440 && lambda_nm < 490) {
    g = (lambda_nm - 440) / (490 - 440);
    b = 1.0;
  } else if (lambda_nm >= 490 && lambda_nm < 510) {
    g = 1.0;
    b = -(lambda_nm - 510) / (510 - 490);
  } else if (lambda_nm >= 510 && lambda_nm < 580) {
    r = (lambda_nm - 510) / (580 - 510);
    g = 1.0;
  } else if (lambda_nm >= 580 && lambda_nm < 645) {
    r = 1.0;
    g = -(lambda_nm - 645) / (645 - 580);
  } else if (lambda_nm >= 645 && lambda_nm <= 780) {
    r = 1.0;
  }

  // 3. Handle infrared / cold drop-off
  if (lambda_nm > 780) {
    return color(40, 0, 0); // Faint deep red/infrared glow
  }

  // Scale factor to dim colors near edges of human vision
  let factor = 1.0;
  if (lambda_nm >= 380 && lambda_nm < 420) factor = 0.3 + 0.7 * (lambda_nm - 380) / (420 - 380);
  else if (lambda_nm >= 700 && lambda_nm <= 780) factor = 0.3 + 0.7 * (780 - lambda_nm) / (780 - 700);

  return color(r * 255 * factor, g * 255 * factor, b * 255 * factor, alpha);
}