function randomizeAll() {
  const images = document.querySelectorAll('.gallery .item');
  const placed = [];
  const padding = 20; // minimum distance between shapes

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  images.forEach(img => {
    const size = 200 + Math.random() * 200; // image size in px
    let x, y;
    let tries = 0;

    do {
      // Edge hugging: pick either near left/top (0-20%) or right/bottom (80-100%)
      const xPct = Math.random() < 0.5 ? Math.random() * 35 : 65 + Math.random() * 35;
      const yPct = Math.random() < 0.5 ? Math.random() * 35 : 65 + Math.random() * 35;

      // Convert to px
      x = xPct / 100 * vw;
      y = yPct / 100 * vh;

      // Adjust so that at least 50% stays visible
      x = Math.min(Math.max(x, -size/2), vw - size/2);
      y = Math.min(Math.max(y, -size/2), vh - size/2);

      tries++;
      if (tries > 100) break; // fail-safe
    } while (placed.some(p => 
      Math.abs(p.x - x) < (p.size + size)/2 + padding &&
      Math.abs(p.y - y) < (p.size + size)/2 + padding
    ));

    // store position
    placed.push({x, y, size});

    // assign CSS variables
    img.style.setProperty('--x', x + "px");
    img.style.setProperty('--y', y + "px");
    img.style.setProperty('--size', size + "px");
  });
}
const gallery = document.querySelector('.card');
randomizeAll(); // initial random positions

gallery.addEventListener('mouseenter', randomizeAll);
