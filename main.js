import Lenis from 'lenis';

const TOTAL_FRAMES = 300;
const canvas = document.getElementById('scroll-canvas');
const ctx = canvas.getContext('2d');

const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');
const loaderBar = document.getElementById('loader-bar');

const images = [];
let loadedCount = 0;
let targetFrame = 0;
let currentFrame = 0;

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Get frame image path formatted as ezgif-frame-001.jpg -> ezgif-frame-300.jpg
function getFramePath(index) {
  const frameNum = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${frameNum}.jpg`;
}

// Preload all frames
function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    
    img.onload = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      if (loaderProgress) loaderProgress.innerText = `${percent}%`;
      if (loaderBar) loaderBar.style.width = `${percent}%`;

      if (loadedCount === TOTAL_FRAMES) {
        onPreloadComplete();
      }
    };

    img.onerror = () => {
      // In case of any load error, still count to unblock loader
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) {
        onPreloadComplete();
      }
    };

    images.push(img);
  }
}

function onPreloadComplete() {
  if (loader) {
    loader.classList.add('hidden');
  }
  // Initial draw
  resizeCanvas();
  renderFrame();
  // Start animation loop
  animate();
}

// Resize canvas to match display DPI
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  renderFrame();
}

window.addEventListener('resize', resizeCanvas);

// Render the active frame centered on canvas
function renderFrame() {
  const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrame)));
  const img = images[frameIndex];

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const dpr = window.devicePixelRatio || 1;
  const cw = canvas.width;
  const ch = canvas.height;

  ctx.clearRect(0, 0, cw, ch);

  // Calculate aspect-fit (contain) dimensions centered in canvas
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = cw / ch;

  let drawW, drawH, drawX, drawY;

  if (canvasAspect > imgAspect) {
    // Canvas is wider than image aspect ratio -> fit to height
    drawH = ch;
    drawW = ch * imgAspect;
    drawX = (cw - drawW) / 2;
    drawY = 0;
  } else {
    // Canvas is taller than image aspect ratio -> fit to width
    drawW = cw;
    drawH = cw / imgAspect;
    drawX = 0;
    drawY = (ch - drawH) / 2;
  }

  // Draw crisp image
  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

// Calculate target frame index based on page scroll depth
function updateScrollTarget() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  
  if (maxScroll <= 0) return;

  const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
  targetFrame = progress * (TOTAL_FRAMES - 1);
}

window.addEventListener('scroll', updateScrollTarget, { passive: true });
lenis.on('scroll', updateScrollTarget);

// Continuous interpolation loop for ultra-smooth 60fps rendering
function animate() {
  // Lerp current frame towards target frame (0.15 smoothing factor)
  const diff = targetFrame - currentFrame;
  
  if (Math.abs(diff) > 0.001) {
    currentFrame += diff * 0.15;
    renderFrame();
  }

  requestAnimationFrame(animate);
}

// Start loading
preloadFrames();
