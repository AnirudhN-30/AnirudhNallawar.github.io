function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderPhotography() {
  const container = document.querySelector('#photo-collage');
  const images = window.PHOTOGRAPHY_IMAGES || [];
  if (!container || !images.length) return;
  container.innerHTML = '';
  shuffle(images).slice(0, 9).forEach((src, index) => {
    const image = document.createElement('img');
    image.src = src;
    image.alt = `Photography by Anirudh Nallawar, selection ${index + 1}`;
    image.loading = 'lazy';
    container.appendChild(image);
  });
}

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

window.addEventListener('DOMContentLoaded', () => {
  renderPhotography();
  document.querySelector('#reshuffle-photos')?.addEventListener('click', renderPhotography);
  initializeNavigation();
  initializeReveals();
  initializeSkillsSlider();
});
