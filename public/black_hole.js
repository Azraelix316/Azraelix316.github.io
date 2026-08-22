window.initBlackHole = function (containerEl) {
  return new p5((p) => {
    p5.disableFriendlyErrors = true;
    let Disk = [];

    // --- REAL WORLD VALUES ---
    const G_REAL = 6.6743e-11;
    const M_REAL = 2.0e31; // 10 Solar Masses
    const C_REAL = 299792458;
    const METERS_PER_PIXEL = 600;

    let G = G_REAL / Math.pow(METERS_PER_PIXEL, 3);
    let M = M_REAL;
    let c = C_REAL / METERS_PER_PIXEL;
    let dt = 0.00005;
    const SIGMA = 5.670374e-8; // Real-world SI value works perfectly here!
    const MDOT = 1.0e7; // Accretion rate in kg/s
    let Rs = (2 * G * M) / (c * c);

    class DiskParticle {
      constructor(x, y, z) {
        this.pos = p.createVector(x, y, z);
        this.vel = p.createVector(0, 0, 0);
        let r = this.pos.mag();
        let speed = Math.sqrt((G * M) * r) / (r - Rs);
        this.vel = this.pos.copy().rotate(p.HALF_PI).setMag(speed);
        this.isSwallowed = false;
        this.blackHole = { pos: p.createVector(0, 0, 0) };
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

      display() {
        if (!this.isSwallowed) {
          p.push();
          p.stroke(kelvinToRGB(ShakuraSunyaevTemp(this.pos.mag())));
          p.beginShape();
          p.noFill();
          for (let point of this.pointArray) {
            p.vertex(point.x, point.y, point.z);
          }
          p.endShape();
          p.pop();
        }
      }
    }

    p.setup = () => {
      let w = containerEl.clientWidth || 500;
      let h = containerEl.clientHeight || 400;

      let canvas = p.createCanvas(w, h, p.WEBGL);
      canvas.style('position', 'relative');
      canvas.style('display', 'block');
      canvas.style('width', '100%');
      canvas.style('height', '100%');

      Disk = [];
      for (let i = 0; i < 150; i++) {
        let angle = p.random(p.TWO_PI);
        let radius = p.random(235, 350);
        let x = radius * p.cos(angle);
        let y = radius * p.sin(angle);
        let z = 0;
        Disk.push(new DiskParticle(x, y, z));
        p.strokeWeight(0.99);
      }
    };

    p.draw = () => {
      p.clear();
      p.orbitControl();
      p.rotateZ((-p.PI / 180) * 20);
      p.rotateX(p.HALF_PI - (p.PI / 180) * 20);
      p.fill(0);
      p.sphere(Rs);

      for (let particle of Disk) {
        particle.update();
        particle.display();
      }
    };

    p.windowResized = () => {
      if (containerEl) {
        p.resizeCanvas(containerEl.clientWidth, containerEl.clientHeight);
      }
    };

    function ShakuraSunyaevTemp(r) {
      return p.pow(
        ((3 * G * M * MDOT) / (8 * p.PI * SIGMA * p.pow(r, 3))) *
          (1 - Math.sqrt(Rs / r)),
        0.25
      );
    }

    function StefanBoltzmannIntensity(t) {
      return SIGMA * p.pow(t, 4);
    }

    function blackbodyColor(t) {
      let intensity = StefanBoltzmannIntensity(t);
    }

    function kelvinToRGB(k) {
      const WIEN_CONSTANT = 2.8977729e-3;
      return wavelengthToRGB((WIEN_CONSTANT / k) * 1e10);
    }

    function wavelengthToRGB(lambda_nm) {
      let r = 0,
        g = 0,
        b = 0;

      // 1. Map high-energy UV and X-rays to Electric Violet/Blue (False Color)
      if (lambda_nm < 380) {
        let intensity = p.map(lambda_nm, 0, 380, 255, 150);
        return p.color(intensity, intensity, 255);
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
        return p.color(40, 0, 0); // Faint deep red/infrared glow
      }

      // Scale factor to dim colors near edges of human vision
      let factor = 1.0;
      if (lambda_nm >= 380 && lambda_nm < 420)
        factor = 0.3 + (0.7 * (lambda_nm - 380)) / (420 - 380);
      else if (lambda_nm >= 700 && lambda_nm <= 780)
        factor = 0.3 + (0.7 * (780 - lambda_nm)) / (780 - 700);

      return p.color(r * 255 * factor, g * 255 * factor, b * 255 * factor);
    }
  }, containerEl);
};