function initializeNavigation() {
  const header = document.querySelector('.site-header');
  const button = document.querySelector('.menu-button');
  const links = document.querySelector('.nav-links');
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
  button.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
  });
  links.addEventListener('click', () => {
    links.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
    button.textContent = 'Menu';
  });
}

function initializeReveals() {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function initializeSkillsSlider() {
  const track = document.querySelector('#skills-track');
  const tabs = [...document.querySelectorAll('[data-skill-slide]')];
  const position = document.querySelector('#skills-position');
  if (!track || !tabs.length) return;
  let active = 0;
  const show = (index) => {
    active = (index + tabs.length) % tabs.length;
    track.style.transform = `translate3d(-${active * 100}%, 0, 0)`;
    tabs.forEach((tab, tabIndex) => {
      const selected = tabIndex === active;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    position.textContent = `${String(active + 1).padStart(2, '0')} — ${String(tabs.length).padStart(2, '0')}`;
  };
  tabs.forEach((tab) => tab.addEventListener('click', () => show(Number(tab.dataset.skillSlide))));
  document.querySelector('#skills-prev')?.addEventListener('click', () => show(active - 1));
  document.querySelector('#skills-next')?.addEventListener('click', () => show(active + 1));
  let touchStart = 0;
  track.addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(active + (distance < 0 ? 1 : -1));
  }, { passive: true });
  show(0);
}

function initializeCustomCursor() {
  const finePointer = window.matchMedia('(pointer: fine)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!finePointer.matches || reducedMotion.matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'cursor-orbit';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="cursor-ring"></span><span class="cursor-dot"></span>';
  document.body.appendChild(cursor);
  document.documentElement.classList.add('has-custom-cursor');

  const ring = cursor.querySelector('.cursor-ring');
  const dot = cursor.querySelector('.cursor-dot');
  let pointerX = -100;
  let pointerY = -100;
  let ringX = -100;
  let ringY = -100;

  const animate = () => {
    ringX += (pointerX - ringX) * 0.16;
    ringY += (pointerY - ringY) * 0.16;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    dot.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0) translate(-50%, -50%)`;
    cursor.classList.add('is-visible');
  }, { passive: true });

  document.addEventListener('pointerover', (event) => {
    cursor.classList.toggle('is-interactive', Boolean(event.target.closest('a, button, [role="button"]')));
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
  window.addEventListener('blur', () => cursor.classList.remove('is-visible'));

  animate();
}

window.addEventListener('DOMContentLoaded', () => {
  initializeNavigation();
  initializeReveals();
  initializeSkillsSlider();
  initializeCustomCursor();
});
