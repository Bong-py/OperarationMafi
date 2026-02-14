const sections = document.querySelectorAll('.fade-in');
const hiddenMessage = document.getElementById('hiddenMessage');
const chanceBtn = document.getElementById('chanceBtn');
const heartsContainer = document.querySelector('.hearts');
const typewriterElement = document.getElementById('typewriter');
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

sections.forEach((section) => observer.observe(section));

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDuration = `${5 + Math.random() * 6}s`;
  heart.style.opacity = `${0.25 + Math.random() * 0.5}`;
  heart.style.transform = `scale(${0.65 + Math.random()}) rotate(45deg)`;
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 11000);
}

setInterval(createHeart, 550);

function runTypewriter(text) {
  if (!typewriterElement) return;
  typewriterElement.textContent = '';
  let idx = 0;
  const writer = setInterval(() => {
    typewriterElement.textContent += text[idx];
    idx += 1;
    if (idx >= text.length) clearInterval(writer);
  }, 58);
}

runTypewriter('Sefu... mujhe tumse kuch kehna hai.');

function launchConfetti() {
  const colors = ['#ff5ca8', '#ffc0e0', '#8d4dff', '#ffd166', '#7ae582'];
  for (let i = 0; i < 120; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.transform = `scale(${0.7 + Math.random() * 0.9})`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 3200);
  }
}

chanceBtn?.addEventListener('click', () => {
  hiddenMessage.classList.add('show');
  launchConfetti();
});

musicToggle?.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicToggle.textContent = 'Music Off';
    } catch {
      musicToggle.textContent = 'Tap again for Music';
    }
  } else {
    bgMusic.pause();
    musicToggle.textContent = 'Music On';
  }
});
