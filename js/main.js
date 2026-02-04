// Referencing https://www.youtube.com/watch?app=desktop&v=5tC46h022YE

// full clock.js example
document.addEventListener('DOMContentLoaded', () => {
  const clockEl = document.getElementById('clock');
  const locationText = 'Vancouver, BC';
  const zoneText = 'Pacific Standard Time';

  function updateClock() {
    const now = new Date();
    const opts = {
      timeZone: 'America/Vancouver',
      hour12: true,
      hour:   '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    const formatted = new Intl.DateTimeFormat('en-US', opts).format(now);

    clockEl.textContent = formatted;
    clockEl.setAttribute('datetime', now.toISOString());

    clockEl.setAttribute(
        'aria-label',
        `${locationText}, ${formatted}, ${zoneText}`
    );
  }

  updateClock();
  setInterval(updateClock, 1000);
});


// CUSTOM CURSOR

document.addEventListener('DOMContentLoaded', () => {
  const dot = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, dotX = 0, dotY = 0;
  const speed = 0.1;

  // update target
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // add/remove class on interactive elements
  document.querySelectorAll('a, button, .nav-button').forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hovered'));
  });

const hoverTargets = document.querySelectorAll(".project-item");

hoverTargets.forEach(el => {
  el.addEventListener("mouseenter", () => dot.classList.add("hovered"));
  el.addEventListener("mouseleave", () => dot.classList.remove("hovered"));
});


  // smooth follow loop
  function animate() {
    dotX += (mouseX - dotX) * speed;
    dotY += (mouseY - dotY) * speed;
    dot.style.left = `${dotX}px`;
    dot.style.top  = `${dotY}px`;
    requestAnimationFrame(animate);
  }
  animate();
});
